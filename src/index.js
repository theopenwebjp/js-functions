const JsFunctions = {

  // Base classes with no dependencies
  BaseArrayHelper: require('./base-array-helper'),
  BaseObjectHelper: require('./base-object-helper'),
  BaseUtility: require('./base-utility'),
  PureFunctions: require('./pure-functions'),

  // Classes that may be dependent on base classes
  Utility: require('./utility')
}

module.exports = JsFunctions
