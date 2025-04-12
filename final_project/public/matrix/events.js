import SteinBruchStein from "../gameoflife/SteinBruchStein.js";
import { matrix } from "./matrix.js";
import { colorClassCreature } from "./utilities.js";

export function steinBruchSteinePlatzieren(){
    // 5-17 pro aufruf generieren
    let amount = 5 + Math.floor(Math.random()*13);
    for(let i = 0; i < amount; i++){
        let randomY = Math.floor(Math.random()*matrix.length);
        // zufaellig platzieren und vorherigge kreatur löschen
        if(matrix[randomY][0] != 0 && matrix[randomY][0] != 6) {
            for(let i = 0; i < colorClassCreature[matrix[randomY][0]].staticList.length; i++){
                if(colorClassCreature[matrix[randomY][0]].staticList[i].x == 0 && colorClassCreature[matrix[randomY][0]].staticList[i].y == randomY){
                    colorClassCreature[matrix[randomY][0]].staticList.splice(i, 1);
                    break;
                }
            }
        };
        matrix[randomY][0] = 6;
    };
    for(let y = 0; y < matrix.length; y++){
        if(matrix[y][0] == 6){
            let s = new SteinBruchStein(0, y);
            SteinBruchStein.staticList.push(s);
        };
    };
};