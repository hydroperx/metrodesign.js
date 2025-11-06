// third-party
import * as React from "react";
import { styled } from "styled-components";
import gsap from "gsap";

// local
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

  // ?rtl
  const rtl = React.useContext(RTLContext);

  // ?theme
  const theme = React.useContext(ThemeContext);

  // initialization
  React.useEffect(() => {
    // detect added Item children so they are skinned
    // correctly.
    const children_observer = new MutationObserver(records => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (node instanceof HTMLElement && (node as HTMLElement).classList.contains("item")) {
            (node as HTMLElement).dispatchEvent(new Event("_ofPopoverMenu"));
          }
        }
      }
    });
    children_observer.observe(div.current!);

    // cleanup
    return () => {
      children_observer.disconnect();
    };
  }, []);

  return (
    <Div
      className={
        ["PopoverMenu", (params.className ?? "").split(" ").filter(p => p != "")].join(" ")
      }
      id={params.id}
      style={params.style}
      ref={div}>

      {params.children}
    </Div>
  );
}

const Div = styled.div<{
  //
}> `

`;