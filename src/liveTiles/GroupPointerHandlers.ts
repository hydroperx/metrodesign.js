// local
import type { Core, BulkChange } from "./Core";
import { CoreGroup, CoreTile } from "./CoreGroup";
import { SimpleGroup } from "./SimpleGroup";
import * as MathUtils from "../utils/MathUtils";

//
export class GroupPointerHandlers {
  //
  public constructor(
    private readonly $: Core,
    private readonly node: HTMLDivElement
  ) {
    //
  }

  //
  public attach(): void {
    const { node: group_node } = this;

    // group label div
    const group_label = group_node.getElementsByClassName(this.$._class_names.groupLabel)[0] as HTMLElement;

    // mouse handlers
    fixme();

    // touch handlers
    fixme();

    // context menu handlers
    group_label.addEventListener("contextmenu", this.context_menu.bind(this));
  }

  //
  private context_menu(e: PointerEvent): void {
    this.$.dispatchEvent(new CustomEvent("groupContextMenu", {
      detail: {
        group: this.node.getAttribute("data-id") ?? "",
        clientX: e.clientX,
        clientY: e.clientY,
        original: e,
      },
    }));
  }
}