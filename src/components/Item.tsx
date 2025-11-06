// third-party
import * as React from "react";

/**
 * A context-dependent item component. Currently used
 * inside a `PopoverMenu`.
 */
export function Item(params: {
  /**
   * If the `Item` belongs to a `PopoverMenu`, indicates
   * whether it represents a sub-popover-menu.
   */
  submenu?: boolean,

  children?: React.ReactNode,
  className?: string,
  id?: string,
  style?: React.CSSProperties,
}) {
  // div
  const div = React.useRef<null | HTMLDivElement>(null);

  // initialization
  React.useEffect(() => {
    const div_el = div.current!;

    // detect when the Item belongs to a
    // PopoverMenu
    function ofPopoverMenu(): void {
      if (div_el.children.length < 3) {
        return;
      }
      const end = div_el.children[2];
      const indicator = end.getElementsByClassName("Indicator");
      if (indicator.length != 0) {
        indicator[0].dispatchEvent(new Event("_ofPopoverMenu"));
      }
    }
    div_el.addEventListener("_ofPopoverMenu", ofPopoverMenu);

    // cleanup
    return () => {
      div_el.removeEventListener("_ofPopoverMenu", ofPopoverMenu);
    };
  }, []);

  return (
    <div
      className={
        ["Item", ...(params.className ?? "").split(" ").filter(c => c != "")].join(" ")
      }
      id={params.id}
      style={params.style}
      ref={div}
      data-submenu={params.submenu ? "true" : undefined}>

      {params.children}
    </div>
  );
}