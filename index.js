const fetch = require('node-fetch');

class PandaDoc {
  constructor(key, keyType) {
    this.key = key;
    this.keyType = keyType
  }

  // add arguments as params to req url
  formatUrl(url, params) {
    // iterating through args to append to params
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    return url
  }

  generalHeaders() {
    if(this.keyType === "bearer") {
      return { 'Authorization': `Bearer ${this.key}`, 'Content-Type': 'application/json' }
    } else {
      return { 'Authorization': `API-Key ${this.key}`, 'Content-Type': 'application/json' }
    }
  }

  multipartHeaders() {
    if(instance.keyType === "bearer") {
      return { 'Authorization': `Bearer ${this.key}` }
    } else {
      return { 'Authorization': `API-Key ${this.key}` }
    }
  }

  serialize(obj) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }

  // ID only arg
  documentStatus(params) {
    var paramUrl = new URL(`https://api.pandadoc.com/public/v1/documents/${params["id"]}`)
    var that = this
    return fetch(paramUrl, {
      headers: that.generalHeaders()
      }
    )
    .then(response => { return response.json() })
    .then(data => {

      return data
    });
  }

  // ID only arg
  documentDetails(params) {
    var that = this
    return fetch(`https://api.pandadoc.com/public/v1/documents/${params["id"]}/details`, {
      headers: that.generalHeaders()
      }
    )
    .then(response => { return response.json() })
    .then(data => {

      return data
    });
  }

  // Q, Status, Count, Page, metadata, deleted
  // template_id, folder_uuid, tag, id
  listDocuments (params) {
    var paramUrl = this.formatUrl(new URL("https://api.pandadoc.com/public/v1/documents"), params)
    var that = this
    // await response of fetch call
    return fetch(paramUrl, {
      headers: that.generalHeaders()
      }
    )
    .then(r => { return r.json() })
    .then(d => {

      return d
    })
  }

  // watermark_text, watermark_color,
  // watermark_font_size, watermark_opacity
  downloadDocument(params) {
    var paramUrl = this.formatUrl(new URL(`https://api.pandadoc.com/public/v1/documents/${params["id"]}/download`), params)
    var that = this
    return fetch(paramUrl, {
      headers: that.generalHeaders()
      }
    )
    .then(response => {

      return response
    })
  }

  // hard_copy_type
  downloadProtectedDocument() {
    var paramUrl = this.formatUrl(new URL(`https://api.pandadoc.com/public/v1/documents/${params["id"]}/download-protected`), params)
    var that = this
    return fetch(paramUrl, {
      headers: that.generalHeaders()
      }
    )
    .then(response => {

      return response
    })
  }

  // q, tag, count, page, deleted, folder_uuid, id
  listTemplates(params) {
    var paramUrl = this.formatUrl(new URL('https://api.pandadoc.com/public/v1/templates'), params)
    var that = this
    return fetch(paramUrl, {
      headers: that.generalHeaders()
      }
    )
    .then(response => { return response.json() })
    .then(data => { return data });
  }

  deleteDocument(params) {
    var paramUrl = `https://api.pandadoc.com/public/v1/documents/${params.id}`
    var that = this
    return fetch(paramUrl, {
      headers: that.generalHeaders(),
      method: "DELETE"
      }
    )
    .then(response => { return response.json() })
    .then(data => { return data });
  }

  deleteTemplate(params) {
    var paramUrl = `https://api.pandadoc.com/public/v1/templates/${params.id}`
    var that = this
    return fetch(paramUrl, {
      headers: that.generalHeaders(),
      method: "DELETE"
      }
    )
    .then(response => { return response.json() })
    .then(data => { return data });
  }

  updateDocumentFolder(params) {
    var paramUrl = `https://api.pandadoc.com/public/v1/documents/folders/${params.id}`
    var that = this
    return fetch(paramUrl, {
      headers: that.generalHeaders(),
      method: "PUT",
      body: JSON.stringify(params)
      }
    )
    .then(response => { return response.json() })
    .then(data => { return data });
  }

  updateTemplateFolder(params) {
    var paramUrl = `https://api.pandadoc.com/public/v1/templates/folders/${params.id}`
    var that = this
    return fetch(paramUrl, {
      headers: that.generalHeaders(),
      method: "PUT",
      body: JSON.stringify(params)
      }
    )
    .then(response => { return response.json() })
    .then(data => { return data });
  }

  // ID only
  templateDetails(params) {
    var that = this
    return fetch(`https://api.pandadoc.com/public/v1/templates/${params["id"]}/details`, {
      headers:  that.generalHeaders()
      }
    )
    .then(response => { return response.json() })
    .then(data => { return data });
  }

  // parent_uuid, count, page
  listTemplateFolders(params) {
    var paramUrl = this.formatUrl(new URL('https://api.pandadoc.com/public/v1/templates/folders'), params)
    var that = this
    return fetch(paramUrl, {
      headers: that.generalHeaders()
      }
    )
    .then(response => { return response.json() })
    .then(data => { return data });
  }

  // parent_uuid, count, page
  listDocumentFolders(params) {
    var paramUrl = this.formatUrl(new URL('https://api.pandadoc.com/public/v1/documents/folders'), params)
    var that = this
    return fetch(paramUrl, {
      headers: this.generalHeaders()
      }
    )
    .then(response => { return response.json() })
    .then(data => { return data });
  }

  // file, url, recipients, tags, fields, parse_form_fields, metadata
  createDocumentFromPdf(params) {
    var formData = new FormData();
    var that = this
    formData.append("file", params.file);
    var filteredKeys = Object.keys(params).filter(i => i.toString() !== "file")
    var obj = {}
    let x;
    for(x in params) {
       if(x !== "file") {
         obj[x] = params[x]
       }
    }

    formData.append(
      "data",
      JSON.stringify(obj)
    );

    return fetch('https://api.pandadoc.com/public/v1/documents', {
      headers: that.multipartHeaders(),
      method: 'POST',
      body: formData
    })
    .then(r => {
      return r.json()
    })
    .then(d => {
      return d
    })
  }

    // template_uuid, url, recipients, tags, fields, parse_form_fields, metadata
  createDocumentFromTemplate(params) {
    var that = this
    return fetch('https://api.pandadoc.com/public/v1/documents', {
      headers:  that.generalHeaders(),
      method: "POST",
      body: JSON.stringify(params)
      }
    )
    .then(response => {
      return response.json()
    })
    .then(data => {
      return data
    });
  }

  // message, subject, id, silent
  sendDocument(params) {
    var that = this
    return fetch('https://api.pandadoc.com/public/v1/documents/' + params["id"] + '/send', {
      headers:  that.generalHeaders(),
      body: JSON.stringify(params),
      method: "POST"
      }
    )
    .then(response => { return response.json() })
    .then(data => { return data });
  }

  // id, recipient, lifetime
  createDocumentLink(params) {
    var that = this
    return fetch('https://api.pandadoc.com/public/v1/documents/' + params["id"] + '/session', {
      headers:  that.generalHeaders(),
      method: "POST",
      body: JSON.stringify(params)
      }
    )
    .then(response => { return response.json() })
    .then(data => { return data });
  }

  // name, parent_uuid
  createDocumentFolder(params) {
    var that = this
    return fetch('https://api.pandadoc.com/public/v1/documents/folders', {
      headers: that.generalHeaders(),
      method: "POST",
      body: JSON.stringify(params)
      }
    )
    .then(response => { return response.json() })
    .then(data => { return data });
  }

  createTemplateFolder(params) {
    var that = this
    return fetch('https://api.pandadoc.com/public/v1/templates/folders', {
      headers:  that.generalHeaders(),
      method: "POST",
      body: JSON.stringify(params)
      }
    )
    .then(response => { return response.json() })
    .then(data => { return data });
  }

  getCode(params) {
    window.open("https://app.pandadoc.com/oauth2/authorize?client_id=" + params.client_id + "&redirect_uri=" + params.redirect_uri + "&scope=read+write&response_type=code", '_blank');

    var code = prompt("enter the code located on your redirect URI browser instance: ")
    params.code = code
    return this.getOauthAccessToken(params)
  }

  getOauthAccessToken(params) {
    var that = this
    return fetch('https://api.pandadoc.com/oauth2/access_token', {
      headers:  {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      body: that.serialize(params)
      }
    )
    .then(response => { return response.json() })
    .then(token => {
      this.key = token["access_token"]
      this.keyType = "bearer"
      return token
    })
    .then(data => { return data });
  }

  refreshOauthAccessToken(params) {
    var that = this
    return fetch('https://api.pandadoc.com/oauth2/access_token', {
      headers:  {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      body: that.serialize(params)
      }
    )
    .then(response => { return response.json() })
    .then(token => {
      this.key = token["access_token"]
      this.keyType = "bearer"
      return token
    })
    .then(data => { return data });
  }
}

module.exports = PandaDoc
