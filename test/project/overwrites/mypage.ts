import { MyPage } from "../generated/mypage.js"
import * as silicon from "../silicon.index.js";
export class MyPageO extends MyPage {
    constructor(id: string | null, classes: string[]) {
        super(id, classes);
        (this.findId("text") as silicon.Text).text = "Good job!";
    }
}