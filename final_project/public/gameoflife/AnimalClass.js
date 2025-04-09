import LivingCreature from "./LivingCreatureClass.js";
import { matrix } from "../matrix.js";
import { randomElement } from "./smallUtil.js";

export default class Animal extends LivingCreature {
    constructor(x, y, color, requiredEnergy, maximalPower) {
        super(x, y, color);
        this.energyRequired = requiredEnergy;
        this.eatCounter = 0;
        this.maximalPower = maximalPower;
        this.notEatenCounter = 0;
    };
    findFields(want) {
        //this.updateneighbors();
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
    updateneighbors() {
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
    }
    multiply(newCreatureClass) {
        if (this.eatCounter >= this.energyRequired) {
            this.updateneighbors();
            let spawn = this.findFields(0);
            if (spawn.length > 0) {
                let newwPos = randomElement(spawn);
                let newwY = newwPos[1];
                let newwX = newwPos[0];
                newCreatureClass.staticList.push(new newCreatureClass(newwX, newwY));
                matrix[newwY][newwX] == this.colorValue;
                this.eatCounter = 0;
            }
        }
    }
    /**
     * 
     * @param {object} creatureClass This Object's class reference
     */
    die(creatureClass) {
        matrix[this.y][this.x] = 0;
        for (let i = 0; i < creatureClass.staticList.length; i++) {
            if (this.y == creatureClass.staticList[i].y && this.x == creatureClass.staticList[i].x) {
                creatureClass.staticList.splice(i, 1);
                break;
            }
        }
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
    /**
     * 
     * @param {Array<number>} eatColor Array with numbers color to look for
     * @param {Array} listArray Array with Class References
     */
    eat(eatColors, listArray) {
        let fields = [];
        this.updateneighbors();
        for(let color of eatColors) {
            fields.push(...this.findFields(color));
        };
        if (fields.length > 0) {
            let eatField = randomElement(fields);
            let posY = eatField[1];
            let posX = eatField[0];
            matrix[posY][posX] = this.colorValue;
            matrix[this.y][this.x] = 0;
            this.y = posY;
            this.x = posX;

            let deleted = false;
            // iterate throguh the classes
            for(let j = 0; j < listArray.length; j++){
                // Array elements must be class references with staticList
                for (let i = 0; i < listArray[j].staticList.length; i++) {
                    if (this.y == listArray[j].staticList[i].y && this.x == listArray[j].staticList[i].x) {
                        listArray[j].staticList.splice(i, 1);
                    }
                }
            }
            this.eatCounter++;
            this.notEatenCounter = 0;

            this.multiply();

        } else {
            this.eatCounter = 0;
            this.notEatenCounter++;
            if (this.notEatenCounter >= this.maximalPower) {
                this.die();
            } else {
                this.move();
            }

        }
    }
}