import React, { useState, useEffect } from 'react';
import { LogIn, LogOut, User, AlertCircle } from 'lucide-react';
import { googleDriveService } from '../utils/googleDriveApi';

interface GoogleDriveAuthProps {
  onAuthChange?: (isSignedIn: boolean) => void;
}

export default function GoogleDriveAuth({ onAuthChange }: GoogleDriveAuthProps) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      setIsLoading(true);
      await googleDriveService.initialize();
      const signedIn = googleDriveService.isUserSignedIn();
      setIsSignedIn(signedIn);
      
      if (signedIn) {
        // Get user info if signed in
        try {
          const authInstance = (window as any).gapi.auth2.getAuthInstance();
          const user = authInstance.currentUser.get();
          const profile = user.getBasicProfile();
          setUserEmail(profile.getEmail());
        } catch (err) {
          console.warn('Could not get user profile:', err);
        }
      }
      
      onAuthChange?.(signedIn);
    } catch (err) {
      setError('Failed to initialize Google Drive. Please refresh the page.');
      console.error('Auth initialization error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await googleDriveService.signIn();
      setIsSignedIn(true);
      
      // Get user info
      const authInstance = (window as any).gapi.auth2.getAuthInstance();
      const user = authInstance.currentUser.get();
      const profile = user.getBasicProfile();
      setUserEmail(profile.getEmail());
      
      onAuthChange?.(true);
    } catch (err) {
      setError('Failed to sign in. Please try again.');
      console.error('Sign in error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await googleDriveService.signOut();
      setIsSignedIn(false);
      setUserEmail(null);
      onAuthChange?.(false);
    } catch (err) {
      setError('Failed to sign out. Please try again.');
      console.error('Sign out error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <span className="text-red-800">{error}</span>
        </div>
        <button
          onClick={() => {
            setError(null);
            initializeAuth();
          }}
          className="mt-2 text-red-600 hover:text-red-800 underline"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${isSignedIn ? 'bg-green-500' : 'bg-gray-400'}`}></div>
          <div>
            <p className="font-medium text-gray-900">
              {isSignedIn ? 'Connected to Google Drive' : 'Google Drive Access'}
            </p>
            {userEmail && (
              <p className="text-sm text-gray-600 flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{userEmail}</span>
              </p>
            )}
          </div>
        </div>
        
        <button
          onClick={isSignedIn ? handleSignOut : handleSignIn}
          disabled={isLoading}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            isSignedIn
              ? 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
          ) : isSignedIn ? (
            <LogOut className="h-4 w-4" />
          ) : (
            <LogIn className="h-4 w-4" />
          )}
          <span>{isLoading ? 'Loading...' : isSignedIn ? 'Sign Out' : 'Sign In'}</span>
        </button>
      </div>
    </div>
  );
}