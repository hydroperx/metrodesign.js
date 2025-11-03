// register Metro design fonts
import "@hydroperx/metrodesign/fonts";

// third-party
import { createRoot } from "react-dom/client";
import * as React from "react";
import {
  Root,
  Group,
  HGroup,
  VGroup,
  Label,
  ProgressBar,
  ProgressRing,
} from "@hydroperx/metrodesign/components";
import {
  Primary,
  ThemePresets,
  ThemeProvider,
  type Theme,
} from "@hydroperx/metrodesign/theme";

/**
 * The test.
 */
function App() {
  // Layout
  return (
    <ThemeProvider theme={ThemePresets.dark}>
      <Root
        full
        solid
        selection={false}
        style={{
          overflowY: "auto",
        }}>
          <HGroup wheelHorizontal>
            <Label variant="heading" minWidth={3000}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rutrum odio viverra ante maximus facilisis. Vestibulum at laoreet erat. Aenean quis faucibus arcu. Mauris vel dictum lorem, sit amet dignissim tortor. Aliquam volutpat, orci eget interdum viverra, justo justo accumsan leo, et auctor magna elit et velit. Vivamus eu enim a nibh interdum efficitur. Aliquam erat volutpat. Sed in diam volutpat, ullamcorper erat eu, volutpat nisi. Nulla sodales odio ex. Suspendisse nec ante id nulla mollis malesuada. Mauris sit amet dapibus quam, vitae porttitor risus. Morbi ac nunc vitae dui ultricies pharetra at ac odio. In imperdiet id orci a condimentum.</Label>
          </HGroup>
      </Root>
    </ThemeProvider>
  );
}

// Render App
const root = createRoot(document.getElementById("root")!);
root.render(<App />);
