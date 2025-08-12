# MathAce Test Series - Class 10 CBSE Mathematics

A comprehensive online/offline test series platform for Class 10 CBSE Mathematics with Google Drive integration for question paper downloads and answer sheet uploads.

## Features

### 🎯 Test Modes
- **Online Tests**: Download question papers and upload answer sheets
- **Offline Tests**: Traditional classroom experience
- Weekend tests every Saturday & Sunday (7-10 AM)

### 📊 Analytics & Tracking
- Student performance dashboard
- Chapter-wise score analysis
- Progress tracking with visual charts
- Admin dashboard with comprehensive analytics

### 🔧 Google Drive Integration
- Secure OAuth 2.0 authentication
- Direct question paper downloads from Google Drive
- Automatic answer sheet uploads to designated folder
- File validation and progress tracking

### 📚 CBSE Aligned Content
- Complete chapter-wise question blueprint
- Board exam pattern simulation
- 100 marks test in 3 hours format

## Setup Instructions

### 1. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Google Drive API Configuration
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
VITE_GOOGLE_API_KEY=your_google_api_key_here

# Google Drive File and Folder IDs
VITE_QUESTION_PAPER_FILE_ID=1PgL8gO8NnDBiOLsMv04a33MXBGjx8vr1
VITE_ANSWER_SHEETS_FOLDER_ID=160Zrx0s0GHJ5UPEMbqm17_8zObsMI5ug
```

### 2. Google Cloud Console Setup

#### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project: "MathAce Test Series"
3. Note down your project ID

#### Step 2: Enable Google Drive API
1. Navigate to "APIs & Services" > "Library"
2. Search for "Google Drive API"
3. Click "Enable"

#### Step 3: Create OAuth 2.0 Credentials
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Choose "Web application"
4. Add authorized JavaScript origins:
   - `http://localhost:5173` (for development)
   - `https://yourdomain.com` (for production)
5. Copy the Client ID to your `.env.local` file

#### Step 4: Create API Key
1. In "Credentials", click "Create Credentials" > "API key"
2. Restrict the key to Google Drive API
3. Copy the API key to your `.env.local` file

### 3. Google Drive Setup

#### Question Papers Folder
1. Upload your question papers to Google Drive
2. Get the file ID from the sharing URL
3. Update `VITE_QUESTION_PAPER_FILE_ID` in `.env.local`

#### Answer Sheets Folder
1. Create a folder in Google Drive for answer sheets
2. Get the folder ID from the URL
3. Update `VITE_ANSWER_SHEETS_FOLDER_ID` in `.env.local`
4. Set folder permissions to allow uploads

### 4. Installation & Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## File Structure

```
src/
├── components/
│   ├── AdminDashboard.tsx          # Admin analytics dashboard
│   ├── StudentDashboard.tsx        # Student progress tracking
│   ├── OnlineTestInterface.tsx     # Online test interface
│   ├── GoogleDriveAuth.tsx         # Google authentication
│   ├── QuestionPaperDownload.tsx   # Download component
│   ├── AnswerSheetUpload.tsx       # Upload component
│   └── SEOHead.tsx                 # SEO optimization
├── utils/
│   └── googleDriveApi.ts           # Google Drive API service
└── App.tsx                         # Main application
```

## Google Drive API Features

### Authentication
- OAuth 2.0 flow with Google
- Secure token management
- Auto-refresh capabilities

### File Operations
- **Download**: Direct file download from Google Drive
- **Upload**: Multipart upload with progress tracking
- **Validation**: File type and size validation
- **Naming**: Automatic filename generation with timestamps

### Error Handling
- Network error recovery
- Permission error handling
- User-friendly error messages
- Retry mechanisms

## Security Features

- No hardcoded secrets in frontend
- Secure OAuth 2.0 implementation
- File validation and sanitization
- CORS-compliant requests
- Environment-based configuration

## Testing Guidelines

### 1. Authentication Testing
- Test sign-in/sign-out flow
- Verify token refresh
- Check permission scopes

### 2. Download Testing
- Test with different file types (PDF, DOC, images)
- Verify file integrity after download
- Test error scenarios (invalid file ID, no permissions)

### 3. Upload Testing
- Test file validation (size, type)
- Verify upload progress tracking
- Test large file uploads
- Check folder permissions

### 4. Browser Compatibility
- Chrome, Firefox, Safari, Edge
- Mobile browsers
- Different screen sizes

## Production Deployment

1. Update environment variables for production
2. Configure authorized domains in Google Cloud Console
3. Set up proper CORS policies
4. Enable HTTPS for secure authentication
5. Monitor API quotas and usage

## Support

For technical issues:
1. Check browser console for errors
2. Verify Google Cloud Console configuration
3. Ensure proper file permissions in Google Drive
4. Check API quotas and limits

## License

© 2025 MathAce Test Series. All rights reserved.
