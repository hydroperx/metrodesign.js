/**
 * A context-dependent indicator icon. Currently used
 * inside a `PopoverMenu`'s submenu-representing `Item`,
 * inside the third child tag, as in:
 * 
 * ```
 * <Item>
 *     <span></span>
 *     <Label>More</Label>
 *     <span><Indicator/></span>
 *     <PopoverMenu>
 *         ...
 *     </PopoverMenu>
 * </Item>
 * ```
 */
export function Indicator() {
  return (
    <div className="Indicator"></div>
  );
}