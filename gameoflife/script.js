let fr = 1;
let h = 25;

Grass.staticList = [];
Grasseater.staticList = [];
Flesheater.staticList = [];
Horse.staticList = [];
TrapStone.staticList = [];

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
                Grass.staticList.push(g);
            } else if (matrix[y][x] == 2) {
                let e = new Grasseater(x, y);
                Grasseater.staticList.push(e);
            } else if (matrix[y][x] == 3) {
                let f = new Flesheater(x, y);
                Flesheater.staticList.push(f);
            } else if (matrix[y][x] == 4) {
                let h = new Horse(x, y);
                Horse.staticList.push(h);
            } else if (matrix[y][x] == 5) {
                let id = TrapStone.staticList.length;
                let di = Math.floor(random(0, 5));
                let s = new TrapStone(x, y, id, di);
                TrapStone.staticList.push(s);
            }
        }
    }


}

function draw() {

    for (let i = 0; i < Grass.staticList.length; i++) {
        Grass.staticList[i].multiply()
    }
    for (let i = 0; i < Grasseater.staticList.length; i++) {
        Grasseater.staticList[i].eat();
    }
    for (let i = 0; i < Flesheater.staticList.length; i++) {
        Flesheater.staticList[i].eat();
    }
    for (let i = 0; i < Horse.staticList.length; i++) {
        Horse.staticList[i].eat();
    }
    for (let i = 0; i < TrapStone.staticList.length; i++) {
        TrapStone.staticList[i].roll();
    }

    console.log(Grass.staticList.length)

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

