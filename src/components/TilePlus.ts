// third-party
import { TypedEventTarget } from "@hydroperx/event";

// local
import { randomHex } from "../utils/RandomUtils";

/**
 * The `TilePlus` class may have instances
 * attached to a `Tiles` component for additional
 * control and testing methods.
 * 
 * With it, you can:
 * 
 * - Check or uncheck tiles
 * - Determine the number of inline groups available for a given
 *   width.
 */
export class TilePlus extends (EventTarget as TypedEventTarget<TilePlusEventMap>) {
  /**
   * Sets whether a tile is checked or not.
   */
  public checked(tile: string, value: boolean): void {
    this.dispatchEvent(
      new CustomEvent("setChecked", {
        detail: { id: tile, value },
      }),
    );
  }

  /**
   * Checks all tiles.
   */
  public checkAll(): void {
    this.dispatchEvent(new Event("checkAll"));
  }

  /**
   * Unchecks all tiles.
   */
  public uncheckAll(): void {
    this.dispatchEvent(new Event("uncheckAll"));
  }

  /**
   * Returns the number of inline groups available for
   * the given width (either in `px` or `rem`).
   *
   * > **Note** Applies to a vertical layout only.
   */
  public inlineGroupsAvailable(width: string): Promise<number> {
    return new Promise((resolve, _) => {
      const requestId = randomHex(true);
      const listener = (
        e: CustomEvent<{ requestId: string; value: number }>,
      ) => {
        if (e.detail.requestId !== requestId) return;
        this.removeEventListener("getInlineGroupsAvailableResult", listener);
        resolve(e.detail.value);
      };
      this.addEventListener("getInlineGroupsAvailableResult", listener);
      this.dispatchEvent(
        new CustomEvent("getInlineGroupsAvailable", {
          detail: {
            requestId,
            width,
          },
        }),
      );
    });
  }

  /**
   * Shorthand to `addEventListener()`.
   * @hidden
   */
  public on<K extends keyof TilePlusEventMap>(type: K, listenerFn: (event: TilePlusEventMap[K]) => void, options?: AddEventListenerOptions): void;
  public on(type: string, listenerFn: (event: Event) => void, options?: AddEventListenerOptions): void;
  public on(type: any, listenerFn: any, options?: AddEventListenerOptions): void {
    this.addEventListener(type, listenerFn, options);
  }

  /**
   * Shorthand to `removeEventListener()`.
   * @hidden
   */
  public off<K extends keyof TilePlusEventMap>(type: K, listenerFn: (event: TilePlusEventMap[K]) => void, options?: EventListenerOptions): void;
  public off(type: string, listenerFn: (event: Event) => void, options?: EventListenerOptions): void;
  public off(type: any, listenerFn: any, options?: EventListenerOptions): void {
    this.removeEventListener(type, listenerFn, options);
  }
}

// internal events exchanged between `Tiles`
// and `TilePlus`
type TilePlusEventMap = {
  /** @hidden */
  setChecked: CustomEvent<{ id: string; value: boolean }>;
  /** @hidden */
  checkAll: Event;
  /** @hidden */
  uncheckAll: Event;
  /** @hidden */
  getInlineGroupsAvailable: CustomEvent<{ requestId: string, width: string }>;
  /** @hidden */
  getInlineGroupsAvailableResult: CustomEvent<{ requestId: string, value: number }>;
};