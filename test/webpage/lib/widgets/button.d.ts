import { WidgetBase } from "../abstracts/widgetBase.js";
type callback = (() => any) | null;
export declare class Button extends WidgetBase {
    protected _element: HTMLButtonElement;
    private _text;
    get text(): string;
    set text(text: string);
    private _onclick;
    get onclick(): callback;
    set onclick(func: callback);
    constructor(id: string | null, classes: string[], text: string, onclick?: (() => any) | null);
}
export {};
//# sourceMappingURL=button.d.ts.map