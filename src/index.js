const JsFunctions = {

    // Base classes with no dependencies
    BaseArrayHelper: require('./base-array-helper'),
    BaseObjectHelper: require('./base-object-helper'),
    BaseUtility: require('./base-utility'),

    // Classes that may be dependent on base classes
    Utility: require('./utility'),

    // Classes that may be dependent on above
    DependentFunctions: require('./dependent-functions'),
    JQueryFunctions: require('./jquery-functions')
}

module.exports = JsFunctions