matrix = [
    [0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];


for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
        console.log(matrix[y][x])
    }
}

let fr = 7;
let h = 25;

let grasArr = [];
let eatgrasArr = [];
let predatorArr = [];
let horseArr = [];
let stoneArr = [];


function getRandommatrix(hoehe, breite) {
    let square = [];
    for (let y = 0; y < breite; y++) {
        square[y] = [];  // or square.push([])
        for (let x = 0; x < hoehe; x++) {
            square[y][x] = Math.floor(random(0, 2))
        }
    }
    return square
}

function createmoreCreatures() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[0].length; x++) {
            if (x == y && x % 2 == 0) {
                matrix[y][x] = 2;
            }
            if (x == y && x % 2 != 0) {
                matrix[y][x] = 3;
            }
            if (y == x - y && x % 4 == 2) {
                matrix[y][x] = 5;
            }
            if (y != x - y && y % 4 == 2) {
                matrix[y][x] = 4
            }
        }

    }
}

function setup() {
    matrix = getRandommatrix(40, 40);
    createmoreCreatures();
    createCanvas(matrix[0].length * h + 1, matrix.length * h + 1);
    background("#acacac");
    frameRate(fr);


    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let g = new Grass(x, y);
                grasArr.push(g);
            } else if (matrix[y][x] == 2) {
                let e = new Grasseater(x, y);
                eatgrasArr.push(e);
            } else if (matrix[y][x] == 3) {
                let f = new Flesheater(x, y);
                predatorArr.push(f);
            } else if (matrix[y][x] == 4) {
                let h = new Horse(x, y);
                horseArr.push(h);
            } else if (matrix[y][x] == 5) {
                let id = stoneArr.length;
                let di = Math.floor(random(0, 5));
                let s = new TrapStone(x, y, id, di);
                stoneArr.push(s);
            }
        }
    }


}

function draw() {


    for (let i = 0; i < grasArr.length; i++) {
        grasArr[i].multiply()
    }
    for (let i = 0; i < eatgrasArr.length; i++) {
        eatgrasArr[i].eat();
    }
    for (let i = 0; i < predatorArr.length; i++) {
        predatorArr[i].eat();
    }
    for (let i = 0; i < horseArr.length; i++) {
        horseArr[i].eat();
    }
    for (let i = 0; i < stoneArr.length; i++) {
        stoneArr[i].roll();
        stoneArr[i].deleteOtherCreatures();
    }

    console.log(grasArr.length)

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 0) {
                fill("white");
            } else if (matrix[y][x] == 1) {
                fill("green");
            } else if (matrix[y][x] == 2) {
                fill("yellow");
            } else if (matrix[y][x] == 3) {
                fill("red");
            } else if (matrix[y][x] == 4) {
                fill("orange");
            } else if (matrix[y][x] == 5) {
                fill("DarkGrey")
            }
            rect(x * h, y * h, h, h);
        }
    }
}

