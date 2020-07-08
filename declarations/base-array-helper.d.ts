export = BaseArrayHelper;
declare class BaseArrayHelper {
    static searchObjectArray(arr: object[], key: string, val: any): object[];
    static singleDimensionArrayToObject(arr: string[], defaultVal?: string): any;
    static arrayListToObjectList(arr: string[], keys: Array<string | number>): {
        [x: string]: any;
    }[];
    static arrayToCamelCase(arr: string[]): string;
    static buildDelimiterString(arr: string[], format: string): string;
    static uniqueArray(arr: any[]): any[];
}
//# sourceMappingURL=base-array-helper.d.ts.map