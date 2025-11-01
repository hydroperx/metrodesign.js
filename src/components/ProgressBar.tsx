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

  style?: React.CSSProperties;
  className?: string;
  id?: string;
}) {
  //
}

export type ProgressBarVariant =
  | "dots"
  | "solid";

const ProgressBar_solid_div = styled.div<{
  //
}> `

`;

const ProgressBar_solid_loaded_div = styled.div<{
  //
}> `

`;

const ProgressBar_dots_div = styled.div<{
  //
}> `

`;

// dots animation
const dots_animation = keyframes `

`;