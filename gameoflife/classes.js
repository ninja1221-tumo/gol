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


class Grasseater {
    constructor(x, y) {
        // Farbe - gruen
        this.colorValue = 2;
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
        this.eatCounter = 0;
        this.noteatenCounter = 0;
    }
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
    multiply() {
        if (this.eatCounter >= 5) {
            let spawn = this.findFields(0);
            if (spawn.length > 0) {
                let newwPos = random(spawn);
                let newwY = newwPos[1];
                let newwX = newwPos[0];
                eatgrasArr.push(new Grasseater(newwX, newwY));
                matrix[newwY][newwX] == 2;
                this.eatCounter = 0;
            }
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (let i = 0; i < eatgrasArr.length; i++) {
            if (this.y == eatgrasArr[i].y && this.x == eatgrasArr[i].x) {

                eatgrasArr.splice(i, 1);
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
            matrix[posY][posX] = 2;
            matrix[this.y][this.x] = 0;
            this.y = posY;
            this.x = posX;
        }
    }
    eat() {
        let fields = this.findFields(1);
        if (fields.length > 0) {
            let grassfield = random(fields);
            let posY = grassfield[1];
            let posX = grassfield[0];
            matrix[posY][posX] = 2;
            matrix[this.y][this.x] = 0;
            this.y = posY;
            this.x = posX;
            for (let i = 0; i < grasArr.length; i++) {
                if (this.y == grasArr[i].y && this.x == grasArr[i].x) {
                    grasArr.splice(i, 1);
                    break;
                }
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
class Flesheater {
    constructor(x, y) {
        // Farbe - rot
        this.colorValue = 3;
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
        this.eatCounter = 0;
        this.noteatenCounter = 0;
    }
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
    multiply() {
        if (this.eatCounter >= 8) {
            let spawn = this.findFields(0);
            if (spawn.length > 0) {
                let newwPos = random(spawn);
                let newwY = newwPos[1];
                let newwX = newwPos[0];
                predatorArr.push(new Flesheater(newwX, newwY));
                matrix[newwY][newwX] == 3;
                this.eatCounter = 0;
            }
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (let i = 0; i < predatorArr.length; i++) {
            if (this.y == predatorArr[i].y && this.x == predatorArr[i].x) {

                predatorArr.splice(i, 1);
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
            matrix[posY][posX] = 3;
            matrix[this.y][this.x] = 0;
            this.y = posY;
            this.x = posX;
        }
    }
    eat() {
        let fields = this.findFields(2);
        if (fields.length > 0) {
            let fleshfield = random(fields);
            let posY = fleshfield[1];
            let posX = fleshfield[0];
            matrix[posY][posX] = 3;
            matrix[this.y][this.x] = 0;
            this.y = posY;
            this.x = posX;
            for (let i = 0; i < eatgrasArr.length; i++) {
                if (this.y == eatgrasArr[i].y && this.x == eatgrasArr[i].x) {
                    eatgrasArr.splice(i, 1);
                    break;
                }
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

class Horse {
    constructor(x, y) {
        // Farbe - rot
        this.colorValue = 4;
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
        // Rundenzaehler
        this.eatCounter = 0;
        this.noteatenCounter = 0;
        this.notmovenCounter = 0;
    }
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
    findMovementFields(want) {
        this.updateneighbors();
        // Leere Nachbarfelder finden
        let found = [];
        for (let i = 0; i < this.movements.length; i++) {
            const pos = this.movements[i]; // [x, y]
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
    move() {
        let spaces = this.findMovementFields(0);
        if (spaces.length > 0) {
            let pos = random(spaces);
            let posY = pos[1];
            let posX = pos[0];
            matrix[posY][posX] = 4;
            matrix[this.y][this.x] = 0;
            this.y = posY;
            this.x = posX;
        }
    }
    multiply() {
        let spawn = this.findFields(0);
        if (this.eatCounter == 10 && spawn.length > 0) {
            for (let i = 0; i < spawn.length; i++) {
                const place = random(spawn);
                let newhY = place[1];
                let newhX = place[0];
                matrix[newhY][newhX] = 4;
                let h = new Horse(newhX, newhY);
                horseArr.push(h);
            }
        }
    }
    die() {
        for (let i = 0; i < horseArr.length; i++) {
            if (this.y == horseArr[i].y && this.x == horseArr[i].x) {
                horseArr.splice(i, 1);
                matrix[this.y][this.x] = 0;
            }
        }
    }
    eat() {
        let fields = this.findMovementFields(3);
        if (fields.length > 0) {
            let flesheaterfield = random(fields);
            let posY = flesheaterfield[1];
            let posX = flesheaterfield[0];
            matrix[posY][posX] = 4;
            matrix[this.y][this.x] = 0;
            this.y = posY;
            this.x = posX;
            for (let i = 0; i < predatorArr.length; i++) {
                if (this.y == predatorArr[i].y && this.x == predatorArr[i].x) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }
            this.eatCounter++;
            this.noteatenCounter = 0;

            this.multiply();

        } else
            this.noteatenCounter++;
        this.eatCounter = 0;
        if (this.noteatenCounter >= 8) {
            this.die();
        } else {
            this.move();
        }

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


