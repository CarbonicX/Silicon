import { WidgetBase } from "../abstracts/widgetBase.js";
export declare class Text extends WidgetBase {
    protected _element: HTMLDivElement | HTMLAnchorElement;
    get text(): string;
    set text(text: string);
    constructor(id: string | null, classes: string[], text: string, link?: string | null);
}
//# sourceMappingURL=text.d.ts.map