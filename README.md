# PandaDoc API
JS Wrapper for PandaDoc API

# Installation 
```javascript
yarn add panda_api_js
```

# Capabilities 
 
 ## Get Bearer Token
 1. Visit PandaDoc Developers Portal (https://developers.pandadoc.com/)
 2. Visit "My Applications" Tab 
 3. Create PandaDoc Application (Application Name, Application Author, Redirect URI)
 4. Upon completion, you will receive a Client ID and Client Secret
 5. Install panda_api package and instantiate the class 
```javascript 
var panda = new PandaDoc("", "")
```
 6. Get Code 
 
 ```javascript
 panda.getCode({ 
   client_id: <YOUR_CLIENT_ID>,
   client_secret: <YOUR_CLIENT_SECRET>,
   redirect_uri: <YOUR_REDIRECT_URI>,
   grant_type: "authorization_code",
   scope: "read+write"
 })
 ```
 7. A browser tab will launch. If you are signed into PandaDoc, you authorize PandaDoc 
 8. You will be redirected to your redirect_uri, with your code appended to the URL 
 ```
 https://myredirecturi.com/?state=&code=<YOUR_CODE_TO_PASTE>
 ```
 9. Copy the code. You are prompted to paste the code into your prompt
 10. Your access token will be returned to you
 ```javascript
 {"access_token"=>"<YOUR_ACCESS_TOKEN>",
 "token_type"=>"Bearer",
 "expires_in"=>31535999,
 "scope"=>"read write read+write",
 "refresh_token"=>"<YOUR_REFRESH_TOKEN>”}
 ```
 
 ## Instantiate with API Key
 1. Get API Key from Integrations Page on PandaDoc 
 2. Instantiate new PandaDoc class instance 
 ```javascript
 var panda = new PandaDoc(<YOUR_API_KEY>, "api")
 ```
 3. You're Ready to go!
 
 ## Refresh Oauth Token
 ```javascript 
 var panda = new PandaDoc(<YOUR_BEARER_TOKEN>, "bearer")
 
 refresh_token = panda.refreshAccessToken({
  client_id: <YOUR_CLIENT_ID>,
  client_secret: <YOUR_CLIENT_SECRET>,
  // your REFRESH TOKEN, NOT Access Token 
  refresh_token: <YOUR_REFRESH_TOKEN>,
  scope: <read, write, read+write>
 }).then(r => console.log(r))
 ```
 
 ## Instance Methods 
 (https://developers.pandadoc.com/reference)
 ```javascript
 var panda = new PandaDoc(<YOUR_KEY>, <YOUR_KEY_TYPE>)
 
 // Documents Index (GET)
 panda.listDocuments({ <YOUR_PARAMS> }).then(r => console.log(r))
 
 // Templates Index (GET)
 panda.listTemplates({ <YOUR_PARAMS> }).then(r => console.log(r))
 
 // Document Details (GET)
 // Document ID Required
 panda.documentDetails({ <YOUR_PARAMS> }).then(r => console.log(r))
 
 // Document Status (GET)
 // Document ID Required
 panda.documentStatus({ <YOUR_PARAMS> }) .then(r => console.log(r))
 
 // Template Details (GET)
 // Template ID Required
 panda.templateDetails({ YOUR_PARAMS }).then(r => console.log(r))
 
 // Create Document (PDF) (POST)
   var newDoc = panda.createDocumentFromPdf(
    # Valid File: File {<YOUR_FILE>} || params.files[0]
    file: <file_to_send>,
    name: "New PandaDoc Document from PDF",
    recipients: [ { email: "matt@example.com",first_name: "Matt",last_name: "sample",role: "u00"}],
    fields: <YOUR_FIELDS>,
    metadata: <YOUR_META>,
    parse_form_fields: false
  ).then(r => console.log(r))
 
 // Create Document (Template) (POST)
   var newDoc = panda.createDocumentFromTemplate({
    name: "New Doc From Template",
    template_uuid: "<YOUR_TEMPLATE_ID>",
    recipients: [{ first_name: "Balton", last_name: "Reign", email: "client@gmail.com" }],
    tokens: [{ name: "Client.FirstName", value: "Percy" }, { name: "Client.LastName", value: "Johnson" }],
    fields: <YOUR_FIELDS>,
    metadata: <YOUR_META>
  }).then(r => console.log(r))
  
  // Send Document (POST)
  panda.sendDocument({ id: <YOUR_DOC_ID>, message: <YOUR_MESSAGE>, subject: <YOUR_SUBJECT>, silent: true || false }).then(r => console.log(r))
  
  // Create Document Session ID (POST)
  panda.createDocumentLink({ id: <YOUR_DOC_ID>, recipient: <YOUR_RECIPIENT_EMAIL>, lifetime: 3600 }).then(r => console.log(r))
  
  // Download Document (GET)
  panda.downloadDocument({ id: <YOUR_DOC_ID> }).then(r => console.log(r))
  
  // Download Protected Document (GET)
  panda.downloadProtectedDocument({ id: <YOUR_DOC_ID> }).then(r => console.log(r))
  
  // Delete Document (DELETE)
  panda.deleteDocument({ id: <YOUR_DOC_ID> }).then(r => console.log(r))
  
  // Delete Template (DELETE)
  panda.deleteTemplate({ id: <YOUR_TEMP_ID> }).then(r => console.log(r))
  
  // Create Document Folder (POST)
  panda.createDocumentFolder({ name: "<YOUR_NEW_FOLDER_NAME>" }).then(r => console.log(r))
  
  // Create Template Folder (POST)
  panda.createTemplateFolder({ name: "<YOUR_NEW_FOLDER_NAME>" }).then(r => console.log(r))
  
  // List Template Folders (POST)
  panda.listTemplateFolders({ <YOUR_PARAMS> }).then(r => console.log(r))
  
  // List Document Folders (POST)
  panda.listDocumentFolders({ <YOUR_PARAMS> }).then(r => console.log(r))
  
  // Update Document Folder Name (PUT)
  panda.updateDocumentFolder({ <YOUR_PARAMS> }).then(r => console.log(r))
  
  // Update Template Folder Name (PUT)
  panda_doc_api.updateTemplateFolder({ YOUR_PARAMS }).then(r => console.log(r))
 ```
 
 # Questions / Concerns 
 Please reach out directly to the author, matt.deatherage@pandadoc.com 
