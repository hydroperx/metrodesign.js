// third-party
import { useContext, useRef, useState, useEffect, Ref } from "react";
import { styled } from "styled-components";
import { Color } from "@hydroperx/color";
import extend from "extend";

// local
import { IconMap } from "./Icon";
import { RTLContext } from "../layout/RTL";
import { ThemeContext } from "../theme";
import * as REMConvert from "../utils/REMConvert";

/**
 * A text input, either single-line or multi-line.
 */
export function TextInput(params: {
  /**
   * Placeholder text.
   */
  placeholder?: string;

  /**
   * Default value.
   */
  default?: string;

  /**
   * Indicates whether the input is an e-mail field.
   */
  email?: boolean;

  /**
   * Indicates whether the input is a password field.
   */
  password?: boolean;

  /**
   * Indicates whether the input is a number field.
   */
  number?: boolean;

  /**
   * Indicates whether the input is a search field.
   */
  search?: boolean;

  /**
   * Indicates whether the input is a telephone field.
   */
  telephone?: boolean;

  /**
   * Icon (only effects if input is a single line).
   * If the `search` option is true, then the default icon
   * is the search icon.
   */
  icon?: string;

  /**
   * Whether disabled or not.
   */
  disabled?: boolean;

  /**
   * Whether the input is multiline or not.
   */
  multiline?: boolean;

  /**
   * Whether the input has automatic focus or not.
   */
  autoFocus?: boolean;

  /**
   * [See MDN reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete).
   */
  autoComplete?: string;

  /**
   * For multiline inputs, indicates the number of rows.
   */
  rows?: number;

  /**
   * For multiline inputs, indicates the number of columns.
   */
  columns?: number;

  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;

  id?: string;
  style?: React.CSSProperties;
  className?: string;
  ref?: Ref<HTMLTextAreaElement | HTMLInputElement | null>;

  /**
   * Change event.
   */
  change?: (value: string, event: React.ChangeEvent<HTMLElement>) => void;

  scroll?: React.UIEventHandler<HTMLElement>;
  focus?: React.FocusEventHandler<HTMLElement>;
  click?: React.MouseEventHandler<HTMLElement>;
  contextMenu?: React.MouseEventHandler<HTMLElement>;
  mouseOver?: React.MouseEventHandler<HTMLElement>;
  mouseOut?: React.MouseEventHandler<HTMLElement>;
  mouseUp?: React.MouseEventHandler<HTMLElement>;
  wheel?: React.WheelEventHandler<HTMLElement>;
}) {
  // Use the theme context
  const theme = useContext(ThemeContext);

  // Locale direction
  const rtl = useContext(RTLContext);

  // Value tracker
  const value = useRef<string>(params.default ?? "");
  const any_change = useRef<boolean>(false);

  // Re-render trigger (in case the default value changes)
  const [, set_refresh_trigger] = useState<number[]>([]);

  // Icon
  const icon: string | null =
    params.icon ?? (params.search ? "search" : null);
  const iconSize = 15;

  // Colors
  const dark = Color(theme.colors.inputBackground).isDark();

  // CSS
  const css = `
    && {
      background: ${theme.colors.inputBackground};
      border: 0.15rem solid  ${theme.colors.inputBorder};
      color: ${theme.colors.foreground};
      padding: ${REMConvert.pixels.remPlusUnit(6.45)} 0.7rem;
      ${icon === null || params.multiline ? "" : `${rtl ? "padding-left" : "padding-right"}: ${REMConvert.pixels.remPlusUnit(iconSize + 3)};`}
      ${icon === null || params.multiline ? "" : `background-image: url("${IconMap.get(icon, dark ? "white" : "black")}");`}
      background-position: center ${rtl ? "left" : "right"} 0.5rem;
      background-size: ${REMConvert.pixels.remPlusUnit(iconSize)};
      background-repeat: no-repeat;
      text-align: ${rtl ? "right" : "left"};
      ${params.minWidth !== undefined ? "min-width: " + REMConvert.pixels.remPlusUnit(params.minWidth) + ";" : "min-width: 5rem;"}
      ${params.minHeight !== undefined ? "min-height: " + REMConvert.pixels.remPlusUnit(params.minHeight) + ";" : ""}
      ${params.maxWidth !== undefined ? "max-width: " + REMConvert.pixels.remPlusUnit(params.maxWidth) + ";" : ""}
      ${params.maxHeight !== undefined ? "max-height: " + REMConvert.pixels.remPlusUnit(params.maxHeight) + ";" : ""}
      outline: none;
      vertical-align: middle;
    }

    &&::placeholder {
      color: ${dark ? Color(theme.colors.foreground).darken(0.4).toString() : Color(theme.colors.foreground).lighten(0.4).toString()};
    }

    &&::selection {
      background: ${theme.colors.foreground};
      color: ${theme.colors.inputBackground};
    }

    &&:disabled {
      background: ${dark ? Color(theme.colors.inputBackground).lighten(0.7).toString() : Color(theme.colors.inputBackground).darken(0.7).toString()};
      border: 0.15rem solid  ${dark ? Color(theme.colors.inputBorder).lighten(0.7).toString() : Color(theme.colors.inputBorder).darken(0.7).toString()};
    }

    &&::-webkit-search-cancel-button {
      -webkit-appearance: none;
      width: ${REMConvert.pixels.remPlusUnit(15)};
      height: ${REMConvert.pixels.remPlusUnit(15)};
      background: url("${IconMap.get("clear", dark ? "white" : "black")}");
      background-size: ${REMConvert.pixels.remPlusUnit(15)};
      background-repeat: no-repeat;
    }`;
  
  // watch for the default value
  useEffect(() => {
    if (!any_change.current && value.current != (params.default ?? "")) {
      value.current = params.default ?? "";
      // rerender component
      set_refresh_trigger([Math.random(), Math.random(), Math.random()]);
    }
  }, [params.default]);

  // render
  return params.multiline ? (
    <TextArea
      id={params.id}
      className={params.className}
      $css={css}
      style={params.style}
      ref={params.ref as Ref<HTMLTextAreaElement>}
      placeholder={params.placeholder}
      onChange={event => {
        const new_value = (event.target as HTMLTextAreaElement).value;
        value.current = new_value;
        any_change.current = true;
        params.change?.(new_value, event);
      }}
      onScroll={params.scroll}
      onFocus={params.focus}
      onClick={params.click}
      onMouseOver={params.mouseOver}
      onMouseOut={params.mouseOut}
      onMouseUp={params.mouseUp}
      onContextMenu={params.contextMenu}
      onWheel={params.wheel}
      autoFocus={params.autoFocus}
      disabled={params.disabled}
      autoComplete={params.autoComplete}
      rows={params.rows}
      cols={params.columns}
      dir={rtl ? "rtl" : "ltr"}
    >
      {value.current}
    </TextArea>
  ) : (
    <Input
      id={params.id}
      className={params.className}
      $css={css}
      style={params.style}
      ref={params.ref as Ref<HTMLInputElement>}
      type={
        params.email
          ? "email"
          : params.password
            ? "password"
            : params.number
              ? "number"
              : params.search
                ? "search"
                : params.telephone
                  ? "telephone"
                  : "text"
      }
      placeholder={params.placeholder}
      value={value.current}
      onChange={event => {
        const new_value = (event.target as HTMLInputElement).value;
        value.current = new_value;
        any_change.current = true;
        params.change?.(new_value, event);
      }}
      onScroll={params.scroll}
      onFocus={params.focus}
      onClick={params.click}
      onMouseOver={params.mouseOver}
      onMouseOut={params.mouseOut}
      onMouseUp={params.mouseUp}
      onContextMenu={params.contextMenu}
      onWheel={params.wheel}
      autoFocus={params.autoFocus}
      disabled={params.disabled}
      autoComplete={params.autoComplete}
      dir={rtl ? "rtl" : "ltr"}
    />
  );
}

const TextArea = styled.textarea<{
  $css: string;
}>`
  ${($) => $.$css}
`;

const Input = styled.input<{
  $css: string;
}>`
  ${($) => $.$css}
`;