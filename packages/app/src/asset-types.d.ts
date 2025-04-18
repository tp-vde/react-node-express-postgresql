declare module '*.bmp' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.md' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.ico' {
  const src: string;
  export default src;
}

declare module '*.yaml' {
  const src: string;
  export default src;
}

/**
 * @deprecated support for .icon.svg extensions are being removed, inline the SVG elements in a MUI SvgIcon instead.
 * @example
 * ```tsx
 * import SvgIcon from '@material-ui/core/SvgIcon';
 *
 * const MyIcon = () => (
 *   <SvgIcon>
 *     <g>
 *        <path d="..." />
 *      </g>
 *   </SvgIcon>
 * )
 * ```
 */
declare module '*.icon.svg' {
  import { ComponentType } from 'react';
  import { SvgIconProps } from '@material-ui/core';

  /**
   * @deprecated support for .icon.svg extensions are being removed, inline the SVG elements in a MUI SvgIcon instead.
   * @example
   * ```tsx
   * import SvgIcon from '@material-ui/core/SvgIcon';
   *
   * const MyIcon = () => (
   *   <SvgIcon>
   *     <g>
   *        <path d="..." />
   *      </g>
   *   </SvgIcon>
   * )
   * ```
   */
  const Icon: ComponentType<SvgIconProps>;
  export default Icon;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

declare module '*.eot' {
  const src: string;
  export default src;
}

declare module '*.woff' {
  const src: string;
  export default src;
}

declare module '*.woff2' {
  const src: string;
  export default src;
}

declare module '*.ttf' {
  const src: string;
  export default src;
}

declare module '*.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// NOTE(freben): Both the fix, and the placement of the fix, are not great.
//
// The fix is because the PositionError was renamed to
// GeolocationPositionError outside of our control, and react-use is dependent
// on the old name.
//
// The placement is because it's the one location we have at the moment, where
// a central .d.ts file is imported by the frontend and can be amended.
//
// After both TS and react-use are bumped high enough, this should be removed.
type PositionError = GeolocationPositionError;
