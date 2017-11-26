class NodeFunctions{
  static requireFile(url, encoding){
    if(!encoding){encoding = "utf8";}
    
    return eval( fs.readFileSync(url, encoding) );
  }
}

module.exports = NodeFunctions;