declare module "pica" {
  export interface PicaResizeOptions {
    alpha?: boolean;
    unsharpAmount?: number;
    unsharpRadius?: number;
    unsharpThreshold?: number;
  }

  export interface Pica {
    resize(
      from: HTMLCanvasElement,
      to: HTMLCanvasElement,
      options?: PicaResizeOptions
    ): Promise<HTMLCanvasElement>;

    toBlob(
      canvas: HTMLCanvasElement,
      mimeType?: string,
      quality?: number
    ): Promise<Blob>;
  }

  export default function pica(): Pica;
}
