// third-party
import React from "react";
import { styled } from "styled-components";

/**
 * `MobileGroup` is used for displaying UI
 * only when the screen orientation is portrait.
 */
export function MobileGroup(params: {
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
        "MobileGroup",
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
  @media (orientation: portrait) {
    && {
      display: block;
    }
    &&.inline {
      display: inline-block;
    }
  }
`;