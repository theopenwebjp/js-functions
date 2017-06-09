function loadFile(url, callback){
  //jQuery dependent
  if(!window.$){
    callback(null);
    return false;
  }

  return $.ajax({
    url: url,
    success: function (data){
      callback(data);
    }
  });
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