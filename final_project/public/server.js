// import von der setup und draw Funktion und der matrix Variable
// ...

import { draw, framerate, setup, transformMatrix } from "./utilities.js";
import { matrix } from "./matrix.js";
import express from "express";
const app = express();
import * as http from "http";
const server = http.Server(app);
import * as socketio from "socket.io";
import Grass from "./gameoflife/GrassClass.js";
import Grasseater from "./gameoflife/GrasseaterClass.js";
import Flesheater from "./gameoflife/FlesheaterClass.js";
import Horse from "./gameoflife/HorseClass.js";
import TrapStone from "./gameoflife/TrapStoneClass.js";
const io = new socketio.Server(server);

// wir speichern das Ergebnis von der setInterval Funktion in einer Variable,
// damit wir es später stoppen können
let intetval;

// wir sagen Express, dass die Dateien im Ordner client statisch sind
// das bedeutet, dass sie direkt an der Browser geschickt werden können
// Der Code für den Client muss also im Ordner client liegen
app.use(express.static('./client'));

// wenn ein Benutzer die Seite öffnet, wird er auf die index.html Datei weitergeleitet
app.get('/', (req, res) => {
    res.redirect('index.html');
});

// wir starten den Server auf dem Port 3000
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

// wenn ein Benutzer eine Verbindung zum Server herstellt, wird diese Funktion ausgeführt
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');

        // wir stoppen das Spiel, wenn der Benutzer die Verbindung trennt
        clearInterval(intetval);
    });

    socket.on('info', (req, res)=>{
        socket.emit('inforesponse', [Grass.staticList, Grasseater.staticList, Flesheater.staticList, Horse.staticList, TrapStone.staticList]);
    });

    setup();
    intetval = setInterval(() => {
        draw();
        socket.emit('matrix', transformMatrix(matrix));
    }, framerate);
});
