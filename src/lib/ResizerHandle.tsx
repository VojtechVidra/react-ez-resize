import React from "react";
import styles from "./Resizer.module.scss";

export interface ResizerHandleProps {
  className?: string;
  onResizeStart: (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    dir: ResizerDirection
  ) => void;
  direction: ResizerDirection;
  style: React.CSSProperties;
}

export const ResizerHandle: React.FC<ResizerHandleProps> = ({
  onResizeStart,
  className,
  direction,
  children,
  style
}) => (
  <div
    className={className}
    onMouseDown={e => onResizeStart(e, direction)}
    onTouchStart={e => onResizeStart(e, direction)}
    style={style}
  >
    {children}
  </div>
);

export enum ResizerDirection {
  RIGHT,
  LEFT,
  BOTTOM,
  TOP,
  BOTTOM_RIGHT,
  BOTTOM_LEFT,
  TOP_RIGHT,
  TOP_LEFT
}

export interface ResizerHandleType {
  className: string;
  direction: ResizerDirection;
}

export const ResizerHandleTypes: { [key: string]: ResizerHandleType } = {
  right: {
    className: [styles["resizer--handle"], styles["resizer--handle--right"]].join(" "),
    direction: ResizerDirection.RIGHT
  },
  left: {
    className: [styles["resizer--handle"], styles["resizer--handle--left"]].join(" "),
    direction: ResizerDirection.LEFT
  },
  bottom: {
    className: [styles["resizer--handle"], styles["resizer--handle--bottom"]].join(" "),
    direction: ResizerDirection.BOTTOM
  },
  top: {
    className: [styles["resizer--handle"], styles["resizer--handle--top"]].join(" "),
    direction: ResizerDirection.TOP
  },
  bottomRight: {
    className: [styles["resizer--handle"], styles["resizer--handle--bottomRight"]].join(" "),
    direction: ResizerDirection.BOTTOM_RIGHT
  },
  bottomLeft: {
    className: [styles["resizer--handle"], styles["resizer--handle--bottomLeft"]].join(" "),
    direction: ResizerDirection.BOTTOM_LEFT
  },
  topRight: {
    className: [styles["resizer--handle"], styles["resizer--handle--topRight"]].join(" "),
    direction: ResizerDirection.TOP_RIGHT
  },
  topLeft: {
    className: [styles["resizer--handle"], styles["resizer--handle--topLeft"]].join(" "),
    direction: ResizerDirection.TOP_LEFT
  }
};
