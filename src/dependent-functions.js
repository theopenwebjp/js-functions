/**
 * Functions dependent on other libraries.
 * TODO: Will become instance class. Dependencies will all be optional and checkable with typeguards.
 * TODO: Should be added in constructor as key value map. Should be added to this.dependencies.
 * TODO: Should be able to auto add dependencies with checker functions.
 */
class DependentFunctions {
    /**
     * Dependency: setUriParam
     *
     * @param {Array} languages // TODO: Check type
     * @param {Object} domHelper
     * @return {HTMLElement}
     */
    static getLanguageButtons(languages, domHelper) {
        // TODO: Import from DomHelper class
        var settings = {
                tag: 'ul',
                attributes: {
                    class: 'language-buttons'
                },
                settings: undefined
            }
            // TODO: Import from DomHelper class
        var childrenSettings = {
            replacements: {
                '$1': function(item /*, i */ ) {
                    return item
                },
                '$2': function(item /*, i */ ) {
                    var str = setUriParam(window.location.href, 'language', item) // TODO: fix like in other module.
                    return str
                }
            },
            items: languages,
            format: {
                tag: 'li',
                children: [{
                    tag: 'a',
                    attributes: {
                        href: '$2'
                    },
                    textContent: '$1'
                }]
            }
        }
        settings.children = domHelper.setChildrenSettings(settings, childrenSettings)

        var ul = domHelper.createElement(settings)

        return ul
    }

    /**
     * Dependency: jQuery, Utility, ObjectHelper
     *
     * @param {String} url
     * @param {Function} callback
     */
    static getVariablesFromFile(url, callback) {
        var beforeKeys = Object.keys(window)
        window.Utility.loadFile(url, function(data) {
            window.Utility.loadScriptData(data, function() {
                var added = window.Utility.getAddedVariableNames(window, beforeKeys)
                var variables = window.ObjectHelper.filterObjectVariables(data, added)

                callback(variables)
            })
        })
    }

    /**
     * Dependency: https://github.com/derek-watson/jsUri
     * Passes query value to function. Ex: http://domain.com?test=2 => testFunction(2);
     *
     * @param {String} uri
     * @param {Object} actions
     * @return {Object}
     */
    static uriActionHandler(uri, actions) {
        if (!window.Uri) {
            return false
        }
        var uriObj = new window.Uri(uri)

        var val
        var results = {}

        for (var key in actions) {
            val = uriObj.getQueryParamValue(key)
            results[key] = actions[key](val)
        }

        return results
    }

    /**
     * Dependency: https://github.com/derek-watson/jsUri
     *
     * @param {String} url
     * @param {string} key
     * @param {string} val
     */
    static setUriParam(url, key, val) {
        if (!window.Uri) {
            return false
        }
        var uriObj = new window.Uri(url)

        return uriObj.deleteQueryParam(key).addQueryParam(key, val)
    }

    /**
     * Dependency: https://github.com/jonsuh/hamburgers
     * css dependency so no check.
     *
     * @param {HTMLElement} hamburger
     */
    static setupHamburger(hamburger) {
        hamburger.addEventListener('click', function() {
            // Toggle class "is-active"
            hamburger.classList.toggle('is-active')
                // Do something else, like open/close menu
        })

        /*
            //jQuery
            $hamburger = $(el);
            $hamburger.on("click", function(e) {
              $hamburger.toggleClass("is-active");
              // Do something else, like open/close menu
            });
            */
    }

    /**
     * Dependency: mustache
     *
     * @param {Object} data
     */
    static mustachifyCurrentPage(data) {
        if (!window.Mustache) {
            return false
        }

        var el = document.body
        var html = el.innerHTML

        /*
            //Quick fix!! Forces all mustaches into no escape mustaches. Fails for loops.
            var customTags = [ '{', '}' ];
            //window.Mustache.parse(html, customTags);//Method 1
            window.Mustache.tags = customTags;//Method 2
            */
        /**
         * @param {string} text
         * @return {string}
         */
        window.Mustache.escapeHtml = function(text) {
                return text
            }
            /**
             * @param {string} text
             * @return {string}
             */
        window.Mustache.escape = function(text) {
            return text
        }

        html = window.Mustache.render(html, data)

        el.innerHTML = html

        return true
    }
}

module.exports = DependentFunctions