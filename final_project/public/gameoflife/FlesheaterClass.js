import Animal from "./AnimalClass.js";
import Grasseater from "./GrasseaterClass.js";
import Horse from "./HorseClass.js";

export default class Flesheater extends Animal{
    static staticList = [];
    constructor(x, y) {
        super(x, y, 3, 8, 5);
    }
    multiply() {
        super.multiply(Flesheater);
    }
    die() {
        super.die(Flesheater);
    }
    eat() {
        super.eat([2, 4], [Grasseater, Horse]);
    }

}