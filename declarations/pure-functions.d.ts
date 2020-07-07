export = PureFunctions;
declare class PureFunctions {
    static createObjectKeyObserver(object: Object, keys?: string[]): ProxyConstructor;
    static observeObjectKeys(object: Object, key: string): () => void;
}
//# sourceMappingURL=pure-functions.d.ts.map