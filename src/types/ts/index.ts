export type Dictionary = Record<string, any>;
export interface ObjectInfo {
  depth: number;
  key: string;
  value: any;
}
export interface KeyValue {
  key: null|string;
  value: null|any;
}

export interface GetterSetter {
 get: () => any;
 set: (v: any) => void;
}

export type WatchOptions = GetterSetter;

export interface WatchObject {
 obj: object; 
 key: string; 
 initialValue: any; 
 options: WatchOptions; 
 stop: () => void; 
}

export type CommonObject = (any[])|Dictionary;

/**
 * Also array allowed. Anything with keys ok.
 */
export interface Changes {
  added: Dictionary;
  updated: Dictionary;
  old: Dictionary;
  deleted: Dictionary;
}
export interface LimitRange {
  min: number;
  max: number;
}

export interface Dimensions {
  width: LimitRange;
  height: LimitRange;
}

export interface ProbabilityBoolean {
  percentage: number;
  level: string;
  bool: boolean;
}

export interface StringPosition {
  startIndex: number;
  endIndex: number;
  value: string;
}

/**
 * [startIndex, endIndex]
 */
export type ArrayRange = [number, number]
export type FILE_READER_METHOD_NAMES = 'readAsArrayBuffer'|'readAsBinaryString'|'readAsDataURL'|'readAsText';
export interface CustomElementBase {
  rawTemplate: string;
  htmlData: Record<string, string>;
  html: string;
  css: string;
  element: ShadowRoot|HTMLElement|null;
}
export type CustomElement = HTMLElement & CustomElementBase;

export interface CustomElementOptions {
  html?: string;
  htmlData?: Record<string, string>;
  css?: string;
  renderer?: (rawTemplate: CustomElementBase['rawTemplate'], htmlData: CustomElementBase['htmlData']) => string;
}

export interface MultipleUrlLoadingOptions {
 ordered: boolean;
 parent: HTMLElement;
}

export type ConsoleLogType = 'trace'|'debug'|'log'|'info'|'warn'|'error';

export interface LogOptions {
 prettify: boolean;
 title: string;
 beforeLog: ((data: any) => any)|null
 afterLog: ((data: any) => any)|null
 type: ConsoleLogType;
}

export interface AsyncHandlerItem {
 handle: null|((...args: any[]) => void);
 args: any[]
 callbackParamIndex: number;
 index: number;
}

export interface EventOptions {
  spreadArgs: boolean;
}

export interface AsyncHandlerStatus {
  current: number;
  total: number;
  returned: any[];
}
export interface AsyncHandlerStatus {
  current: number;
  total: number;
  returned: any[];
}
export interface StackPart {
  function: string;
  lineNumber: number|null;
  columnNumber: number|null;
}

export interface StackInfo {
  error: Error|null;
  stack: string;
  function: string|null;
  stackParts: StackPart[];
  lineNumber: number|null;
  columnNumber: number|null;
}

export interface AjaxResponseOptions {
 callback: (response: any, xhr: XMLHttpRequest) => void;
}

/**
 * @description Technically not any array. TODO: What is the correct type for this?
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments
 */
export type ArgumentsObject = any[];
