/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/style.css */ \"./src/styles/style.css\");\n/* harmony import */ var _scripts_index_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/index.ts */ \"./src/scripts/index.ts\");\n\n\n\n//# sourceURL=webpack://shop/./src/index.ts?");

/***/ }),

/***/ "./src/scripts/MessageForm/index.ts":
/*!******************************************!*\
  !*** ./src/scripts/MessageForm/index.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Service_sendler_message__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Service/sendler_message */ \"./src/scripts/services/sendler_message.ts\");\n/* harmony import */ var _Service_upload_files__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Service/upload_files */ \"./src/scripts/services/upload_files.ts\");\n// frontend\\src\\scripts\\MessageForm\\index.ts\n\n\n\nlet APP_WS_URL = \"ws://localhost:8000/ws\";\nif (APP_WS_URL === undefined) {\n  APP_WS_URL = '';\n}\n;\n\n/**\n * Here a handler function, it is message sendler  from the form chat input/\n * @param void\n */\nconst handlerGetMessageOfInput = async e => {\n  const buttonHTML = document.querySelector('button[data-id]');\n  const target = e.target;\n  const messages = target.value.length > 0 ? target.value.trim() : '';\n  /* ------ Keyboard ------ */\n  // debugger\n  if (messages.length > 0 || !(typeof JSON.parse(localStorage.getItem('data')).fileId).includes('boolen')) {\n    if (e.key === 'Enter') {\n      // debugger\n      await (0,_Service_sendler_message__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(e);\n    }\n    /* ------ MouseEvent ------ */\n    // buttonHTML?.removeEventListener('click', () => { handlerSendlerMessageTotal(e) });\n    buttonHTML.onclick = null;\n    buttonHTML.onclick = _Service_sendler_message__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\n    // buttonHTML?.addEventListener('click', () => { handlerSendlerMessageTotal(e) });\n  }\n};\ndocument.addEventListener('DOMContentLoaded', () => {\n  const messageFormHTML = document.querySelector('input[name=\"messager\"]');\n  if (messageFormHTML !== null && messageFormHTML.value.length > 0 || !(typeof JSON.parse(localStorage.getItem('data')).fileId).includes('boolen')) {\n    messageFormHTML.addEventListener('keypress', handlerGetMessageOfInput);\n  }\n  const buttonHTML = document.querySelector('button[data-id]');\n  buttonHTML.onclick = _Service_sendler_message__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\n  /**\n  * Below is function for handler the event  of uploading file to the server\n  * @return void\n  */\n  (0,_Service_upload_files__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n});\n\n//# sourceURL=webpack://shop/./src/scripts/MessageForm/index.ts?");

/***/ }),

/***/ "./src/scripts/index.ts":
/*!******************************!*\
  !*** ./src/scripts/index.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _MessageForm_index_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MessageForm/index.ts */ \"./src/scripts/MessageForm/index.ts\");\n\n\n//# sourceURL=webpack://shop/./src/scripts/index.ts?");

/***/ }),

/***/ "./src/scripts/services/getDataTime.ts":
/*!*********************************************!*\
  !*** ./src/scripts/services/getDataTime.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction zeroDateTime() {\n  const currentdate = new Date();\n  return currentdate;\n}\n\n/**\r\n * @returns '13:02\"\r\n */\nfunction getNowTime() {\n  const currentdate = zeroDateTime();\n  const time = currentdate.getHours().toLocaleString('en-US') + ':' + currentdate.getMinutes();\n  return time;\n}\n\n/**\r\n * @returns '2020-02-21'\r\n */\nfunction getNowDate() {\n  const currentdate = zeroDateTime();\n  const date = currentdate.getFullYear() + '-' + (currentdate.getMonth() + 1) + '-' + currentdate.getDate();\n  return date;\n}\n\n/**\r\n * @returns \"532\"\r\n */\nfunction getMowMultiSecond() {\n  const currentdate = zeroDateTime();\n  const multis = currentdate.getMilliseconds();\n  return String(multis);\n}\n\n/**\r\n * @returns 2020-02-21@11:02:23 PM'\r\n */\nfunction getFullTime() {\n  const dt = zeroDateTime();\n  const datetime = getNowDate() + '@' + dt.toLocaleTimeString('en-US');\n  return datetime;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  getNowTime,\n  getNowDate,\n  getFullTime,\n  getMowMultiSecond\n});\n\n//# sourceURL=webpack://shop/./src/scripts/services/getDataTime.ts?");

/***/ }),

/***/ "./src/scripts/services/sendler_message.ts":
/*!*************************************************!*\
  !*** ./src/scripts/services/sendler_message.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Service_getDataTime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Service/getDataTime */ \"./src/scripts/services/getDataTime.ts\");\n/* harmony import */ var _Websocket__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Websocket */ \"./src/scripts/websockets/index.ts\");\n\n\nconst socket = new _Websocket__WEBPACK_IMPORTED_MODULE_1__.WSocket('ws://127.0.0.1:8000/ws/chat/');\nconst handlerSendlerMessageTotal = async e => {\n  let fileIdArr = [];\n  let timeItervale;\n  const dataLocalJson = JSON.parse(localStorage.getItem('data'));\n  if (dataLocalJson.fileId === true) {\n    timeItervale = setTimeout(() => {\n      handlerSendlerMessageTotal(e);\n    }, 300);\n    return;\n  } else if (!(typeof dataLocalJson.fileId).includes('boolen')) {\n    clearTimeout(timeItervale);\n    fileIdArr = JSON.parse(dataLocalJson.fileId).list_indexes;\n    // debugger\n  }\n  console.log('[fileId]: ', fileIdArr);\n  // dataLocalJson.fileId = false;\n  // localStorage.setItem('data', dataLocalJson);\n\n  const target = e.target;\n  const messages = target.value.trim();\n  const indexUser = target.dataset.id;\n  const datetime = _Service_getDataTime__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getFullTime();\n  // debugger\n  if ((typeof fileIdArr).includes('object')) {\n    socket.beforeSend(String([JSON.stringify({\n      eventtime: datetime,\n      message: messages,\n      userId: indexUser,\n      groupId: '7a3a744a-64ab-492b-89bf-9ee7c72b91f1',\n      fileIndex: fileIdArr\n    })]));\n    await socket.dataSendNow();\n  } else {\n    socket.beforeSend(String([JSON.stringify({\n      eventtime: datetime,\n      message: messages,\n      userId: indexUser,\n      groupId: '7a3a744a-64ab-492b-89bf-9ee7c72b91f1'\n    })]));\n    await socket.dataSendNow();\n  }\n\n  /* clearning forms - message */\n  const inputFormHTML = document.querySelector('input[data-id]');\n  if (inputFormHTML !== null) {\n    inputFormHTML.value = '';\n  }\n  ;\n\n  /* clearning forms - file */\n  const formFiles = document.getElementById('upload');\n  if (formFiles === null) {\n    return;\n  }\n  const inputFile = formFiles === null || formFiles === void 0 ? void 0 : formFiles.querySelector('input[type=\"file\"]');\n  if (inputFile !== null) {\n    inputFile.value = '';\n  }\n  ;\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handlerSendlerMessageTotal);\n\n//# sourceURL=webpack://shop/./src/scripts/services/sendler_message.ts?");

/***/ }),

/***/ "./src/scripts/services/upload_files.ts":
/*!**********************************************!*\
  !*** ./src/scripts/services/upload_files.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// app_messager\\frontend\\src\\scripts\\services\\upload_files.ts\n\nconst handlerUploadFiles = () => {\n  /**\r\n   * preparing eventronment\r\n   */\n  const formDiv = document.getElementById('form-files');\n  if (formDiv === null) {\n    return;\n  }\n  let form = formDiv.querySelector('#upload');\n  if (form === null) {\n    return;\n  }\n\n  /** Check the key of localStorage.\r\n   * Key fileId be has a value:\r\n   * - 'false' - user no sending the file;\r\n   * - 'true' - user has sent file but has not received a file id in now time.\r\n   * - var a number type is id file.\r\n  */\n  const checkLockalKey = localStorage.getItem('data') !== null;\n  if (checkLockalKey) {\n    const dataLocalJson = JSON.parse(localStorage.getItem('data'));\n    dataLocalJson.fileId = false;\n    localStorage.setItem('data', JSON.stringify(dataLocalJson));\n  } else {\n    localStorage.setItem('data', JSON.stringify({\n      fileId: false\n    }));\n  }\n\n  /**\r\n   * rules of handler\r\n   */\n  const handlerInputEvent = async event => {\n    form = formDiv.querySelector('#upload');\n\n    /* For a loader anime. AnimeCode is below 1/3 */\n    const formFiles = document.getElementById('form-files');\n    const formData = new FormData(form);\n    formData.append('file', event.target.files);\n    console.log('SEiZE: ', event.target.files[0].size);\n    // debugger\n\n    /**\r\n     * Note: Size files\r\n     */\n    let totalSize = 0;\n    const fileArr = Array.from(event.target.files);\n    let fileSizeLarge = false;\n    for (let i = 0; i < fileArr.length; i++) {\n      totalSize += Object(fileArr[i]).size;\n      if (Object(fileArr[i]).size > 10000000) {\n        fileSizeLarge = true;\n      }\n    }\n    if (totalSize > 64000000 || fileSizeLarge) {\n      const formMessegeInput = document.querySelector('#messager');\n      const div = document.createElement('div');\n      div.className = 'attention';\n      div.innerText = 'Your all files from the your massage large than 64MB. Or one file is large 10MB';\n      formMessegeInput === null || formMessegeInput === void 0 || formMessegeInput.before(div);\n      return;\n    } else {\n      const attention = document.getElementsByClassName('attention');\n      if (attention.length > 0) {\n        attention[0].remove();\n      }\n    }\n    /**  We talking about beginning the upload */\n    const dataLocalJson_ = JSON.parse(localStorage.getItem('data'));\n    dataLocalJson_.fileId = true;\n    localStorage.setItem('data', JSON.stringify(dataLocalJson_));\n\n    /** Loader for a display anime 2/3 */\n    formFiles === null || formFiles === void 0 || formFiles.classList.add('upload');\n    // debugger\n    /** upload */\n    await fetch('upload/', {\n      method: 'POST',\n      body: formData\n    }).then(async response => {\n      let responce = '';\n      if (response.ok) {\n        const data = await response.json();\n        console.info('[upload_files > FORM]:', data);\n        responce = data.index;\n        /** record result/ It's ID or false */\n        const dataLocalJson = JSON.parse(localStorage.getItem('data'));\n        dataLocalJson.fileId = responce;\n        localStorage.setItem('data', JSON.stringify(dataLocalJson));\n      } else {\n        console.error(\"[upload_files > FORM]: What is wrong! ERROR - didn't received the ID file!\", response.statusText);\n      }\n      /** Loader for a display anime 3/3 */\n      formFiles === null || formFiles === void 0 || formFiles.classList.remove('upload');\n    });\n  };\n  /**\r\n   * added the event listeber\r\n   */\n  form.onchange = handlerInputEvent;\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handlerUploadFiles);\n\n//# sourceURL=webpack://shop/./src/scripts/services/upload_files.ts?");

/***/ }),

/***/ "./src/scripts/templates/messages.ts":
/*!*******************************************!*\
  !*** ./src/scripts/templates/messages.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createChatMessage: () => (/* binding */ createChatMessage)\n/* harmony export */ });\n/* harmony import */ var _Service_getDataTime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Service/getDataTime */ \"./src/scripts/services/getDataTime.ts\");\n\nfunction scrollToBottom() {\n  const chatBox = document.querySelector('#chat');\n  if (chatBox === null) {\n    return;\n  }\n  chatBox.scrollTo({\n    top: document.body.scrollHeight,\n    behavior: 'smooth'\n  });\n}\nfunction checkOfTime(dateTime) {\n  const oldDate = dateTime.split('@')[0];\n  const t = dateTime.split('@')[1];\n  if (oldDate.includes(_Service_getDataTime__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getNowDate())) {\n    return t;\n  }\n  ;\n  const d = dateTime.split('@')[0];\n  return d + ' ' + t;\n}\nfunction checkYourOnNotYour(userId) {\n  const inputHtml = document.getElementById('messager');\n  if (inputHtml === null) {\n    console.error('[templates/messages.ts > checkYourOnNotYour]: ERROR. What something wrong with the \"inputHtml\"!');\n    return;\n  }\n  const inputUserId = inputHtml.dataset.id;\n  if (inputUserId === undefined) {\n    console.error('[templates/messages.ts > checkYourOnNotYour]: ERROR. What something wrong with the \"inputUserId\"!');\n    return;\n  }\n  const userIdNumber = (typeof userId).includes('string') ? Number(userId) : userId;\n  const result = userIdNumber === Number(inputUserId);\n  return result;\n}\n\n/**\r\n * This's function insert a new message to the chat.\r\n * @param `userId` - thi's user id of the user who is senter\r\n * @param 'dataTime' - it's the time then user sends the message.\r\n * We gets from a data format: \"eventtime\":\"2024-4-13@6:2:14:38\"\r\n * @param `authorId` - This's a name. It's who is sends.\r\n * @param 'message' - This's the message's text.\r\n * @returns html-text of a box.\r\n */\nasync function createChatMessage(_ref) {\n  let {\n    authorId,\n    dataTime,\n    message,\n    groupId = undefined,\n    fileLink = [],\n    filesId = []\n  } = _ref;\n  /*\r\n    we change the group number.\r\n  */\n  const groupNumber = document.getElementById('group');\n  console.log(\"[PUBLIC > FILES]: \".concat(filesId[0]));\n  if (groupNumber === null || groupId === undefined || groupNumber.dataset.groupid === undefined || !groupNumber.dataset.groupid.includes(groupId)) {\n    return;\n  }\n  let linkFilesArr = [];\n  // debugger\n  if (filesId.length > 0) {\n    /** indexes of the files inserted to the parameters from the URL */\n    const url = new URL('api/chat/upload/files/', 'http://127.0.0.1:8000/');\n    url.searchParams.set('ind', String(filesId));\n    // if (filesId.length > 1) {\n    //   for (let i = 1; i <= filesId.length; i++) {\n    //     url.searchParams.set(`&ind${i + 1}`, String(filesId[i]));\n    //   }\n    // }\n    const response = await fetch(url, {\n      method: 'GET',\n      headers: {\n        'Content-Type': 'application/json'\n      }\n    });\n    if (response.ok) {\n      const data = await response.json();\n      console.info('[createChatMessage > LINK]:', data);\n      const dataList = JSON.parse(data.files).linkList;\n      linkFilesArr = dataList.slice(0);\n    }\n  }\n\n  /**\r\n   * insert the message box in chat\r\n   */\n  const htmlChat = groupNumber.querySelector('#chat');\n  if (htmlChat === null) {\n    return;\n  }\n  const htmlMessage = document.createElement('div');\n  if (message === undefined || (typeof message).includes('string') && message.length === 0 && filesId.length === 0) {\n    return;\n  }\n\n  /*  file's links adding to the message */\n  let refer = '<ul>';\n  if (linkFilesArr.length > 0) {\n    for (let i = 0; i < linkFilesArr.length; i++) {\n      const len = linkFilesArr[i].split('/').length;\n      const urlOrigin = window.location.origin;\n      refer += \"<li><a target=\\\"_blank\\\" href=\\\"\".concat(urlOrigin, \"/media/\").concat(linkFilesArr[i].slice(0), \"\\\">\").concat(linkFilesArr[i].split('/')[len - 1], \"</a></li>\");\n    }\n  }\n  const resultCheckUser = checkYourOnNotYour(authorId);\n  if (resultCheckUser !== undefined) {\n    htmlMessage.innerHTML = \"\\n      <div>\\n        <img src=\\\" https://bootdey.com/img/Content/avatar/avatar3.png\\\" class=\\\"rounded-circle mr-1\\\" alt=\\\"Sharon Lessman\\\"\\n          width=\\\"40\\\" height=\\\"40\\\" />\\n        <div class=\\\"text-muted small text-nowrap mt-2\\\">\".concat(checkOfTime(dataTime), \"</div>\\n      </div>\\n      <div class=\\\"flex-shrink-1 bg-light rounded py-2 px-3 ml-3\\\">\\n        <div class=\\\"font-weight-bold mb-1\\\">\").concat(resultCheckUser ? 'You' : 'NOT your', \"</div>\\n        \").concat(message, \"\\n      </div>\\n  \");\n    htmlMessage.innerHTML += refer.length > 10 ? \"<div class=\\\"download\\\">\".concat(refer, \"</ul></div>\") : '';\n    const rightLeft = resultCheckUser ? 'chat-message-right' : 'chat-message-left';\n    const res = authorId;\n    htmlMessage.setAttribute('data-user-id', res);\n    htmlMessage.className = 'pb-4';\n    htmlMessage.classList.add(rightLeft);\n    const oldChat = htmlChat === null || htmlChat === void 0 ? void 0 : htmlChat.innerHTML;\n    const newBox = htmlMessage.outerHTML;\n    const combinedHTML = oldChat + newBox;\n    htmlChat.innerHTML = '';\n    htmlChat.innerHTML = combinedHTML;\n\n    /*  cleaning to the datas */\n    filesId = [];\n    if (refer.length > 10) {\n      localStorage.setItem('data', JSON.stringify({\n        fileId: false\n      }));\n    }\n    ;\n    refer = '<ul>';\n  }\n  /**\r\n   * scroll\r\n   */\n  scrollToBottom();\n}\n\n//# sourceURL=webpack://shop/./src/scripts/templates/messages.ts?");

/***/ }),

/***/ "./src/scripts/websockets/index.ts":
/*!*****************************************!*\
  !*** ./src/scripts/websockets/index.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   WSocket: () => (/* binding */ WSocket)\n/* harmony export */ });\n/* harmony import */ var _htmlTemplates_messages__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @htmlTemplates/messages */ \"./src/scripts/templates/messages.ts\");\nfunction _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == typeof i ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != typeof i) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\n// app_messager\\frontend\\src\\scripts\\websockets\\index.ts\n\n\n\n/**\r\n * Класс для работы с \"WebSocket\" протоколом.\r\n * Запускает прослушку событий:\r\n * - 'open';\r\n * - 'message';\r\n * -'close'.\r\n *  Каждое событие запускает фукцию по умолчанию.\r\n * Каждую функцию можно переписать под свои условия.\r\n *\r\n *  Есть фунция зкрытия соединения.\r\n *  Она возвращает соманду - закрыть соединение.\r\n */\nclass WSocket {\n  constructor(url) {\n    _defineProperty(this, \"socket\", void 0);\n    _defineProperty(this, \"handlers\", void 0);\n    _defineProperty(this, \"onMessage\", e => {\n      console.log('-------------------');\n      const dataJson = JSON.parse(e.data);\n      const resp = dataJson.text !== undefined ? dataJson.text : e.data.includes('groupId') ? e.data : null;\n      if (resp === null) {\n        return;\n      }\n      ;\n      const dataTextJson = JSON.parse(resp);\n      const message = dataTextJson.message;\n      const authorId = String(dataTextJson.userId);\n      const groupId = dataTextJson.groupId;\n      const dataTime = dataTextJson.eventtime;\n      console.log(\"[websokets > RECIVED MESS]: \".concat(dataJson));\n      // debugger\n      const filesId = dataJson.fileIndex !== undefined ? dataJson.fileIndex : [];\n      // console.log(`[websokets > RECIVED FILES]: ${dataJson}`);\n      (0,_htmlTemplates_messages__WEBPACK_IMPORTED_MODULE_0__.createChatMessage)({\n        authorId,\n        dataTime,\n        message,\n        groupId,\n        filesId\n      });\n    });\n    this.socket = new WebSocket(url);\n    this.socket.addEventListener('open', e => {\n      console.info(\"[WSocket > OPEN]: \".concat(e));\n    });\n    this.socket.addEventListener('message', e => {\n      console.info(\"[WSocket > MESSAGE]: WebSocket - message was received; MESSAGE: \".concat(e.target.url));\n      this.onMessage(e);\n    });\n    this.socket.onbeforeunload = function () {\n      this.socket.send('ping');\n    };\n    this.socket.addEventListener('close', e => {\n      console.info(\"[WSocket > CLOSE]: - connection was CLOSED: \".concat(e.message));\n    });\n    this.socket.addEventListener('error', e => {\n      console.info(\"[WSocket > ERROR]: - connection was ERROR: \".concat(e));\n    });\n    this.handlers = {\n      open: [],\n      close: [],\n      data: []\n    };\n  }\n\n  /**\r\n   * Here we getting the data for a send.\r\n   * Entry point getting JSON.stringfy\r\n   * @param datas void\r\n   */\n  beforeSend(datas) {\n    // debugger;\n    try {\n      if ((typeof JSON.parse(datas)).includes('object')) {\n        this.handlers.data.push(datas);\n      } else {\n        console.log('[websokets: SENDS]: Received datas is a not JSON object. ');\n      }\n    } catch (e) {\n      console.error(\"[websokets: sends ERROR]: Received datas and what went wrong. It is not JSON object. MESSAGE: \".concat(e.message));\n    }\n  }\n  get readyState() {\n    const handlers = this.handlers;\n    return handlers;\n  }\n  onClose() {\n    this.socket.close();\n  }\n  dataSendNow() {\n    const data = this.readyState.data.slice(0)[0];\n    console.log('[websokets > OPEN > BEFORE SEND]: Message was a pass - Ok', data);\n    console.log(\"[websokets > OPEN > BEFORE SEND]:  ReadyState: \".concat(this.socket.readyState));\n    if (this.socket.readyState === WebSocket.OPEN) {\n      this.socket.send(data);\n      console.log('[websokets > OPEN > AFTER SEND]: Ok', this.socket.readyState);\n      this.handlers.data.pop();\n    } else {\n      console.info(\"[websokets > CLOSE ERROR]:  In Now time can't send message to the WebSocket.WebSocket is closed\");\n      return false;\n    }\n  }\n}\n\n// WebSocets\n\n//# sourceURL=webpack://shop/./src/scripts/websockets/index.ts?");

/***/ }),

/***/ "./src/styles/style.css":
/*!******************************!*\
  !*** ./src/styles/style.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://shop/./src/styles/style.css?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;