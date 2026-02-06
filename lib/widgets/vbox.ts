import { HBox } from "./hbox.js";
import { WidgetBase } from "../abstracts/widgetBase.js";
import { StretchContainer } from "../abstracts/stretchContainer.js";

export class VBox extends StretchContainer {
    protected inherentClass: string | null = "silib-vbox";
    protected _stretch!: boolean;
    get stretch(): boolean {
        return this._stretch;
    }
    set stretch(stretch: boolean) {
        this.updateStretchingMode(stretch);
        this._stretch = stretch;
    }

    constructor(id: string | null, classes: string[], children: WidgetBase[], stretch: boolean = true) {
        super(id, classes, children);

        this.stretch = stretch;

        this.each((widget) => {
            if (widget.functions.includes("stretchable")) {
                widget.addClassForElement("silib-stretching");
            }
        });

        this.setIdAndClasses();
    }

    protected updateStretchingMode(stretch: boolean): void {
        if (this.stretch == stretch) return;
        if (stretch) this.addClassForElement("silib-vbox-stretch");
        else this.removeClassForElement("silib-vbox-stretch");

        let hasHBox = false;
        for (const c of this.children) {
            if (c instanceof HBox && c.stretch) {
                hasHBox = true;
            }
        }
        if (!hasHBox) {
            this.addClassForElement("silib-vbox-center");
        } else if (hasHBox) {
            this.removeClassForElement("silib-vbox-center");
        }
    }
    
}
