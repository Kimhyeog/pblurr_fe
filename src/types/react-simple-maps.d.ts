// src/types/react-simple-maps.d.ts

declare module "react-simple-maps" {
  import * as React from "react";

  export interface ComposableMapProps {
    children?: React.ReactNode;
    projection?: string;
    projectionConfig?: any;
    width?: number;
    height?: number;
    style?: React.CSSProperties;
  }

  export const ComposableMap: React.FC<ComposableMapProps>;

  export interface GeographiesProps {
    geography: string | object;
    children: (props: { geographies: any[] }) => React.ReactNode;
  }

  export const Geographies: React.FC<GeographiesProps>;

  export interface GeographyProps {
    geography: any;
    onClick?: (event: React.MouseEvent<SVGPathElement, MouseEvent>) => void;
    style?: {
      default: React.CSSProperties;
      hover: React.CSSProperties;
      pressed: React.CSSProperties;
    };
  }

  export const Geography: React.FC<GeographyProps>;
}
