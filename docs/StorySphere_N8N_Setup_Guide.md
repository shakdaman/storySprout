# StorySphere N8N Workflow Setup Guide

## 🚀 Complete Setup Instructions

This guide will walk you through setting up the complete StorySphere automated story generation workflow in n8n.

---

## 📋 Prerequisites

### 1. N8N Instance
- **Self-hosted n8n** (recommended for full control)
- **n8n Cloud** (easier setup, subscription required)
- **Version**: n8n 1.0+ (latest version recommended)

### 2. API Credentials Required
- **Anthropic API Key** (for Claude 3 Haiku & Sonnet)
- **fal.ai API Key** (for image generation)
- **Firebase Service Account** (for Firestore & Storage)

### 3. Firebase Setup
- **Project**: `storysprout-a1166` (already configured)
- **Collections**: `n8nStories` (already created)
- **Storage**: Firebase Cloud Storage enabled

---

## 🔧 Step-by-Step Setup

### Step 1: Import the Workflow

1. **Download the workflow file**:
   - File: `docs/StorySphere_Complete_Workflow.json`
   - This contains the complete multi-agent workflow

2. **Import into n8n**:
   - Open your n8n instance
   - Click **"Import from file"**
   - Select `StorySphere_Complete_Workflow.json`
   - Click **"Import"**

3. **Verify import**:
   - You should see 13 nodes connected in sequence
   - Workflow name: "StorySphere - Automated Story Generation Engine"

### Step 2: Configure API Credentials

#### 2.1 Anthropic API Credential
1. Go to **Settings** → **Credentials**
2. Click **"Add Credential"**
3. Select **"Anthropic API"**
4. **Name**: `Anthropic API`
5. **API Key**: Your Anthropic API key
6. **Test** and **Save**

#### 2.2 fal.ai API Credential
1. Go to **Settings** → **Credentials**
2. Click **"Add Credential"**
3. Select **"HTTP Request Auth"** → **"Header Auth"**
4. **Name**: `falAiApi`
5. **Header Name**: `Authorization`
6. **Header Value**: `Key YOUR_FAL_AI_API_KEY`
7. **Test** and **Save**

#### 2.3 Firebase Service Account Credential
1. Go to **Settings** → **Credentials**
2. Click **"Add Credential"**
3. Select **"Google Service Account"**
4. **Name**: `Firebase Service Account`
5. **Upload** your Firebase service account JSON file
6. **Test** and **Save**

### Step 3: Configure Individual Nodes

#### 3.1 Schedule Trigger
- **Node**: "Daily Story Generation"
- **Schedule**: Already set to 8:00 AM daily
- **No changes needed**

#### 3.2 Firebase Nodes
- **Node**: "Create Story Document"
- **Credential**: Select "Firebase Service Account"
- **Collection**: `n8nStories` (already set)
- **Project ID**: `storysprout-a1166`

- **Node**: "Finalize Story"
- **Credential**: Select "Firebase Service Account"
- **Collection**: `n8nStories`
- **Project ID**: `storysprout-a1166`

#### 3.3 AI Agent Nodes
- **Node**: "Agent 0: Idea Spark"
- **Credential**: Select "Anthropic API"
- **Model**: `claude-3-haiku-20240307`

- **Node**: "Agent 1: Plot Architect"
- **Credential**: Select "Anthropic API"
- **Model**: `claude-3-haiku-20240307`

- **Node**: "Agent 2: Narrative Weaver"
- **Credential**: Select "Anthropic API"
- **Model**: `claude-3-5-sonnet-20241022`

#### 3.4 Image Generation Node
- **Node**: "Generate Image"
- **Credential**: Select "falAiApi"
- **URL**: `https://queue.fal.run/fal-ai/nano-banana`

#### 3.5 Firebase Storage Node
- **Node**: "Upload to Firebase Storage"
- **Credential**: Select "Firebase Service Account"
- **Bucket**: `storysprout-a1166.appspot.com`

### Step 4: Test the Workflow

#### 4.1 Manual Test Run
1. **Save** the workflow
2. Click **"Test workflow"**
3. Watch the execution in real-time
4. Check for any errors

#### 4.2 Verify Output
1. Check **Firestore Console**: https://console.firebase.google.com/project/storysprout-a1166/firestore/data
2. Look for new documents in `n8nStories` collection
3. Verify status is `pending_review`
4. Check Firebase Storage for uploaded images

---

## 🎯 Workflow Overview

### Node Flow:
1. **Schedule Trigger** → Runs daily at 8 AM
2. **Create Story Document** → Initializes new story in Firestore
3. **Agent 0: Idea Spark** → Generates story concept and moral
4. **Parse Idea JSON** → Validates and parses JSON response
5. **Agent 1: Plot Architect** → Creates structured plot outline
6. **Parse Plot JSON** → Validates and parses JSON response
7. **Agent 2: Narrative Weaver** → Writes complete story prose
8. **Split Into Scenes** → Divides story into scenes for images
9. **Generate Image** → Creates illustration for each scene
10. **Download Image** → Downloads generated image
11. **Upload to Firebase Storage** → Stores image permanently
12. **Aggregate Results** → Combines all data
13. **Finalize Story** → Updates Firestore with complete story

### Character Consistency:
- **Angel**: 12-year-old with curly black hair and red hoodie
- **Jayson**: 10-year-old with brown hair, glasses, and blue t-shirt
- Character descriptions are injected into every image prompt

---

## 🔍 Troubleshooting

### Common Issues:

#### 1. "Failed to parse JSON"
- **Cause**: AI returned malformed JSON
- **Solution**: Check agent prompts, add error handling

#### 2. "Firebase authentication failed"
- **Cause**: Incorrect service account credentials
- **Solution**: Re-upload service account JSON file

#### 3. "Image generation failed"
- **Cause**: Invalid fal.ai API key or quota exceeded
- **Solution**: Check API key and billing status

#### 4. "Storage upload failed"
- **Cause**: Firebase Storage not enabled or wrong bucket
- **Solution**: Enable Storage and verify bucket name

### Debug Mode:
1. **Enable debug mode** in n8n settings
2. **Check execution logs** for detailed error messages
3. **Test individual nodes** to isolate issues

---

## 📊 Expected Output

### Story Document Structure:
```json
{
  "id": "2025-01-12-080000-story",
  "studentName": "Angel",
  "grade": 6,
  "storyTitle": "The Mysterious Compass",
  "storyBody": "Complete story text...",
  "imageUrls": [
    "https://firebasestorage.googleapis.com/v0/b/storysprout-a1166.appspot.com/o/stories%2F2025-01-12-080000-story%2Fscene-1.jpg?alt=media",
    "https://firebasestorage.googleapis.com/v0/b/storysprout-a1166.appspot.com/o/stories%2F2025-01-12-080000-story%2Fscene-2.jpg?alt=media"
  ],
  "status": "pending_review",
  "createdAt": "2025-01-12T08:00:00Z",
  "processedAt": "2025-01-12T08:05:00Z",
  "metadata": {
    "n8nWorkflowId": "story-generation-workflow",
    "n8nExecutionId": "exec-12345",
    "sceneCount": 5
  }
}
```

---

## 🎉 Success Indicators

✅ **Workflow executes without errors**  
✅ **Story document created in Firestore**  
✅ **Images uploaded to Firebase Storage**  
✅ **Status set to `pending_review`**  
✅ **All metadata properly stored**  

---

## 🚀 Next Steps

After successful setup:
1. **Monitor daily executions**
2. **Review generated stories** in Firebase Console
3. **Implement parental approval system** in StorySprout app
4. **Test with Angel & Jayson** for feedback
5. **Optimize prompts** based on story quality

---

## 💰 Cost Estimation

**Per Story Generation:**
- **Claude 3 Haiku** (Idea + Plot): ~$0.002
- **Claude 3.5 Sonnet** (Narrative): ~$0.03
- **fal.ai Images** (5 scenes): ~$0.20
- **Total per story**: ~$0.23

**Monthly (30 stories):** ~$7.00

This is highly cost-effective for personalized, illustrated stories!
