import { SimpleGroup, SimpleTile } from "./SimpleGroup";

/**
 * Group state.
 */
export class CoreGroup {
  public dom: null | HTMLDivElement = null;
  public id: string;
  public label: string;
  public tiles: Map<string, CoreTile> = new Map();
  public simple: SimpleGroup;
  public attachedHandlers: null | HTMLDivElement = null;

  //
  public constructor(params: {
    dom: null | HTMLDivElement,
    id: string,
    label: string,
    simple: SimpleGroup,
  }) {
    this.dom = params.dom;
    this.id = params.id;
    this.label = params.label;
    this.simple = params.simple;
  }
}

/**
 * Tile state.
 *
 * @hidden
 */
export class CoreTile {
  /**
   * DOM button.
   */
  public dom: null | HTMLButtonElement;

  // tween
  public tween: null | gsap.core.Tween = null;

  // attached handlers?
  public attachedHandlers: null | HTMLButtonElement = null;

  // last rearrange data
  public lastRearrange_positioned: boolean = false;
  public lastRearrange_x: number = 0;
  public lastRearrange_y: number = 0;

  //
  public constructor(params: {
    dom: null | HTMLButtonElement,
  }) {
    this.dom = params.dom;
  }
}