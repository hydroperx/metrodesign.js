// third-party
import { Color, ColorObserver } from "@hydroperx/color";
import React from "react";
import { styled, keyframes } from "styled-components";
import extend from "extend";

// local
import { REMObserver } from "../utils/REMObserver";
import * as REMConvert from "../utils/REMConvert";

/**
 * Progress bar, either as dots or a solid minimalistic bar.
 */
export function ProgressBar(params: {
  variant?: ProgressBarVariant;
  percent?: number;

  style?: React.CSSProperties;
  className?: string;
  id?: string;
}) {
  switch (params.variant ?? "solid") {
    case "dots": {
      // ProgressBar_dots_div
      return fixme();
    }
    case "solid": {
      // ProgressBar_solid_div
      //   ProgressBar_solid_loaded_div
      return fixme();
    }
    default: {
      throw new Error();
    }
  }
}

export type ProgressBarVariant =
  | "dots"
  | "solid";

const ProgressBar_solid_div = styled.div<{
  $bg: string;
}> `
  && {
    height: 0.5rem;
    background: ${$ => $.$bg};
  }
`;

const ProgressBar_solid_loaded_div = styled.div<{
  $bg: string;
  $width: string;
}> `
  && {
    width: ${$ => $.$width};
    height: 100%;
    background: ${$ => $.$bg};
  }
`;

const ProgressBar_dots_div = styled.div<{
  //
}> `

`;

// dots animation
const dots_animation = keyframes `

`;