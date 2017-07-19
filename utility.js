/*
This file is for utility functions only.
Functions should have no state and should not be dependent on code outside this file.
No jQuery, etc.
May include functions with some unsupported environments but should avoid latest js.
*/

function copyVariable(variable, keepReferences){
  var copy = null;
  if(isObject(variable)){
    if(keepReferences){
      copy = Object.assign({}, variable)
    }else{
      copy = copyObject(variable);
    }
  }else if(Array.isArray(variable)){
    if(keepReferences){
      copy = variable.slice(0);
    }else{
      copy = copyObject(variable);
    }
  }else{
    copy = variable;
  }
  
  return copy;
}

function copyObject(obj){
  //Object.assign({}, obj); seems to keep inner references.
  var copy = JSON.parse(JSON.stringify(obj));
  return copy;
}

function equals(a, b){
  /*
  Required because NaN !== NaN:
  var i = document.createElement("input"); i.valueAsNumber === i.valueAsNumber;
  https://stackoverflow.com/questions/19955898/why-is-nan-nan-false
  */
  
  if(Number.isNaN(a)){
    return Number.isNaN(b);
  }
  
  else{
    return (a === b);
  }
}

function dataEquals(a, b){
  /*
  Looks at data only(No object === object comparison. Instead checks each key and value)
  */
  
  if(isObject(a) && isObject(b)){
    return objectDataEquals(a, b);
  }
  
  else{
    return equals(a, b);
  }
}

function dataInArray(data, arr){
  for(var i=0; i<arr.length; i++){
    if(dataEquals(data, arr[i])){
      return true;
    }
  }
  
  //FAILED
  return false;
}

function arrayEquals(a, b){
  if(a.length !== b.length){
    return false;
  }
  
  for(var i=0; i<a.length; i++){
    if(!equals(a[i], b[i])){
      return false;
    }
  }
  
  //PASSED
  return true;
}

function objectDataEquals(a, b, looped){
  if(!looped){//Keys only
    looped = [];
  }
  
  //Key check
  if(!arrayEquals(Object.keys(a), Object.keys(b))){
    return false;
  }
  
  for(var key in a){
    
    //Ignore already looped
    if(looped.indexOf(key) >= 0){
      continue;
    }
    
    looped.push(key);
    
    //Type check
    if(typeof a[key] !== typeof b[key]){
      return false;
    }
    
    //Value check
    if(isObject(a[key])){
      if(!objectDataEquals(a[key], b[key], looped)){
        return false;
      }
    }else if(Array.isArray(a[key])){
      if(!arrayEquals(a[key], b[key])){
        return false;
      }
    }else{
      if(!equals(a[key], b[key])){
        return false;
      }
    }
  }
  
  //PASSED
  return true;
}

function applyObj(from, to, condition){

  //Check
  if(!isObject(from) || !isObject(to)){
      return false;
  }

  for(var key in from){

    //Condition handling
    if(condition && !condition(key, from, to)){
        continue;
    }

    //Set
    to[key] = from[key];
  }

  return to;
}

function loopObject(obj, onItem, looped){
  
  //Prevents cyclic reference infinite looping
  if(!looped){
    looped = [];
  }
  
  looped.push(obj);
  
  var returnValue;
  for(var key in obj){
    
    //Nested loop
    if( isNonDomObject(obj[key])){
      
      if(!dataInArray(obj[key], looped)){
        loopObject(obj[key], onItem, looped);
      }else{
        //IGNORE
      }
    }
    
    //Handle
    returnValue = onItem(obj, key, obj[key]);
    if(!equals(returnValue, obj[key])){
      obj[key] = returnValue;
    }
  }
  
  return obj;
}

function loopObjectComplex(obj, onItem, status){
  /*
  Complex version of looping object.
  Passes on all possible data in status object.
  Will be slower than simple looping object function.
  */
  
  if(!status){
    status = {
      firstObject: obj,
      looped: [],
      object: obj,
      key: null,
      value: null,
      path: [],
      levels: 0,
      returnValue: null
    };
  }
  
  status.looped.push(obj);
  
  //Object checking
  if(status.object && status.key !== null){
    onItem(status);
  }
  
  var i = 0;
  var keys = [];
  var checkedKeys = [];
  keys = Object.keys(obj);//Using keys array makes it possible to update keys dynamically.
  while(i < keys.length){
    key = keys[i];
    
    //Duplicate checking
    if(checkedKeys.indexOf(key) >= 0){
      i++;
      continue;
    }else{
      checkedKeys.push(key);
    }
    
    //Update status
    status.object = obj;
    status.key = key;
    status.value = obj[key];
    status.returnValue = status.value;
    
    //Path(start)
    status.path.push(key);
    status.levels = status.path.length;
    
    //Nested loop
    if( isNonDomObject(obj[key]) ){
      
      if(!dataInArray(obj[key], status.looped)){
        loopObjectComplex(obj[key], onItem, status);
      }else{
        //IGNORE
      }
    }
    
    else{
      onItem(status);
      if(!equals(status.value, status.returnValue)){
        obj[key] = status.returnValue;
      }
    }
    
    //Path(end)
    status.path.pop();
    status.levels = status.path.length;
    
    //Key
    keys = Object.keys(obj);
    i = 0;
  }
  
  return obj;
}

function expandCommonObjectIntoObject(obj, parentObj, insertIndex){
  //Expands and inserts data of object into object.
  
  var key, i;
  if(Array.isArray(parentObj)){
    for(i=0; i<obj.length; i++){
      key = (insertIndex + i);
      
      parentObj.splice(key, 0, obj[i]);//Moves rest forwards
    }
  }else{
    for(key in obj){
      parentObj[key] = obj[key];
    }
  }
  
  return parentObj;
}

function deleteObjectProperty(obj, prop){
  //Handles array or obj because indexing similar.
  
  if(Array.isArray(obj)){
    var index = obj.indexOf(prop);
    if(index >= 0){
      prop.splice(index, 1);
    }
  }else{
    delete obj[prop];
  }
}

function promptPrint(){
  window.print();
}

//Handling
function e(id){
  return document.getElementById(id);
}

function getElementsByIds(ids){
  var elements = [];
  var element;
  
  for(var i=0; i<ids.length; i++){
    element = e(ids[i]);
    if(element){elements.push(element);}
  }
  
  return elements;
}

function log(data, options){
  //https://developers.google.com/web/tools/chrome-devtools/console/console-write#styling_console_output_with_css
  if(!options){
    options = {
      prettify: false,
      title: "",
      beforeLog: null,
      afterLog: null,
      type: "log",//console functions: log, info, warn, error, ...
    };
  }
  
  if(!window.console){
    return false;
  }
  
  //Type
  var type = "log";
  if(options.type && console[type]){
    type = options.type;
  }
  
  //Prettify
  if(options.prettify){
    options.beforeLog = function(){log("");};
  }
  
  if(options.beforeLog){options.beforeLog(data);}
  if(options.title){console.log(options.title);}
  console[type](data);
  if(options.afterLog){options.afterLog(data);}
}

function logObjectOnSingleLine(obj){
  var str = "";
  var LF = "\n";
  for(var key in obj){
    str+= (key + ": " + String(obj[key]) + LF);
  }
  
  console.log(str);
}

function getDataUrlExtension(dataUrl){
  return dataUrl.split(";")[0].split("/")[1];
}

function download(data, name, mimeType){
  var blob = new Blob([data], {type: mimeType});
  return downloadBlob(blob, name);
}

function downloadDataUrl(dataUrl, name){
  var url = dataUrl.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
  var extension = getDataUrlExtension(dataUrl);
  var fullName = (name + "." + extension);
  downloadLink(url, fullName);
}

function downloadBlob(blob, name){
  //CREATE URL ELEMENT
  var url = window.URL.createObjectURL(blob);
  
  //EXTENSION
  var extension;
  if(blob.type){
      extension = blob.type.split("/")[1];
  }else{
      extension = "txt";
  }

  //FULL NAME
  var fullName = (name + "." + extension);

  //Internet Explorer
  if(window.navigator.msSaveBlob){
    window.navigator.msSaveBlob(blob, fullName);
  }

  //Other
  else{
    downloadLink(url, fullName);
  }

  //COMPLETE
  return true;
}

function downloadLink(url, fullName){
  //CREATE LINK
  var link = window.document.createElement('a');
  link.href = url;
  link.download = fullName;

  //Need to append child in Firefox
  document.body.appendChild(link);

  //EXECUTE LINK
  link.click();
  /*
  //Doesn't work in Firefox
  var click = document.createEvent("Event");
  click.initEvent("click", true, true);
  link.dispatchEvent(click);
  */

  //Remove Link
  link.parentElement.removeChild(link);
}

function toReadableString(data){

    //Default
    var str = "";

    if(isObject(data)){
        try{
            var tempStr = JSON.stringify(data);
            str = tempStr;
        }catch(err){
            log(err);
        }
    }

    else{
        str = String(data);
    }

    return str;
}

function toObject(data){

  var obj = {};

  try{
    var tempObj = parseJson(data);
    obj = tempObj;
  }catch(err){
    log(err);
  }

  return obj;
}

function parseFuzzyJson(str){
  var obj;
  
  //Try standard JSON
  obj = parseJson(str);
  if(obj === null){
    //Non-sandboxed(DON'T USE USER CONTENT! DANGEROUS!)
    try{
      obj = eval("(" + str + ")");
    }catch(err){
      obj = null;
    }finally{
      
    }
  }
  
  return obj;
}

function parseJson(str){
  //With no errors + checks for support.
  //Returns null on bad.

  if(!window.JSON){
    return null;
  }

  try{
    var json = JSON.parse(str);
    return json;
  }catch(err){
    return null;
  }
}

function stringifyJson(json){
  if(!window.JSON){
    return null;
  }

  try{
    var str = JSON.stringify(json);
    return str;
  }catch(err){
    return null;
  }
}

function isObject(obj){
  //object that can be traversed
  if(
    typeof obj === "object" &&
    obj !== null &&
    !Array.isArray(obj)
  ){
    return true;
  }else{
    return false;
  }
}

function isNonDomObject(obj){
  if(isObject(obj) && !obj.nodeType){
    return true;
  }else{
    return false;
  }
}

function getDataSet(data){
  //SPEC: Makes sure format is ok for server.

  if(!isObject(data)){
      return {};
  }

  return data;
}

function executeAjax(dataSet, url, options){
  //SPEC: dataSet is simple obj  with key/value pairs.

  //Default
  //

  //Options
  if(isObject(options)){
      //
  }

  //URL check
  if(!url){
    return handleAjaxResponse({}, options);
  }

  //Header settings
  var contentEncoding = "gzip";
  var contentType = "application/x-www-form-urlencoded; charset=UTF-8";

  //Data
  var params = getAjaxParams(dataSet);

  //Connection
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);//Always async
  xhr.setRequestHeader("Content-Encoding", contentEncoding);
  xhr.setRequestHeader("Content-Type", contentType);//REQUIRED FOR PARAMS FORMAT
  xhr.onload = function(xhr){
    handleAjaxResponse(xhr, options);
  }
  xhr.onerror = function(){
    handleAjaxResponse(xhr, options);
  }
  return xhr.send(params);
}

function getAjaxParams(obj){

  var params = "";
  var i = 0;

  for(var key in obj){
    if(i > 0){params+= "&";}
    params+= key;
    params+= "=";
    params+= encodeURIComponent(obj[key]);

    //Inc
    i++;
  }

  return params;
}

function handleAjaxResponse(xhr, options){

  //Not finished
  if(xhr && xhr.responseType !== xhr.DONE){
      return false;
  }

  //Default
  var callback = null;

  //Options
  if(isObject(options)){

    //Callback
    if(options.callback !== undefined){
        callback = options.callback;
    }
  }

  //Handle response
  var response = false;
  if(xhr){
    response = xhr.response;
  }

  //Callback
  return handleCallback(callback, [response, xhr]);
}

function handleCallback(callback, args){
  if(!callback){
      return args[0];
  }

  return callback.apply(this, args);
}

function exportData(data){
  var str = toReadableString(data);
  return prompt("", str);
}

function downloadData(data, name){
  var downloadableData = data;//Process here
  if(!name){
    name = "untitled";
  }
  return download(downloadableData, name, "text/txt");
}

function handlePrompt(handle, text, defaultText){
  var value = window.prompt(text, defaultText);
  return handle(value);
}

function getCurrentDate(){
  var date = new Date();
  return date;
}

//Formatting
function getFormattedDate(date, format){
  //SPEC: Accepts date native obj.

  //US
  if(format === "us"){
      return formatDate(date, "MM/DD/YYYY");
  }

  //UK
  else if(format === "uk"){
      return formatDate(date, "DD/MM/YYYY");
  }

  //Japan
  else if(format === "jp"){
      return formatDate(date, "YYYY/MM/DD");
  }

  //Japan kanji
  else if(format === "jp_kanji"){
      return formatDate(date, "YYYY年/MM月/DD日");
  }

  else{
      return date;
  }
}

function formatDate(date, format){
  //Simple function. Use library for more complex formatting.
  //Return string.
  
  var replacements = {
    YYYY: date.getFullYear(),
    MM: (date.getMonth() + 1),
    DD: date.getDate()
  };
  
  var str = date.toDateString();
  for(var key in replacements){
    str = replaceAll(str, key, replacements[key]);
  }
  
  return str;
}

function getFormattedPhoneNumber(numberStr, format){
    /*
    Formats:
    3-4-4-hyphen
    */

    //JP
    if(format === "3-4-4-hyphen"){
        return getFormattedString(numberStr, "-", [3, 4, 4]);
    }

    else{
        return numberStr;
    }
}

function getFormattedString(str, delimiter, lenArr){

    //Ignore no formatting
    if(!delimiter || !lenArr || lenArr.length === 0){
        return str;
    }

    var returnStr = "";
    var curIndex = 0;//Same as done.
    var remaining = 0;
    var length = str.length;

    for(var i=0; i<lenArr.length; i++){

        //Remaining digits
        remaining = length - curIndex;

        //Delimiter
        if(i>0){
            returnStr+= delimiter;
        }

        //Add data
        returnStr+= str.substr(curIndex, lenArr[i]);

        //Cur index
        curIndex+= lenArr[i];
    }

    return returnStr;
}

function getFormattedZipCode(zipCode, format){
    /*
    Formats:
    3-4-hyphen
    */

    //JP
    if(format === "jp"){
        return "〒" + getFormattedString(zipCode, "-", [3, 4]);
    }

    //US
    else if(format === "5-4-hyphen"){
        return getFormattedString(zipCode, "-", [5, 4]);
    }

    //UK
    else if(format === "4-3-space"){
        return getFormattedString(zipCode, " ", [4, 3]);
    }

    else{
        return zipCode;
    }
}

function getCurrentLocation(callback){
    return navigator.geolocation.getCurrentPosition(function(pos){
        callback(pos.latitude, pos.longitude);
    });
}

function requestCurrentAddress(callback){
    //SPEC: Accuracy maybe low. Requires external API.
    //
}


//Combining + formatting
function getFullname(name, format){
    /*
    first_name: "",
    family_name: "",
    middle_name: "",
    other_names: [],
    notation: null
    */

    var fName = "";
    var n = name;

    if(format === "standard_middle"){
        fName = n.first_name + n.middle_name + n.family_name;
    }

    else if(format === "standard_all"){
        fName = n.first_name + n.middle_name + getCombinedNames(n.other_names) + n.family_name;
    }

    else if(format === "jp"){
        fName = n.first_name + n.middle_name + n.family_name;
    }

    else if(format === "jp_all"){
        fName = n.family_name + n.first_name + n.middle_name + getCombinedNames(n.other_names);
    }

    //Default(First + Family is most used)
    else{
        fName = n.first_name + n.family_name;
    }

    return fName;
}

function getCombinedNames(arr){
    var names = "";
    var del = " ";
    for(var i=0; i<arr.length; i++){

        if(i>0){
            names+= del;
        }

        names+= arr[i];
    }

    return names;
}

function getFullNamePronunciation(name, format){
    return getObjectNotation(name, getFullname, format);
}

function getFullLocation(loc, format){
    /*
    var loc = {
        country: "",
        state: "",
        town: "",
        details_1: "",
        details_2: "",
        details_3: "",
        zip_code: "",
        coords: {
            latitude: "",
            longitude: ""
        },
        notation: null
    };
    */
    var l = loc;
    var fLoc = "";

    if(format === "jp"){
        fLoc = l.zip_code + l.country + l.state + l.town + l.details_1 + l.details_2 + l.details_3;
    }

    else if(format === "uk"){
        fLoc = l.details_1 + l.details_2 + l.details_3 + l.town + l.state + l.zip_code + l.country;
    }

    //US standard
    else{
        fLoc = l.details_1 + l.details_2 + l.details_3 + l.town +  l.zip_code + l.state + l.country;
    }
}

function getFullLocationPronunciation(loc, format){
    return getObjectNotation(loc, getFullLocation, format);
}

function getObjectNotation(obj, handle, format){

  //Default
  var target = obj;

  //Attempt notation
  if(obj.notation){
      target = obj.notation;
  }

  return handle(obj, format);
}

//DOM
function getDOMList(arr){
  var listEl = document.createElement("ul");
  var itemEl;
  var item;

  for(var i=0; i<arr.length; i++){
      item = arr[i];

      itemEl = document.createElement("li");
      itemEl.textContent = item;
      listEl.appendChild(itemEl);
  }

  return listEl;
}

function getDOMImage(src){
    var image = new Image();
    image.src = src;
    return image;
}

function getDOMInputsList(inputs){
    var listEl = document.createElement("table");
    var inputRow;
    for(var i=0; i<inputs.length; i++){
        inputRow = getDOMInputRow(inputs[i]);
        listEl.appendChild(inputRow);
    }

    return listEl;
}

function getDOMInputRow(input){
    /*
    Input: {
        name: "",
        value: ""
    }
    */

    var rowEl = document.createElement("tr");

    //Name
    var nameEl = document.createElement("th");
    nameEl.textContent = input.name;
    rowEl.appendChild(nameEl);

    //Input Cell
    var inputCell = document.createElement("td");
    rowEl.appendChild(inputCell);

    //Input
    var inputEl = document.createElement("input");
    inputEl.value = input.value;
    inputCell.appendChild(inputEl);

    return rowEl;
}

function getUserMedia(callback, constraints){

  if(!constraints){
    constraints = {
      video: true,
      audio: true
    };
  }
  
  var onSuccess = function(stream){
    callback(stream);
  }
  
  var onError = function(err){
    log(err);
    callback(err);
  }

  return navigator.getUserMedia(constraints, onSuccess, onError);
}

function handleCameraStream(stream, object){
    var o = object;

  if(!stream){return false;}

    //Set
    o.stream = stream;

    //URL
    o.object_url = window.URL.createObjectURL(o.stream);

    //Video
    o.video = document.createElement("video");
    o.video.autoplay = true;
    o.video.src = o.object_url;
}

function stopCameraStreamObject(o){
  
  //Stop Stream
  stopCameraStream(o.stream);
  
  //Destroy video
  if(o.video){
    o.video.src = "";
    if(o.video.parentElement){
      o.video.parentElement.removeChild(o.video);
    }
  }

  //Revoke URL
  if(o.object_url){
      window.URL.revokeObjectURL(o.object_url);
  }

  //Nullify
  o.stream = null;
  o.video = null;
  o.object_url = null;
}

function stopCameraStream(stream){
    if(stream){
        return false;
    }

    //Stop tracks
    var tracks = getStreamTracks(stream);
    for(var i=0; i<tracks.length; i++){
        if(tracks[i].stop){
            tracks[i].stop();
        }
    }
}

function getStreamTracks(stream){
    if(stream.getTracks){
        return stream.getTracks();
    }else{
        return [];
    }
}

function setClickFileHandler(el, onFileHandle){

  //Create input
  var fileEl = document.createElement("input");
  fileEl.style.position = "absolute";
  fileEl.style.visibility = "hidden";
  fileEl.setAttribute("type", "file");
  fileEl.addEventListener("change", onFileHandle);

  //Append before el(to avoid overrite/otherwise add as child)
  if(el.parentElement){
    el.parentElement.insertBefore(fileEl, el);
  }else{
    el.appendChild(fileEl);
  }

  //Apply on click
  el.addEventListener("click", function(ev){
    log(ev);
    if(ev.target !== el){return false;}
    ev.preventDefault();
    fileEl.click();
  }, true);
}

function objectToObjectInfoArray(obj, curDepth){
  /*
  Object with possible nesting => array of objects with information.
  */

  var arr = [];
  var temp;
  var val;

  //Default depth
  if(!curDepth){
    curDepth = 1;
  }

  for(var key in obj){

    //Nested objects
    if(isObject(obj[key])){
      temp = objectToArray(obj[key], (curDepth + 1));
      arr = arr.concat(temp);
    }

    //Value
    else{
      val = obj[key];
      arr.push( new ObjectInfo(curDepth, key, val) );
    }
  }

  return arr;
}

function arrayInputter(objectInfoArray){
  var arr = objectInfoArray;
  var input;
  var objectInfo;
  var li;

  var ul = document.createElement("ul");

  for(var i=0; i<arr.length; i++){
    objectInfo = arr[i];

    li = document.createElement("li");

    input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", objectInfo.key);
    input.value = objectInfo.value;

    li.appendChild(input);

    ul.appendChild(li);
  }

  return ul;
}

function ObjectInfo(depth, key, value){
  return {
    depth: curDepth,
    key: key,
    value: val
  };
}

function nestedInputter(obj){
  /*

  Data:
  key: value

  Layout:
  <ul>
    <li><span>[NAME]</span><span>[INPUT/recursive]</span>
    ...
  </ul>
  */

  var ul = document.createElement("ul");
  var li, span, input;

  for(var key in obj){
    li = document.createElement("li");

    //name
    span = document.createElement("span");
    span.textContent = key;
    li.appendChild(span);

    //Value
    span = document.createElement("span");

    //recursive
    if(isObject(obj[key])){
      span.appendChild( nestedInputter(obj[key]) );
    }

    //input
    else{
      input = document.createElement("input");
      input.setAttribute("type", "text");
      input.value = obj[key];

      span.appendChild(input);
    }

    ul.appendChild(li);
  }

  return ul;
}

function textNodesUnder(el){
  var n, a=[], walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT, null, false);
  while(n=walk.nextNode()) a.push(n);
  return a;
}

function getElementsBySelectors(selectors, baseElement){
  //Selector:
  //https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Selectors
  var elements = [];
  
  if(!baseElement){
    baseElement = document;
  }
  
  for(var i=0; i<selectors.length; i++){
    elements = elements.concat( Array.prototype.slice.call( baseElement.querySelectorAll(selectors[i]) ) );
  }
  
  return elements;
}

function getAllElements(){
  return document.body.getElementsByTagName("*");
}

function getElementsWithAttribute(attr){
  var elements = getAllElements();
  var filtered = [];
  for(var i=0; i<elements.length; i++){
    if(elements[i].hasAttribute(attr)){
      filtered.push(elements[i]);
    }
  }

  return filtered; 
}

function getElementAttributes(el){
  var attr = {};
  var nodeMap = el.attributes;
  for(var i=0; i<nodeMap.length; i++){
    attr[nodeMap[i].nodeName] = nodeMap[i].nodeValue;
  }
  
  return attr;
}

function getElementsByAttribute(attr, value){
  return document.querySelectorAll('[' + attr + '=' + value + ']');
}

function setElementAsEditable(el, handle, bool){
  //Sets as editable but not necessary in edit mode.
  el.contentEditable = bool;
  el.addEventListener("change", handle);
}

function setEditMode(attr, bool){
  var elements = getElementsWithAttribute(attr);
  var element;

  for(var i=0; i<elements.length; i++){
    element = elements[i];

    //Set
    element.contentEditable = bool;
  }
}

function centerFixElement(el){
  var s = el.style;
  s.zIndex = Infinity;
  s.position = "fixed";
  s.top = "50%";
  s.left = "50%";
  s.transform = "(-50% -50%)";
}

function loadFileInput(event, callback, options){
  var file = null;
  
  if(!event.dataTransfer && event.target.files.length > 0){
    file = event.target.files[0];
  }else if(event.dataTransfer && event.dataTransfer.files.length > 0){
    file = event.dataTransfer.files[0];
  }
  
  var reader = new FileReader();
  reader.onload = function(event) {
    var data = event.target.result;
    callback(data);
  }
  reader.onerror = function(err){
    console.log(err);
  }

  reader[options.method](file);

  return reader;
}

function convertTableHtmlToArray(html){
  var element = document.createElement("div");//Wrapper
  element.innerHTML = html;
  var table = element.getElementsByTagName("table")[0];
  var arr = convertTableElementToArray(table);

  return arr;
}

function convertTableElementToArray(table){
  var rows = table.getElementsByTagName("tr");
  return convertTableRowElementsToArray(rows);
}

function convertTableRowElementsToArray(rows){
  var arr = [];

  var cells;
  var i, j;

  for(i=0; i<rows.length; i++){
    //Expects children with text

    arr[i] = [];

    cells = rows[i].children;
    for(j=0; j<cells.length; j++){
      arr[i][j] = cells[j].innerHTML;
    }
  }

  return arr;
}

function convertArrToTableElement(arr){
  var i, j;

  var table = document.createElement("table");
  var tr, td;

  for(i=0; i<arr.length; i++){
    tr = document.createElement("tr");
    for(j=0; j<arr[i].length; j++){
      td = document.createElement("td");
      td.innerHTML = arr[i][j];
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }

  return table;
}

function convertTabbedDataToArray(data, colCount){
  /*
  Can be unaccurate in last row cell if includes line feeds.
  Requires col count as line feeds allowed in cells.
  Last cell needs to be split by lf.
  Uses tabbed data: From spreadsheet, HTML table, etc.
  */

  var arr = [];
  var TAB = "\t";
  var LF = "\n";
  var split, i, x, y;
  var isStartCell, isLastCell, isFirstEndCell, isMidStartCell, isMidEndCell;
  var firstEndCellIndex, midCellColOver;

  //Format
  var items1 = data.split(TAB);
  
  var items = [];
  for(var i=0; i<items1.length; i++){

    //Settings
    firstEndCellIndex = (colCount - 1);
    midCellColOver = (i - firstEndCellIndex) % (colCount - 1);
    isStartCell = (i === 0);
    isLastCell = (i + 1 === items1.length);
    isFirstEndCell = !isLastCell && (i === firstEndCellIndex);
    isMidEndCell = !isLastCell && !isStartCell && !isFirstEndCell && (midCellColOver === 0);

    if(
      isFirstEndCell ||//row 1
      isMidEndCell//Mid row(smaller due to lf delimiter)
    ){
      split = items1[i].split(LF);
      items.push(split[0]);
      items.push(split[1]);
    }

    //Ignore mid first as already processed
    else if(isMidStartCell){
      //
    }

    //Normal
    else{
      items.push(items1[i]);
    }
  }

  for(i=0; i<items.length; i++){
    x = Math.floor(i/colCount);
    y = i % colCount;

    if(!arr[x]){arr[x] = [];}
    arr[x][y] = items[i];
  }

  return arr;
}

function replaceAll(str, find, replace){
  return str.split(find).join(replace);
}

function getAddedVariableNames(obj, beforeKeys){
  var afterKeys = Object.keys(obj);
  var added = [];
  for(var i=0; i<afterKeys.length; i++){
    if(beforeKeys.indexOf(afterKeys[i]) < 0){
      added.push(afterKeys[i]);
    }
  }

  return added;
}

function getRemovedVariableNames(obj, beforeKeys){
  var afterKeys = Object.keys(obj);
  var removed = [];
  for(var i=0; i<beforeKeys.length; i++){
    if(afterKeys.indexOf(beforeKeys[i]) < 0){
      removed.push(beforeKeys[i]);
    }
  }

  return removed;
}

function filterObjectVariables(obj, keys){
  var filtered = {};
  for(var i=0; i<keys.length; i++){
    filtered[ keys[i] ] = obj[ keys[i] ];
  }

  return filtered;
}

function globalize(obj){
  for(var key in obj){
    window[key] = obj[key];
  }
}

function loadScriptData(data, onLoad){
  var script = document.createElement("script");
  script.innerHTML = data;
  script.addEventListener("load", function(){
    if(onLoad){onLoad(script);}
  });
  document.body.appendChild(script);

  return script;
}

function arrayToCamelCase(arr){
  var str = "";
  var tempStr;

  for(var i=0; i<arr.length; i++){
    tempStr = arr[i];

    if(i > 0){
      tempStr = tempStr.substr(0, 1).toUpperCase() + tempStr.substr(1);
    }

    str+= tempStr;
  }

  return str;
}

function camelCaseToArray(str){
  /*
  SPEC:
  Should be accurately reversible format:
  1. No capital letter acronyms.
  2. One character words possible.
  */
  var arr = [];
  var cur = null;
  
  for(var i=0; i<str.length; i++){
    if(cur === null){cur = 0; arr[cur] = "";}//Initialize
    
    if(isCapitalLetter(str[i])){
      cur++;
      arr[cur] = "";
    }
    
    arr[cur]+= str[i];
  }
  
  return arr;
}

function isCapitalLetter(char){
  if(char && char.toUpperCase() === char){
    return true;
  }else{
    return false;
  }
}

function capitalize(str){
  var firstChar = str.substr(0, 1);
  var otherChars = (str.substr(1) || "");
  
  //Capitalize
  firstChar = firstChar.toUpperCase();
  
  //Add remaining
  str = firstChar + otherChars;
  
  return str;
}

function renameObjectKey(obj, oldKey, newKey){
  if(oldKey !== newKey){
    Object.defineProperty(oldKey, newKey,
      Object.getOwnPropertyDescriptor(oldKey, oldKey));
    delete oldKey[oldKey];
  }
}

function getObjectValue(obj, pathArr){
  return traverseObjectPath(obj, pathArr);
}

function setObjectValue(obj, pathArr, val){
  var onLast = function(curObj, curKey, curVal){
    curObj[curKey] = val;
    return true;
  };
  return traverseObjectPath(obj, pathArr, onLast);
}

function traverseObjectPath(obj, pathArr, onLast){
  var curObj = obj;
  var returnVal = null;
  for(var i=0; i<pathArr.length; i++){
    
    if(i+1 === pathArr.length){
      if(onLast){
        returnVal = onLast(curObj, pathArr[i], curObj[ pathArr[i] ]);
      }else{
        returnVal = curObj[ pathArr[i] ];
      }
    }
    
    else{
      curObj = curObj[ pathArr[i] ];
    }
  }
  
  return returnVal;
}

function getKeyedData(obj, format, curPath, useSimpleKeys){
  /*
  Gets obj values as simple key value pairs.
  Example: {a: {b: 2}, c: 1} => {a_b: 2, c: 1}
  
  Formats:
  1. camelCase
  2. [DELIMITER KEY]
  */

  var keys = {};
  var curKeys;
  var arr;
  if(!curPath){
    curPath = [];
  }

  //Handle
  var setKeys = function(obj, arr, val){
    var key, cArr;

    if(useSimpleKeys){
      //Get simpler keys for easier template creation(CAUTION: Naming conflicts more likely + Slower performance).
      var lastIndex = arr.length - 1;
      for(var i=lastIndex; i>=0; i--){
        cArr = arr.slice(i, arr.length);
        key = buildDelimiterString(cArr, format);
        obj[key] = val;
      }
    }else{
      key = buildDelimiterString(arr, format);
      obj[key] = val;
    }

    return obj;
  };

  for(var key in obj){
    if(isObject(obj[key])){
      curPath.push(key);
      curKeys = getKeyedData(obj[key], format, curPath, useSimpleKeys);
      curPath.pop();
    }else{
      curKeys = {};
      arr = [].concat(curPath);
      arr.push(key);
      setKeys(curKeys, arr, obj[key]);
    }

    //Add to keys
    Object.assign(keys, curKeys);
  }

  return keys;
}

function buildDelimiterString(arr, format){
  var cHandle = null;
  
  if(format === "camelCase"){
    cHandle = arrayToCamelCase;
  }else{
    var del = format;
    cHandle = function(arr){
      return arr.join(del);
    };
  }
  
  return cHandle(arr);
}

function delimiterStringToArray(str, format){
  var cHandle = null;
  
  if(format === "camelCase"){
    cHandle = camelCaseToArray;
  }else{
    var del = format;
    cHandle = function(str){
      return str.split(del);
    };
  }
  
  return cHandle(str);
}

function removeTabIndexes(){
  var elements = getAllElements();
  for(var i=0; i<elements.length; i++){
    elements[i].tabIndex = -1;
  }
}

function setTabIndexes(elements){
  //Sets in order
  for(var i=0; i<elements.length; i++){
    elements[i].tabIndex = i;
  }
}

function getHtmlImport(selector){
  var links = document.querySelectorAll('link[rel="import"]');
  var element, link;
  for(var i=0; i<links.length; i++){
    link = links[i];
    element = link.import.querySelector(selector);
    if(element){
      var clone = document.importNode(element.content, true);
      return clone;
    }
  }
  
  //FAILED
  return null;
}