import Grass from "../gameoflife/GrassClass.js";
import Grasseater from "../gameoflife/GrasseaterClass.js";
import Flesheater from "../gameoflife/FlesheaterClass.js";
import Horse from "../gameoflife/HorseClass.js";
import TrapStone from "../gameoflife/TrapStoneClass.js";
import { matrix, createmoreCreatures, colorCodes, restartMatrix } from "./matrix.js";
import SteinBruchStein from "../gameoflife/SteinBruchStein.js";
import UeberrestClass from "../gameoflife/UeberresteClass.js";

export let framerate = 1000;

export let activeEvents = [];
export let eventTimes = [];

export function setup() {
    restartMatrix();
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
                let di = Math.floor(Math.random()*5);
                let s = new TrapStone(x, y, id, di);
                TrapStone.staticList.push(s);
            }
        }
    }
};

export const colorClassCreature = {
    1: Grass,
    2: Grasseater,
    3: Flesheater,
    4: Horse,
    5: TrapStone,
    6: SteinBruchStein,
    7: UeberrestClass
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
    for(let i = 0; i < SteinBruchStein.staticList.length; i++) {
        SteinBruchStein.staticList[i].roll();
    };
    for(let i = 0; i < UeberrestClass.staticList.length; i++) {
        UeberrestClass.staticList[i].transform();
    };

    // Events ausführen
    for(let e = 0; e < eventTimes.length; e++){
        if(eventTimes[e] <= 0) {
            activeEvents.splice(e, 1);
            eventTimes.splice(e, 1);
        }else {
            // Eventfunktion ausführen
            activeEvents[e]();
            // Event timer kürzen
            eventTimes[e] -= 1;
        }
    }
};

export function transformMatrix(matrixO) {
    let patterns = [];
    for(let i = 0; i < matrixO.length; i++){
        patterns.push([]);
        for(let j = 0; j < matrixO[i].length; j++){
            patterns[i][j] = colorCodes[matrixO[i][j]];
        }
    };
    return patterns;
};