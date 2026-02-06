import { WidgetBase } from "../abstracts/widgetBase.js";
import { StretchContainer } from "../abstracts/stretchContainer.js";
import { Stretch } from "./stretch.js";
export class HBox extends StretchContainer {
    inherentClass = "silib-hbox";
    hasStretch = false;
    _stretch;
    get stretch() {
        return this._stretch;
    }
    set stretch(stretch) {
        this.updateStretchingMode(stretch);
        this._stretch = stretch;
    }
    constructor(id, classes, children, stretch = true) {
        super(id, classes, children);
        this.stretch = stretch;
        this.setIdAndClasses();
    }
    updateStretch() {
        this.hasStretch = false;
        for (const c of this.children) {
            if (c instanceof Stretch) {
                this.hasStretch = true;
            }
        }
    }
    updateStretchingMode(stretch) {
        if (stretch) {
            this.addClassForElement("silib-hbox-stretch");
            // 当不存在 Stretch 时，将所有可伸长的组件伸长
            if (this.hasStretch)
                return;
            this.each((widget) => {
                if (widget.functions.includes("stretchable")) {
                    widget.addClassForElement("silib-stretching");
                }
            });
        }
        else {
            this.removeClassForElement("silib-hbox-stretch");
            // 当不存在 Stretch 时，将所有可伸长的组件取消伸长
            if (this.hasStretch)
                return;
            this.each((widget) => {
                if (widget.functions.includes("stretchable")) {
                    widget.removeClassForElement("silib-stretching");
                }
            });
        }
        ;
    }
    addChild(child) {
        super.addChild(child);
        this.updateStretch();
        this.updateStretchingMode(this.stretch);
    }
    removeChild(child) {
        super.removeChild(child);
        this.updateStretch();
        this.updateStretchingMode(this.stretch);
    }
}
//# sourceMappingURL=hbox.js.map