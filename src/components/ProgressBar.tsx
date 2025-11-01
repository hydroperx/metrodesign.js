// third-party
import { Color, ColorObserver } from "@hydroperx/color";
import React from "react";
import { styled, keyframes } from "styled-components";
import extend from "extend";
import gsap from "gsap";

// local
import { ThemeContext, PrimaryContext } from "../theme/Theme";
import * as MathUtils from "../utils/MathUtils";
import { REMObserver } from "../utils/REMObserver";
import * as REMConvert from "../utils/REMConvert";

/**
 * Progress bar, either as dots or a solid minimalistic bar.
 */
export function ProgressBar(params: {
  /**
   * @default "solid"
   */
  variant?: ProgressBarVariant;
  /**
   * If a `solid` progress bar, indicates the percent (0-100) loaded.
   * @default 0
   */
  percent?: number;
  /**
   * If a `dots` progress bar, indicates the size of each dot.
   * @default 5
   */
  size?: number;

  style?: React.CSSProperties;
  className?: string;
  id?: string;
}) {
  // variant
  const variant = React.useRef(params.variant ?? "solid");

  // theme
  const theme = React.useContext(ThemeContext);

  // primary
  const primary = React.useContext(PrimaryContext);

  // div reference
  const div_ref = React.useRef<null | HTMLDivElement>(null);

  // rem measurement
  const rem = React.useRef<number>(16);

  // gsap timeline
  const gsap_timeline = React.useRef<null | gsap.core.Timeline>(null);

  // initialization
  React.useEffect(() => {
    // resize observer
    const resize_observer = new ResizeObserver(() => {
      setup_animation();
    });
    resize_observer.observe(div_ref.current!);

    // rem observer
    const rem_observer = new REMObserver(new_rem => {
      rem.current = new_rem;
      setup_animation();
    });

    return () => {
      resize_observer.disconnect();
      rem_observer.cleanup();
    };
  }, []);

  // reflect variant
  React.useEffect(() => {
    variant.current = params.variant ?? "solid";
    setup_animation();
  }, [params.variant ?? "solid"]);

  // setup animation
  function setup_animation(): void {
    // destroy previous animation
    if (gsap_timeline.current != null) {
      gsap_timeline.current.kill();
      gsap_timeline.current = null;
    }

    // setup moving dots animation
    if (variant.current == "dots") {
      gsap_timeline.current = gsap.timeline();
      gsap_timeline.current.repeat(Infinity);
      const dots = Array.from(div_ref.current!.getElementsByClassName("progress-bar__wrap")) as HTMLElement[];
      fixme();
    }
  }

  switch (variant.current) {
    case "dots": {
      // ProgressBar_dots_div
      //   .progress-bar__wrap
      //     .progress-bar__dot
      const size = REMConvert.pixels.remPlusUnit(params.size ?? 5);
      const color = primary ? theme.colors.primary : theme.colors.foreground;

      return (
        <ProgressBar_dots_div
          ref={div_ref}
          $size={size}
          $color={color}
          className={params.className}
          style={params.style}
          id={params.id}>

          <div className="progress-bar__wrap">
            <div className="progress-bar__dot"></div>
          </div>
          <div className="progress-bar__wrap">
            <div className="progress-bar__dot"></div>
          </div>
          <div className="progress-bar__wrap">
            <div className="progress-bar__dot"></div>
          </div>
          <div className="progress-bar__wrap">
            <div className="progress-bar__dot"></div>
          </div>
          <div className="progress-bar__wrap">
            <div className="progress-bar__dot"></div>
          </div>
        </ProgressBar_dots_div>
      );
    }
    case "solid": {
      // ProgressBar_solid_div
      //   ProgressBar_solid_loaded_div
      const unloaded_bg = theme.colors.progressBarBackground;
      const loaded_bg = primary ? theme.colors.primary : theme.colors.progressBarForeground;
      const w = MathUtils.clamp(params.percent ?? 0, 0, 100) + "%";
      return (
        <ProgressBar_solid_div
          ref={div_ref}
          $bg={unloaded_bg}
          className={params.className}
          style={params.style}
          id={params.id}>
          <ProgressBar_solid_loaded_div $bg={loaded_bg} $width={w}/>
        </ProgressBar_solid_div>
      );
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
  $size: string;
  $color: string;
}>`
  && {
    position: relative;
    overflow: hidden;
    height: ${$ => $.$size};
  }

  && .progress-bar__wrap {
    position: absolute;
    width: ${$ => $.$size};
    height: ${$ => $.$size};
  }

  && .progress-bar__dot {
    width: ${$ => $.$size};
    height: ${$ => $.$size};
    border-radius: 50%;
    background: ${$ => $.$color};
    left: calc(0rem - ${$ => $.$size});
  }
`;