"use strict";
class PureFunctions {
    static createObjectKeyObserver(object, keys = []) {
        const handler = {
            set(target, key, value) {
                if (keys.includes(String(key))) {
                    console.log(`Setting value ${String(key)} as ${value}`);
                    try {
                        throw new Error('Error for catching stack');
                    }
                    catch (error) {
                        console.log('Stack', error);
                    }
                    target[key] = value;
                }
                return true;
            }
        };
        return new Proxy(object, handler);
    }
    static observeObjectKeys(object, key) {
        function watch(prop, handler) {
            const obj = this;
            let currentVal = obj[prop];
            const getter = function () {
                return currentVal;
            };
            const setter = function (val) {
                return currentVal = handler.call(obj, prop, currentVal, val);
            };
            if (delete obj[prop]) {
                Object.defineProperty(obj, prop, {
                    get: getter,
                    set: setter,
                    enumerable: true,
                    configurable: true
                });
            }
        }
        if (!('watch' in Object.prototype)) {
            Object.defineProperty(Object.prototype, 'watch', {
                enumerable: false,
                configurable: true,
                writable: false,
                value: watch
            });
        }
        function unwatch(prop) {
            const obj = this;
            var val = obj[prop];
            delete obj[prop];
            obj[prop] = val;
        }
        if (!('unwatch' in Object.prototype)) {
            Object.defineProperty(Object.prototype, 'unwatch', {
                enumerable: false,
                configurable: true,
                writable: false,
                value: unwatch
            });
        }
        const polyfilledObject = object;
        polyfilledObject.watch(key, (key, oldVal, newVal) => {
            console.log(`Setting key ${key} from ${oldVal} to ${newVal}`);
            try {
                throw new Error('Error for catching stack');
            }
            catch (error) {
                console.log('Stack', error);
            }
            return newVal;
        });
        return () => {
            polyfilledObject.unwatch(key);
        };
    }
}
module.exports = PureFunctions;
