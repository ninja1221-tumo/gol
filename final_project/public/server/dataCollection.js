import * as fs from "fs"
import { creatureClasses, creatureNames } from "./dataStorages.js"
import { colorClassCreature } from "../matrix/utilities.js";

// Pfad relativ zu skript-eingang
// Pfad zum Speichern der Daten-Dateien (JSON)
export const dataSafeDirectory = "./data/";
// Dateiname ist datum formatiert .json
export let currentFileName = Date.now().toString().replace(" ", "").replace(".", "-").concat(".json");

// Jedes wievielte frame wird gespeichert
export const frameInterval = 15;

export class DataStamp {
    static fullTimeLine = {}
    constructor(index = undefined)
    {
        this.data = {};
        for(let creatureId in Object.keys(colorClassCreature))
        {
            // Place all creatures into the JSON in format: "<CreatureName>Amount": number
            this.data[`${creatureNames.at(Number(creatureId))}Amount`] = creatureClasses[Number(creatureId)].staticList.length;
        };
        if(index != undefined) DataStamp.fullTimeLine[index] = this;
    };
}

export function saveToFile(fileName){
    if(!fs.existsSync(dataSafeDirectory)){
        fs.mkdirSync(dataSafeDirectory); 
        fs.writeFileSync(dataSafeDirectory+fileName, "");
    };
    fs.writeFileSync(dataSafeDirectory+fileName, JSON.stringify(DataStamp.fullTimeLine));
    console.log("Saved last "+ frameInterval +" frames to file. Path: " + dataSafeDirectory+fileName);
};

export function updateFileName() {
    currentFileName = Date.now().toString().replace(" ", "").replace(".", "-").concat(".json");
}