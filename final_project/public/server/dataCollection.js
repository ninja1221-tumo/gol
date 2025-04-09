import * as fs from "fs"
import { creatureClasses, creatureNames } from "./dataStorages.js"
import { colorClassCreature } from "../utilities.js";

// Pfad relativ zu skript-eingang
// Pfad zum Speichern der Daten-Dateien (JSON)
export const dataSafeDirectory = "./data/";
// Dateiname ist datum formatiert .json
export let currentFileName = Date.now().toString().replace(" ", "").replace(".", "-").concat(".json");

export class DataStamp {
    static fullTimeLine = {}
    constructor(index)
    {
        this.data = {};
        for(let creatureId in Object.keys(colorClassCreature))
        {
            // Place all creatures into the JSON in format: "<CreatureName>Amount": number
            this.data[`${creatureNames.at(Number(creatureId))}Amount`] = creatureClasses[Number(creatureId)].staticList.length;
        };
        DataStamp.fullTimeLine[index] = this;
    };
}

export function saveToFile(fileName){
    if(!fs.existsSync(dataSafeDirectory)){
        fs.mkdirSync(dataSafeDirectory); 
        fs.writeFileSync(dataSafeDirectory+fileName, "");
    };
    fs.writeFileSync(dataSafeDirectory+fileName, JSON.stringify(DataStamp.fullTimeLine));
    console.log("Saved last 60 frames to file. Path: " + dataSafeDirectory+fileName);
};

export function updateFileName() {
    currentFileName = Date.now().toString().replace(" ", "").replace(".", "-").concat(".json");
}