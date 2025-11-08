// third-party
import assert from "assert";
import $ from "jquery";
import React from "react";
import { styled } from "styled-components";
import { Color } from "@hydroperx/color";
import { input } from "@hydroperx/inputaction";

// local
import * as ComboBoxPlacement from "./combobox/ComboBoxPlacement";
import { ComboBoxStatic } from "./combobox/ComboBoxStatic";
import { ComboBoxEffect } from "./combobox/ComboBoxEffect";
import { RTLContext } from "../layout/RTL";
import { Icon, NativeIcons } from "./Icon";
import { Theme, ThemeContext } from "../theme/Theme";
import * as ColorUtils from "../utils/ColorUtils";
import { focusPrevSibling, focusNextSibling } from "../utils/FocusUtils";
import * as StringUtils from "../utils/StringUtils";
import { MAXIMUM_Z_INDEX  } from "../utils/Constants";
import * as REMConvert from "../utils/REMConvert";
import { REMObserver } from "../utils/REMObserver";