import { Text } from "./lib/widgets/text.js"
import { HBox } from "./lib/widgets/hbox.js"
import { VBox } from "./lib/widgets/vbox.js"
import { InputBox } from "./lib/widgets/inputBox.js"
import { Stretch } from "./lib/widgets/stretch.js"
import { Button } from "./lib/widgets/button.js"
import { Page } from "./lib/widgets/page.js"
import { Router, switchPage } from "./lib/router/router.js"

let text1 = new Text(null, [], "Hello, World!");
let input = new InputBox(null, []);
let text2 = new Text(null, [], "Good");
var hbox1 = new HBox(null, [], [text1, input, text2]);

let text3 = new Text(null, [], "Click?");
let btn = new Button(null, [], "Click Me!", () => {
    vbox.allEach((widget) => {
        if (widget instanceof HBox) 
            widget.stretch = true;
    })
});
var hbox2 = new HBox(null, [], [text3, btn]);

let text4 = new Text(null, [], "Click?", "/#/test");
let btn2 = new Button(null, [], "Click Me!", () => {
    vbox.allEach((widget) => {
        if (widget instanceof HBox)
            widget.stretch = false;
    })
});
var hbox3 = new HBox(null, [], [text4, btn2]);

let s = new Stretch(null, [], 1);
var vbox = new VBox(null, [], [hbox1, s, hbox2, hbox3]);
vbox.element.style.height = "500px";

let page = new Page(null, [], vbox, "page");
page.style(document.body, {
    backgroundColor: "#f5f5f5",
    foregroundColor: "white",
    maxWidth: 800, 
    padding: 40
})

let router = new Router(new Map([
    ["/", () => {
        switchPage(page.element);
}], 
    ["/test", () => {
        switchPage(hbox1.element);
}]
]))
