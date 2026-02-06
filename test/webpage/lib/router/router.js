export class Router {
    preciseRoutes;
    parameterRoutes;
    constructor(preciseRoutes, parameterRoutes) {
        if (preciseRoutes == undefined)
            preciseRoutes = new Map();
        if (parameterRoutes == undefined)
            parameterRoutes = new Map();
        this.preciseRoutes = preciseRoutes;
        this.parameterRoutes = parameterRoutes;
        window.addEventListener("hashchange", () => {
            this.hashChange();
        });
        window.addEventListener("load", () => {
            this.hashChange();
        });
    }
    hashChange() {
        let hash = window.location.hash.slice(1) || "/";
        if (hash.length > 1 && hash.endsWith("/")) {
            hash = hash.slice(0, -1);
        }
        for (const k of this.preciseRoutes.keys()) {
            if (k == hash) {
                this.preciseRoutes.get(k)();
                return;
            }
        }
        for (const k of this.parameterRoutes.keys()) {
            if (hash.startsWith(k)) {
                this.parameterRoutes.get(k)(hash.slice(k.length));
                return;
            }
        }
    }
}
export function switchPage(mainWidget) {
    document.body.innerHTML = "";
    document.body.appendChild(mainWidget);
}
//# sourceMappingURL=router.js.map