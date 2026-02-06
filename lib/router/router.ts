type preciseCallback = () => any
type parameterCallback = (address: string) => any

export class Router {
    preciseRoutes: Map<string, preciseCallback>;
    parameterRoutes: [string, parameterCallback][];

    constructor(preciseRoutes?: Map<string, preciseCallback>,
        parameterRoutes?: [string, parameterCallback][]
    ) {
        if (preciseRoutes == undefined) preciseRoutes = new Map<string, preciseCallback>();
        if (parameterRoutes == undefined) parameterRoutes = [];
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

        for (const k of this.parameterRoutes) {
            if (hash.startsWith(k[0])) {
                k[1](hash.slice(k.length));
                return;
            }
        }
    }
}
