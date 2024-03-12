export function watchCanvas(canvas: HTMLCanvasElement, onChange: () => void, intervalMs?: number): () => void;
export function RGBASelection(options: Partial<import('./types/ts/index.js').RGBASelection>): {
    r: boolean;
    g: boolean;
    b: boolean;
    a: boolean;
} & Partial<import("./types/ts/index.js").RGBASelection>;
export function getContext(canvas: import('./types/ts/index.js').CachedHTMLCanvasElement): CanvasRenderingContext2D;
export function canvasToStream(canvas: HTMLCanvasElement, fps: number): MediaStream | boolean;
export function canvasToImage(canvas: HTMLCanvasElement, options: Partial<import('./types/ts/index.js').CanvasImageOptions>): string | HTMLImageElement;
export function drawableToImage(drawable: any): HTMLImageElement;
export function ImageSrcToDataURL(src: string, onLoad: (dataUrl: string) => void, format: string, conversionOptions: number | undefined): void;
export function drawableToCanvas(drawable: CanvasImageSource, startCanvas?: undefined | HTMLCanvasElement): HTMLCanvasElement;
export function drawableToDataURL(drawable: CanvasImageSource, format?: string | undefined, conversionOptions?: number | undefined): string;
export function canvasToDataURL(canvas: HTMLCanvasElement, format?: string | undefined, encoderOptions?: number | undefined): string;
export function canvasToImageFile(canvas: HTMLCanvasElement, format: string, conversionOptions: number | undefined, onLoad?: ((image: HTMLImageElement) => void) | undefined): HTMLImageElement;
export function watchForCanvasStop(canvas: HTMLCanvasElement, onStop: () => void, options: {
    interval: number;
}): void;
export function isImageDataSame(imgData1: ImageData, imgData2: ImageData): boolean;
export function canvasHasColorData(canvas: HTMLCanvasElement, rgbaOptions?: Partial<import('./types/ts/index.js').RGBASelection>): boolean;
export function fitCanvasToBoundingRect(canvas: HTMLCanvasElement, boundingRect: import('./types/ts/index.js').SimpleDOMRect): HTMLCanvasElement;
export function getContextBoundingRect(ctx: CanvasRenderingContext2D): import("./types/ts/index.js").SimpleDOMRect;
export function BoundingRect(): import('./types/ts/index.js').SimpleDOMRect;
export function loopImageData(imgData: ImageData, onPixel: (rgba: import('./types/ts/index.js').RGBA, index: number) => void): void;
export function diffRGBA(rgba1: import('./types/ts/index.js').RGBA, rgba2: import('./types/ts/index.js').RGBA): number;
export function getMainColor(imgData: ImageData, threshold?: number | undefined): any;
export function getMaxRGBACount(colors: import('./types/ts/index.js').RGBACount[]): any;
//# sourceMappingURL=canvas-helpers.d.ts.map