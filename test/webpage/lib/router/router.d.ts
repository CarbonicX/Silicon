type preciseCallback = () => any;
type parameterCallback = (address: string) => any;
export declare class Router {
    preciseRoutes: Map<string, preciseCallback>;
    parameterRoutes: Map<string, parameterCallback>;
    constructor(preciseRoutes: Map<string, preciseCallback> | undefined, parameterRoutes: Map<string, parameterCallback> | undefined);
    hashChange(): void;
}
export declare function switchPage(mainWidget: HTMLElement): void;
export {};
//# sourceMappingURL=router.d.ts.map