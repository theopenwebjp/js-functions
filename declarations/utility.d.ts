export = Utility;
declare const Utility_base: typeof import("./base-utility");
declare class Utility extends Utility_base {
    static dataEquals(a: any, b: any): boolean;
    static objectDataEquals(a: any, b: any, looped?: any): boolean;
    static cleverSlice(arr: any[], from: number, to: number): any[];
    static getArguments(args: any[], from: number, to: number): any[];
    static combineObjects(args: object[]): Object;
    static dataInArray(data: any, arr: any[]): boolean;
    static copyVariable(variable: any, keepReferences?: boolean): any;
    static createMultiple(variable: any, count: number, keepReferences?: boolean): any[];
    static toReadableString(data: any): string;
    static exportData(data: any): string | null;
    static getSimilarity(var1: any, var2: any): number;
    static getDataSet(data: any): Object;
    static executeAjax(dataSet: Object, url: string, options: AjaxResponseOptions): any;
    static getAjaxParams(obj: import('./base-object-helper').Dictionary): string;
    static handleAjaxResponse(xhr: XMLHttpRequest, options: AjaxResponseOptions): any;
}
declare namespace Utility {
    export { AjaxResponseOptions, ArgumentsObject };
}
type AjaxResponseOptions = {
    callback: (arg0: boolean, arg1: XMLHttpRequest) => void;
};
type ArgumentsObject = any[];
//# sourceMappingURL=utility.d.ts.map