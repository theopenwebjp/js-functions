class BaseArrayHelper{
    static searchObjectArray(arr, key, val){
        var found = [];
        var obj;
        for(var i=0; i<arr.length; i++){
          obj = arr[i];
          
          if(obj[key] === val){
            found.push(obj);
          }
        }
        
        return found;
      }
    
      static singleDimensionArrayToObject(arr){
        var obj = {};
        var key;
        var defaultVal = "";
        for(var i=0; i<arr.length; i++){
          key = arr[i];
          obj[key] = defaultVal;
        }
        
        return obj;
      }
      
      static arrayListToObjectList(arr, keys){
        /*
        Converts 2d array to array of objects.
        Useful for settings using objects: [[1,2,3,4], ...],["a","b","c","d"] => [{a: 1, b: 2, c: 3, d: 4}, ...]
        */
        
        return arr.map(function(val){
          var obj = {};
          for(var i=0; i<val.length; i++){
            obj[ keys[i] ] = val[i];
          }
          return obj;
        });
      }
    
      static arrayToCamelCase(arr){
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
    
      static buildDelimiterString(arr, format){
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
    
      static uniqueArray(arr) {
        function onlyUnique(value, index, self) { 
          return self.indexOf(value) === index;
        }
        
        var unique = arr.filter( onlyUnique );
      
        return unique;
      }
}

module.exports = BaseArrayHelper;