import { WidgetBase } from "../abstracts/widgetBase.js";
export interface IPageStyle {
    backgroundColor: string | undefined;
    foregroundColor: string | undefined;
    maxHeight: number | undefined;
    maxWidth: number | undefined;
    padding: number | undefined;
}
export declare class Page extends WidgetBase {
    protected _element: HTMLElement;
    private _mode;
    get mode(): string;
    set mode(mode: string);
    constructor(id: string | null, classes: string[], content: WidgetBase, mode: string);
    style(parent: WidgetBase | HTMLElement, settings: IPageStyle): void;
}
//# sourceMappingURL=page.d.ts.map