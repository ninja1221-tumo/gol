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
        this.updateneighbors();
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
        this.updateneighbors();
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

class Grass {
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
                let newPos = random(list)
                let newX = newPos[0];
                let newY = newPos[1];

                Grass.staticList.push(new Grass(newX, newY));

                matrix[newY][newX] = 1;

            }
            this.roundCounter == 0;
        }
    }

}


class Grasseater extends Animal {
    static staticList = [];
    constructor(x, y) {
        super(x, y, 2, 5, 5);
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
        super.eat([2], [Grasseater]);
    }

}

class Horse extends Animal{
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
        super.eat([3], [Flesheater]);
    }
    move() {
        this.updateneighbors();
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
}
class TrapStone {
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


