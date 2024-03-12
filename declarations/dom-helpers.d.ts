export function getUniqueDOMText(wrapper: HTMLElement | Document): string[];
export function getNestedTextNodes(element: Element | Document): Node[];
export function DomElementSettings(options?: Partial<import('./types/ts/index.js').DomElementSettings>): import('./types/ts/index.js').DomElementSettings;
export function DOMSearchSettings(options?: Partial<import('./types/ts/index.js').DOMSearchSettings>): import('./types/ts/index.js').DOMSearchSettings;
export function ChildrenSettings(options: Partial<import('./types/ts/index.js').ChildrenSettings>): import('./types/ts/index.js').ChildrenSettings;
export function createElements(settingsArr: Partial<import('./types/ts/index.js').DomElementSettings>[], defaults: Partial<import('./types/ts/index.js').DomElementSettings>): HTMLElement[];
export function createElement(options: Partial<import('./types/ts/index.js').DomElementSettings>): HTMLElement;
export function setChildrenSettings(settings: import('./types/ts/index.js').DomElementSettings, childrenOptions: Partial<import('./types/ts/index.js').ChildrenSettings>): import("./types/ts/index.js").DomElementSettings[];
export function createTable(rows: Array<string[]>): HTMLTableElement;
export function createElementList(nameValues: import('./types/ts/index.js').NameValue[]): HTMLUListElement;
export function createKeyValueList(obj: Record<string, any>): HTMLUListElement;
export function createList(arr: (HTMLElement | string)[]): HTMLUListElement;
export function createHeadedArrayElement(handle: ((arr: any[]) => HTMLElement) | undefined, headerText: string, arr: (any[])): HTMLDivElement;
export function createHeadedTable(header: string, arr: string[]): HTMLDivElement;
export function createHeadedList(header: string, arr: string[]): HTMLDivElement;
export function createHeadedKeyValueList(header: string, obj: object): HTMLDivElement;
export function MenuListSettings(options?: Partial<import('./types/ts/index.js').MenuListSettings>): import('./types/ts/index.js').MenuListSettings;
export function setupMenuList(parentEl: HTMLElement, settings: import('./types/ts/index.js').MenuListSettings): HTMLElement;
export function createBreadcrumbList(links: (string | import('./types/ts/index.js').Link)[], separator: string): HTMLSpanElement;
export function groupify(nameValues: import('./types/ts/index.js').NameValue[]): HTMLDivElement;
export function clearForm(form: HTMLFormElement): void;
export function _setEvents(el: HTMLElement, events: {
    [x: string]: (...args: any[]) => void;
}): void;
export function _setChildren(el: HTMLElement, settingsArr: import('./types/ts/index.js').DomElementSettings[]): HTMLElement;
export function _handleChildrenReplacements(childrenSettings: import('./types/ts/index.js').ChildrenSettings): import("./types/ts/index.js").DomElementSettings[];
export function _handleChildReplacements(item: any, format: Partial<import('./types/ts/index.js').DomElementSettings>, replacements: {
    [x: string]: (arg0: any, arg1: string) => any;
}): import("./types/ts/index.js").DomElementSettings;
export function _applyObjectReplacement(obj: Record<string, (any | string | (() => any))>, item: any, elementPropKey: keyof Record<string, any>, replacements: Record<string, ((arg0: any, arg1: string) => any)>): void;
export function appendChildren(el: HTMLElement, children: HTMLElement[]): void;
export function setAttributes(el: HTMLElement, attributes: {
    [x: string]: string;
}): void;
export function NameValue(): object;
export function createCommonList(arr: {
    name: string;
    value: string | HTMLElement;
}[]): HTMLUListElement;
export function FormOptions(options?: Partial<import('./types/ts/index.js').FormOptions>): import('./types/ts/index.js').FormOptions;
export function formify(el: HTMLElement, fOptions: Partial<import('./types/ts/index.js').FormOptions>): HTMLFormElement;
export function getElementScreenDimensions(el: HTMLElement): DOMRect;
export function getElementPageDimensions(el: HTMLElement): import("./types/ts/index.js").CustomDOMRect;
export function setStylePosition(el: HTMLElement, position: any): void;
export function setStyleDimensions(el: HTMLElement, dimensions: Record<keyof CSSStyleDeclaration, string | null>): void;
export function setStyleMeasurements(el: HTMLElement, obj: Record<keyof CSSStyleDeclaration, string | null>, allowed: string[], unit?: string | undefined): void;
export function applyMarginsToDimensions(margins: Partial<import('./types/ts/index.js').Margins>, dimensions: import('./types/ts/index.js').CustomDOMRect): void;
export function displayElementAtScreenDimensions(el: HTMLElement, dimensions: object): HTMLElement;
export function displayElementAtPageDimensions(el: HTMLElement, dimensions: object): HTMLElement;
export function showAboveElement(shownElement: HTMLElement, targetElement: HTMLElement, options: Partial<import('./types/ts/index.js').Margins>): HTMLElement;
export function watchDocumentSizeChanges(element: HTMLElement, handle: Function): void;
export function startWatchingHtmlElementListenerChanges(eventName: string, handle: Function): void;
export function stopWatchingHtmlElementListenerChanges(eventName: string, handle: Function): boolean;
export function getAvailableElementEvents(el: HTMLElement): string[];
export function htmlifyEvents(el: HTMLElement, eventNames: string[]): void;
export function htmlifyEvent(el: HTMLElement, eventName: string): void;
export function getParents(el: HTMLElement): HTMLElement[];
export function getClosestParent(el: HTMLElement, selector: string): HTMLElement | null;
export function removeTabIndexes(): void;
export function setTabIndexes(elements: HTMLElement[]): void;
export function getHtmlImport(selector: string): DocumentFragment | null;
export function e(id: string): HTMLElement | null | undefined;
export function getElementsByIds(ids: string[]): HTMLElement[];
export function getDOMList(arr: string[]): HTMLUListElement;
export function getDOMImage(src: string): HTMLImageElement;
export function getDOMInputsList(inputs: HTMLInputElement[]): HTMLTableElement;
export function getDOMInputRow(input: HTMLInputElement): HTMLTableRowElement;
export function setClickFileHandler(el: HTMLElement, onFileHandle: () => void): void;
export function getElementPositionData(elementPosition: import('./types/ts/index.js').ElementPosition): string | null;
export function searchDom(searchStr: string, optionalType?: Partial<import('./types/ts/index.js').DOMSearchSettings>, el?: HTMLElement | Document): import('./types/ts/index.js').ElementPosition[] | undefined;
export function arrayInputter(objectInfoArray: {
    key: string;
    value: any;
}[]): HTMLUListElement;
export function nestedInputter(obj: {
    [x: string]: any;
}): HTMLUListElement;
export function textNodesUnder(el: HTMLElement): Node[];
export function getElementsBySelectors(selectors: string[], baseElement?: Element | Document | HTMLElement | undefined): Element[];
export function getElementsMappedToSelectors(selectors: string[], baseElement?: Document | HTMLElement | undefined): {
    [x: string]: HTMLElement[];
};
export function getAllElements(): Element[];
export function getAllChildren(el: HTMLElement | Document): Element[];
export function getElementsWithAttribute(attr: string): HTMLElement[];
export function getElementAttributes(el: HTMLElement): {
    [x: string]: string;
};
export function getAttributeSelector(attr: string, value?: string): string;
export function getElementsByAttribute(attr: string, value: string): NodeListOf<Element>;
export function getNestedAttributeListFromElement(el: Element | Document, attr: string): string[];
export function setElementAsEditable(el: HTMLElement, onChange: () => void, bool: boolean): void;
export function setEditMode(attr: string, bool: boolean): void;
export function centerFixElement(el: HTMLElement): void;
export function convertTableHtmlToArray(html: string): string[][];
export function convertTableElementToArray(table: HTMLTableElement): string[][];
export function convertTableRowElementsToArray(rows: HTMLTableRowElement[]): string[][];
export function convertArrToTableElement(arr: Array<string[]>): HTMLTableElement;
export function elementChainer(el: HTMLElement): Object;
export function getUsedDOMBoundingRect(): {
    top: number;
    right: number;
    bottom: number;
    left: number;
    width: number;
    height: number;
};
export function getElementsBoundingRect(elements: Element[]): {
    top: number;
    right: number;
    bottom: number;
    left: number;
    width: number;
    height: number;
};
export function attemptUpdateNestedTextContent(element: Element, textContent: string): boolean;
export function createIframeLoader(src: string, selector: string): () => void;
//# sourceMappingURL=dom-helpers.d.ts.map