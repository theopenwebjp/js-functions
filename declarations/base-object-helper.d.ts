export = BaseObjectHelper;
declare class BaseObjectHelper {
    static copyObject(obj: Object): any;
    static copyObjectData(obj: Dictionary): Dictionary;
    static applyObj(from: Dictionary, to: Dictionary, condition: (arg0: string, arg1: Dictionary, arg2: Dictionary) => boolean): Dictionary;
    static getObjectKeyValueAtIndex(obj: Dictionary, index: number): Object;
    static getObjectKeys(obj: Object): string[];
    static expandCommonObjectIntoObject(obj: any[] | {
        [x: string]: any;
    }, parentObj: any[] | {
        [x: string]: any;
    }, insertIndex?: number): any[] | {
        [x: string]: any;
    };
    static logObjectOnSingleLine(obj: Dictionary): void;
    static isObject(obj: any): boolean;
    static isNonDomObject(obj: Object): boolean;
    static isCommonObject(obj: any): boolean;
    static objectToObjectInfoArray(obj: Dictionary, curDepth?: number, arr?: ObjectInfo[]): ObjectInfo[];
    static objectInfo(depth: number, key: any, value: any): ObjectInfo;
    static getAddedVariableNames(obj: Object, beforeKeys: string[]): string[];
    static getRemovedVariableNames(obj: Object, beforeKeys: string[]): string[];
    static filterObjectVariables(obj: Dictionary, keys: string[]): Object;
    static globalize(obj: Dictionary): void;
    static renameObjectKey(obj: Dictionary, oldKey: string, newKey: string): void;
    static getKeyChanges(oldObj: Dictionary, newObj: Dictionary): Dictionary;
    static objectToReadableString(obj: Object, onError?: Function | undefined): string;
    static watchObjectProperty(obj: Dictionary, key: string, options?: Partial<WatchOptions>): WatchObject;
}
declare namespace BaseObjectHelper {
    export { Dictionary, ObjectInfo, KeyValue, GetterSetter, WatchOptions, WatchObject };
}
type Dictionary = {
    [x: string]: any;
};
type ObjectInfo = {
    depth: number;
    key: string;
    value: any;
};
type WatchOptions = {
    get: () => any;
    set: (arg0: any) => void;
};
type WatchObject = {
    obj: object;
    key: string;
    initialValue: any;
    options: WatchOptions;
    stop: () => void;
};
type KeyValue = {
    key: null | string;
    value: null | any;
};
type GetterSetter = {
    get: () => any;
    set: (arg0: any) => void;
};
//# sourceMappingURL=base-object-helper.d.ts.map