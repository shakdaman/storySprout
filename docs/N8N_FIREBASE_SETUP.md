# N8N Firebase Authentication Setup Guide

## 🚨 Current Error
```
"secretOrPrivateKey must be an asymmetric key when using RS256"
```

This error occurs because n8n needs a proper Firebase service account key with RSA private key for JWT authentication.

## 🔧 Solution: Create Service Account for N8N

### Step 1: Access Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **storysprout-a1166**
3. Navigate to **Project Settings** (gear icon)
4. Go to **Service Accounts** tab

### Step 2: Generate New Service Account Key
1. Click **"Generate new private key"**
2. Click **"Generate key"** in the confirmation dialog
3. **Important**: Choose **"Firebase Admin SDK"** (not just "Service Account")
4. Download the JSON file (it will be named something like `storysprout-a1166-firebase-adminsdk-xxxxx.json`)

### Step 3: Configure N8N Firebase Node

#### Option A: Upload Service Account Key File
1. In your n8n workflow, select the **Firebase Cloud Firestore** node
2. In **Authentication** section, select **"Service Account"**
3. Click **"Upload"** and select the downloaded JSON file
4. The file should contain:
   ```json
   {
     "type": "service_account",
     "project_id": "storysprout-a1166",
     "private_key_id": "...",
     "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
     "client_email": "firebase-adminsdk-xxxxx@storysprout-a1166.iam.gserviceaccount.com",
     "client_id": "...",
     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
     "token_uri": "https://oauth2.googleapis.com/token",
     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
     "client_x509_cert_url": "..."
   }
   ```

#### Option B: Manual Configuration (Alternative)
If file upload doesn't work, you can manually configure:

1. **Project ID**: `storysprout-a1166`
2. **Client Email**: Copy from the JSON file (the `client_email` field)
3. **Private Key**: Copy the entire `private_key` field including the `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` lines

### Step 4: Test the Connection
1. Save your n8n workflow
2. Test the Firebase node with a simple operation:
   - **Operation**: "Create or update a document"
   - **Collection**: `n8nStories`
   - **Document ID**: `test-document-{{ $now }}`
   - **Data**: 
     ```json
     {
       "test": true,
       "timestamp": "{{ $now }}",
       "message": "N8N connection test"
     }
     ```

## 🔍 Troubleshooting

### Common Issues:

#### 1. "Invalid private key format"
- **Solution**: Make sure the private key includes the full PEM format with `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`

#### 2. "Project not found"
- **Solution**: Verify the project ID is exactly `storysprout-a1166`

#### 3. "Permission denied"
- **Solution**: The service account needs Firestore permissions:
  1. Go to [Google Cloud Console](https://console.cloud.google.com/)
  2. Select project `storysprout-a1166`
  3. Go to **IAM & Admin** > **IAM**
  4. Find your service account
  5. Add role: **"Cloud Datastore User"** or **"Firebase Admin"**

### Expected Service Account Permissions:
- `Cloud Datastore User` (for Firestore read/write)
- `Firebase Admin` (for full Firebase access)

## 📋 N8N Node Configuration Summary

```
Node: Firebase Cloud Firestore
├── Authentication: Service Account
├── Project ID: storysprout-a1166
├── Collection: n8nStories
├── Operation: Create or update a document
└── Document ID: [auto-generated or custom]
```

## ✅ Verification Steps

1. **Test Document Creation**: Create a test document in the `n8nStories` collection
2. **Check Firestore Console**: Verify the document appears in [Firebase Console](https://console.firebase.google.com/project/storysprout-a1166/firestore/data)
3. **Check N8N Logs**: Look for successful execution without errors

## 🚀 Ready for Production

Once the test works, you can configure your n8n workflow to:
1. **Create documents** in `n8nStories` collection
2. **Use unique IDs** (let Firestore auto-generate or use custom IDs)
3. **Include metadata** like `n8nWorkflowId`, `n8nExecutionId`, etc.
4. **Set status** to `pending` for processing

---

**Need Help?** If you're still getting errors, check:
1. Service account JSON file format
2. Firebase project permissions
3. N8N node configuration
4. Network connectivity from n8n to Firebase
