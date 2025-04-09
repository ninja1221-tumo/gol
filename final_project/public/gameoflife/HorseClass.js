import Animal from "./AnimalClass.js";
import { matrix } from "../matrix.js";
import { randomElement } from "./smallUtil.js";
import Grasseater from "./GrasseaterClass.js";
import Grass from "./GrassClass.js";

export default class Horse extends Animal{
    static staticList = [];
    constructor(x, y) {
        super(x, y, 4, 10, 8);
    }
    updateneighbors() {
        this.neighbors = [
            [this.x - 2, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 1, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x - 2, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x + 1, this.y + 2],
            [this.x - 1, this.y + 2]
        ];
    }
    multiply() {
        super.multiply(Horse);
    }
    die() {
        super.die(Horse);
    }
    eat() {
        super.eat([2, 1], [Grasseater, Grass]);
    }
    move() {
        this.updateneighbors();
        let spaces = this.findFields(0);
        if (spaces.length > 0) {
            let pos = randomElement(spaces);
            let posY = pos[1];
            let posX = pos[0];
            matrix[posY][posX] = this.colorValue;
            matrix[this.y][this.x] = 0;
            this.y = posY;
            this.x = posX;
        }
    }
}