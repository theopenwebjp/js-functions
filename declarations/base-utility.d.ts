export = BaseUtility;
declare class BaseUtility {
    static getWrappedStrings(str: string, wrapperOpen: string, wrapperClose: string, keepWrapper?: boolean, useClosingTagEnd?: boolean): string[];
    static asyncCheck(callback: Function): void;
    static promisify(handle: Function, args: any[], resolveIndex: number): Promise<any>;
    static asyncHandler(arr: AsyncHandlerItem[], onEnd: Function): boolean;
    static equals(a: any, b: any): boolean;
    static arrayEquals(a: any[], b: any[]): boolean;
    static exists(data: any): boolean;
    static buildMediaQuery(dimensions: Dimensions): string;
    static promptPrint(): void;
    static log(data: any, options?: LogOptions | undefined): false | undefined;
    static getDataUrlExtension(dataUrl: string): string;
    static download(data: any, name: string, mimeType: string): boolean;
    static downloadCurrentPage(): boolean;
    static getFileName(url: string): string;
    static getFileExtension(url: string): string;
    static downloadDataUrl(dataUrl: string, name: string): void;
    static downloadBlob(blob: Blob, name: string): boolean;
    static downloadLink(url: string, fullName: string): void;
    static toObject(data: any, onError?: Function | undefined): Object;
    static parseFuzzyJson(str: string): Object;
    static parseJson(str: string): Object | null;
    static stringifyJson(jsonObj: string): string | null;
    static loadFiles(urls: string[], onData: Function): Promise<any[]>;
    static loadFile(url: string, callback: (arg0: any) => void, onError?: ((arg0: Error | any) => void) | undefined): XMLHttpRequest;
    static handleCallback(callback: (...args: any[]) => any, args: any[]): any;
    static downloadData(data: any, name: string): boolean;
    static handlePrompt(handle: Function, text: string, defaultText: string): any;
    static getCurrentDate(): Date;
    static getFormattedString(str: string, delimiter: string, lenArr: number[]): string;
    static getCurrentLocation(callback: Function): void;
    static loadFileInput(event: InputEvent | DragEvent, callback: Function, options: {
        method: FILE_READER_METHOD_NAMES;
    }): FileReader;
    static convertTabbedDataToArray(data: string, colCount: number): Array<never[]> | Array<string[]>;
    static replaceAll(str: string, find: string, replace: string): string;
    static getLoadScriptHandle(src: string, parent: HTMLElement): Promise<Event>;
    static getLoadStyleSheetHandle(src: string, parent: HTMLElement): Promise<Event>;
    static getLoadTemplateHandle(src: string, parent: HTMLElement): Promise<Event>;
    static loadAbstractUrls(arr: string[], handle: (arg0: string, arg1: HTMLElement) => any, options?: Partial<MultipleUrlLoadingOptions>): Promise<any[]>;
    static loadDependencyUrls(arr: string[], options?: Object): Promise<any[]>;
    static loadStyleSheets(arr: string[], optionsAbstract?: Object): Promise<any[]>;
    static loadScripts(arr: string[], optionsAbstract?: Object): Promise<any[]>;
    static loadScriptData(data: string, onLoad: Function): HTMLElement;
    static camelCaseToArray(str: string): string[];
    static isCapitalLetter(char: string): boolean;
    static capitalize(str: string): string;
    static getIndexOf(data: any, find: any): string | number;
    static delimiterStringToArray(str: string, format: string): string[];
    static getStringSimilarity(str1: string, str2: string): number;
    static getStringInclusionWeight(str1: string, str2: string): number;
    static getNumberSimilarity(num1: number, num2: number): number;
    static getMax(...args: number[]): number | null;
    static getMin(...args: number[]): number | null;
    static removeNonCharacters(str: string): string;
    static isNativeFunction(func: Function): boolean;
    static buildFunctionModule(funcs: Function[]): string;
    static isLogFunction(func: Function): boolean;
    static getStackInfo(): Object;
    static loopClassFunctions(classInstance: Dictionary, onFunction: (arg0: (...args: any[]) => any, arg1: string, arg2: {
        [x: string]: any;
    }) => void): void;
    static loopClassProperties(classInstance: Dictionary, onProperty: Function): void;
    static loopClass(classInstance: object, onVariable: (arg0: string) => void): void;
    static loopStaticClassMethods(): void;
    static bindClassThis(classInstance: Dictionary): void;
    static applyStaticFunctions(classInstance: Dictionary, constructor: Function): void;
    static getStaticFunctionNames(constructor: any): string[];
    static getStaticFunctions(constructor: any): {
        [k: string]: any;
    };
    static reduceObjectArray(objArr: {
        [x: string]: number;
    }[]): {
        [x: string]: number;
    };
    static waitFor(condition: Function, pollInterval?: number): Promise<void>;
    static sleep(ms: number): Promise<void>;
    static handleEvent(events: Dictionary, name: string, data?: any, options?: Partial<EventOptions>): any;
    static mergeEventsObject(events1: Object, events2: Object): Object;
    static urlToBlob(url: string): Promise<any>;
    static timeout(promise: Promise<any>, ms: number): Promise<any>;
    static getPromisesByState(promises: Promise<any>[], resolved?: boolean): Promise<Promise<boolean>[]>;
    static promiseAll(arr: (() => Promise<any>)[], ordered?: boolean): Promise<any[]>;
    static createDataURI(data: string, mimeType?: string, options?: Dictionary): string;
    static compare(a: any, b: any, comparator?: string): boolean;
    static isMinimzed(str: string): ProbabilityBoolean;
    static watchForHashValue(value: string, func: Function): void;
    static scanString(string: string, checker: Function): StringPosition[];
    static replaceStringIndexes(string: string, indexes?: [string, number, number][], sortRequired?: boolean): string;
    static replaceAt(string: string, replacer: string, startIndex: number, endIndex: number): string;
    static generateRandomString(length?: number): string;
    static fixPageAnchorTagSecurity(): void;
    static setSpaceDelimitedElementAttribute(element: HTMLElement, attribute: string, values?: string[]): void;
    static preventSubmit(form: HTMLFormElement): void;
    static replaceAt2(string: string, fromIndex: number, length: number, replacement: string): string;
    static failOnFalsy(value: any): any;
    static toTemplate(html?: string): HTMLTemplateElement;
    static stringIncludesAttribute(text: string, name: string, value: string): boolean;
    static removeSubstringRanges(text: string, ranges?: [number, number][]): string;
    static setupCustomElement(customElement: CustomElement, options?: CustomElementOptions): void;
    static capitalizeFirstLetter(item: string): string;
    static delimitedArrayToReadableStringMap(array: string[], delimiter?: string | undefined): Object;
}
declare namespace BaseUtility {
    export { Dictionary, LimitRange, Dimensions, ProbabilityBoolean, StringPosition, ArrayRange, FILE_READER_METHOD_NAMES, CustomElementBase, CustomElement, CustomElementOptions, MultipleUrlLoadingOptions, LogOptions, AsyncHandlerItem, EventOptions };
}
type AsyncHandlerItem = {
    handle: null | ((...args: any[]) => void);
    args: any[];
    callbackParamIndex: number;
    index: number;
};
type Dimensions = {
    width: LimitRange;
    height: LimitRange;
};
type LogOptions = {
    prettify: boolean;
    title: string;
    beforeLog: Function | null;
    afterLog: Function | null;
    type: keyof Console;
};
type FILE_READER_METHOD_NAMES = "readAsArrayBuffer" | "readAsBinaryString" | "readAsDataURL" | "readAsText";
type MultipleUrlLoadingOptions = {
    ordered: boolean;
    parent: HTMLElement;
};
type Dictionary = {
    [x: string]: any;
};
type EventOptions = {
    spreadArgs: boolean;
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
type LimitRange = {
    min: number;
    max: number;
};
type ArrayRange = [number, number];
type CustomElementBase = {
    rawTemplate: string;
    htmlData: {
        [x: string]: string;
    };
    html: string;
    css: string;
    element: ShadowRoot | HTMLElement | null;
};
//# sourceMappingURL=base-utility.d.ts.map