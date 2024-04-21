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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Service_postmen_sendler_message__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Service/postmen/sendler_message */ \"./src/scripts/services/postmen/sendler_message.ts\");\n/* harmony import */ var _Service_handlers_messages_get_messages__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Service/handlers/messages/get-messages */ \"./src/scripts/services/handlers/messages/get-messages.ts\");\n// frontend\\src\\scripts\\MessageForm\\index.ts\n\n\n\nlet APP_WS_URL = \"ws://localhost:8000/ws\";\nif (APP_WS_URL === undefined) {\n  APP_WS_URL = '';\n}\n;\ndocument.addEventListener('DOMContentLoaded', () => {\n  /* 1/3 added the event listener to the input form . */\n  (0,_Service_handlers_messages_get_messages__WEBPACK_IMPORTED_MODULE_1__[\"default\"])((0,_Service_postmen_sendler_message__WEBPACK_IMPORTED_MODULE_0__[\"default\"])());\n});\n/* \nhandlerSendlerMessageTotal\n!! ключ группы изменить на динамический !!\nдалее\nФорма input не работает Enter\n\n*/\n\n//# sourceURL=webpack://shop/./src/scripts/MessageForm/index.ts?");

/***/ }),

/***/ "./src/scripts/index.ts":
/*!******************************!*\
  !*** ./src/scripts/index.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _MessageForm_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MessageForm/index */ \"./src/scripts/MessageForm/index.ts\");\n\n\n//# sourceURL=webpack://shop/./src/scripts/index.ts?");

/***/ }),

/***/ "./src/scripts/services/cleaner.ts":
/*!*****************************************!*\
  !*** ./src/scripts/services/cleaner.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction cleanForm() {\n  /* clearning forms - message */\n  const inputFormHTML = document.querySelector('input[data-id]');\n  if (inputFormHTML !== null) {\n    inputFormHTML.value = '';\n  }\n  ;\n\n  /* clearning forms - file */\n  const formFiles = document.getElementById('upload');\n  if (formFiles !== null) {\n    const inputFile = formFiles === null || formFiles === void 0 ? void 0 : formFiles.querySelector('input[type=\"file\"]');\n    if (inputFile !== null) {\n      inputFile.value = '';\n    }\n  }\n  ;\n  /* quote DIV */\n  const qouteDiv = document.querySelector('.quote.active');\n  if (qouteDiv !== null) {\n    qouteDiv.remove();\n  }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cleanForm);\n\n//# sourceURL=webpack://shop/./src/scripts/services/cleaner.ts?");

/***/ }),

/***/ "./src/scripts/services/cookies.ts":
/*!*****************************************!*\
  !*** ./src/scripts/services/cookies.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction getCookie(name) {\n  let cookieValue = null;\n  if (document.cookie !== undefined && document.cookie !== '') {\n    const cookies = document.cookie.split(';');\n    for (let i = 0; i < cookies.length; i++) {\n      const cookie = cookies[i].trim();\n      // Does this cookie string begin with the name we want?\n      if (cookie.substring(0, name.length + 1) === name + '=') {\n        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));\n        break;\n      }\n    }\n  }\n  return cookieValue;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getCookie);\n\n//# sourceURL=webpack://shop/./src/scripts/services/cookies.ts?");

/***/ }),

/***/ "./src/scripts/services/handlers/files/handler_input-file.ts":
/*!*******************************************************************!*\
  !*** ./src/scripts/services/handlers/files/handler_input-file.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// app_messager\\frontend\\src\\scripts\\services\\handlers\\handler_input-file.ts\n\n/**\r\n * rules of handler\r\n */\nconst handlerInputEvent = (formDiv, form) => {\n  return async event => {\n    form = formDiv.querySelector('#upload');\n\n    /* For a loader anime. AnimeCode is below 1/3 */\n    const formFiles = document.getElementById('form-files');\n    const formData = new FormData(form);\n    formData.append('file', event.target.files);\n\n    /**\r\n     * Note: Size files\r\n     */\n    let totalSize = 0;\n    const fileArr = Array.from(event.target.files);\n    let fileSizeLarge = false;\n    for (let i = 0; i < fileArr.length; i++) {\n      totalSize += Object(fileArr[i]).size;\n      if (Object(fileArr[i]).size > 10000000) {\n        fileSizeLarge = true;\n      }\n    }\n    if (totalSize > 64000000 || fileSizeLarge) {\n      const formMessegeInput = document.querySelector('#messager');\n      const div = document.createElement('div');\n      div.className = 'attention';\n      div.innerText = 'Your all files from the your massage large than 64MB. Or one file is large 10MB';\n      formMessegeInput === null || formMessegeInput === void 0 || formMessegeInput.before(div);\n      return;\n    } else {\n      const attention = document.getElementsByClassName('attention');\n      if (attention.length > 0) {\n        attention[0].remove();\n      }\n    }\n    /**  We talking about beginning the upload */\n    const dataLocalJson_ = JSON.parse(localStorage.getItem('data'));\n    dataLocalJson_.fileId = true;\n    localStorage.setItem('data', JSON.stringify(dataLocalJson_));\n\n    /** Loader for a display anime 2/3 */\n    formFiles === null || formFiles === void 0 || formFiles.classList.add('upload');\n\n    /** upload */\n    await fetch('upload/', {\n      method: 'POST',\n      body: formData\n    }).then(async response => {\n      let responce = '';\n      if (response.ok) {\n        // debugger\n        const data = await response.json();\n        console.info('[upload_files > FORM]:', data);\n        responce = data.index.slice(0);\n        /** record result/ It's ID or false */\n        const dataLocalJson = JSON.parse(localStorage.getItem('data'));\n        dataLocalJson.fileId = responce;\n        localStorage.setItem('data', JSON.stringify(dataLocalJson));\n      } else {\n        console.error(\"[upload_files > FORM]: What is wrong! ERROR - didn't received the ID file!\", response.statusText);\n      }\n      /** Loader for a display anime 3/3 */\n      formFiles === null || formFiles === void 0 || formFiles.classList.remove('upload');\n    });\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handlerInputEvent);\n\n//# sourceURL=webpack://shop/./src/scripts/services/handlers/files/handler_input-file.ts?");

/***/ }),

/***/ "./src/scripts/services/handlers/files/upload_files.ts":
/*!*************************************************************!*\
  !*** ./src/scripts/services/handlers/files/upload_files.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _handler_input_file__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./handler_input-file */ \"./src/scripts/services/handlers/files/handler_input-file.ts\");\n// app_messager\\frontend\\src\\scripts\\services\\upload_files.ts\n\nconst handlerUploadFiles = () => {\n  /**\r\n   * preparing eventronment\r\n   */\n  const formDiv = document.getElementById('form-files');\n  if (formDiv === null) {\n    return;\n  }\n  const form = formDiv.querySelector('#upload');\n  if (form === null) {\n    return;\n  }\n\n  /** Check the key of localStorage.\r\n   * Key fileId be has a value:\r\n   * - 'false' - user no sending the file;\r\n   * - 'true' - user has sent file but has not received a file id in now time.\r\n   * - var a number type is id file.\r\n  */\n  const checkLockalKey = localStorage.getItem('data') !== null;\n  if (checkLockalKey) {\n    const dataLocalJson = JSON.parse(localStorage.getItem('data'));\n    dataLocalJson.fileId = false;\n    localStorage.setItem('data', JSON.stringify(dataLocalJson));\n  } else {\n    localStorage.setItem('data', JSON.stringify({\n      fileId: false\n    }));\n  }\n  /**\r\n   * added the event listeber\r\n   */\n  form.onchange = (0,_handler_input_file__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(formDiv, form);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handlerUploadFiles);\n\n//# sourceURL=webpack://shop/./src/scripts/services/handlers/files/upload_files.ts?");

/***/ }),

/***/ "./src/scripts/services/handlers/getDataTime.ts":
/*!******************************************************!*\
  !*** ./src/scripts/services/handlers/getDataTime.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction zeroDateTime() {\n  const currentdate = new Date();\n  return currentdate;\n}\n\n/**\r\n * @returns '13:02\"\r\n */\nfunction getNowTime() {\n  const currentdate = zeroDateTime();\n  const time = currentdate.getHours().toLocaleString('en-US') + ':' + currentdate.getMinutes();\n  return time;\n}\n\n/**\r\n * @returns '2020-02-21'\r\n */\nfunction getNowDate() {\n  const currentdate = zeroDateTime();\n  const date = currentdate.getFullYear() + '-' + (currentdate.getMonth() + 1) + '-' + currentdate.getDate();\n  return date;\n}\n\n/**\r\n * @returns \"532\"\r\n */\nfunction getMowMultiSecond() {\n  const currentdate = zeroDateTime();\n  const multis = currentdate.getMilliseconds();\n  return String(multis);\n}\n\n/**\r\n * @returns 2020-02-21@11:02:23 PM'\r\n */\nfunction getFullTime() {\n  const dt = zeroDateTime();\n  const datetime = getNowDate() + '@' + dt.toLocaleTimeString('en-US');\n  return datetime;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  getNowTime,\n  getNowDate,\n  getFullTime,\n  getMowMultiSecond\n});\n\n//# sourceURL=webpack://shop/./src/scripts/services/handlers/getDataTime.ts?");

/***/ }),

/***/ "./src/scripts/services/handlers/messages/get-messages.ts":
/*!****************************************************************!*\
  !*** ./src/scripts/services/handlers/messages/get-messages.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _files_upload_files__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../files/upload_files */ \"./src/scripts/services/handlers/files/upload_files.ts\");\n/* harmony import */ var _sub_handler_subhandler_click__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sub-handler/subhandler-click */ \"./src/scripts/services/handlers/messages/sub-handler/subhandler-click.ts\");\n/* harmony import */ var _sub_handler_subhandler_key__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sub-handler/subhandler-key */ \"./src/scripts/services/handlers/messages/sub-handler/subhandler-key.ts\");\n// app_messager\\frontend\\src\\scripts\\services\\handlers\\messages\\get-messages.ts\n\n\n\n\n/**\n * Here is a function. In to the entry point inserting 'fun-variable' - handler. and return the handler function.\n * This function we use in more than one place and it has different handlers. \\\n * Itself variable 'fun' is a heandler event the KeyboardEvent | MouseEvent or (KeyboardEvent && MouseEvent). \\\n * @param 'fun' is a handler function. It, a handler function that is sendler of the message from the input chat's text.\n * @param void\n */\nconst handlerGetMessageOfInput = fun => {\n  const messageFormHTML = document.getElementById('message');\n  /*\n  * Attencion!! Here changing  html-element on the copy it. \\\n  * This action be clearning from is event-listeners \\\n  * https://typedarray.org/remove-all-event-listeners-from-an-element/\n  */\n  const cloneMessageFormHTML = messageFormHTML.cloneNode(true);\n  messageFormHTML.replaceWith(cloneMessageFormHTML);\n  /* ------ */\n  if (messageFormHTML !== null) {\n    cloneMessageFormHTML.addEventListener('click', (0,_sub_handler_subhandler_click__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(fun));\n    /* ------ */\n    cloneMessageFormHTML.addEventListener('keyup', (0,_sub_handler_subhandler_key__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(fun));\n  }\n  ;\n\n  /**\n   * Below is function for handler the event  of uploading file to the server\n   * @return void\n   */\n  (0,_files_upload_files__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handlerGetMessageOfInput);\n\n//# sourceURL=webpack://shop/./src/scripts/services/handlers/messages/get-messages.ts?");

/***/ }),

/***/ "./src/scripts/services/handlers/messages/old-message/edit-message.ts":
/*!****************************************************************************!*\
  !*** ./src/scripts/services/handlers/messages/old-message/edit-message.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Pencil: () => (/* binding */ Pencil)\n/* harmony export */ });\n/* harmony import */ var _paste_quote__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./paste-quote */ \"./src/scripts/services/handlers/messages/old-message/paste-quote.ts\");\n/* harmony import */ var _get_messages__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../get-messages */ \"./src/scripts/services/handlers/messages/get-messages.ts\");\n/* harmony import */ var _old_messages__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./old-messages */ \"./src/scripts/services/handlers/messages/old-message/old-messages.ts\");\nfunction _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == typeof i ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != typeof i) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\n// app_messager\\frontend\\src\\scripts\\services\\handlers\\messages\\old-message\\edit-message.ts\n\n\n\nclass Pencil {\n  constructor(pencil) {\n    _defineProperty(this, \"box\", void 0);\n    _defineProperty(this, \"pencil\", void 0);\n    this.pencil = pencil;\n  }\n\n  // set boxPencile(pencil: HTMLDivElement): void {\n  //   this.pencil = pencil;\n  // }\n\n  // get boxPencile(): typeof this.pencil {\n  //   return this.pencil;\n  // }\n\n  handlerPencilPost(e) {\n    if (!e.target.className.includes('pencil')) {\n      return;\n    }\n    const currentTarget = e.currentTarget;\n    if (currentTarget !== null && !('post' in currentTarget.dataset)) {\n      return;\n    }\n    ;\n    const postId_ = currentTarget.dataset.post;\n    if (postId_ === undefined) {\n      console.log('[handlerPencilPost > currentTarget] Datas not found');\n      return;\n    }\n    const userId_ = currentTarget.dataset.id;\n    if (userId_ === undefined) {\n      console.log('[handlerPencilPost > currentTarget] Datas not found');\n      return;\n    }\n    /* 'message' -thet is old post from the window chat */\n    const message = currentTarget.getElementsByClassName('user-message')[0].innerText;\n    (0,_paste_quote__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(message);\n    if (localStorage.getItem('data') === null) {\n      console.log('[handlerPencilPost > localStorage] the \"data\" from the localStorage not found');\n      return;\n    }\n    const localS = localStorage.getItem('data');\n    const localSJson = JSON.parse(localS);\n    // debugger\n    localSJson.postId = postId_;\n    localSJson.userId = userId_;\n    localStorage.setItem('data', JSON.stringify(localSJson));\n\n    /* 2/3 added the event listener to the input form . It is change of the listener */\n    (0,_get_messages__WEBPACK_IMPORTED_MODULE_1__[\"default\"])((0,_old_messages__WEBPACK_IMPORTED_MODULE_2__[\"default\"])());\n  }\n  addEvent() {\n    const handlerPencilPost = this.handlerPencilPost.bind(this);\n    this.pencil.onclick = handlerPencilPost;\n  }\n  start() {\n    this.addEvent();\n  }\n}\n;\n\n// const handlerPencilPost = (e: MouseEvent): undefined => {\n//   if (!((e.target as HTMLDivElement).className.includes('pencil'))) {\n//     return;\n//   }\n\n//   const currentTarget = e.currentTarget as HTMLDivElement;\n//   if ((currentTarget !== null) && !('post' in currentTarget.dataset)) {\n//     return;\n//   };\n//   const postId_ = currentTarget.dataset.post;\n//   if (postId_ === undefined) {\n//     console.log('[handlerPencilPost > currentTarget] Datas not found');\n//     return;\n//   }\n//   const userId_ = currentTarget.dataset.id;\n//   if (userId_ === undefined) {\n//     console.log('[handlerPencilPost > currentTarget] Datas not found');\n//     return;\n//   }\n//   /* 'message' -thet is old post from the window chat */\n//   const message = (currentTarget.getElementsByClassName('user-message')[0] as HTMLElement).innerText;\n\n//   addQuote(message);\n//   if (localStorage.getItem('data') === null) {\n//     console.log('[handlerPencilPost > localStorage] the \"data\" from the localStorage not found');\n//     return;\n//   }\n\n//   const localS = localStorage.getItem('data');\n//   const localSJson = JSON.parse(localS as string);\n//   localSJson.postId = postId_;\n//   localSJson.userId = userId_;\n//   localStorage.setItem('data', JSON.stringify(localSJson));\n\n//   /* 2/3 added the event listener to the input form . It is change of the listener */\n//   handlerGetMessageOfInput(sendlerOldMessageTotal());\n// };\n// export default handlerPencilPost;\n\n//# sourceURL=webpack://shop/./src/scripts/services/handlers/messages/old-message/edit-message.ts?");

/***/ }),

/***/ "./src/scripts/services/handlers/messages/old-message/old-messages.ts":
/*!****************************************************************************!*\
  !*** ./src/scripts/services/handlers/messages/old-message/old-messages.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _postmen_sendler_message__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../postmen/sendler_message */ \"./src/scripts/services/postmen/sendler_message.ts\");\n/* harmony import */ var _postmen_sendler_old_post__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../postmen/sendler-old-post */ \"./src/scripts/services/postmen/sendler-old-post.ts\");\n/* harmony import */ var _get_messages__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../get-messages */ \"./src/scripts/services/handlers/messages/get-messages.ts\");\n// app_messager\\frontend\\src\\scripts\\services\\handlers\\messages\\old-message\\old-messages.ts\n\n\n\n\nconst manageOldMessageTotal = () => {\n  const rewriteContentAsy = async e => {\n    await (0,_postmen_sendler_old_post__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(e);\n    const handler = await (0,_postmen_sendler_message__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(true);\n    await handler(e);\n    // /* ------ LocalStorage clearing ------ */\n    const localS = localStorage.getItem('data');\n    const localSJson = JSON.parse(localS);\n    localSJson.postId = '';\n    localSJson.userId = '';\n    localStorage.setItem('data', JSON.stringify(localSJson));\n  };\n  return e => {\n    rewriteContentAsy(e);\n    /* 3/3 added the event listener to the input form . It is change of the listener */\n    (0,_get_messages__WEBPACK_IMPORTED_MODULE_2__[\"default\"])((0,_postmen_sendler_message__WEBPACK_IMPORTED_MODULE_0__[\"default\"])());\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (manageOldMessageTotal);\n\n//# sourceURL=webpack://shop/./src/scripts/services/handlers/messages/old-message/old-messages.ts?");

/***/ }),

/***/ "./src/scripts/services/handlers/messages/old-message/paste-olde-message.ts":
/*!**********************************************************************************!*\
  !*** ./src/scripts/services/handlers/messages/old-message/paste-olde-message.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction builderOldMessage(_ref) {\n  let {\n    postIndex,\n    postMessage\n  } = _ref;\n  const postHml = document.querySelector(\"div[data-post=\\\"\".concat(postIndex, \"\\\"]\"));\n  if (postHml === null) {\n    console.log('[builderOldMessage > postHml]: Something that wrong/ Here can not find the post box through an index');\n    return;\n  }\n  const boxMessageHtml = postHml.getElementsByClassName('user-message');\n  if (boxMessageHtml === null) {\n    console.log(\"[builderOldMessage > boxMessageHtml]: Something that wrong/ Here can't find the post with message old\");\n    return;\n  }\n  const copy = boxMessageHtml[0].cloneNode(true);\n  const old = boxMessageHtml[0].outerText;\n  const c = copy.innerText.replace(old, postMessage);\n  boxMessageHtml[0].replaceWith(c);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (builderOldMessage);\n\n//# sourceURL=webpack://shop/./src/scripts/services/handlers/messages/old-message/paste-olde-message.ts?");

/***/ }),

/***/ "./src/scripts/services/handlers/messages/old-message/paste-quote.ts":
/*!***************************************************************************!*\
  !*** ./src/scripts/services/handlers/messages/old-message/paste-quote.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// app_messager\\frontend\\src\\scripts\\services\\handlers\\messages\\old-message\\paste-quote.ts\n\n/**\r\n * @param 'text:string' Here we paste the old message for editing. Edition in the bottom input form. \r\n */\nconst addQuote = text => {\n  const inputBox = document.getElementById('messager');\n  if (inputBox === null) {\n    console.log('[addQuote]: Html input not found');\n  }\n  /* add quote */\n  const quoteHtml = document.createElement('div');\n  quoteHtml.className = 'quote active';\n  quoteHtml.innerText = text;\n  inputBox === null || inputBox === void 0 || inputBox.insertAdjacentHTML('beforebegin', quoteHtml.outerHTML);\n\n  /* add text to the input form */\n  inputBox.value = text;\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (addQuote);\n\n//# sourceURL=webpack://shop/./src/scripts/services/handlers/messages/old-message/paste-quote.ts?");

/***/ }),

/***/ "./src/scripts/services/handlers/messages/sub-handler/subhandler-click.ts":
/*!********************************************************************************!*\
  !*** ./src/scripts/services/handlers/messages/sub-handler/subhandler-click.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// app_messager\\frontend\\src\\scripts\\services\\handlers\\messages\\sub-handler\\subhandler-click.ts\n\n/**\r\n * This is only  a logic action after the event click or 'Enter' keybord.\r\n * @param `h`: `(e: MouseEvent) => void` is function. That is sction after the events\r\n * @returns void\r\n */\nconst eventClickManage = h => {\n  return e => {\n    const boxMess = e.currentTarget;\n    if (boxMess === null && e.type !== 'submit') {\n      return;\n    }\n    const inputHtml = boxMess.querySelector('input[type=\"text\"]');\n    if (inputHtml === null) {\n      return;\n    }\n    const messages = inputHtml.value.length > 0 ? inputHtml.value.trim() : '';\n    if (messages.length > 0 || !(typeof JSON.parse(localStorage.getItem('data')).fileId).includes('boolean')) {\n      /* ------ events clearing ------ */\n      if (e.target.tagName === 'INPUT') {\n        return;\n      }\n      h(e);\n    }\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (eventClickManage);\n\n//# sourceURL=webpack://shop/./src/scripts/services/handlers/messages/sub-handler/subhandler-click.ts?");

/***/ }),

/***/ "./src/scripts/services/handlers/messages/sub-handler/subhandler-key.ts":
/*!******************************************************************************!*\
  !*** ./src/scripts/services/handlers/messages/sub-handler/subhandler-key.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// app_messager\\frontend\\src\\scripts\\services\\handlers\\messages\\sub-handler\\subhandler-key.ts\n\nconst eventKeyupManage = h => {\n  return e => {\n    if (e.key === 'Enter') {\n      const target = e.target;\n      const messages = target.value.length > 0 ? target.value.trim() : '';\n      if (messages.length > 0 || !(typeof JSON.parse(localStorage.getItem('data')).fileId).includes('boolean')) {\n        h(e);\n      }\n    }\n    ;\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (eventKeyupManage);\n\n//# sourceURL=webpack://shop/./src/scripts/services/handlers/messages/sub-handler/subhandler-key.ts?");

/***/ }),

/***/ "./src/scripts/services/handlers/scrolling.ts":
/*!****************************************************!*\
  !*** ./src/scripts/services/handlers/scrolling.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ scrollToBottom)\n/* harmony export */ });\nfunction scrollToBottom() {\n  const chatBox = document.querySelector('#chat');\n  if (chatBox === null) {\n    return;\n  }\n  chatBox.scrollTo({\n    top: document.body.scrollHeight,\n    behavior: 'smooth'\n  });\n}\n\n//# sourceURL=webpack://shop/./src/scripts/services/handlers/scrolling.ts?");

/***/ }),

/***/ "./src/scripts/services/message.ts":
/*!*****************************************!*\
  !*** ./src/scripts/services/message.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// app_messager\\frontend\\src\\scripts\\services\\message.ts\nfunction getTextOfInput() {\n  const messageInputHtml = document.querySelector('#messager');\n  const massage_ = messageInputHtml !== null ? messageInputHtml.value : 'NoN';\n  return massage_;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getTextOfInput);\n\n//# sourceURL=webpack://shop/./src/scripts/services/message.ts?");

/***/ }),

/***/ "./src/scripts/services/postmen/sendler-old-post.ts":
/*!**********************************************************!*\
  !*** ./src/scripts/services/postmen/sendler-old-post.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Service_cookies__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Service/cookies */ \"./src/scripts/services/cookies.ts\");\n/* harmony import */ var _Service_message__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Service/message */ \"./src/scripts/services/message.ts\");\n// app_messager\\frontend\\src\\scripts\\services\\postmen\\sendler-old-post.ts\n\n\n\nconst changeOldPost = async event => {\n  /* ------ LocalStorage ------ */\n  const localS = localStorage.getItem('data');\n  const localSJson = JSON.parse(localS);\n  localStorage.setItem('data', JSON.stringify(localSJson));\n  const postId_ = localSJson.postId;\n  const massage_ = (0,_Service_message__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n  /* ------ Fetch & PATCH for one message which did user be posted & the single column ------ */\n  const url = new URL(\"api/chat/patch/\".concat(Number(postId_), \"/\"), 'http://127.0.0.1:8000/');\n  const response = await fetch(url, {\n    method: 'PATCH',\n    headers: {\n      'X-CSRFToken': (0,_Service_cookies__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('csrftoken'),\n      'Content-Type': 'application/json'\n    },\n    body: JSON.stringify({\n      content: String(massage_)\n    })\n  });\n  if (!response.ok) {\n    console.log('[changeOldPost > PATCH] response is not a true');\n    return {\n      response: false\n    };\n  }\n  const reresponseJson = await response.json();\n  return reresponseJson;\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (changeOldPost);\n\n//# sourceURL=webpack://shop/./src/scripts/services/postmen/sendler-old-post.ts?");

/***/ }),

/***/ "./src/scripts/services/postmen/sendler_message.ts":
/*!*********************************************************!*\
  !*** ./src/scripts/services/postmen/sendler_message.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Service_cleaner__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Service/cleaner */ \"./src/scripts/services/cleaner.ts\");\n/* harmony import */ var _Service_handlers_getDataTime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Service/handlers/getDataTime */ \"./src/scripts/services/handlers/getDataTime.ts\");\n/* harmony import */ var _Service_message__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @Service/message */ \"./src/scripts/services/message.ts\");\n/* harmony import */ var _Websocket__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @Websocket */ \"./src/scripts/websockets/index.ts\");\n// app_messager\\frontend\\src\\scripts\\services\\sendler_message.ts\n\n\n\n\n\nconst socket = new _Websocket__WEBPACK_IMPORTED_MODULE_3__.WSocket('ws://127.0.0.1:8000/ws/chat/');\n/**\n *!! ключ группы изменить на динамический !!\n * @param 'corrects:boolean' That is 'true' then is event by send the new message. \\\n * If value is 'false', than send the old message.  It's a post wich has a correcte\n * @returns Promise<void>\n */\nconst handlerSendlerMessageTotal = function () {\n  let corrects = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;\n  return async e => {\n    let fileIdArr = [];\n    let timeItervale;\n\n    /* localStorage */\n    const dataLocalJson = JSON.parse(localStorage.getItem('data'));\n    if (dataLocalJson.fileId === true) {\n      timeItervale = setTimeout(() => {\n        handlerSendlerMessageTotal(e);\n      }, 300);\n      return;\n    } else if (!(typeof dataLocalJson.fileId).includes('boolen')) {\n      clearTimeout(timeItervale);\n      fileIdArr = JSON.parse(dataLocalJson.fileId).list_indexes;\n    }\n    const target = e.target;\n    const curranTarget = e.currentTarget !== null ? e.currentTarget : e.target;\n\n    // const messages = ((target.type).includes('submit')) ? ((curranTarget as HTMLElement).querySelector('#messager') as HTMLInputElement).value.trim() : target.value.trim();\n    const messages = (0,_Service_message__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\n    const indexUser = target.dataset.id;\n    const datetime = _Service_handlers_getDataTime__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getFullTime();\n    const postIndex = localStorage.getItem('data') !== null ? JSON.parse(localStorage.getItem('data')).postId : -1;\n    if (postIndex < 0) {\n      console.log('[handlerSendlerMessageTotal > corrects TRUE]: something is thrang. That is \"postId\" not found');\n      return;\n    }\n    //  && (messageFormHTML as HTMLInputElement).value.length > 0) || (!(typeof (JSON.parse(localStorage.getItem('data') as string).fileId)).includes('boolen'))\n\n    if ((typeof fileIdArr).includes('object')) {\n      if (!corrects) {\n        socket.beforeSend(String([JSON.stringify({\n          corrects,\n          eventtime: datetime,\n          message: messages,\n          userId: indexUser,\n          groupId: '7a3a744a-64ab-492b-89bf-9ee7c72b91f1',\n          fileIndex: fileIdArr\n        })]));\n        await socket.dataSendNow();\n      } else {\n        socket.beforeSend(String([JSON.stringify({\n          corrects,\n          eventtime: datetime,\n          message: messages,\n          userId: indexUser,\n          groupId: '7a3a744a-64ab-492b-89bf-9ee7c72b91f1',\n          fileIndex: fileIdArr,\n          postId: postIndex\n        })]));\n        await socket.dataSendNow();\n      }\n    } else {\n      if (!corrects) {\n        // номер поста\n        socket.beforeSend(String([JSON.stringify({\n          corrects,\n          eventtime: datetime,\n          message: messages,\n          userId: indexUser,\n          groupId: '7a3a744a-64ab-492b-89bf-9ee7c72b91f1'\n        })]));\n        await socket.dataSendNow();\n      } else {\n        socket.beforeSend(String([JSON.stringify({\n          corrects,\n          eventtime: datetime,\n          message: messages,\n          userId: indexUser,\n          groupId: '7a3a744a-64ab-492b-89bf-9ee7c72b91f1',\n          postId: postIndex\n        })]));\n        await socket.dataSendNow(); // ???\n      }\n    }\n    (0,_Service_cleaner__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handlerSendlerMessageTotal);\n\n//# sourceURL=webpack://shop/./src/scripts/services/postmen/sendler_message.ts?");

/***/ }),

/***/ "./src/scripts/templates/checkers/checkUseId.ts":
/*!******************************************************!*\
  !*** ./src/scripts/templates/checkers/checkUseId.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ checkerUserId)\n/* harmony export */ });\n// app_messager\\frontend\\src\\scripts\\templates\\checkers\\checkUseId.ts\n\nfunction checkerUserId(userId) {\n  const inputHtml = document.getElementById('messager');\n  if (inputHtml === null) {\n    console.error('[templates/messages.ts > checkYourOnNotYour]: ERROR. What something wrong with the \"inputHtml\"!');\n    return;\n  }\n  const inputUserId = inputHtml.dataset.id;\n  if (inputUserId === undefined) {\n    console.error('[templates/messages.ts > checkYourOnNotYour]: ERROR. What something wrong with the \"inputUserId\"!');\n    return;\n  }\n  const userIdNumber = (typeof userId).includes('string') ? Number(userId) : userId;\n  const result = userIdNumber === Number(inputUserId);\n  return result;\n}\n\n//# sourceURL=webpack://shop/./src/scripts/templates/checkers/checkUseId.ts?");

/***/ }),

/***/ "./src/scripts/templates/checkers/checker_time.ts":
/*!********************************************************!*\
  !*** ./src/scripts/templates/checkers/checker_time.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ checkOfTime)\n/* harmony export */ });\n/* harmony import */ var _Service_handlers_getDataTime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Service/handlers/getDataTime */ \"./src/scripts/services/handlers/getDataTime.ts\");\n// app_messager\\frontend\\src\\scripts\\templates\\checker_time.ts\n\nfunction checkOfTime(dateTime) {\n  const oldDate = dateTime.split('@')[0];\n  const t = dateTime.split('@')[1];\n  if (oldDate.includes(_Service_handlers_getDataTime__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getNowDate())) {\n    return t;\n  }\n  ;\n  const d = dateTime.split('@')[0];\n  return d + ' ' + t;\n}\n\n//# sourceURL=webpack://shop/./src/scripts/templates/checkers/checker_time.ts?");

/***/ }),

/***/ "./src/scripts/templates/messages.ts":
/*!*******************************************!*\
  !*** ./src/scripts/templates/messages.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createChatMessage: () => (/* binding */ createChatMessage)\n/* harmony export */ });\n/* harmony import */ var _Service_handlers_scrolling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Service/handlers/scrolling */ \"./src/scripts/services/handlers/scrolling.ts\");\n/* harmony import */ var _checkers_checkUseId__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./checkers/checkUseId */ \"./src/scripts/templates/checkers/checkUseId.ts\");\n/* harmony import */ var _checkers_checker_time__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./checkers/checker_time */ \"./src/scripts/templates/checkers/checker_time.ts\");\n/* harmony import */ var _Service_handlers_messages_old_message_edit_message__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @Service/handlers/messages/old-message/edit-message */ \"./src/scripts/services/handlers/messages/old-message/edit-message.ts\");\n// app_messager\\frontend\\src\\scripts\\templates\\messages.ts\n\n\n\n\n\n\n/**\n * This's function insert a new message to the chat.\n * @param `userId` - thi's user id of the user who is senter\n * @param 'dataTime' - it's the time then user sends the message.\n * We gets from a data format: \"eventtime\":\"2024-4-13@6:2:14:38\"\n * @param `authorId` - This's a name. It's who is sends.\n * @param 'message' - This's the message's text.\n * @returns html-text of a box.\n */\nasync function createChatMessage(_ref) {\n  let {\n    authorId,\n    dataTime,\n    message,\n    groupId = undefined,\n    postId = '',\n    filesId = []\n  } = _ref;\n  /*\n    we change the group number.\n  */\n  const groupNumber = document.getElementById('group');\n  console.log(\"[PUBLIC > FILES]: \".concat(filesId[0]));\n  if (groupNumber === null || groupId === undefined || groupNumber.dataset.groupid === undefined || !groupNumber.dataset.groupid.includes(groupId)) {\n    return;\n  }\n  let linkFilesArr = [];\n  if (filesId.length > 0) {\n    /** indexes of the files inserted to the parameters from the URL */\n    const url = new URL('api/chat/upload/files/', 'http://127.0.0.1:8000/');\n    url.searchParams.set('ind', String(filesId));\n    const response = await fetch(url, {\n      method: 'GET',\n      headers: {\n        'Content-Type': 'application/json'\n      }\n    });\n    if (response.ok) {\n      const data = await response.json();\n      console.info('[createChatMessage > LINK]:', data);\n      const dataList = JSON.parse(data.files).linkList;\n      linkFilesArr = dataList.slice(0);\n    }\n  }\n\n  /**\n   * insert the message box in chat\n   */\n  const htmlChat = groupNumber.querySelector('#chat');\n  if (htmlChat === null) {\n    return;\n  }\n  const htmlMessage = document.createElement('div');\n  if (message === undefined || (typeof message).includes('string') && message.length === 0 && filesId.length === 0) {\n    return;\n  }\n\n  /*  file's links adding to the message */\n  let refer = '<ul>';\n  if (linkFilesArr.length > 0) {\n    for (let i = 0; i < linkFilesArr.length; i++) {\n      const len = linkFilesArr[i].split('/').length;\n      const urlOrigin = window.location.origin;\n      refer += \"<li><a target=\\\"_blank\\\" href=\\\"\".concat(urlOrigin, \"/media/\").concat(linkFilesArr[i].slice(0), \"\\\">\").concat(linkFilesArr[i].split('/')[len - 1], \"</a></li>\");\n    }\n  }\n  const resultCheckUser = (0,_checkers_checkUseId__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(authorId);\n  if (resultCheckUser !== undefined) {\n    // dataTime.replace(/[: @]/g, '-')\n    /* 'postId' - data receeiving from the db's timestamp */\n    htmlMessage.dataset.post = postId;\n    htmlMessage.innerHTML = \"\\n      <div >\\n        <img src=\\\" https://bootdey.com/img/Content/avatar/avatar3.png\\\" class=\\\"rounded-circle mr-1\\\" alt=\\\"Sharon Lessman\\\"\\n          width=\\\"40\\\" height=\\\"40\\\" />\\n        <div class=\\\"text-muted small text-nowrap mt-2\\\">\".concat((0,_checkers_checker_time__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(dataTime), \"</div>\\n      </div>\\n      <div class=\\\"flex-shrink-1 bg-light rounded py-2 px-3 ml-3\\\">\\n        <div class=\\\"font-weight-bold mb-1\\\">\").concat(resultCheckUser ? 'You' : 'NOT your', \"</div>\\n        <div class='pencil'></div>\\n        <div class=\\\"user-message\\\">\\n        \").concat(message, \"\\n        </div>\\n      </div>\\n  \");\n    htmlMessage.innerHTML += refer.length > 10 ? \"<div class=\\\"download\\\">\".concat(refer, \"</ul></div>\") : '';\n    // debugger\n    const rightLeft = resultCheckUser ? 'chat-message-right' : 'chat-message-left';\n    const res = authorId;\n    htmlMessage.setAttribute('data-id', res); // data-user-id\n    htmlMessage.className = 'pb-4 message';\n    htmlMessage.classList.add(rightLeft);\n    const oldChat = htmlChat === null || htmlChat === void 0 ? void 0 : htmlChat.innerHTML;\n    const newBox = htmlMessage.outerHTML;\n    htmlChat.insertAdjacentHTML('beforeend', newBox); // = combinedHTML;\n\n    /*  cleaning to the datas */\n    filesId = [];\n    if (refer.length > 10) {\n      localStorage.setItem('data', JSON.stringify({\n        fileId: false\n      }));\n    }\n    ;\n    // and\n    refer = '<ul>';\n    const boxMess = document.querySelector(\"div[data-post=\\\"\".concat(postId, \"\\\"]\"));\n    if (boxMess !== null) {\n      const Pencil_ = new _Service_handlers_messages_old_message_edit_message__WEBPACK_IMPORTED_MODULE_3__.Pencil(boxMess);\n      Pencil_.start();\n    }\n    if (boxMess === null) {\n      return;\n    }\n  }\n  /**\n   * scroll\n   */\n  (0,_Service_handlers_scrolling__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n}\n\n//# sourceURL=webpack://shop/./src/scripts/templates/messages.ts?");

/***/ }),

/***/ "./src/scripts/websockets/index.ts":
/*!*****************************************!*\
  !*** ./src/scripts/websockets/index.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   WSocket: () => (/* binding */ WSocket)\n/* harmony export */ });\n/* harmony import */ var _Service_handlers_messages_old_message_paste_olde_message__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Service/handlers/messages/old-message/paste-olde-message */ \"./src/scripts/services/handlers/messages/old-message/paste-olde-message.ts\");\n/* harmony import */ var _htmlTemplates_messages__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @htmlTemplates/messages */ \"./src/scripts/templates/messages.ts\");\nfunction _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == typeof i ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != typeof i) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\n// app_messager\\frontend\\src\\scripts\\websockets\\index.ts\n\n\n\n\n/**\n * Класс для работы с \"WebSocket\" протоколом.\n * Запускает прослушку событий:\n * - 'open';\n * - 'message';\n * -'close'.\n *  Каждое событие запускает фукцию по умолчанию.\n * Каждую функцию можно переписать под свои условия.\n *\n *  Есть фунция зкрытия соединения.\n *  Она возвращает соманду - закрыть соединение.\n */\nclass WSocket {\n  constructor(url) {\n    _defineProperty(this, \"socket\", void 0);\n    _defineProperty(this, \"handlers\", void 0);\n    _defineProperty(this, \"onMessage\", e => {\n      console.log('-------------------');\n      const dataJson = JSON.parse(e.data);\n      const resp = dataJson.text !== undefined ? dataJson.text : e.data.includes('groupId') ? e.data : null;\n      if (resp === null) {\n        return;\n      }\n      ;\n      const dataTextJson = JSON.parse(resp);\n      const message = dataTextJson.message;\n      const authorId = String(dataTextJson.userId);\n      const postId = String(dataTextJson.postId);\n      const groupId = dataTextJson.groupId;\n      const dataTime = dataTextJson.eventtime;\n      console.log(\"[websokets > RECIVED MESS]: \".concat(dataJson));\n      // debugger\n      const filesId = dataJson.fileIndex !== undefined ? dataJson.fileIndex : [];\n      // console.log(`[websokets > RECIVED FILES]: ${dataJson}`);\n      if (dataTextJson.corrects !== true) {\n        (0,_htmlTemplates_messages__WEBPACK_IMPORTED_MODULE_1__.createChatMessage)({\n          authorId,\n          dataTime,\n          message,\n          groupId,\n          postId,\n          filesId\n        });\n      } else {\n        const postIndex = postId;\n        const postMessage = message;\n        (0,_Service_handlers_messages_old_message_paste_olde_message__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n          postIndex,\n          postMessage\n        });\n      }\n    });\n    this.socket = new WebSocket(url);\n    this.socket.addEventListener('open', e => {\n      console.info(\"[WSocket > OPEN]: \".concat(e));\n    });\n    this.socket.addEventListener('message', e => {\n      console.info(\"[WSocket > MESSAGE]: WebSocket - message was received; MESSAGE: \".concat(e.target.url));\n      this.onMessage(e);\n    });\n    this.socket.onbeforeunload = function () {\n      this.socket.send('ping');\n    };\n    this.socket.addEventListener('close', e => {\n      console.info(\"[WSocket > CLOSE]: - connection was CLOSED: \".concat(e.message));\n    });\n    this.socket.addEventListener('error', e => {\n      console.info(\"[WSocket > ERROR]: - connection was ERROR: \".concat(e));\n    });\n    this.handlers = {\n      open: [],\n      close: [],\n      data: []\n    };\n  }\n\n  /**\n   * Here we getting the data for a send.\n   * Entry point getting JSON.stringfy\n   * @param datas void\n   */\n  beforeSend(datas) {\n    // debugger;\n    try {\n      if ((typeof JSON.parse(datas)).includes('object')) {\n        this.handlers.data.push(datas);\n      } else {\n        console.log('[websokets: SENDS]: Received datas is a not JSON object. ');\n      }\n    } catch (e) {\n      console.error(\"[websokets: sends ERROR]: Received datas and what went wrong. It is not JSON object. MESSAGE: \".concat(e.message));\n    }\n  }\n  get readyState() {\n    const handlers = this.handlers;\n    return handlers;\n  }\n  onClose() {\n    this.socket.close();\n  }\n  dataSendNow() {\n    const data = this.readyState.data.slice(0)[0];\n    console.log('[websokets > OPEN > BEFORE SEND]: Message was a pass - Ok', data);\n    console.log(\"[websokets > OPEN > BEFORE SEND]:  ReadyState: \".concat(this.socket.readyState));\n    if (this.socket.readyState === WebSocket.OPEN) {\n      this.socket.send(data);\n      console.log('[websokets > OPEN > AFTER SEND]: Ok', this.socket.readyState);\n      this.handlers.data.pop();\n    } else {\n      console.info(\"[websokets > CLOSE ERROR]:  In Now time can't send message to the WebSocket.WebSocket is closed\");\n      return false;\n    }\n  }\n} // oldDataSendNow(): void {\n//   null;\n// }\n\n// WebSocets\n\n//# sourceURL=webpack://shop/./src/scripts/websockets/index.ts?");

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