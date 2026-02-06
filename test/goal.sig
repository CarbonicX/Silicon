==================== Page ====================

import * as silicon from "silicon.index.js";
export class MyPage extends silicon.ComplexWidgetBase {
    protected _element: HTMLElement;
    constructor(id: string | null, classes: string[]) {
        super(id, classes);
        this._element = document.createElement("div");

		this.addChild(new Text(null, ["x"], "Hello, World!"));
		this.addChild(new VBox(null, [], [new Text(null, ["x"], "Hello")]));

        this.setIdAndClasses();
    }
}



==================== silicon.index.ts ====================
export * from "./lib/abstracts/stretchContainer.js";
export * from "./lib/abstracts/widgetBase.js";
export * from "./lib/router/router.js";
export * from "./lib/utils.js";
export * from "./lib/widgets/button.js";
export * from "./lib/widgets/hbox.js";
export * from "./lib/widgets/inputBox.js";
export * from "./lib/widgets/page.js";
export * from "./lib/widgets/stretch.js";
export * from "./lib/widgets/text.js";
export * from "./lib/widgets/vbox.js";

 - silicon-lib
 - silicon
 --- xxx.si
 - generated
 --- xxx.ts
 - overwrites
 --- xxxUser.ts
 - silicon.index.ts
 - index.html