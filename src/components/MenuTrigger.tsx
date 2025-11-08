// third-party
import assert from "assert";
import React from "react";

// local
import type { PopoverMenuOpenParams } from "./PopoverMenu";
import { SimplePlacementType } from "../utils/PlacementUtils";

/**
 * Trigger for buttons combined with popover menus.
 *
 * @example
 * ```
 * <MenuTrigger>
 *     <Button>click me</Button>
 *     <PopoverMenu>
 *         <Item>
 *             <span></span>
 *             <Label>option a</Label>
 *             <span></span>
 *         </Item>
 *     </PopoverMenu>
 * </MenuTrigger>
 * ```
 */
export function MenuTrigger(params: {
  /**
   * Which placement to prefer for the menu to be placed at.
   */
  prefer?: SimplePlacementType,

  children?: React.ReactNode,
}): React.ReactNode {
  // prefer sync
  const prefer_sync = React.useRef(params.prefer ?? "bottom");

  // div
  const div = React.useRef<null | HTMLDivElement>(null);

  // initialization
  React.useEffect(() => {
    assert(div.current!.children.length == 2, "Expected 2 children inside MenuTrigger.");
    const button = div.current!.children[0] as HTMLElement;
    assert(button.classList.contains("Button"), "Expected first child of MenuTrigger to be a Button.");
    const menu = div.current!.children[1] as HTMLElement;
    assert(menu.classList.contains("PopoverMenu"), "Expected second child of MenuTrigger to be a PopoverMenu.");

    // handle click
    function click(): void {
      const p: PopoverMenuOpenParams = {
        reference: button,
        prefer: prefer_sync.current,
      };
      menu.dispatchEvent(new CustomEvent("_PopoverMenu_open", {
        detail: p,
      }));
    }
    button.addEventListener("click", click);

    // cleaunp
    return () => {
      button.removeEventListener("click", click);
    };
  }, []);

  // sync prefer parameter
  React.useEffect(() => {
    prefer_sync.current = params.prefer ?? "bottom";
  }, [params.prefer]);

  return (
    <div ref={div}>
      {params.children}
    </div>
  );
}