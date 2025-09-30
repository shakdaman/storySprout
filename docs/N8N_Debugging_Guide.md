# N8N Workflow Debugging Guide

## 🐛 Common Issues & Solutions

### Issue 1: JSON Parsing Errors

**Error**: `Cannot read properties of undefined (reading '0')`

**Cause**: The response structure from Anthropic API varies based on the model and request format.

**Solution**: I've updated the workflow to handle multiple response structures:

```javascript
// Handle different response structures
let content;
if (response.content && response.content[0] && response.content[0].text) {
  // Anthropic API response structure
  content = response.content[0].text;
} else if (response.text) {
  // Direct text response
  content = response.text;
} else if (typeof response === 'string') {
  // String response
  content = response;
} else {
  // Try to find text in the response
  content = response.message || response.response || JSON.stringify(response);
}
```

### Issue 2: API Response Structure Debugging

**To debug the actual response structure:**

1. **Add a debug node** before the parse JSON node
2. **Use this code** to see what you're getting:

```javascript
const response = $input.first().json;
console.log('Response structure:', JSON.stringify(response, null, 2));
return { json: response };
```

3. **Check the execution logs** in n8n to see the actual structure

### Issue 3: Anthropic API Response Formats

**Different Anthropic models return different structures:**

- **Claude 3 Haiku**: Usually `{ content: [{ text: "..." }] }`
- **Claude 3.5 Sonnet**: May return direct text or structured format
- **Different API versions**: Response format can vary

### Issue 4: Testing Individual Nodes

**To test each agent individually:**

1. **Start with Idea Spark**:
   - Run just the first 3 nodes (Schedule → Create Document → Idea Spark)
   - Check the response structure
   - Debug if needed

2. **Test Plot Architect**:
   - Run nodes 1-5 (up to Parse Plot JSON)
   - Verify JSON parsing works

3. **Test Narrative Weaver**:
   - Run nodes 1-7 (up to Split Into Scenes)
   - Check story text extraction

### Issue 5: Firebase Connection Issues

**Common Firebase errors:**

- **"Permission denied"**: Check Firestore security rules
- **"Project not found"**: Verify project ID is `storysprout-a1166`
- **"Authentication failed"**: Re-upload service account JSON

### Issue 6: Image Generation Issues

**fal.ai common problems:**

- **"Invalid API key"**: Check fal.ai API key format
- **"Quota exceeded"**: Check billing status
- **"Model not available"**: Verify model name is correct

## 🔧 Debugging Steps

### Step 1: Check Response Structure
Add this debug code to any node to see what you're getting:

```javascript
const input = $input.first().json;
console.log('Input received:', JSON.stringify(input, null, 2));
return { json: input };
```

### Step 2: Test API Calls Individually
1. Create a simple HTTP Request node
2. Test each API (Anthropic, fal.ai) separately
3. Verify credentials work
4. Check response format

### Step 3: Validate JSON Structure
Use this code to validate JSON before parsing:

```javascript
try {
  const response = $input.first().json;
  const content = response.content[0].text;
  
  // Validate JSON structure
  if (!content || typeof content !== 'string') {
    throw new Error('Invalid content structure');
  }
  
  const parsed = JSON.parse(content);
  console.log('Parsed successfully:', parsed);
  return { json: parsed };
  
} catch (error) {
  console.error('Parse error:', error);
  console.error('Raw content:', content);
  throw error;
}
```

## 🚀 Quick Fixes

### Fix 1: Update Workflow
I've already updated the workflow JSON with robust error handling. Re-import the updated file.

### Fix 2: Add Error Handling
Add try-catch blocks around all JSON parsing operations.

### Fix 3: Use Debug Mode
Enable debug mode in n8n settings to see detailed execution logs.

### Fix 4: Test Credentials
Verify all API credentials are working by testing them individually.

## 📞 Next Steps

1. **Re-import the updated workflow** from `StorySphere_Complete_Workflow.json`
2. **Test the workflow step by step**
3. **Check execution logs** for any remaining issues
4. **Verify all credentials** are properly configured

The updated workflow should now handle various response structures and provide better error messages!
