// third-party
import assert from "assert";
import { TypedEventTarget } from "@hydroperx/event";

// local
import { SimpleGroup, SimpleTile } from "./SimpleGroup";
import { TileSize } from "./TileSize";
import { REMObserver } from "../utils/REMObserver";
import * as MathUtils from "../utils/MathUtils";

/**
 * Live tiles core implementation.
 */
export class CoreTiles extends (EventTarget as TypedEventTarget<CoreTilesEventMap>) {
  /**
   * Constructs a `CoreTiles` instance.
   */
  public constructor(params: {
    classNames: CoreTilesClassNames,
  }) {
    super();
  }
}

/**
 * Class names used by `CoreTiles`.
 */
export type CoreTilesClassNames = {
  group: string,
  groupLabel: string,
  groupLabelText: string,
  groupTiles: string,
  tile: string,
  tileContent: string,
  tileDND: string,
};

/**
 * Events emitted by `Tiles` instances.
 */
export type CoreTilesEventMap = {
  //
};

/**
 * Ĝroup state.
 */
export class CoreGroup {
  public dom: null | HTMLDivElement = null;
  public id: string;
  public label: string;
  public tiles: Map<string, CoreTile> = new Map();

  //
  public constructor(params: {
    dom: null | HTMLDivElement,
    id: string,
    label: string,
  }) {
    this.dom = params.dom;
    this.id = params.id;
    this.label = params.label;
  }
}

/**
 * Tile state.
 */
export class CoreTile {
  public x: number;
  public y: number;
  public size: TileSize;

  //
  public constructor(params: {
    //
  }) {
    //
  }
}