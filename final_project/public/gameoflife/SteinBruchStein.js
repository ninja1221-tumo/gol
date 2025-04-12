import { matrix } from "../matrix/matrix.js";
import { colorClassCreature } from "../matrix/utilities.js";
import UeberrestClass from "./UeberresteClass.js";


// rollt nur auf der xAchse von 0 bis 40
export default class SteinBruchStein {
    static staticList = [];
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    roll() {
        let rolledColor = 0;
        let deleteThis = false;
        // aktuelles feld auf 0 setzen
        matrix[this.y][this.x] = 0;
        if ( this.x+1 < matrix[0].length ) {
            // Neues Feld bemalen 
            rolledColor = matrix[this.y][this.x+1];
            matrix[this.y][this.x+1] = 6;
            // neue Aktuelle position aktualisieren
            this.x += 1;
        } else {
            // reste hinterlassen
            matrix[this.y][this.x] = 7;
            let place = true;
            for(let i = 0; i < UeberrestClass.staticList.length; i++){
                if(UeberrestClass.staticList[i].y == this.y && UeberrestClass.staticList[i].x == this.x)
                    {   
                        place = false;
                        break;
                    } 
            };
            if(place){
                let rest = new UeberrestClass(this.x, this.y);
                UeberrestClass.staticList.push(rest);
            }
            // zum löschen markieren
            deleteThis = true;
        };
        if(rolledColor != 0)
        {
            this.deleteCreatures(rolledColor);
        };
        if(deleteThis){
            this.deleteCreatures(6);
        }
    }
    deleteCreatures(rolledColor) {
        if(rolledColor == 0) {return;}
        else {
            for (let i = 0; i < colorClassCreature[rolledColor].staticList.length; i++) {
                if (colorClassCreature[rolledColor].staticList[i].y == this.y && colorClassCreature[rolledColor].staticList[i].x == this.x) {
                    colorClassCreature[rolledColor].staticList.splice(i, 1);
                    return;
                }
            }
        }
    }
}