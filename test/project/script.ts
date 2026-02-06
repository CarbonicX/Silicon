import * as silicon from "./silicon.index.js";

new silicon.Router(undefined, new Map([
    ["/", (_) => {
        silicon.switchPage(new silicon.MyPage(null, []));
    }]
]));
