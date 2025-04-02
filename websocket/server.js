// 1. Benötigte Module laden
const express = require('express');
const http = require('http');
const { Server } = require("socket.io"); // Wichtig für socket.io v3+

require('dotenv').config(); // Lädt die Variablen aus der .env Datei
const { GoogleGenAI } = require("@google/genai");

// API-Key aus .env holen
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

console.log(GEMINI_API_KEY)

// Prüfen, ob der Key vorhanden ist
if (!GEMINI_API_KEY) {
    console.error("FEHLER: GEMINI_API_KEY wurde nicht in der .env Datei gefunden!");
    process.exit(1); // Beendet das Programm, wenn der Key fehlt
}

// Google AI initialisieren
const genAI = new GoogleGenAI({apiKey: GEMINI_API_KEY});

// HIER EINFÜGEN: Definiere die Persönlichkeit des Bots
const SYSTEM_INSTRUCTION = "Antworte locker!"; // Ändere das nach Belieben!

// füge beim erstellen des chats die neue systeminstruction ein.
/** wäre eigentlich const im originallen */
let chat = genAI.chats.create({
    model: "gemini-2.0-flash-lite",
    config: {
        systemInstruction: SYSTEM_INSTRUCTION,
    }
})

let backUpChat = [chat];

// Erstellt eine Chat-Instanz (Konversation)
// Wir erstellen für jede Verbindung eine neue Chat-Instanz,
// damit die AI den Gesprächsverlauf für jeden User einzeln behält.
// Das machen wir später innerhalb von io.on('connection').


// 2. Server aufsetzen
const app = express();
const server = http.createServer(app);
const io = new Server(server); // Socket.IO an den HTTP-Server binden

const PORT = 3000;

// 3. "public" Ordner bereitstellen
// Express soll alle Dateien aus dem 'public' Ordner direkt an den Browser senden können
// Wenn der Browser "/" anfragt, wird automatisch public/index.html gesendet!
app.use(express.static('public'));

// --- HIER KOMMEN SPÄTER DIE SOCKET.IO SACHEN HIN ---
// 4. Lauschen auf neue Verbindungen
io.on('connection', (socket) => {
    // 'socket' repräsentiert die Verbindung zu EINEM Client
    console.log('Ein Benutzer hat sich verbunden:', socket.id);

    // 5. Was passiert, wenn der Benutzer die Verbindung trennt?
    socket.on('disconnect', () => {
        console.log('Benutzer hat die Verbindung getrennt:', socket.id);
    });

    // Innerhalb von io.on('connection', ...)

    // Hier werden wir später auf Nachrichten vom Client lauschen ('message')
    // und Antworten senden ('response')

    // Innerhalb von io.on('connection', ...)

    // HIER EINFÜGEN: Lauschen auf 'message'-Events vom Client
    socket.on('message', async (empfangeneNachricht) => { 
        console.log(`Nachricht von ${socket.id}: ${empfangeneNachricht}`);
    
        try {
            const result = await chat.sendMessage({message: empfangeneNachricht});
            const response = result.text; // Warte auf die Antwort der AI
    
            console.log(`AI Antwort für ${socket.id}: ${response }`);
    
            // Sende die AI-Antwort zurück an den Client
            socket.emit('response', response );
    
        } catch (error) {
            // wenn Modell nicht gefunden wird
            if(error.message.includes("NOT_FOUND")) {
                chat = backUpChat[backUpChat.length - 1];
                backUpChat.pop();
                console.error("Das zuvor angeforderte Modell existierte nicht und wurde nun mit dem default ersetzt.");
                socket.emit('response', "Das geforderte Modell wurde nicht gefunden. Das zuletzt gültige wird nun verwendet.");
            }else {
                // Wenn etwas schiefgeht (z.B. API-Problem, Inhaltsfilter)
                console.error(`Fehler bei der AI-Anfrage für ${socket.id}:`, error);
                // Sende eine Fehlermeldung an den Client
                socket.emit('response', "Entschuldigung, ich kann gerade nicht antworten. Fehler: " + error.message);
            }
        }
    });
    
    socket.on('model', async (model) => {
        console.log(`Model ${model} durch ${socket.id} angefordert.`);

        let neuesModel;
        backUpChat.push(chat);
        try {
            neuesModel = genAI.chats.create({
                history: chat.getHistory(), 
                model: model,
                config: {
                    systemInstruction: SYSTEM_INSTRUCTION,
                }});
            chat = neuesModel;
            socket.emit('response', "Das Modell wurde aktualisiert!");
        }
        catch (error) {
            console.error("Fehler beim ändern des Models: " + error);
            // Sende eine Fehlermeldung an den Client
            socket.emit('response', "Es ist ein Fehler beim Ändern des Modells aufgetreten. Fehler: " + error.message);
        };
    });

});
// --- BIS HIER ---

// 6. Server starten
server.listen(PORT, () => {
  console.log(`🚀 Server läuft auf <http://localhost>:${PORT}`);
});
