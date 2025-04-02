import { matrix } from "../matrix.js";

export default class TrapStone {
    static staticList = [];
    constructor(x, y, id, sdirection) {
        this.x = x;
        this.y = y;
        this.id = id;

        this.direction = sdirection;

        this.neighbors = [
            [this.x - 1, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    updateneighbors() {
        this.neighbors = [
            [this.x - 1, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x + 1, this.y + 1],
            [this.x - 1, this.y + 1]
        ];
    }
    roll() {
        if (this.direction >= 4) {
            this.turnDirection();
        }
        this.updateneighbors();
        if (this.neighbors[this.direction][0] >= 0 && this.neighbors[this.direction][1] >= 0 && this.neighbors[this.direction][0] < matrix[0].length && this.neighbors[this.direction][1] < matrix.length) {
            if (this.direction == 0) {
                matrix[this.y][this.x] = 0;

                matrix[this.y - 1][this.x - 1] = 5;
                this.y = this.neighbors[this.direction][1];
                this.x = this.neighbors[this.direction][0];
            } else if (this.direction == 1) {
                matrix[this.y][this.x] = 0;

                matrix[this.y - 1][this.x + 1] = 5;
                this.y = this.neighbors[this.direction][1];
                this.x = this.neighbors[this.direction][0];
            } else if (this.direction == 2) {
                matrix[this.y][this.x] = 0;

                matrix[this.y + 1][this.x + 1] = 5;
                this.y = this.neighbors[this.direction][1];
                this.x = this.neighbors[this.direction][0];
            } else if (this.direction == 3) {
                matrix[this.y][this.x] = 0;

                matrix[this.y + 1][this.x - 1] = 5;
                this.y = this.neighbors[this.direction][1];
                this.x = this.neighbors[this.direction][0];
            }
        } else {
            this.turnDirection();
        }
        this.deleteOtherCreatures();
    }
    turnDirection() {
        this.direction += 1;
        if (this.direction >= 4) {
            this.direction = 0;
        }

    }
    deleteOtherCreatures() {
        for (let i = 0; i < Grass.staticList.length; i++) {
            if (Grass.staticList[i].y == this.y && Grass.staticList[i].x == this.x) {
                Grass.staticList.splice(i, 1);
                return
            }
        }
        for (let i = 0; i < Flesheater.staticList.length; i++) {
            if (Flesheater.staticList[i].y == this.y && Flesheater.staticList[i].x == this.x) {
                Flesheater.staticList.splice(i, 1);
                return
            }
        }
        for (let i = 0; i < Horse.staticList.length; i++) {
            if (Horse.staticList[i].y == this.y && Horse.staticList[i].x == this.x) {
                Horse.staticList.splice(i, 1);
                return
            }
        }
        for (let i = 0; i < Grasseater.staticList.length; i++) {
            if (Grasseater.staticList[i].y == this.y && Grasseater.staticList[i].x == this.x) {
                Grasseater.staticList.splice(i, 1);
                return
            }
        }
        for (let i = 0; i < TrapStone.staticList.length; i++) {
            if (TrapStone.staticList[i].x == this.x && TrapStone.staticList[i].y == this.y && TrapStone.staticList[i].id != this.id) {
                TrapStone.staticList.splice(i, 1);
                console.log("Stone hit another Stone");
                return
            }
        }
    }
}