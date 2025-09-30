# StorySphere Gemini Workflow Troubleshooting Guide

## 🔧 **Fixed Issues in Enhanced Workflow**

### **Problem 1: JSON Parsing Error**
**Error**: `Cannot read properties of undefined (reading '0')`

**Root Cause**: Your workflow uses **Google Gemini with LangChain agents**, but the parsing code expected **Anthropic Claude** response format.

**Solution**: Enhanced parsing code now handles multiple response formats:

```javascript
// Enhanced parsing logic that works with Gemini
let content;
if (response.output) {
  // LangChain agent response structure (YOUR CASE)
  content = response.output;
} else if (response.text) {
  // Direct text response
  content = response.text;
} else if (response.content && response.content[0] && response.content[0].text) {
  // Anthropic-style response structure
  content = response.content[0].text;
} else if (typeof response === 'string') {
  // String response
  content = response;
} else {
  // Fallback
  content = response.message || response.response || JSON.stringify(response);
}
```

### **Problem 2: Missing Fields in Firebase Nodes**
**Issue**: Your `Create Story Document` and `Finalize Story` nodes were missing required fields.

**Solution**: Added complete field configurations:

```json
{
  "fields": {
    "status": "generating",
    "createdAt": "={{ $now }}",
    "metadata": {
      "n8nWorkflowId": "story-generation-workflow",
      "n8nExecutionId": "={{ $execution.id }}"
    }
  }
}
```

### **Problem 3: Incomplete Firebase Storage Configuration**
**Issue**: `Upload to Firebase Storage` node was missing bucket name and file path.

**Solution**: Added complete configuration:

```json
{
  "operation": "upload",
  "bucketName": "storysprout-a1166.appspot.com",
  "fileName": "stories/{{ $('Create Story Document').first().json.id }}/scene-{{ $('Split Into Scenes').item.json.scene_number }}.jpg",
  "binaryPropertyName": "imageData"
}
```

---

## 🚀 **How to Apply the Fixes**

### **Option 1: Replace Your Current Workflow**
1. **Export** your current workflow (backup)
2. **Import** `StorySphere_Enhanced_Workflow.json`
3. **Test** the workflow

### **Option 2: Update Your Existing Workflow**
Update these specific nodes in your current workflow:

#### **1. Parse Idea JSON Node**
Replace the JavaScript code with:
```javascript
// Parse the JSON response from Idea Spark (Gemini/LangChain format)
const response = $input.first().json;

// Handle different response structures from Gemini agents
let content;
if (response.output) {
  // LangChain agent response structure
  content = response.output;
} else if (response.text) {
  // Direct text response
  content = response.text;
} else if (response.content && response.content[0] && response.content[0].text) {
  // Anthropic-style response structure
  content = response.content[0].text;
} else if (typeof response === 'string') {
  // String response
  content = response;
} else {
  // Try to find text in the response
  content = response.message || response.response || JSON.stringify(response);
}

// Clean up the content (remove markdown formatting, extra whitespace)
content = content.trim().replace(/^```json\s*/, '').replace(/\s*```$/, '');

try {
  const parsedContent = JSON.parse(content);
  return {
    json: parsedContent
  };
} catch (error) {
  throw new Error('Failed to parse JSON from Idea Spark: ' + error.message + '\nContent: ' + content.substring(0, 200) + '...');
}
```

#### **2. Parse Plot JSON Node**
Use the same enhanced parsing code as above.

#### **3. Split Into Scenes Node**
Replace the JavaScript code with:
```javascript
// Split the story into scenes for image generation
const response = $input.first().json;

// Handle different response structures from Gemini agents
let storyText;
if (response.output) {
  // LangChain agent response structure
  storyText = response.output;
} else if (response.text) {
  // Direct text response
  storyText = response.text;
} else if (response.content && response.content[0] && response.content[0].text) {
  // Anthropic-style response structure
  storyText = response.content[0].text;
} else if (typeof response === 'string') {
  // String response
  storyText = response;
} else {
  // Try to find text in the response
  storyText = response.message || response.response || JSON.stringify(response);
}

const plotData = $('Parse Plot JSON').first().json;

// Split story into paragraphs
const paragraphs = storyText.split('\n\n').filter(p => p.trim().length > 0);

// Create scenes based on plot points
const scenes = [];
const plotPoints = plotData.plot_points || [];

for (let i = 0; i < Math.min(paragraphs.length, plotPoints.length); i++) {
  scenes.push({
    scene_number: i + 1,
    scene_title: plotPoints[i]?.title || `Scene ${i + 1}`,
    scene_text: paragraphs[i].trim(),
    story_title: plotData.title,
    characters: plotData.characters
  });
}

return scenes.map(scene => ({ json: scene }));
```

#### **4. Aggregate Results Node**
Replace the JavaScript code with:
```javascript
// Aggregate all image URLs after the loop
const allScenes = $input.all();
const imageUrls = allScenes.map(scene => {
  const storageData = scene.json;
  return `https://firebasestorage.googleapis.com/v0/b/${storageData.bucket}/o/${encodeURIComponent(storageData.name)}?alt=media`;
});

const storyData = $('Parse Plot JSON').first().json;
const narrativeResponse = $('Narrative Weaver').first().json;

// Handle different response structures from Gemini agents
let storyText;
if (narrativeResponse.output) {
  // LangChain agent response structure
  storyText = narrativeResponse.output;
} else if (narrativeResponse.text) {
  // Direct text response
  storyText = narrativeResponse.text;
} else if (narrativeResponse.content && narrativeResponse.content[0] && narrativeResponse.content[0].text) {
  // Anthropic-style response structure
  storyText = narrativeResponse.content[0].text;
} else if (typeof narrativeResponse === 'string') {
  // String response
  storyText = narrativeResponse;
} else {
  // Try to find text in the response
  storyText = narrativeResponse.message || narrativeResponse.response || JSON.stringify(narrativeResponse);
}

return {
  json: {
    imageUrls: imageUrls,
    storyTitle: storyData.title,
    storyText: storyText,
    plotData: storyData,
    sceneCount: imageUrls.length
  }
};
```

#### **5. Update Firebase Nodes**
Add the missing fields to your Firebase nodes:

**Create Story Document** - Add:
```json
{
  "fields": {
    "status": "generating",
    "createdAt": "={{ $now }}",
    "metadata": {
      "n8nWorkflowId": "story-generation-workflow",
      "n8nExecutionId": "={{ $execution.id }}"
    }
  }
}
```

**Upload to Firebase Storage** - Add:
```json
{
  "bucketName": "storysprout-a1166.appspot.com",
  "fileName": "stories/{{ $('Create Story Document').first().json.id }}/scene-{{ $('Split Into Scenes').item.json.scene_number }}.jpg"
}
```

---

## 🧪 **Testing the Fixed Workflow**

### **1. Manual Test Run**
1. **Save** your workflow
2. Click **"Test workflow"**
3. Watch each node execute
4. Check for errors in the execution log

### **2. Verify Output**
1. **Check Firestore**: Look for new documents in `n8nStories` collection
2. **Check Firebase Storage**: Verify images are uploaded
3. **Check Story Quality**: Review the generated story content

### **3. Debug Mode**
If you still get errors:
1. **Enable debug mode** in n8n settings
2. **Add console.log()** statements to see what data each node receives
3. **Check the execution logs** for detailed error messages

---

## 🎯 **Expected Behavior After Fixes**

✅ **Idea Spark** generates JSON with story concept  
✅ **Parse Idea JSON** successfully parses the response  
✅ **Plot Architect** creates structured plot outline  
✅ **Parse Plot JSON** successfully parses the response  
✅ **Narrative Weaver** writes complete story  
✅ **Split Into Scenes** divides story into scenes  
✅ **Image Generation** creates illustrations for each scene  
✅ **Firebase Storage** uploads images successfully  
✅ **Finalize Story** updates Firestore with complete story  

---

## 💡 **Key Differences: Gemini vs Anthropic**

| Aspect | Your Setup (Gemini) | Original (Anthropic) |
|--------|-------------------|-------------------|
| **API** | Google Gemini 2.5 Pro | Claude 3 Haiku/Sonnet |
| **Integration** | LangChain Agents | Direct HTTP Requests |
| **Response Format** | `response.output` | `response.content[0].text` |
| **Credentials** | Google PaLM API | Anthropic API |
| **Cost** | Lower per request | Higher per request |

The enhanced workflow handles both formats automatically! 🚀
