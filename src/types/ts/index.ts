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
 index?: number;
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
 * @description Technically not any array.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments
 */
export type ArgumentsObject = IArguments // any[];

export type RGBASelection = {
  r: boolean;
  g: boolean;
  b: boolean;
  a: boolean;
};

export type CachedHTMLCanvasElement = HTMLCanvasElement & {
  _context?: CanvasRenderingContext2D | null | undefined;
};

export type CanvasImageOptions = {
  format: string;
  serialization: 'data_url' | 'image';
  on_load: (...args: any[]) => any;
  conversion_options: number | null;
};

export type CanvasImageSourceData = string | HTMLImageElement;

export type SimpleDOMRect = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

export type RGBA = [number, number, number, number];
export type RGBACount = {
  rgba: [number, number, number, number];
  count: number;
  index: number;
};

export type ChildrenSettings = {
  replacements: {
      [x: string]: any;
  };
  format: DomElementSettings;
  items: any[];
};
export type DomElementSettings = {
  tag: string;
  children: DomElementSettings[];
  attributes: {
      [x: string]: string;
  };
  textContent: string;
  innerHTML: string;
  events: {
      [x: string]: (...args: any[]) => any;
  };
};
export type Margins = {
  top: number | null;
  left: number | null;
};


export type Link = {
  text: string;
  url: string;
};


export type WatchedHTMLElement = HTMLElement & {
  __listenerChangeHandles: any;
  __handleEvent: any;
  __addEventListener: any;
  __removeEventListener: any;
};

export type CustomDOMRect = {
  width: number;
  height: number;
  x: number;
  y: number;
  top: number;
  left: number;
};
export type NameValue = {
  name: string;
  value: any;
};

export type NavigatorGetUserMedia = (constraints: MediaStreamConstraints, onStream: (stream: MediaStream) => void, onError: (error: Error) => void) => void;

export type GetUserMediaPolyfilledNavigator = Navigator & {
  getUserMedia?: NavigatorGetUserMedia;
  mozGetUserMedia?: NavigatorGetUserMedia;
  webkitGetUserMedia?: NavigatorGetUserMedia;
};
export type NavigatorUserMediaSuccessCallback = (stream: MediaStream) => void;
export type StreamObject = {
  stream: MediaStream | null;
  /**
   * // DEPRECATED
   */
  object_url: string | null;
  video: HTMLVideoElement | null;
};
export type StreamError = {
  error: Error | null;
  isError: boolean;
};

export type FormOptions = {
  method: string;
  /**
   * : '', // url OR function
   */
  action: string | ((event: SubmitEvent) => void);
  controls: {
      reset: boolean;
      submit: boolean;
  };
};
export type MenuListItem = {
  type: string;
  click: () => void;
  text: string;
  id: string;
  class: string;
  empty: boolean;
  orientation: 'vertical' | 'horizontal';
};
export type MenuListSettings = {
  items: MenuListItem[];
  element: HTMLElement | undefined;
  isChild: boolean;
  hide: boolean;
  header: {
      text: string;
      id: string;
  };
};
/**
* typedef {{ -readonly [P in keyof DOMRect]: DOMRect[P] }} CustomDOMRect // Don't want functions
*/
export type ElementPosition = {
  element: HTMLElement;
  /**
   * // Matched type
   */
  type: string | null;
  /**
   * // Integer index from 0
   */
  attributeIndex: number;
  /**
   * // Character index type area
   */
  stringIndex: number;
  /**
   * // Length of match
   */
  stringLength: number;
};

export type DOMSearchSettings = {
  tag: boolean;
  textContent: boolean;
  attributeKey: boolean;
  attributeValue: boolean;
  handle: ((arg0: HTMLElement) => any) | null;
};

export type InputElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
export type InputType = {
  tag: string;
  placeholder: boolean;
  attributes: {
      [x: string]: string;
  };
  /**
   * // If handle: Number(val)
   */
  format: (value: any) => any;
  multiple: boolean;
  /**
   * // Default = use .value. If handle: (el)=>{return el.value;}.
   */
  value: (element: InputElement) => any;
  /**
   * // Default = use .value. If handle: (el, val)=>{el.value = val;}.
   */
  setValue: (element: InputElement, value: any) => void;
};
export type InputObject = {
  type: string;
  tag: string;
  attributes: {
      [x: string]: string;
  };
  key: string;
  label: string;
  values: any[];
  rowHeader: string;
  initialSelection: string;
  required: boolean;
};
export type FormSettings = {
  action: string;
  actionType: string;
  inputs: InputObject[];
};

export type Falsy = undefined | null | false | 0 | '';
