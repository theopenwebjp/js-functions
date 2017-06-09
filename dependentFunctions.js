/*
Functions dependent on other libraries.
*/

function getVariablesFromFile(url, callback){
  //Dependency: jQuery
  var beforeKeys = Object.keys(window);
  loadFile(url, function(data){
    loadScriptData(data, function(){
      var added = getAddedVariableNames(window, beforeKeys);
      var variables = filterObjectVariables(obj, added);

      callback(variables);
    });
  });
}