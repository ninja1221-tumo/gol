import { matrix } from "../matrix/matrix.js";
import Grasseater from "./GrasseaterClass.js";


// rollt nur auf der xAchse von 0 bis 40
export default class UeberrestClass {
    static staticList = [];
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.timer = 3 + Math.round(Math.random()*6)
    }
    transform(){
        if(this.timer == 0){
            matrix[this.y][this.x] = 2;
            let hatchedGrassEater = new Grasseater(this.x, this.y);
            Grasseater.staticList.push(hatchedGrassEater);
            UeberrestClass.staticList.splice(UeberrestClass.staticList.find((element) => element == this), 1);
        }else {
            this.timer -= 1;
        };
    };
    resetTimer(){
        this.timer = 3 + Math.round(Math.random()*6);
    }
};