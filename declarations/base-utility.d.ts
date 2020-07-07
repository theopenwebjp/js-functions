export = BaseUtility;
declare class BaseUtility {
}
declare namespace BaseUtility {
    export { getWrappedStrings, asyncCheck, promisify, asyncHandler, equals, arrayEquals, exists, buildMediaQuery, promptPrint, log, getDataUrlExtension, download, downloadCurrentPage, getFileName, getFileExtension, downloadDataUrl, downloadBlob, downloadLink, toObject, parseFuzzyJson, parseJson, stringifyJson, loadFiles, loadFile, handleCallback, downloadData, handlePrompt, getCurrentDate, getFormattedString, getCurrentLocation, loadFileInput, convertTabbedDataToArray, replaceAll, getLoadScriptHandle, getLoadStyleSheetHandle, getLoadTemplateHandle, loadAbstractUrls, loadDependencyUrls, loadStyleSheets, loadScripts, loadScriptData, camelCaseToArray, isCapitalLetter, capitalize, getIndexOf, delimiterStringToArray, getStringSimilarity, getStringInclusionWeight, getNumberSimilarity, getMax, getMin, removeNonCharacters, isNativeFunction, buildFunctionModule, isLogFunction, getStackInfo, loopClassFunctions, loopClassProperties, loopClass, loopStaticClassMethods, bindClassThis, applyStaticFunctions, getStaticFunctionNames, getStaticFunctions, reduceObjectArray, waitFor, sleep, handleEvent, mergeEventsObject, urlToBlob, timeout, getPromisesByState, promiseAll, createDataURI, compare, isMinimzed, watchForHashValue, scanString, replaceStringIndexes, replaceAt, generateRandomString, fixPageAnchorTagSecurity, setSpaceDelimitedElementAttribute, preventSubmit, replaceAt2, failOnFalsy, toTemplate, stringIncludesAttribute, removeSubstringRanges, setupCustomElement, capitalizeFirstLetter, delimitedArrayToReadableStringMap, Dictionary, LimitRange, Dimensions, ProbabilityBoolean, StringPosition, ArrayRange, FILE_READER_METHOD_NAMES, CustomElementBase, CustomElement, CustomElementOptions, MultipleUrlLoadingOptions, LogOptions, AsyncHandlerItem, EventOptions };
}
type Dictionary = {
    [x: string]: any;
};
type LimitRange = {
    min: number;
    max: number;
};
type Dimensions = {
    width: LimitRange;
    height: LimitRange;
};
type ProbabilityBoolean = {
    percentage: number;
    level: string;
    bool: boolean;
};
type StringPosition = {
    startIndex: number;
    endIndex: number;
    value: string;
};
type ArrayRange = [number, number];
type FILE_READER_METHOD_NAMES = "readAsArrayBuffer" | "readAsBinaryString" | "readAsDataURL" | "readAsText";
type CustomElementBase = {
    rawTemplate: string;
    htmlData: {
        [x: string]: string;
    };
    html: string;
    css: string;
    element: HTMLElement | ShadowRoot | null;
};
type CustomElement = HTMLElement & CustomElementBase;
type CustomElementOptions = {
    html?: string;
    htmlData?: {
        [x: string]: string;
    };
    css?: string;
    renderer?: (arg0: string, arg1: {
        [x: string]: string;
    }) => string;
};
type MultipleUrlLoadingOptions = {
    ordered: boolean;
    parent: HTMLElement;
};
type LogOptions = {
    prettify: boolean;
    title: string;
    beforeLog: Function | null;
    afterLog: Function | null;
    type: "error" | "dir" | "table" | "time" | "memory" | "group" | "log" | "assert" | "clear" | "count" | "debug" | "dirxml" | "exception" | "groupCollapsed" | "groupEnd" | "info" | "markTimeline" | "profile" | "profileEnd" | "timeEnd" | "timeStamp" | "timeline" | "timelineEnd" | "trace" | "warn" | "Console" | "countReset" | "timeLog";
};
type AsyncHandlerItem = {
    handle: ((...arg0: any[]) => void) | null;
    args: any[];
    callbackParamIndex: number;
    index: number;
};
type EventOptions = {
    spreadArgs: boolean;
};
//# sourceMappingURL=base-utility.d.ts.map