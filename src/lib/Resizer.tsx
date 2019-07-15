import React from "react";
import styles from "./Resizer.module.scss";
import { ResizerHandle, ResizerDirection, ResizerHandleTypes } from "lib/ResizerHandle";

interface HandleContent {
  top?: React.ReactNode;
  topRight?: React.ReactNode;
  right?: React.ReactNode;
  bottomRight?: React.ReactNode;
  bottom?: React.ReactNode;
  bottomLeft?: React.ReactNode;
  left?: React.ReactNode;
  topleft?: React.ReactNode;
}

interface HandleClassName {
  top?: string;
  topRight?: string;
  right?: string;
  bottomRight?: string;
  bottom?: string;
  bottomLeft?: string;
  left?: string;
  topleft?: string;
}

interface HandleStyle {
  top?: React.CSSProperties;
  topRight?: React.CSSProperties;
  right?: React.CSSProperties;
  bottomRight?: React.CSSProperties;
  bottom?: React.CSSProperties;
  bottomLeft?: React.CSSProperties;
  left?: React.CSSProperties;
  topleft?: React.CSSProperties;
}

interface HandleEnabled {
  top?: boolean;
  topRight?: boolean;
  right?: boolean;
  bottomRight?: boolean;
  bottom?: boolean;
  bottomLeft?: boolean;
  left?: boolean;
  topleft?: boolean;
}

export interface ResizerProps {
  defaultWidth: number;
  defaultHeight: number;
  width?: string | number;
  height?: string | number;
  minWidth?: number;
  minHeight?: number;
  className?: string;
  style?: React.CSSProperties;
  handleContent?: HandleContent;
  handleClassName?: HandleClassName;
  handleStyle?: HandleStyle;
  handleEnabled?: HandleEnabled;
  onStartResize?: (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    direction: ResizerDirection
  ) => void;
  onResize?: (e: MouseEvent | TouchEvent) => void;
  onStopResize?: () => void;
}

interface State {
  isResizing: boolean;
  direction: ResizerDirection | null;
  width: number;
  height: number;
  startClientX: number;
  startClientY: number;
  startWidth: number;
  startHeight: number;
}

export class Resizer extends React.Component<ResizerProps, State> {
  static defaultProps = {
    defaultWidth: 100,
    defaultHeight: 100
  };
  state = {
    isResizing: false,
    width: this.props.defaultWidth,
    height: this.props.defaultHeight,
    direction: null,
    startClientX: 0,
    startClientY: 0,
    startWidth: 0,
    startHeight: 0
  };

  resizerEl = React.createRef<HTMLDivElement>();

  getNewWidth = (clientX: number, fromRight: boolean): number | undefined => {
    const newWidth = fromRight
      ? this.state.startWidth + (clientX - this.state.startClientX)
      : this.state.startWidth - (clientX - this.state.startClientX);

    if (this.props.minWidth && newWidth < this.props.minWidth) {
      return this.props.minWidth;
    }

    if (this.resizerEl.current) {
      const parentWidth = this.resizerEl.current.parentElement && this.resizerEl.current.parentElement.clientWidth;
      if (parentWidth && parentWidth < newWidth) {
        return parentWidth;
      }
    }
    return newWidth;
  };

  getNewHeight = (clientY: number, fromBottom: boolean): number | undefined => {
    const newHeight = fromBottom
      ? this.state.startHeight + (clientY - this.state.startClientY)
      : this.state.startHeight - (clientY - this.state.startClientY);

    if (this.props.minHeight && newHeight < this.props.minHeight) {
      return this.props.minHeight;
    }

    return newHeight;
  };

  getClientCors = (e: MouseEvent | TouchEvent): [number, number] => {
    const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
    const clientY = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;
    return [clientX, clientY];
  };

  resize = (e: MouseEvent | TouchEvent) => {
    if (this.state.isResizing && this.state.direction !== null) {
      e.preventDefault();
      this.props.onResize && this.props.onResize(e);

      const { direction } = this.state;

      const [clientX, clientY] = this.getClientCors(e);

      let newWidth: number | undefined;
      let newHeight: number | undefined;

      if (direction === ResizerDirection.RIGHT) {
        newWidth = this.getNewWidth(clientX, true);
      } else if (direction === ResizerDirection.LEFT) {
        newWidth = this.getNewWidth(clientX, false);
      } else if (direction === ResizerDirection.BOTTOM) {
        newHeight = this.getNewHeight(clientY, true);
      } else if (direction === ResizerDirection.TOP) {
        newHeight = this.getNewHeight(clientY, false);
      } else if (direction === ResizerDirection.BOTTOM_RIGHT) {
        newWidth = this.getNewWidth(clientX, true);
        newHeight = this.getNewHeight(clientY, true);
      } else if (direction === ResizerDirection.BOTTOM_LEFT) {
        newWidth = this.getNewWidth(clientX, false);
        newHeight = this.getNewHeight(clientY, true);
      } else if (direction === ResizerDirection.TOP_RIGHT) {
        newWidth = this.getNewWidth(clientX, true);
        newHeight = this.getNewHeight(clientY, false);
      } else if (direction === ResizerDirection.TOP_LEFT) {
        newWidth = this.getNewWidth(clientX, false);
        newHeight = this.getNewHeight(clientY, false);
      }

      this.setState(({ width, height }) => ({ width: newWidth || width, height: newHeight || height }));
    }
  };

  startResizing = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    direction: ResizerDirection
  ) => {
    this.props.onStartResize && this.props.onStartResize(e, direction);

    const [clientX, clientY] = this.getClientCors(e.nativeEvent);
    this.setState(({ width, height }) => ({
      isResizing: true,
      direction,
      startClientX: clientX,
      startClientY: clientY,
      startHeight: height,
      startWidth: width
    }));
  };

  stopResizing = () => {
    this.props.onStopResize && this.props.onStopResize();

    this.setState({ isResizing: false });
  };

  componentDidMount() {
    window.addEventListener("mousemove", this.resize);
    window.addEventListener("touchmove", this.resize);
    window.addEventListener("mouseup", this.stopResizing);
    window.addEventListener("mouseleave", this.stopResizing);
    window.addEventListener("touchend", this.stopResizing);
  }

  componentWillUnmount() {
    window.removeEventListener("mousemove", this.resize);
    window.removeEventListener("touchmove", this.resize);
    window.removeEventListener("mouseup", this.stopResizing);
    window.removeEventListener("mouseleave", this.stopResizing);
    window.removeEventListener("touchend", this.stopResizing);
  }

  render() {
    const { width: stateWidth, height: stateHeight } = this.state;
    const { children, className, style, width, height } = this.props;

    return (
      <div
        ref={this.resizerEl}
        data-testid="resizer"
        style={{
          ...style,
          width: width || stateWidth,
          height: height || stateHeight
        }}
        className={[styles.resizer, className].join(" ")}
      >
        {children}

        {Object.keys(ResizerHandleTypes).map(key => {
          if (this.props.handleEnabled && this.props.handleEnabled[key as keyof HandleEnabled]) {
            return (
              <ResizerHandle
                data-testid={`handle-${key}`}
                key={key}
                className={[
                  ResizerHandleTypes[key].className,
                  this.props.handleClassName && this.props.handleClassName[key as keyof HandleClassName]
                ].join(" ")}
                onResizeStart={this.startResizing}
                direction={ResizerHandleTypes[key].direction}
                children={this.props.handleContent && this.props.handleContent[key as keyof HandleContent]}
                style={this.props.handleStyle && this.props.handleStyle[key as keyof HandleStyle]}
              />
            );
          }
          return null;
        })}
      </div>
    );
  }
}
