export = BaseObjectHelper;
declare class BaseObjectHelper {
}
declare namespace BaseObjectHelper {
    export { copyObject, copyObjectData, applyObj, getObjectKeyValueAtIndex, getObjectKeys, expandCommonObjectIntoObject, logObjectOnSingleLine, isObject, isNonDomObject, isCommonObject, objectToObjectInfoArray, objectInfo, getAddedVariableNames, getRemovedVariableNames, filterObjectVariables, globalize, renameObjectKey, getKeyChanges, objectToReadableString, watchObjectProperty, Dictionary, ObjectInfo, KeyValue, GetterSetter, WatchOptions, WatchObject };
}
type Dictionary = {
    [x: string]: any;
};
type ObjectInfo = {
    depth: number;
    key: string;
    value: any;
};
type KeyValue = {
    key: string | null;
    value: any;
};
type GetterSetter = {
    get: () => any;
    set: (arg0: any) => void;
};
type WatchOptions = {
    get: () => any;
    set: (arg0: any) => void;
};
type WatchObject = {
    obj: any;
    key: string;
    initialValue: any;
    options: GetterSetter;
    stop: () => void;
};
//# sourceMappingURL=base-object-helper.d.ts.map