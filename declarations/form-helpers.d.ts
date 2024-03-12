export function getLabelElement(element: HTMLElement): HTMLElement | undefined;
export function getLabel(element: HTMLElement): string;
export function clickRadioInputs(wrapper: HTMLElement): void;
export function enterTextInputs(wrapper: HTMLElement): void;
export function enterFormInputs(wrapper: HTMLElement): void;
export function createTag(tagName: string, attributes: import('./types/ts/index.js').Dictionary, children?: import('./types/ts/index.js').DomElementSettings[]): HTMLElement;
export function appendChildren(el: HTMLElement, children: HTMLElement[]): void;
export function setAttributes(el: HTMLElement, attributes: import('./types/ts/index.js').Dictionary): void;
export function getTableHeaderValue(el: HTMLElement): string;
export function attributesToSelector(attributes: import('./types/ts/index.js').Dictionary): string;
export function checkRequiredInput(el: HTMLElement): boolean;
export function getCheckedElements(el: HTMLElement): Element[];
export function setInputAsRequired(el: HTMLElement): void;
export function getRequiredInputs(form: HTMLFormElement): HTMLElement[];
export function handleSubmit(ev: Event): boolean;
export function inputObject(): import('./types/ts/index.js').InputObject;
export function formSettings(): import('./types/ts/index.js').FormSettings;
export function elementToInputObject(element: HTMLElement): import('./types/ts/index.js').InputObject;
export function elementsToInputObjects(elements: HTMLElement[]): import('./types/ts/index.js').InputObject[];
export function inputTypesToSelectors(inputTypes: {
    [x: string]: Partial<import('./types/ts/index.js').InputType>;
}): string[];
export function checkRequiredInputs(form: HTMLFormElement): boolean;
//# sourceMappingURL=form-helpers.d.ts.map