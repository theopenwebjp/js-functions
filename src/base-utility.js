/**
 * Base utility file.
 * Should not be dependent on code outside this file.
 */
class BaseUtility{

    static getWrappedStrings(str, wrapperOpen, wrapperClose, keepWrapper, useClosingTagEnd){
        /*
        useClosingTagEnd: Allows for things like {{{a}}} > {a} instead of {a.
        */
        var strings = [];
        
        var status = {
          currentString: "",
          inWrap: false
        };
        
        var i=0;
        while(i<str.length){
          if(status.inWrap){
            if(
              (!useClosingTagEnd || str.substr(i+1, wrapperClose.length) !== wrapperClose) &&
              str.substr(i, wrapperClose.length) === wrapperClose
            ){
              
              if(keepWrapper){status.currentString = wrapperOpen + status.currentString + wrapperClose;}
              strings.push(status.currentString);
              
              status.currentString = "";
              status.inWrap = false;
              i+= wrapperClose.length;
            }
            
            else{
              status.currentString+= str[i];
              i++;
            }
          }
          
          else{
            if(str.substr(i, wrapperOpen.length) === wrapperOpen){
              status.inWrap = true;
              i+= wrapperOpen.length;
            }
            
            else{
              i++;
            }
          }
        }
        
        return strings;
      }
      
      static asyncCheck(callback){
        /*
        for checking async.
        Try to add randomization for better testing.
        */
        
        var ms = Math.ceil(Math.random() * 10);
        var timer = window.setTimeout(function(){
          callback("check ok");
        }, ms);
      }
      
      static promisify(handle, args, resolveIndex){
        var oldHandle = handle;
        handle = function(){
          var oldCallback = args[resolveIndex];
          var promise = new Promise(function(resolve, reject){
            
            args[resolveIndex] = function(){
              resolve.apply(this, arguments);
            }
            
            oldHandle.apply(this, args);
          });
          promise.then(function(successValue){
            oldCallback(successValue);
          }).catch(function(err){
            //
          });
          return promise;
        }
      }
      
      static asyncHandler(arr, onEnd){
        /*
        Handles multiple async callbacks in order.
        
        array item = {
          handle: null,
          args: [],
          callbackParamIndex: 0,
          
          index: int, auto set.
        };
        */
        
        var status = {
          current: 0,
          total: arr.length,
          returned: []
        };
        
        var handle = function(){
          var item = arr[status.current];
          if(!item){onEnd(status.returned); return false;}
          
          item.index = status.current;
          
          item.args[ item.callbackParamIndex ] = function(){
            status.returned[item.index] = arguments;
            
            handle();
          };
          
          item.handle.apply(this, item.args);
          
          status.current++;
        }
        
        return handle();
      }
      
      static equals(a, b){
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
      
      static arrayEquals(a, b){
        if(a.length !== b.length){
          return false;
        }
        
        for(var i=0; i<a.length; i++){
          if(!BaseUtility.equals(a[i], b[i])){
            return false;
          }
        }
        
        //PASSED
        return true;
      }
      
      static exists(data){
        //More useful data check than "==" OR !!
        return !(data === null || data === undefined);
      }
      
      static promptPrint(){
        window.print();
      }
      
      //Handling
      static log(data, options){
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
      
      static getDataUrlExtension(dataUrl){
        return dataUrl.split(";")[0].split("/")[1];
      }
      
      static download(data, name, mimeType){
        var blob = new Blob([data], {type: mimeType});
        return BaseUtility.downloadBlob(blob, name);
      }
      
      static downloadCurrentPage(){
        var data = document.documentElement.innerHTML;
        var fileName = BaseUtility.getFileName(location.href);
        return BaseUtility.download(data, fileName, "text/html");
      }
      
      static getFileName(url){
        var parts = location.href.split("/");
        var name = parts[parts.length - 1] || "";
        return name;
      }
      
      static getFileExtension(url){
        var parts = location.href.split(".");
        var ext = parts[parts.length - 1] || "";
        return ext;
      }
      
      static downloadDataUrl(dataUrl, name){
        var url = dataUrl.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
        var extension = BaseUtility.getDataUrlExtension(dataUrl);
        var fullName = (name + "." + extension);
        BaseUtility.downloadLink(url, fullName);
      }
      
      static downloadBlob(blob, name){
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
          BaseUtility.downloadLink(url, fullName);
        }
      
        //COMPLETE
        return true;
      }
      
      static downloadLink(url, fullName){
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
      
      static toObject(data){
      
        var obj = {};
      
        try{
          var tempObj = BaseUtility.parseJson(data);
          obj = tempObj;
        }catch(err){
          BaseUtility.log(err);
        }
      
        return obj;
      }
      
      static parseFuzzyJson(str){
        var obj;
        
        //Try standard JSON
        obj = BaseUtility.parseJson(str);
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
      
      static parseJson(str){
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
      
      static stringifyJson(json){
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
      
      static loadFiles(urls, onData){
        var promises = [];
        for(var i=0; i<urls.length; i++){
          promises.push(new Promise(function(resolve, reject){
            BaseUtility.loadFile(urls[i], function(data){
              if(onData){data = onData(data);}
              resolve(data);
            });
          }));
        }
        
        return Promise.all(promises);
      }
      
      static loadFile(url, callback, onError){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
             callback(xhttp.response);
          }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
        
        return xhttp;
      }
      
      static handleCallback(callback, args){
        if(!callback){
            return args[0];
        }
      
        return callback.apply(this, args);
      }
      
      static downloadData(data, name){
        var downloadableData = data;//Process here
        if(!name){
          name = "untitled";
        }
        return BaseUtility.download(downloadableData, name, "text/txt");
      }
      
      static handlePrompt(handle, text, defaultText){
        var value = window.prompt(text, defaultText);
        return handle(value);
      }
      
      static getCurrentDate(){
        var date = new Date();
        return date;
      }
      
      static getFormattedString(str, delimiter, lenArr){
      
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
      
      static getCurrentLocation(callback){
        return navigator.geolocation.getCurrentPosition(function(pos){
            callback(pos.latitude, pos.longitude);
        });
      }
      
      static requestCurrentAddress(callback){
        //SPEC: Accuracy maybe low. Requires external API.
        //
      }
      
      static loadFileInput(event, callback, options){
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
      
      static convertTabbedDataToArray(data, colCount){
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
      
      static replaceAll(str, find, replace){
        return str.split(find).join(replace);
      }
      
      static loadScriptData(data, onLoad){
        var script = document.createElement("script");
        script.innerHTML = data;
        script.addEventListener("load", function(){
          if(onLoad){onLoad(script);}
        });
        document.body.appendChild(script);
      
        return script;
      }
      
      static camelCaseToArray(str){
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
          
          if(BaseUtility.isCapitalLetter(str[i])){
            cur++;
            arr[cur] = "";
          }
          
          arr[cur]+= str[i];
        }
        
        return arr;
      }
      
      static isCapitalLetter(char){
        if(char && char.toUpperCase() === char){
          return true;
        }else{
          return false;
        }
      }
      
      static capitalize(str){
        var firstChar = str.substr(0, 1);
        var otherChars = (str.substr(1) || "");
        
        //Capitalize
        firstChar = firstChar.toUpperCase();
        
        //Add remaining
        str = firstChar + otherChars;
        
        return str;
      }
      
      static getIndexOf(data, find){
        //Allows using object
        var index = -1;
        
        //Standard
        if(typeof data === "string" || Array.isArray(data)){
          index = data.indexOf(find);
        }
        
        //Object
        else{
          for(var key in data){
            if(data[key] === find){
              index = key;
              break;
            }
          }
        }
        
        return index;
      }
      
      static delimiterStringToArray(str, format){
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
      
      static getStringSimilarity(str1, str2){
        /*
        Positive:
        1. Exact
        2. Includes exact
        3. Includes partial
        4. Similar size
        */
        
        //Exact
        if(str1 === str2){
          return 1;
        }
        
        //Weight based calculation
        var inclusion1 = BaseUtility.getStringInclusionWeight(str1, str2);
        var inclusion2 = BaseUtility.getStringInclusionWeight(str2, str1);
        var size = BaseUtility.getNumberSimilarity(str1.length, str2.length);
        return ((inclusion1 + inclusion2 + size) / 3);
      }
      
      static getStringInclusionWeight(str1, str2){
        //Tests how closely str1 is included in str2.
        //Checking every permutation would be most accurate but would be severely risky on larger strings.
        var foundStr = "";
        var cur;
        
        for(var i=str1.length; i>=1; i--){
          cur = str1.substr(0, i);
          if(str2.indexOf(cur) >= 0){foundStr = cur; break;}
        }
        var weight = BaseUtility.getNumberSimilarity(foundStr.length, str2.length);
        
        return weight;
      }
      
      static getNumberSimilarity(num1, num2){
        var max = BaseUtility.getMax(num1, num2);
        var min = BaseUtility.getMin(num1, num2);
        var diff = max - min;
        
        return (min/max);
      }
      
      static getMax(){
        var max = null;
        for(var i=0; i<arguments.length; i++){
          if(max === null || arguments[i] > max){
            max = arguments[i];
          }
        }
        
        return max;
      }
      
      static getMin(){
        var min = null;
        for(var i=0; i<arguments.length; i++){
          if(min === null || arguments[i] < min){
            min = arguments[i];
          }
        }
        
        return min;
      }
      
      static removeNonCharacters(str){
        var returnStr = str;
        
        //Outer
        returnStr = returnStr.trim();
        
        //Inner white space
        returnStr = BaseUtility.replaceAll(returnStr, " ", "");
        
        //Tabs + lf
        returnStr = BaseUtility.replaceAll(returnStr, "\t", "");
        returnStr = BaseUtility.replaceAll(returnStr, "\n", "");
        returnStr = BaseUtility.replaceAll(returnStr, "\r", "");
        returnStr = BaseUtility.replaceAll(returnStr, "\l", "");
        
        return returnStr;
      }
      
      static isNativeFunction(func){
        var str = func.toString();
        var trimmedStr = BaseUtility.removeNonCharacters(str);
        var expected = "{[nativecode]}";
        
        return (trimmedStr.substr(-expected.length, expected.length) === expected) ? true: false;
      }
      
      static buildFunctionModule(funcs){
        /*
        Takes functions(probably dependent on eachother) and outputs string that can be copy + pasted.
        */
        
        var str = "";
        var func;
        for(var i=0; i<funcs.length; i++){
          func = funcs[i];
          
          if(!BaseUtility.isNativeFunction(func)){
            str+= func.toString();
          }
        }
        
        return str;
      }
      
      static isLogFunction(func){
        //Usage: For distinguishing between log/non-log functions such as disallowing/allowing logging.
        var logFunctions = [
          window.alert
        ];
        if(window.console){
          //https://developer.mozilla.org/en/docs/Web/API/console
          logFunctions = logFunctions.concat([
            console.info,
            console.log,
            console.error,
            console.warn
          ]);
        }
      
        return (logFunctions.indexOf(func) >= 0) ? true : false;
      }
      
      static getStackInfo(){
        var info = {
          error: null,
          stack: '',
          function: null,
          stackParts: [],
          lineNumber: null,
          columnNumber: null
        };
      
        /*
        stackPart: {
          function: '',
          lineNumber: null,
          columnNumber: null
        }
        */
      
        info.error = new Error();
        info.stack = info.error.stack;
        
        //Only works on Chrome so far
        if(info.stack.substr(0, 'Error'.length) === 'Error'){
          var s = info.stack;
          var lines = s.split('\n');
          lines.forEach(function(line, key){
            key = Number(key);
      
            if(key === 0){
              return;
            }
      
            var stackPart = {
              function: '',
              lineNumber: null,
              columnNumber: null
            };
            var startIndex = line.getIndexOf('at') + 'at '.length;//First index
            var lineInfo = line.substr(startIndex);
            var parts = lineInfo.split(' ');
            if(parts.length === 1){
              parts.unshift('');
            }
            var detailParts = parts[1].split(':');
            var columnNumber = detailsParts[2].split(')')[0];
            
            stackPart.function = parts[0];
            stackPart.lineNumber = detailsParts[1];
            stackPart.columnNumber = columnNumber;
      
            if(key === 1){
              info.function = stackPart.function;
              info.lineNumber = stackPart.lineNumber;
              info.columnNumber = stackPart.columnNumber;
            }
      
            info.stackParts.push(stackPart);
          });
        }
      
        return info;
      }

      /**
     * Loops class functions.
     * Class format should be es6 or similarly prototyped format.
     * 
     * @param {Object} classInstance 
     * @param {Function} onFunction 
     */
    static loopClassFunctions(classInstance, onFunction){
      for(let obj = classInstance;!!obj;obj = Object.getPrototypeOf(obj)){
          for(let names = Object.getOwnPropertyNames(obj), i=0; i<names.length; i++){
              let name = names[i];
              if(typeof classInstance[name] === 'function'){
                  onFunction(classInstance[name], name, classInstance);
              }
          }
      }
  }

  /**
   * Binds class instance to all functions.
   * Used so no need to worry about using this in classes.
   * 
   * @param {Object} classInstance 
   */
  static bindClassThis(classInstance){
      BaseUtility.loopClassFunctions(classInstance, (func, key, obj)=>{
          obj[key] = func.bind(classInstance);
      });
  }

  /**
   * Automatically performs number operation on each key in object.
   * 
   * @param {Array} objArr Array of objects containing numbers.
   * @return {Object} Reduced object
   */
  static reduceObjectArray(objArr){
      let returnObj = {};
      for(let i=0; i<objArr.length; i++){
          let obj = objArr[i];

          for(let key in obj){
              if(returnObj[key] === undefined){
                  returnObj[key] = 0;
              }

              returnObj[key]+= obj[key];
          }
      }

      return returnObj;
  }

  /**
   * 条件を間隔的に確認して、Trueになれば、resolveする。
   * 
   * @param {Function} condition Booleanを返すFunction
   * @param {Number} pollInterval ms
   * @return {Promise}
   */
  static waitFor(condition, pollInterval=50){
    if(condition()){
      return Promise.resolve();
    }

    return new Promise((resolve, reject)=>{
      let id;
      const onEnd = ()=>{
        window.clearInterval(id);
        resolve();
      };
      id = window.setInterval(()=>{
        if(condition()){
          onEnd();
        }
      }, pollInterval);
    });
  }

  /**
   * Sleeps for number of ms.
   * Does not make cpu sleep, just waits and allows other scripts to run.
   * 
   * @param {Number} ms milliseconds
   * @return {Promise} 
   */
  static sleep(ms){
    return new Promise((resolve)=>{
      window.setTimeout(resolve, ms);
    });
  }

  /**
   * Clever event handling mechanism
   * Detects single mode or array mode by type of events[name]
   * Returns single or array based on single mode type
   * 
   * @param {Object} events 
   * @param {String} name 
   * @param {*} data data passed to event 
   * @return {*} Return data(single or array)
   */
  static handleEvent(events, name, data=undefined){
    const handleData = events[name];
    
    //No handle
    if(!handleData){
      return null;
    }

    //Single handle
    else if(typeof handleData === 'function'){
      return handleData(data);
    }

    //Multiple handle
    else if(Array.isArray(handleData)){
      const returnValues = handleData.map((handle)=>{
        return handle(data);
      });
      return returnValues;
    }

    //Invalid
    else{
      return null;
    }
  }
}

module.exports = BaseUtility;