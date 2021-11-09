# React EZ Resize

[![Build Status](https://travis-ci.org/VojtechVidra/react-ez-resize.svg?branch=master)](https://travis-ci.org/VojtechVidra/react-ez-resize)

## Props

`defaultWidth: number;`
Default width applied to state on mount.

`defaultHeight: number;`
Default height applied to state on mount.

`width?: string | number;`
Overrides width from state of internal component. You can manage your own state with onResize event.

`height?: string | number;`
Overrides height from state of internal component.

`minWidth?: number;`
Minimum width of Resizer when resizing. Maximum width is applied to width of parent element.

`minHeight?: number;`
Minimum height of Resizer when resizing. Maximum height is applied to width of parent element.

`className?: string;`
`className` of Resizer div.

`style?: React.CSSProperties;`
`style` of Resizer div. You cannot override `width` and `height` of Resizer div with `style`.

```
handleContent?: {
  top?: React.ReactNode;
  topRight?: React.ReactNode;
  right?: React.ReactNode;
  bottomRight?: React.ReactNode;
  bottom?: React.ReactNode;
  bottomLeft?: React.ReactNode;
  left?: React.ReactNode;
  topleft?: React.ReactNode;
};
```
Content of specific handles.

```
handleClassName?: {
  top?: string;
  topRight?: string;
  right?: string;
  bottomRight?: string;
  bottom?: string;
  bottomLeft?: string;
  left?: string;
  topleft?: string;
};
```
`classname` of specific handle.

```
handleStyle?: {
  top?: React.CSSProperties;
  topRight?: React.CSSProperties;
  right?: React.CSSProperties;
  bottomRight?: React.CSSProperties;
  bottom?: React.CSSProperties;
  bottomLeft?: React.CSSProperties;
  left?: React.CSSProperties;
  topleft?: React.CSSProperties;
};
```
`style` of specific handle.

```
handleEnabled?: {
  top?: boolean;
  topRight?: boolean;
  right?: boolean;
  bottomRight?: boolean;
  bottom?: boolean;
  bottomLeft?: boolean;
  left?: boolean;
  topleft?: boolean;
};
```
Enable specific handle. By default all handles are disabled.

`onStartResize?: (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>, direction: ResizerDirection ) => void;`
Fired `onMouseDown` of any handle.

`onResize?: (e: MouseEvent | TouchEvent) => void;`
Fired if `onStartResize` was fired before this, `onMouseMove`. 

`onStopResize?: () => void;`
Fired `onMouseUp` after `onStartResize`.
