import Grass from "./gameoflife/GrassClass.js";
import Grasseater from "./gameoflife/GrasseaterClass.js";
import Flesheater from "./gameoflife/FlesheaterClass.js";
import Horse from "./gameoflife/HorseClass.js";
import TrapStone from "./gameoflife/TrapStoneClass.js";
import { matrix, getRandomMatrix, createmoreCreatures } from "./matrix.js";

export let framerate = 25;

export function setup() {
    createmoreCreatures();

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
                let di = Math.floor(Math.random(0, 5));
                let s = new TrapStone(x, y, id, di);
                TrapStone.staticList.push(s);
            }
        }
    }
};

export function draw() {
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
};

export function transformMatrix(matrix) {
    let patterns = [];
    for(let i = 0; i < matrix.length; i++){
        patterns.push([]);
        for(let j = 0; j < matrix[i].length; j++){
            patterns[i][j] = matrix[i][j];
        }
    };
    return patterns;
};