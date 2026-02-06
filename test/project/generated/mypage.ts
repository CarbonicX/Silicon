
import * as silicon from "../silicon.index.js";
export class MyPage extends silicon.ComplexWidgetBase {
    protected _element: HTMLElement;
    constructor(id: string | null, classes: string[]) {
        super(id, classes);
        this._element = document.createElement("div");
        
		this.addChild(new silicon.VBox(null, [], [new silicon.Text("text", [], "Hello")]));

        this.setIdAndClasses();
    }
}
