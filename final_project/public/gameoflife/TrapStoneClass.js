import { matrix } from "../matrix/matrix.js";
import { colorClassCreature } from "../matrix/utilities.js";

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
        let rolledColor = 0;
        if (this.direction >= 4) {
            this.turnDirection();
        }
        this.updateneighbors();
        if (this.neighbors[this.direction][0] >= 0 && this.neighbors[this.direction][1] >= 0 && this.neighbors[this.direction][0] < matrix[0].length && this.neighbors[this.direction][1] < matrix.length) {
            // Aktuelles Feld auf 0 setzen
            matrix[this.y][this.x] = 0;
            // Neues Feld bemalen 
            rolledColor = matrix[this.neighbors[this.direction][1]][this.neighbors[this.direction][0]];
            matrix[this.neighbors[this.direction][1]][this.neighbors[this.direction][0]] = 5;
            // neue Aktuelle position aktualisieren
            this.y = this.neighbors[this.direction][1];
            this.x = this.neighbors[this.direction][0];
        } else {
            this.turnDirection();
        }
        this.deleteOtherCreatures(rolledColor);
    }
    turnDirection() {
        this.direction += 1;
        if (this.direction >= 4) {
            this.direction = 0;
        }

    }
    deleteOtherCreatures(rolledColor) {
        if(rolledColor == 0) {return;}
        else if(rolledColor >= 1 && rolledColor <5) {
            for (let i = 0; i < colorClassCreature[rolledColor].staticList.length; i++) {
                if (colorClassCreature[rolledColor].staticList[i].y == this.y && colorClassCreature[rolledColor].staticList[i].x == this.x) {
                    colorClassCreature[rolledColor].staticList.splice(i, 1);
                    return
                }
            }
        }else if(rolledColor == 5){
            for (let i = 0; i < TrapStone.staticList.length; i++) {
                if (TrapStone.staticList[i].y == this.y && TrapStone.staticList[i].x == this.x && TrapStone.staticList[i] != this) {
                    TrapStone.staticList.splice(i, 1);
                    console.log("Stone rolled over another stone");
                    return
                }
            }
        }else if(rolledColor == 6){ // Delete itself if crash with SteinBruch
            TrapStone.staticList.splice(TrapStone.staticList.findIndex((element) => element == this), 1);
            console.log("TrapStone rolled to Steinbruch and broke!");
        }
    }
}