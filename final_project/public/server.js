// import von der setup und draw Funktion und der matrix Variable
// ...

import { activeEvents, draw, eventTimes, framerate, setup, transformMatrix } from "./matrix/utilities.js";
import { matrix } from "./matrix/matrix.js";
import express from "express";
const app = express();
import * as http from "http";
const server = http.Server(app);
import * as socketio from "socket.io";
import { currentFileName, DataStamp, frameInterval, saveToFile, updateFileName } from "./server/dataCollection.js";
import { steinBruchSteinePlatzieren } from "./matrix/events.js";
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
        socket.emit('inforesponse', [new DataStamp]);
    });

    setup();
    updateFileName();

    let frame = 0;
    intetval = setInterval(() => {
        draw();
        if(frame % frameInterval == 0){
            console.log(frame);
            new DataStamp(frame);
            saveToFile(currentFileName);
        };
        frame++;
        socket.emit('matrix', transformMatrix(matrix));
    }, framerate);

    // Ereignisse
    socket.on('event', (req, res)=>{
        if(req == "steinbruch")
        {
            activeEvents.push(steinBruchSteinePlatzieren);
            eventTimes.push(3+Math.floor(Math.random()*6));
            console.log("Steinbruch für " + eventTimes.at(-1));
        }
    })

});
