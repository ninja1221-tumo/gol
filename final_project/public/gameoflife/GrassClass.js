import { randomElement } from "./smallUtil.js";
import { matrix } from "../matrix/matrix.js";

export default class Grass {
    static staticList = [];
    constructor(x, y) {
        // Farbe - gruen
        this.colorValue = 1;
        // Position 
        this.y = y;
        this.x = x;
        // Nachbarn
        this.neighbors = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
        // Rundenzaehler
        this.roundCounter = 0;
    }
    findFields(want) {
        // Leere Nachbarfelder finden
        let found = [];
        for (let i = 0; i < this.neighbors.length; i++) {
            const pos = this.neighbors[i]; // [x, y]
            let posX = pos[0];
            let posY = pos[1];
            // Matrix ueberpruefen
            if (posY >= 0 && posX >= 0 && posY < matrix.length && posX < matrix[0].length) {
                if (matrix[posY][posX] == want) {
                    found.push(pos);
                }
            }
        }
        return found
    }
    multiply() {
        this.roundCounter++;
        if (this.roundCounter >= 6) {
            let list = this.findFields(0);
            if (list.length > 0) {
                let newPos = randomElement(list)
                let newX = newPos[0];
                let newY = newPos[1];

                Grass.staticList.push(new Grass(newX, newY));

                matrix[newY][newX] = 1;

            }
            this.roundCounter == 0;
        }
    }

}