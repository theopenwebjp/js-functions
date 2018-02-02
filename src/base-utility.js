/**
 * Base utility file.
 * Should not be dependent on code outside this file.
 */
class BaseUtility{

  /**
   * Gets wrapped strings from string.
   * Examples: XML TAGS <>, double quotes "", mustache {{}}...
   * 
   * @param {String} str 
   * @param {String} wrapperOpen 
   * @param {String} wrapperClose 
   * @param {Boolean} keepWrapper Include wrapper in output
   * @param {Boolean} useClosingTagEnd Allows for things like {{{a}}} > {a} instead of {a
   * @return {Array} Array of detected wrapped strings
   */
    static getWrappedStrings(str, wrapperOpen, wrapperClose, keepWrapper, useClosingTagEnd){
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
      
      /**
       * For checking async functionality.
       * Try to add randomization for better testing.
       *  
       * @param {Function} callback 
       */
      static asyncCheck(callback){
        var ms = Math.ceil(Math.random() * 10);
        var timer = window.setTimeout(function(){
          callback("check ok");
        }, ms);
      }
      
      /**
       * Turns a function handling a callback into a promise.
       * 
       * @param {Function} handle 
       * @param {Array} args 
       * @param {*} resolveIndex 
       * @return {Promise}
       */
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
      
      /**
       * Handles multiple async functions.
       * Needs checking!!(handle, status.current positioning looks iffy.)
       * 
       * @param {Array} arr Array of items. See code. 
       * @param {Function} onEnd 
       * @return {Boolean}
       */
      static asyncHandler(arr, onEnd){
        /*
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
          
          //Finished
          if(!item){onEnd(status.returned); return false;}
          
          item.index = status.current;
          
          item.args[ item.callbackParamIndex ] = function(){
            status.returned[item.index] = arguments;
            
            handle();
          };
          
          item.handle.apply(this, item.args);
          
          status.current++;

          return true;
        }
        
        //Start execution
        return handle();
      }
      
      /**
       * Checks if number equals each other including NaN
       * 
       * @param {*} a 
       * @param {*} b 
       * @return {Boolean}
       */
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
      
      /**
       * Checks if 2 arrays equal eachother
       * 
       * @param {Array} a 
       * @param {Array} b 
       * @return {Boolean}
       */
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
      
      /**
       * Checks if no data exists
       * Differs from falsy, as only checks for non-value data.
       * For example "" is a valid string, 0 is a valid number, false is a valid boolean.
       * 
       * @param {*} data 
       * @return {Boolean}
       */
      static exists(data){
        //More useful data check than "==" OR !!
        return !(data === null || data === undefined);
      }
      
      /**
       * Asks for print. Not really needed. Should remove later.
       * @deprecated
       */
      static promptPrint(){
        window.print();
      }
      
      /**
       * Logging function
       * 
       * @param {*} data 
       * @param {Object} options 
       */
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
      
      /**
       * Gets dataURL extension
       * 
       * @param {String} dataUrl 
       * @return {String}
       */
      static getDataUrlExtension(dataUrl){
        return dataUrl.split(";")[0].split("/")[1];
      }
      
      /**
       * Download data
       * 
       * @param {*} data 
       * @param {String} name 
       * @param {String} mimeType 
       */
      static download(data, name, mimeType){
        var blob = new Blob([data], {type: mimeType});
        return BaseUtility.downloadBlob(blob, name);
      }
      
      /**
       * Downloads the current HTML page
       */
      static downloadCurrentPage(){
        var data = document.documentElement.innerHTML;
        var fileName = BaseUtility.getFileName(location.href);
        return BaseUtility.download(data, fileName, "text/html");
      }
      
      /**
       * Gets file name from url
       * 
       * @param {String} url 
       * @return {String} file name
       */
      static getFileName(url){
        var parts = location.href.split("/");
        var name = parts[parts.length - 1] || "";
        return name;
      }
      
      /**
       * Gets file extension from url
       * 
       * @param {String} url 
       * @return {String} file extension
       */
      static getFileExtension(url){
        var parts = location.href.split(".");
        var ext = parts[parts.length - 1] || "";
        return ext;
      }
      
      /**
       * Downloads file from dataURL
       * 
       * @param {String} dataUrl 
       * @param {String} name 
       */
      static downloadDataUrl(dataUrl, name){
        var url = dataUrl.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
        var extension = BaseUtility.getDataUrlExtension(dataUrl);
        var fullName = (name + "." + extension);
        BaseUtility.downloadLink(url, fullName);
      }
      
      /**
       * Causes execution of blob.
       * May be blocked by browser(especially when multiple downloads occur.)
       * 
       * @param {Blob} blob 
       * @param {String} name 
       */
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
      
      /**
       * Downloads link
       * 
       * @param {String} url 
       * @param {String} fullName 
       */
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
      
      /**
       * Safely attempts to JSON parse data.
       * Always returns an object.
       * 
       * @param {*} data JSON parseable data
       * @param {Function} onError optional error handler
       * @return {Object}
       */
      static toObject(data, onError=null){
      
        var obj = {};
      
        try{
          var tempObj = BaseUtility.parseJson(data);
          obj = tempObj;
        }catch(err){
          if(onError){
            onError(err);
          }
        }
      
        return obj;
      }
      
      /**
       * Parses JSON data that may be in JS format.
       * Example: {a: 1} instead of {"a": 1}.
       * Because this uses eval, should never use user entered data!
       * 
       * @param {String} str 
       * @return {Object}
       */
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
            //
          }
        }
        
        return obj;
      }
      
      /**
       * With no errors + checks for support.
       * Returns null on bad.
       * 
       * @param {String} str 
       * @return {Object}
       */
      static parseJson(str){
      
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
      
      /**
       * Attempts to stringify json object
       * 
       * @param {String} jsonObj 
       * @return {String|null}
       */
      static stringifyJson(jsonObj){
        if(!window.JSON){
          return null;
        }
      
        try{
          var str = JSON.stringify(jsonObj);
          return str;
        }catch(err){
          return null;
        }
      }
      
      /**
       * GETs multiple file data
       * 
       * @param {Array} urls 
       * @param {Function} onData 
       * @return {Promise}
       */
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
      
      /**
       * GETs file data
       * 
       * @param {String} url 
       * @param {Function} callback 
       * @param {Function} onError 
       * @return {XMLHttpRequest}
       */
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
      
      /**
       * Handles callback for functions that may have a callback.
       * 
       * @param {Function} callback 
       * @param {Array} args 
       */
      static handleCallback(callback, args){
        if(!callback){
            return args[0];
        }
      
        return callback.apply(this, args);
      }
      
      /**
       * Downloads data
       * 
       * @param {*} data 
       * @param {String} name 
       */
      static downloadData(data, name){
        var downloadableData = data;//Process here
        if(!name){
          name = "untitled";
        }
        return BaseUtility.download(downloadableData, name, "text/txt");
      }
      
      /**
       * Prompt handle.
       * Probably was supposed to be async but was moved elsewhere.
       * Should remove.
       * 
       * @deprecated
       * @param {Function} handle 
       * @param {String} text 
       * @param {String} defaultText 
       * @return {*}
       */
      static handlePrompt(handle, text, defaultText){
        var value = window.prompt(text, defaultText);
        return handle(value);
      }
      
      /**
       * Gets current date. Not needed. Should remove.
       * @deprecated
       * @return {Date}
       */
      static getCurrentDate(){
        var date = new Date();
        return date;
      }
      
      /**
       * Inserts delimiter at selected points in lenArr
       * Used for things like binary data splitting etc.
       * 
       * @param {String} str
       * @param {String} delimiter
       * @param {Array} lenArr
       * @return {String}
       */
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
              remaining = length - curIndex;//NOT USED
      
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
      
      /**
       * Gets current location.
       * No need for separate function so should remove.
       * 
       * @deprecated
       * @param {Function} callback 
       */
      static getCurrentLocation(callback){
        return navigator.geolocation.getCurrentPosition(function(pos){
            callback(pos.latitude, pos.longitude);
        });
      }
      
      /**
       * Request current address.
       * Not finished and too specialized. Should remove.
       * 
       * @deprecated
       * @param {Function} callback 
       */
      static requestCurrentAddress(callback){
        //SPEC: Accuracy maybe low. Requires external API.
        //
      }
      
      /**
       * Loads file data from input event.
       * 
       * @param {Object} event 
       * @param {Function} callback 
       * @param {Object} options 
       * @return {FileReader}
       */
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
      
      /**
       * Can be unaccurate in last row cell if includes line feeds.
       * Requires col count as line feeds allowed in cells.
       * Last cell needs to be split by lf.
       * Uses tabbed data: From spreadsheet, HTML table, etc.
       * 
       * @param {String} data 
       * @param {Number} colCount 
       * @return {Array}
       */
      static convertTabbedDataToArray(data, colCount){
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
      
      /**
       * Replaces all occurrences of string.
       * No native function available of time of writing.
       * Usually done via global regex.
       * 
       * @param {String} str 
       * @param {String} find 
       * @param {String} replace 
       * @return {String} replace complete string
       */
      static replaceAll(str, find, replace){
        return str.split(find).join(replace);
      }
      
      /**
       * Loads script tag with data(js, etc.)
       * 
       * @param {String} data 
       * @param {Function} onLoad 
       * @return {DomElement} script tag
       */
      static loadScriptData(data, onLoad){
        var script = document.createElement("script");
        script.innerHTML = data;
        script.addEventListener("load", function(){
          if(onLoad){onLoad(script);}
        });
        document.body.appendChild(script);
      
        return script;
      }
      
      /**
       * Extracts words from camel case string.
       * 
       * @param {String} str 
       * @return {Array} array of separated strings
       */
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
      
      /**
       * Checks if character is capital letter.
       * Will be true for non-ascii-letters.
       * 
       * @param {String} char 
       * @return {Boolean}
       */
      static isCapitalLetter(char){
        if(char && char.toUpperCase() === char){
          return true;
        }else{
          return false;
        }
      }
      
      /**
       * Capitalize word
       * 
       * @param {String} str 
       * @return {String}
       */
      static capitalize(str){
        var firstChar = str.substr(0, 1);
        var otherChars = (str.substr(1) || "");
        
        //Capitalize
        firstChar = firstChar.toUpperCase();
        
        //Add remaining
        str = firstChar + otherChars;
        
        return str;
      }
      
      /**
       * Gets index of value from variable that could be following: String, Number, Array, Object
       * 
       * @param {*} data 
       * @param {*} find value searching for.
       * @return {*} index(String or Number)
       */
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
      
      /**
       * Gets array of delimited string items
       * 
       * @param {String} str 
       * @param {String} format camelCase, any delimiter.
       * @return {Array} array of delimited strings
       */
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
      
      /**
       * Gets string similarity(0~1)
       * 
       * @param {String} str1 
       * @param {String} str2 
       * @return {Number}
       */
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
      
      /**
       * Tests how closely str1 is included in str2.
       * Checking every permutation would be most accurate but would be severely risky on larger strings.
       * 
       * @param {String} str1 
       * @param {String} str2 
       * @return {Number} (0~1)
       */
      static getStringInclusionWeight(str1, str2){
        var foundStr = "";
        var cur;
        
        for(var i=str1.length; i>=1; i--){
          cur = str1.substr(0, i);
          if(str2.indexOf(cur) >= 0){foundStr = cur; break;}
        }
        var weight = BaseUtility.getNumberSimilarity(foundStr.length, str2.length);
        
        return weight;
      }
      
      /**
       * Gets number similarity (0~1)
       * 
       * @param {Number} num1 
       * @param {Number} num2 
       * @return {Number}
       */
      static getNumberSimilarity(num1, num2){
        var max = BaseUtility.getMax(num1, num2);
        var min = BaseUtility.getMin(num1, num2);
        var diff = max - min;
        
        return (min/max);
      }
      
      /**
       * Gets max number from unlimited number of parameters
       * 
       * @param {Array} args Array of numbers 
       * @return {Number}
       */
      static getMax(...args){
        var max = null;
        for(var i=0; i<args.length; i++){
          if(max === null || args[i] > max){
            max = args[i];
          }
        }
        
        return max;
      }
      
      /**
       * Gets min number from unlimited number of parameters
       * 
       * @param {Array} args Array of numbers 
       * @return {Number}
       */
      static getMin(...args){
        var min = null;
        for(var i=0; i<args.length; i++){
          if(min === null || args[i] < min){
            min = args[i];
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
      
      /**
       * Checks if is native function.
       * Native functions can not be accessed in certain ways.
       * For example, the contents can not be viewed.
       * 
       * @param {Function} func 
       * @return {Boolean}
       */
      static isNativeFunction(func){
        var str = func.toString();
        var trimmedStr = BaseUtility.removeNonCharacters(str);
        var expected = "{[nativecode]}";
        
        return (trimmedStr.substr(-expected.length, expected.length) === expected) ? true: false;
      }
      
      /**
       * Takes functions(probably dependent on eachother)
       * and outputs string that can be copy + pasted.
       * @param {Array} funcs array of functions
       * @return {String}
       */
      static buildFunctionModule(funcs){
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
      
      /**
       * Usage: For distinguishing between log/non-log functions such as disallowing/allowing logging.
       * @param {Function} func 
       * @return {Boolean}
       */
      static isLogFunction(func){
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
      
      /**
       * Gets stack info
       * Gets standard info from error object + more.
       * @return {Object} info
       */
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

  /**
   * Converts URL to blob.
   * Should work on any kind of media.
   * 
   * @param {String} url 
   * @return {Promise}
   */
  static urlToBlob(url){
    return new Promise((resolve, reject)=>{
      try {
          const xhr = new XMLHttpRequest();
          xhr.open("GET", url);
          xhr.responseType = "blob";
          xhr.onerror = function() {
            reject("xhr error");
          };
          xhr.onload = function() {
            const OK = 200;
            if(xhr.status === OK)
            {
              resolve(xhr.response);
            }
            else{
              reject("xhr status error:" + xhr.statusText);
            }
          };
          xhr.send();
      }
      catch(err) {
        reject(err.message);
      }
    });
  }
}

module.exports = BaseUtility;