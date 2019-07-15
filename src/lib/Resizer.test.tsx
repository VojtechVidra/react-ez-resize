import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Resizer } from "./Resizer";
import { ResizerDirection } from "./ResizerHandle";

Enzyme.configure({ adapter: new Adapter() });

describe("<Resizer />", () => {
  it("shows default dimensions correctly", () => {
    const wrapper = shallow<Resizer>(<Resizer defaultWidth={200} defaultHeight={50} />);

    const resizerDiv = wrapper.find('[data-testid="resizer"]');
    const resizerStyle = resizerDiv.prop("style");
    expect(resizerStyle && resizerStyle.width).toBe(200);
    expect(resizerStyle && resizerStyle.height).toBe(50);
  });
  it("change dimensions on resize", () => {
    const wrapper = shallow<Resizer>(<Resizer defaultWidth={100} />);

    wrapper
      .instance()
      .startResizing(
        { nativeEvent: new MouseEvent("", { clientY: 0, clientX: 0 }) } as React.MouseEvent<HTMLDivElement>,
        ResizerDirection.RIGHT
      );

    wrapper.instance().resize(new MouseEvent("", { clientX: 100, clientY: 0 }));

    expect(wrapper.state().width).toBe(200);
  });
  it("hides handles with props", () => {
    const wrapper = shallow<Resizer>(<Resizer handleEnabled={{ right: true, left: false }} />);

    expect(wrapper.find("[data-testid='handle-right']").length).toBe(1);
    expect(wrapper.find("[data-testid='handle-left']").length).toBe(0);
  });
  it("passes content to handles", () => {
    const wrapper = shallow<Resizer>(
      <Resizer handleEnabled={{ right: true }} handleContent={{ right: "This is right handle!" }} />
    );

    expect(wrapper.find("[data-testid='handle-right']").prop("children")).toBe("This is right handle!");
  });
});
