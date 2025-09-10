# Firebase Setup Guide for StorySprout

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `storysprout` (or your preferred name)
4. Enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Authentication

1. In Firebase Console, go to **Authentication** > **Sign-in method**
2. Click on **Google** provider
3. Toggle **Enable**
4. Set **Project support email** to your email
5. Click **Save**

## Step 3: Create Firestore Database

1. Go to **Firestore Database**
2. Click **Create database**
3. Choose **Start in production mode**
4. Select a location (choose closest to your users)
5. Click **Done**

## Step 4: Set Up Firestore Security Rules

Replace the default rules with these:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Parents can read/write their own data
    match /parents/{parentId} {
      allow read, write: if request.auth != null && request.auth.uid == parentId;
    }
    
    // Parents can read/write their children's data
    match /children/{childId} {
      allow read, write: if request.auth != null && 
        get(/databases/$(database)/documents/parents/$(request.auth.uid)).data.children[childId] != null;
    }
    
    // Anyone can read stories and quizzes (public content)
    match /stories/{storyId} {
      allow read: if true;
      allow write: if false; // Only n8n workflow should write
    }
    
    match /quizzes/{quizId} {
      allow read: if true;
      allow write: if false; // Only n8n workflow should write
    }
    
    // Children can read/write their own quiz results
    match /quizResults/{resultId} {
      allow read, write: if request.auth != null && 
        resource.data.childId in get(/databases/$(database)/documents/parents/$(request.auth.uid)).data.children;
    }
    
    // Children can read/write their own reading activities
    match /readingActivities/{activityId} {
      allow read, write: if request.auth != null && 
        resource.data.childId in get(/databases/$(database)/documents/parents/$(request.auth.uid)).data.children;
    }
  }
}
```

## Step 5: Get Firebase Configuration

1. Go to **Project Settings** (gear icon)
2. Scroll down to **Your apps** section
3. Click **Web app** icon (`</>`)
4. Enter app nickname: `StorySprout Web`
5. Click **Register app**
6. Copy the configuration object

## Step 6: Update Application Configuration

Replace the placeholder values in `src/firebase/config.ts`:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-actual-sender-id",
  appId: "your-actual-app-id"
};
```

## Step 7: Test Authentication

1. Start the development server: `npm run dev`
2. Navigate to `http://localhost:5173`
3. Click "Parent Login"
4. Try signing in with Google
5. Verify you can access the parent dashboard

## Step 8: Set Up n8n Integration (Optional)

For production, you'll need to set up Firebase Functions to receive data from your n8n workflow:

1. Install Firebase Functions CLI:
```bash
npm install -g firebase-tools
firebase login
firebase init functions
```

2. Create a webhook function to receive story/quiz data from n8n
3. Deploy the function:
```bash
firebase deploy --only functions
```

## Step 9: Deploy to Firebase Hosting

1. Initialize Firebase Hosting:
```bash
firebase init hosting
```

2. Build and deploy:
```bash
npm run build
firebase deploy
```

## Troubleshooting

### Authentication Issues
- Make sure Google provider is enabled
- Check that your domain is added to authorized domains
- Verify Firebase config is correct

### Firestore Permission Errors
- Check security rules are properly configured
- Ensure user is authenticated before accessing protected data
- Verify parent-child relationships are properly set up

### Build Errors
- Make sure all dependencies are installed: `npm install`
- Check TypeScript errors: `npm run build`
- Verify all imports are correct

## Security Considerations

1. **Never commit Firebase config with real credentials to public repos**
2. **Use environment variables for sensitive data**
3. **Regularly review and update security rules**
4. **Monitor authentication logs for suspicious activity**
5. **Implement rate limiting for API calls**

## Next Steps

After completing this setup:
1. Test all authentication flows
2. Create test child profiles
3. Add sample stories and quizzes to Firestore
4. Test the complete user journey
5. Set up monitoring and analytics
6. Deploy to production
