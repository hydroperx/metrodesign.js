// third-party
import React from "react";
import { styled } from "styled-components";

/**
 * `DesktopGroup` is used for displaying UI
 * only when the screen orientation is landscape.
 */
export function DesktopGroup(params: {
  /**
   * Whether the group is displayed inline.
   */
  inline?: boolean,

  id?: string,
  className?: string,
  style?: React.CSSProperties,
  children?: React.ReactNode,
  ref?: React.Ref<null | HTMLDivElement>,
}): React.ReactNode {
  return (
    <_Div
      className={[
        "DesktopGroup",
        ...(params.inline ? ["inline"] : []),
        ...(params.className ?? "").split(" ").filter(c => c != ""),
      ].join(" ")}
      id={params.id}
      style={params.style}
      ref={params.ref}>

      {params.children}
    </_Div>
  );
}

// css
const _Div = styled.div `
  && {
    display: none;
  }
  @media (orientation: landscape) {
    && {
      display: block;
    }
    &&.inline {
      display: inline-block;
    }
  }
`;