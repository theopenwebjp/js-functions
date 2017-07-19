function loadFile(url, callback, onError){
  //jQuery dependent
  //Fails getting bad json due to auto parsing.
  
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         callback(xhttp.response);
      }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
  
  return xhttp;
  
  //Keep below just in case.
  if(!window.$){
    callback(null);
    return false;
  }

  var ajax = $.ajax({
    url: url,
    success: function (data){
      callback(data);
    },
    error: function(xhr, status, errorStr){
      callback(null);
      if(onError){onError(arguments);}
    },
    dateType: "text"
  });
  console.log(ajax);
}

function loadJson(url, callback){
  //jQuery dependent
  if(!window.$){
    callback(null);
    return false;
  }

  return $.getJSON(url, function(json) {
    callback(json);
  }); 
}

function loadFuzzyJson(url, callback){
  loadFile(url, function(data){
    data = parseFuzzyJson(data);
    callback(data);                           
  }, function(args){console.log(args);});
}