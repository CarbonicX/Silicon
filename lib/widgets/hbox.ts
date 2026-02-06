import { WidgetBase } from "../abstracts/widgetBase.js";
import { StretchContainer } from "../abstracts/stretchContainer.js";
import { Stretch } from "./stretch.js";

export class HBox extends StretchContainer {
    protected inherentClass: string | null = "silib-hbox";
    protected hasStretch: boolean = false;

    protected _stretch!: boolean;
    get stretch(): boolean {
        return this._stretch
    }
    set stretch(stretch: boolean) {
        this.updateStretchingMode(stretch);
        this._stretch = stretch;
    }

    constructor(id: string | null, classes: string[], children: WidgetBase[], stretch: boolean = true) {
        super(id, classes, children);

        this.stretch = stretch;

        this.setIdAndClasses();
    }

    private updateStretch() {
        this.hasStretch = false;
        for (const c of this.children) {
            if (c instanceof Stretch) {
                this.hasStretch = true;
            }
        }
    }

    protected updateStretchingMode(stretch: boolean) {
        if (stretch) {
            this.addClassForElement("silib-hbox-stretch")
            // 当不存在 Stretch 时，将所有可伸长的组件伸长
            if (this.hasStretch) return;
            this.each((widget) => {
                if (widget.functions.includes("stretchable")) {
                    widget.addClassForElement("silib-stretching");
                }
            });
        } else {
            this.removeClassForElement("silib-hbox-stretch")
            // 当不存在 Stretch 时，将所有可伸长的组件取消伸长
            if (this.hasStretch) return;
            this.each((widget) => {
                if (widget.functions.includes("stretchable")) {
                    widget.removeClassForElement("silib-stretching");
                }
            });
        };
    }

    addChild(child: WidgetBase): void {
        super.addChild(child);
        this.updateStretch();
        this.updateStretchingMode(this.stretch);
    }

    removeChild(child: WidgetBase): void {
        super.removeChild(child);
        this.updateStretch();
        this.updateStretchingMode(this.stretch);
    }
}