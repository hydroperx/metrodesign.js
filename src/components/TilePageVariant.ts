/**
 * Structure type of a `TilePage` component.
 *
 * - `custom` is used for pages that may contain any DOM.
 * - `iconLabel` is used for organizing an icon +
 *   a normal label together.
 * - `labelIcon` is used for organizing a heading label +
 *   a smaller icon together.
 */
export type TilePageVariant =
  | "custom"
  | "iconLabel"
  | "labelIcon";