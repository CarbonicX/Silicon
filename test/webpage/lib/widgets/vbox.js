import { HBox } from "./hbox.js";
import { WidgetBase } from "../abstracts/widgetBase.js";
import { StretchContainer } from "../abstracts/stretchContainer.js";
export class VBox extends StretchContainer {
    inherentClass = "silib-vbox";
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
        this.each((widget) => {
            if (widget.functions.includes("stretchable")) {
                widget.addClassForElement("silib-stretching");
            }
        });
        this.setIdAndClasses();
    }
    updateStretchingMode(stretch) {
        if (this.stretch == stretch)
            return;
        if (stretch)
            this.addClassForElement("silib-vbox-stretch");
        else
            this.removeClassForElement("silib-vbox-stretch");
        let hasHBox = false;
        for (const c of this.children) {
            if (c instanceof HBox && c.stretch) {
                hasHBox = true;
            }
        }
        if (!hasHBox) {
            this.addClassForElement("silib-vbox-center");
        }
        else if (hasHBox) {
            this.removeClassForElement("silib-vbox-center");
        }
    }
}
//# sourceMappingURL=vbox.js.map