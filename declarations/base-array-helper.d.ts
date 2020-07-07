export = BaseArrayHelper;
declare class BaseArrayHelper {
    static searchObjectArray(arr: any[], key: string, val: any): any[];
    static singleDimensionArrayToObject(arr: string[], defaultVal?: string): any;
    static arrayListToObjectList(arr: string[], keys: (string | number)[]): {
        [x: string]: any;
    }[];
    static arrayToCamelCase(arr: string[]): string;
    static buildDelimiterString(arr: string[], format: string): string;
    static uniqueArray(arr: any[]): any[];
}
//# sourceMappingURL=base-array-helper.d.ts.map