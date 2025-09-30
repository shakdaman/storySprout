# Fal.ai Credentials Fix Guide

## 🚨 **Problem Identified**
**Error**: "Authorization failed - please check your credentials"  
**Cause**: API key not being sent correctly in the request headers

## 🔧 **How to Fix Fal.ai Credentials in n8n**

### **Step 1: Create/Update Fal.ai Credential**

1. **Go to Settings** → **Credentials** in n8n
2. **Find or create** "Fal.ai" credential
3. **Set up the credential** with these settings:

#### **Credential Configuration:**
- **Credential Type**: `Header Auth`
- **Header Name**: `Authorization` 
- **Header Value**: `Key YOUR_FAL_AI_API_KEY`

**Important**: The header value must be exactly `Key ` (with a space) followed by your API key.

### **Step 2: Alternative - Use Generic Credential**

If the above doesn't work, try this approach:

1. **Create a new credential**:
   - **Type**: `Generic Credential Type`
   - **Name**: `Fal.ai API Key`

2. **Configure as Header Auth**:
   - **Generic Auth Type**: `Header Auth`
   - **Header Name**: `Authorization`
   - **Header Value**: `Key YOUR_FAL_AI_API_KEY`

### **Step 3: Get Your API Key from fal.ai**

1. **Go to** https://fal.ai/dashboard
2. **Navigate to** API Keys section
3. **Copy your API key** (it should look like: `fal_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)

### **Step 4: Update Your Workflow Node**

In your "Generate Image" node, make sure:

1. **Authentication**: Set to your Fal.ai credential
2. **Headers**: Should include:
   ```
   Authorization: Key fal_your_actual_api_key_here
   Content-Type: application/json
   ```

## 🎯 **Common Issues & Solutions**

### **Issue 1: Wrong Header Format**
❌ **Wrong**: `fal_your_key_here`  
✅ **Correct**: `Key fal_your_key_here`

### **Issue 2: Missing Space**
❌ **Wrong**: `Keyfal_your_key_here`  
✅ **Correct**: `Key fal_your_key_here`

### **Issue 3: Wrong Header Name**
❌ **Wrong**: `API-Key` or `X-API-Key`  
✅ **Correct**: `Authorization`

### **Issue 4: API Key Expired/Invalid**
- Check your fal.ai dashboard for active API keys
- Ensure you have credits/balance in your fal.ai account
- Verify the API key is for the correct environment (production vs development)

## 🧪 **Testing Your Credentials**

### **Manual Test:**
1. **Use the fal.ai playground** (as shown in your screenshot)
2. **Generate an image** to verify your API key works
3. **Check your account balance** and usage

### **API Test:**
You can test your API key directly with curl:

```bash
curl -X POST https://queue.fal.run/fal-ai/nano-banana \
  -H "Authorization: Key YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "A simple test image",
    "num_images": 1,
    "output_format": "jpeg"
  }'
```

## 🚀 **Expected Result**

After fixing the credentials:
- ✅ Node executes successfully
- ✅ fal.ai accepts the request
- ✅ Image generation proceeds
- ✅ Returns image URL for download

## 📋 **Checklist**

- [ ] API key is valid and active
- [ ] Header name is `Authorization`
- [ ] Header value starts with `Key ` (space included)
- [ ] Content-Type is `application/json`
- [ ] Method is `POST`
- [ ] Account has sufficient credits

This should resolve the authorization issue and allow your image generation to work properly! 🎨
