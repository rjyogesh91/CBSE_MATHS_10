// Google Drive API Integration Utility
// This file handles all Google Drive operations including authentication, file downloads, and uploads

declare global {
  interface Window {
    gapi: any;
    google: any;
  }
}

interface GoogleDriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
}

interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

class GoogleDriveService {
  private isInitialized = false;
  private isSignedIn = false;
  private authInstance: any = null;

  // Google Drive API Configuration
  private readonly CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  private readonly API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
  private readonly DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
  private readonly SCOPES = 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.readonly';

  /**
   * Initialize Google API client and authentication
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Wait for gapi to load
      await this.waitForGapi();
      
      // Initialize gapi client
      await window.gapi.load('client:auth2', async () => {
        await window.gapi.client.init({
          apiKey: this.API_KEY,
          clientId: this.CLIENT_ID,
          discoveryDocs: [this.DISCOVERY_DOC],
          scope: this.SCOPES
        });

        this.authInstance = window.gapi.auth2.getAuthInstance();
        this.isSignedIn = this.authInstance.isSignedIn.get();
        this.isInitialized = true;

        // Listen for sign-in state changes
        this.authInstance.isSignedIn.listen((isSignedIn: boolean) => {
          this.isSignedIn = isSignedIn;
        });
      });
    } catch (error) {
      console.error('Failed to initialize Google API:', error);
      throw new Error('Failed to initialize Google Drive API. Please check your configuration.');
    }
  }

  /**
   * Wait for Google API to load
   */
  private waitForGapi(): Promise<void> {
    return new Promise((resolve, reject) => {
      const checkGapi = () => {
        if (window.gapi) {
          resolve();
        } else {
          setTimeout(checkGapi, 100);
        }
      };
      
      // Timeout after 10 seconds
      setTimeout(() => reject(new Error('Google API failed to load')), 10000);
      checkGapi();
    });
  }

  /**
   * Sign in user with Google OAuth
   */
  async signIn(): Promise<void> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      await this.authInstance.signIn();
      this.isSignedIn = true;
    } catch (error) {
      console.error('Sign-in failed:', error);
      throw new Error('Failed to sign in with Google. Please try again.');
    }
  }

  /**
   * Sign out user
   */
  async signOut(): Promise<void> {
    if (!this.isInitialized) return;

    try {
      await this.authInstance.signOut();
      this.isSignedIn = false;
    } catch (error) {
      console.error('Sign-out failed:', error);
      throw new Error('Failed to sign out. Please try again.');
    }
  }

  /**
   * Check if user is currently signed in
   */
  isUserSignedIn(): boolean {
    return this.isSignedIn;
  }

  /**
   * Download a file from Google Drive
   */
  async downloadFile(fileId: string, fileName?: string): Promise<void> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    if (!this.isSignedIn) {
      await this.signIn();
    }

    try {
      // Get file metadata first
      const fileResponse = await window.gapi.client.drive.files.get({
        fileId: fileId,
        fields: 'name,mimeType,size'
      });

      const file: GoogleDriveFile = fileResponse.result;
      const downloadFileName = fileName || file.name || 'question-paper.pdf';

      // Download file content
      const downloadResponse = await window.gapi.client.drive.files.get({
        fileId: fileId,
        alt: 'media'
      });

      // Convert response to blob
      const blob = new Blob([downloadResponse.body], { 
        type: file.mimeType || 'application/octet-stream' 
      });

      // Create download link and trigger download
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = downloadFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Download failed:', error);
      throw new Error('Failed to download file. Please check your permissions and try again.');
    }
  }

  /**
   * Upload a file to Google Drive
   */
  async uploadFile(
    file: File, 
    folderId: string, 
    fileName?: string,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<string> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    if (!this.isSignedIn) {
      await this.signIn();
    }

    try {
      const uploadFileName = fileName || file.name;
      
      // Create file metadata
      const metadata = {
        name: uploadFileName,
        parents: [folderId]
      };

      // Create form data for multipart upload
      const form = new FormData();
      form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
      form.append('file', file);

      // Get access token
      const accessToken = window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;

      // Upload file using fetch with progress tracking
      const response = await this.uploadWithProgress(form, accessToken, onProgress);
      
      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }

      const result = await response.json();
      return result.id;

    } catch (error) {
      console.error('Upload failed:', error);
      throw new Error('Failed to upload file. Please check your permissions and try again.');
    }
  }

  /**
   * Upload file with progress tracking
   */
  private uploadWithProgress(
    formData: FormData, 
    accessToken: string,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<Response> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      // Track upload progress
      if (onProgress) {
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const progress: UploadProgress = {
              loaded: event.loaded,
              total: event.total,
              percentage: Math.round((event.loaded / event.total) * 100)
            };
            onProgress(progress);
          }
        });
      }

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve({
            ok: true,
            status: xhr.status,
            json: () => Promise.resolve(JSON.parse(xhr.responseText))
          } as Response);
        } else {
          reject(new Error(`Upload failed with status: ${xhr.status}`));
        }
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Upload failed due to network error'));
      });

      xhr.open('POST', 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart');
      xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
      xhr.send(formData);
    });
  }

  /**
   * Validate file for upload
   */
  validateFile(file: File): { isValid: boolean; error?: string } {
    // Check file size (max 50MB)
    const maxSize = 50 * 1024 * 1024; // 50MB in bytes
    if (file.size > maxSize) {
      return {
        isValid: false,
        error: 'File size must be less than 50MB'
      };
    }

    // Check file type
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (!allowedTypes.includes(file.type)) {
      return {
        isValid: false,
        error: 'Only PDF, DOC, DOCX, JPG, JPEG, and PNG files are allowed'
      };
    }

    return { isValid: true };
  }

  /**
   * Generate a unique filename for answer sheet
   */
  generateAnswerSheetFileName(studentId: string, originalFileName: string): string {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const extension = originalFileName.split('.').pop();
    return `answer-sheet-${studentId}-${timestamp}.${extension}`;
  }
}

// Export singleton instance
export const googleDriveService = new GoogleDriveService();

// Export types
export type { GoogleDriveFile, UploadProgress };