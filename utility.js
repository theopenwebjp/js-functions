/*
This file is for utility functions only.
Functions should have no state and should not be dependent on code outside this file.
No jQuery, etc.
May include functions with some unsupported environments but should avoid latest js.
*/

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

function promptPrint(){
    window.print();
}

//Handling
function e(id){
    return document.getElementById(id);
}

function log(data){
    if(console && console.log){
        console.log(data);
    }
}

function download(data, name, mimeType){
    var blob = new Blob([data], {type: mimeType});
    return downloadBlob(blob, name);
}

function downloadBlob(blob, name){
    //CREATE URL ELEMENT
    var url = window.URL.createObjectURL(blob);
    var link = window.document.createElement('a');

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
        //CREATE LINK
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

    //COMPLETE
    return true;
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

  //Try standard JSON
  try{
    var obj = parseJson(str);
    return obj;
  }

  //Try as object
  catch(err){

    //Non-sandboxed(DON'T USE USER CONTENT! DANGEROUS!)
    obj = eval("(" + str + ")");
    return obj;
  }
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
    if(
        typeof obj === "object" &&
        obj !== null
    ){
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
        return false;
    }

    //Header settings
    var contentEncoding = "gzip";
    var contentType = "application/x-www-form-urlencoded; charset=UTF-8";

    //Data
    var params = getAjaxParams(dataSet);

    //Connection
    var xhr =  new XMLHttpRequest();
    xhr.open("POST", url, true);//Always async
    xhr.setRequestHeader("Content-Encoding", contentEncoding);
    xhr.setRequestHeader("Content-Type", contentType);//REQUIRED FOR PARAMS FORMAT
    xhr.onload = function(xhr){
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
    if(xhr.responseType !== xhr.DONE){
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
    var response = xhr.response;

    //Callback
    return handleCallback(callback, [response]);
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

function downloadData(data){
    var downloadableData = data;//Process here
    var name = "TEST";//Add name here
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

//Imaging
function drawableToDataURL(drawable){
    var d = drawable;

    var width = d.width || d.videoWidth;
    var height = d.height || d.videoHeight;

    var c = document.createElement("canvas");
    var ctx = c.getContext("2d");

    c.width = width;
    c.height = height;

    ctx.drawImage(0, 0, width, height);

    var dataURL = c.toDataURL();

    return dataURL;
}

function drawableToImage(drawable){
    var dataURL = drawableToDataURL(drawable);
    var image = new Image();
    image.src = dataURL;

    return image;
}

function getUserMedia(callback){

    var constraints = {
        video: true,
        audio: false
    };

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

    //Destroy video
    //

    //Revoke URL
    if(o.object_url){
        window.URL.revokeObjectURL(o.object_url);
    }

    //Nullify
    o.stream = null;
    o.video = null;
    o.object_url = null;
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

function getElementsByAttribute(attr, value){
  return document.querySelectorAll('[' + attr + '=' + value + ']');
}

function setEditMode(attr, bool){
  var elements = getElementsWithAttribute(attr);
  var element;

  for(var i=0; i<elements[i].length; i++){
    element = elements[i];

    //Set
    element.contentEditable = bool;
  }
}

function centerFixObject(el){
  var s = el.style;
  s.zIndex = Infinity;
  s.position = "fixed";
  s.top = "50%";
  s.left = "50%";
  s.transform = "(-50% -50%)";
}

function loadFileInput(event, callback, options){
  var file = event.target.files[0];
  var reader = new FileReader();
  reader.onload = function(event) {
    var data = event.target.result;
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
  //console.log(items1);
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
    else if(isMidStartCell){console.log("M" + i);
      //
    }

    //Normal
    else{
      items.push(items1[i]);
    }
  }
  //console.log(items);

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