# Getting started

## Installation

Using the NPM package manager:

```sh
npm i @hydroperx/metrodesign
```

## Fonts

The library requires the following fonts:

- Noto Sans
- Nimbus Mono (bold as regular)

They can be explicitly linked using:

```tsx
// link fonts
import "@hydroperx/metrodesign/fonts";
```

## Simple example

```tsx
import React from "react";
import {
    Root,
    Group,
    HGroup,
    VGroup,
    Label,
} from "@hydroperx/metrodesign/components";
import { RTLProvider } from "@hydroperx/metrodesign/layout";
import {
    ThemePresets,
    ThemeProvider,
} from "@hydroperx/metrodesign/theme";

// simple example
function SimpleExample(): React.ReactNode {
    return (
        <ThemeProvider theme={ThemePresets.dark}>
            <Root full solid selection={false}>
                <Label variant="heading">simple</Label>
            </Root>
        </ThemeProvider>
    );
}
```

## Primary colors

To opt in to using primary colors in certain components such as heading titles and checkboxes, use the `Primary` context provider:

```tsx
import { Primary } from "@hydroperx/metrodesign/theme";

// somewhere in React content
<Primary prefer>
    ...
</Primary>
```

## Right-to-left

Indicate whether a LTR layout or RTL layout is preferred through `RTLProvider`:

```tsx
import { RTLProvider } from "@hydroperx/metrodesign/layout";

// somewhere in React content
<RTLProvider rtl={false}>
    ...
</RTLProvider>
```