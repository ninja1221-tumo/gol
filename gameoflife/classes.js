class LivingCreature {
    static staticList = [];
    constructor(x, y, color)
    {
        this.x = x;
        this.y = y;
        this.colorValue = color;
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
}

class Animal extends LivingCreature {
    constructor(x, y, color, requiredEnergy) {
        super(x, y, color);
        this.energyRequired = requiredEnergy;
        this.eatCounter = 0;
        this.notEatenCounter = 0;
    };
    findFields(want) {
        this.updateneighbors();
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
            let spawn = this.findFields(0);
            if (spawn.length > 0) {
                let newwPos = random(spawn);
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
        let spaces = this.findFields(0);
        if (spaces.length > 0) {
            let pos = random(spaces);
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
        for(color of eatColors) {
            fields.push(...this.findFields(color));
        };
        if (fields.length > 0) {
            let eatField = random(fields);
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
                        deleted = true;
                        break;
                    }
                }
                if(deleted) break;
            }
            this.eatCounter++;
            this.noteatenCounter = 0;

            this.multiply();

        } else {
            this.eatCounter = 0;
            this.noteatenCounter++;
            if (this.noteatenCounter >= 5) {
                this.die();
            } else {
                this.move();
            }

        }
    }
}

class Grass {
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
                let newPos = random(list)
                let newX = newPos[0];
                let newY = newPos[1];

                grasArr.push(new Grass(newX, newY));

                matrix[newY][newX] = 1;

            }
            this.roundCounter == 0;
        }
    }

}


class Grasseater extends Animal {
    constructor(x, y) {
        super(x, y, 2, 5);
    }
    multiply() {
        super.multiply(Grasseater);
    }
    die() {
        super.die(Grasseater);
    }
    eat() {
        super.eat([1],[Grass]);
    }

}
class Flesheater extends Animal{
    constructor(x, y) {
        super(x, y, 3, 8);
    }
    multiply() {
        super.multiply(Flesheater);
    }
    die() {
        super.die(Flesheater);
    }
    eat() {
        super.eat([2], [Grasseater]);
    }

}

class Horse extends Animal{
    constructor(x, y) {
        super(x, y, 4, 10);
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
        this.movements = [
            [this.x - 2, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 1, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x - 2, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x + 1, this.y + 2],
            [this.x - 1, this.y + 2]
        ]
    }
    multiply() {
        super.multiply(Horse);
    }
    die() {
        super.die(Horse);
    }
    eat() {
        super.eat([3], [Flesheater]);
    }

}
class TrapStone {
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
    }
    turnDirection() {
        this.direction += 1;
        if (this.direction >= 4) {
            this.direction = 0;
        }

    }
    deleteOtherCreatures() {
        for (let i = 0; i < grasArr.length; i++) {
            if (grasArr[i].y == this.y && grasArr[i].x == this.x) {
                grasArr.splice(i, 1);
                return
            }
        }
        for (let i = 0; i < predatorArr.length; i++) {
            if (predatorArr[i].y == this.y && predatorArr[i].x == this.x) {
                predatorArr.splice(i, 1);
                return
            }
        }
        for (let i = 0; i < horseArr.length; i++) {
            if (horseArr[i].y == this.y && horseArr[i].x == this.x) {
                horseArr.splice(i, 1);
                return
            }
        }
        for (let i = 0; i < eatgrasArr.length; i++) {
            if (eatgrasArr[i].y == this.y && eatgrasArr[i].x == this.x) {
                eatgrasArr.splice(i, 1);
                return
            }
        }
        for (let i = 0; i < stoneArr.length; i++) {
            if (stoneArr[i].x == this.x && stoneArr[i].y == this.y && stoneArr[i].id != this.id) {
                stoneArr.splice(i, 1);
                console.log("Stone hit another Stone");
                return
            }
        }
    }

}


