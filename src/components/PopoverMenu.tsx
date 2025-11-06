// third-party
import { ColorObserver } from "@hydroperx/color";
import * as React from "react";
import { styled } from "styled-components";
import gsap from "gsap";

// local
import { IconRegistry, NativeIcons } from "./Icon";
import { RTLContext } from "../layout/RTL";
import { Theme, ThemeContext } from "../theme/Theme";
import * as MathUtils from "../utils/MathUtils";
import * as REMConvert from "../utils/REMConvert";
import { COMMON_DELAY } from "../utils/Constants";

/**
 * Either a popover menu or a context menu.
 */
export function PopoverMenu(params: {
  children?: React.ReactNode,
  className?: string,
  style?: React.CSSProperties,
  id?: string,
}): React.ReactNode {
  // div
  const div = React.useRef<null | HTMLDivElement>(null);

  // foreground
  const [foreground, set_foreground] = React.useState<string>("white");

  // ?rtl
  const rtl = React.useContext(RTLContext);

  // ?theme
  const theme = React.useContext(ThemeContext);

  // submenu indicator
  const indicator = IconRegistry.get(rtl ? NativeIcons.ARROW_LEFT : NativeIcons.ARROW_RIGHT, foreground as any);

  // initialization
  React.useEffect(() => {
    // color observer
    const color_observer = new ColorObserver(div.current, color => {
      set_foreground(color.isLight() ? "white" : "black");
    });

    // cleanup
    return () => {
      color_observer.cleanup();
    };
  }, []);

  return (
    <Div
      className={
        ["PopoverMenu", (params.className ?? "").split(" ").filter(p => p != "")].join(" ")
      }
      id={params.id}
      style={params.style}
      ref={div}
      $indicator={indicator}>

      {params.children}
    </Div>
  );
}

const Div = styled.div<{
  $indicator: string,
}> `

`;