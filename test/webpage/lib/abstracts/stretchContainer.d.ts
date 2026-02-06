import { ComplexWidgetBase, WidgetBase } from "../abstracts/widgetBase.js";
export interface IStretchContainerStyle {
    gap: 20;
    padding: number | undefined;
}
export declare abstract class StretchContainer extends ComplexWidgetBase {
    protected _element: HTMLDivElement;
    protected abstract _stretch: boolean;
    abstract get stretch(): boolean;
    abstract set stretch(mode: boolean);
    constructor(id: string | null, classes: string[], children: WidgetBase[]);
    addChild(child: WidgetBase): void;
    removeChild(child: WidgetBase): void;
    removeChildById(id: string): void;
    style(style: IStretchContainerStyle): void;
}
//# sourceMappingURL=stretchContainer.d.ts.map