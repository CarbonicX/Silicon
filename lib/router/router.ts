import { WidgetBase } from "../abstracts/widgetBase.js";

type preciseCallback = () => any
type parameterCallback = (address: string) => any

export class Router {
    preciseRoutes: Map<string, preciseCallback>;
    parameterRoutes: Map<string, parameterCallback>;

    constructor(preciseRoutes?: Map<string, preciseCallback>,
        parameterRoutes?: Map<string, parameterCallback>
    ) {
        if (preciseRoutes == undefined) preciseRoutes = new Map<string, preciseCallback>();
        if (parameterRoutes == undefined) parameterRoutes = new Map<string, parameterCallback>();
        this.preciseRoutes = preciseRoutes;
        this.parameterRoutes = parameterRoutes;
        window.addEventListener("hashchange", () => {
            this.hashChange();
        })
        window.addEventListener("load", () => {
            this.hashChange();
        })
    }

    hashChange() {
        let hash = window.location.hash.slice(1) || "/";
        if (hash.length > 1 && hash.endsWith("/")) {
            hash = hash.slice(0, -1);
        }

        for (const k of this.preciseRoutes.keys()) {
            if (k == hash) {
                this.preciseRoutes.get(k)!();
                return;
            }
        }

        for (const k of this.parameterRoutes.keys()) {
            if (hash.startsWith(k)) {
                this.parameterRoutes.get(k)!(hash.slice(k.length));
                return;
            }
        }
    }
}

export function switchPage(mainWidget: WidgetBase) {
    const element = mainWidget.element;
    document.body.innerHTML = "";
    document.body.appendChild(element);
}
