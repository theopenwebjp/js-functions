export = Utility;
declare const Utility_base: typeof import("./base-utility");
declare class Utility extends Utility_base {
}
declare namespace Utility {
    export { dataEquals, objectDataEquals, cleverSlice, getArguments, combineObjects, dataInArray, copyVariable, createMultiple, toReadableString, exportData, getSimilarity, getDataSet, executeAjax, getAjaxParams, handleAjaxResponse, AjaxResponseOptions, ArgumentsObject };
}
type AjaxResponseOptions = {
    callback: (arg0: boolean, arg1: XMLHttpRequest) => void;
};
type ArgumentsObject = any[];
//# sourceMappingURL=utility.d.ts.map