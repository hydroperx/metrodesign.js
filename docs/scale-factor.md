# Scale factor

This library uses the CSS `rem` unit as a measurement unit influenced by the document element's (`<html>`) `font-size` in pixels. Many numbers like gaps and padding use logical pixels based on the `rem` unit.

To alter the overall scale factor:

- Set the `font-size` CSS property of the root `<html>` element to a desired value; the default being `16px`.