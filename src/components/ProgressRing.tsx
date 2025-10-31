// third-party
import { Color, ColorObserver } from "@hydroperx/color";
import React from "react";
import { styled, keyframes } from "styled-components";
import extend from "extend";

// local
import { REMObserver } from "../utils/REMObserver";
import * as REMConvert from "../utils/REMConvert";

/**
 * Progress ring (orbit).
 */
export function ProgressRing(params: {
  /**
   * Size; note that it overflows by a bit.
   * The given normal is `size={27}`.
   * @default 27
   */
  size?: number;
  style?: React.CSSProperties;
  className?: string;
  id?: string;
}) {
  // Some of the implementation uses code from
  // https://stackoverflow.com/a/20371835/26380963

  // Div ref
  const ref = React.useRef<null | HTMLDivElement>(null);

  // States
  const [color, set_color] = React.useState<string>("#fff");
  const [rem, set_rem] = React.useState<number>(0);

  // Set style
  const newStyle: React.CSSProperties = {};
  newStyle.verticalAlign = "middle";
  if (params.style) {
    extend(newStyle, params.style);
  }

  // Adjust color
  React.useEffect(() => {
    const color_observer = new ColorObserver(ref.current, (color: Color) => {
      set_color(color.isLight() ? "#fff" : "#000");
    });

    return () => {
      color_observer.cleanup();
    };
  });

  // Adjust size
  React.useEffect(() => {
    const rem_observer = new REMObserver(ref.current!, rem => {
      set_rem(rem);
    });
    return () => {
      rem_observer.cleanup();
    };
  }, []);

  // Animation time in milliseconds
  let time = 4000;

  // Other animation parameters
  let r = -14; // degrees
  let m = 30; // milliseconds

  // Size
  const size = REMConvert.pixels.rem(params.size ?? 27);

  return (
    <Div
      ref={ref}
      style={newStyle}
      className={params.className}
      id={params.id}
      $size={size}
      $time={time}
      $color={color}
      $r={r}
      $m={m}
      $rem={rem}
    >
      <div className="progress-ring__wrap">
        <div className="progress-ring__circle"></div>
      </div>
      <div className="progress-ring__wrap">
        <div className="progress-ring__circle"></div>
      </div>
      <div className="progress-ring__wrap">
        <div className="progress-ring__circle"></div>
      </div>
      <div className="progress-ring__wrap">
        <div className="progress-ring__circle"></div>
      </div>
      <div className="progress-ring__wrap">
        <div className="progress-ring__circle"></div>
      </div>
    </Div>
  );
}

// ProgressRing animation
const orbit = keyframes`
0% {
  transform: rotate(225deg);
  opacity: 1;
  animation-timing-function: ease-out;
} 

7% {
  transform: rotate(345deg);
  animation-timing-function: linear;
}

35% {
  transform: rotate(495deg);
  animation-timing-function: ease-in-out;
}

42% {
  transform: rotate(690deg);
  animation-timing-function: linear;
}

70% {
  transform: rotate(835deg); opacity: 1; 
  animation-timing-function: linear;
}

76% {
  opacity: 1;
}

77% {
  transform: rotate(955deg);
  animation-timing-function: ease-in;
}

78% { transform: rotate(955deg); opacity: 0; }
100% { transform: rotate(955deg); opacity: 0; } 
`;

const Div = styled.div<{
  $size: number;
  $time: number;
  $color: string;
  $r: number;
  $m: number;
  $rem: number;
}>`
  && {
    position: relative;
    padding-top: ${($) => ($.$size * $.$rem) / 5}px;
    width: ${($) => $.$size * $.$rem}px;
    height: ${($) => $.$size * $.$rem}px;
  }

  && .progress-ring__wrap {
    position: absolute;
    width: ${($) => $.$size * $.$rem - 2}px;
    height: ${($) => $.$size * $.$rem - 2}px;
  }

  && .progress-ring__circle {
    transform: rotate(225deg);
    animation-iteration-count: infinite;
    animation-name: ${orbit};
    animation-duration: ${($) => $.$time}ms;
    width: ${($) => $.$size * $.$rem - 2}px;
    height: ${($) => $.$size * $.$rem - 2}px;

    opacity: 0;
  }

  && .progress-ring__circle:after {
    content: "";
    position: absolute;
    width: ${($) => ($.$size * $.$rem) / 8}px;
    height: ${($) => ($.$size * $.$rem) / 8}px;
    border-radius: ${($) => ($.$size * $.$rem) / 8}px;
    box-shadow: 0px 0px 5% ${($) => $.$color};
    background: ${($) => $.$color};
  }

  && .progress-ring__wrap:nth-of-type(2) {
    transform: rotate(${($) => $.$r}deg);
  }
  && .progress-ring__wrap:nth-of-type(2) .progress-ring__circle {
    animation-delay: ${($) => $.$time / $.$m}ms;
  }
  && .progress-ring__wrap:nth-of-type(3) {
    transform: rotate(${($) => $.$r * 2}deg);
  }
  && .progress-ring__wrap:nth-of-type(3) .progress-ring__circle {
    animation-delay: ${($) => ($.$time / $.$m) * 2}ms;
  }
  && .progress-ring__wrap:nth-of-type(4) {
    transform: rotate(${($) => $.$r * 3}deg);
  }
  && .progress-ring__wrap:nth-of-type(4) .progress-ring__circle {
    animation-delay: ${($) => ($.$time / $.$m) * 3}ms;
  }
  && .progress-ring__wrap:nth-of-type(5) {
    transform: rotate(${($) => $.$r * 4}deg);
  }
  && .progress-ring__wrap:nth-of-type(5) .progress-ring__circle {
    animation-delay: ${($) => ($.$time / $.$m) * 4}ms;
  }
`;