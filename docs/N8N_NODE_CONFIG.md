# N8N Firebase Node Configuration

## 🔧 Exact Configuration for Firebase Cloud Firestore Node

### Authentication Section
```
Authentication: Service Account
Service Account Key: [Upload the JSON file here]
```

### Operation Configuration
```
Resource: Document
Operation: Create or update a document
```

### Document Configuration
```
Project ID: storysprout-a1166
Database: (default)
Collection: n8nStories
Document ID: [Leave empty for auto-generated ID]
```

### Data Configuration
```json
{
  "studentName": "{{ $json.studentName }}",
  "grade": {{ $json.grade }},
  "storyTitle": "{{ $json.storyTitle }}",
  "storyBody": "{{ $json.storyBody }}",
  "vocabulary": {{ $json.vocabulary }},
  "imagePrompt": "{{ $json.imagePrompt }}",
  "quiz": {{ $json.quiz }},
  "recipientType": "{{ $json.recipientType }}",
  "recipientEmail": "{{ $json.recipientEmail }}",
  "subject": "{{ $json.subject }}",
  "status": "pending",
  "metadata": {
    "n8nWorkflowId": "{{ $workflow.id }}",
    "n8nExecutionId": "{{ $execution.id }}",
    "deliveryAttempts": 0,
    "createdAt": "{{ $now }}"
  }
}
```

## 🧪 Test Configuration (Use This First)

### Simple Test Data
```json
{
  "test": true,
  "message": "N8N connection test",
  "timestamp": "{{ $now }}",
  "workflowId": "{{ $workflow.id }}",
  "executionId": "{{ $execution.id }}"
}
```

## 📋 Step-by-Step Setup

1. **Add Firebase Node**: Drag "Firebase Cloud Firestore" to your workflow
2. **Configure Authentication**:
   - Select "Service Account"
   - Upload the JSON service account key file
3. **Set Resource**: Document
4. **Set Operation**: Create or update a document
5. **Enter Project ID**: `storysprout-a1166`
6. **Enter Collection**: `n8nStories`
7. **Leave Document ID empty** (for auto-generated unique ID)
8. **Add test data** (use the simple test configuration above)
9. **Save and Test**

## ✅ Success Indicators

- Node executes without errors
- Document appears in Firebase Console
- Document has auto-generated unique ID
- All data fields are properly stored

## 🚨 Common Mistakes to Avoid

1. **Wrong Project ID**: Must be exactly `storysprout-a1166`
2. **Wrong Collection Name**: Must be exactly `n8nStories`
3. **Invalid Service Account**: Must be Firebase Admin SDK key
4. **Missing Permissions**: Service account needs Firestore access
5. **Wrong Authentication Method**: Must use "Service Account" not OAuth
