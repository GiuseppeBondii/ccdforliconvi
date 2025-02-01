import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LorenzoCasadei() {
    const navigate = useNavigate();
    const username = "LorenzoCasadei";
    const [savedUser, setSavedUser] = useState("");
    const [level, setLevel] = useState(0);

    const QestAns = [
        { Question: "Ti presenti con tutti. Una persona in particolare ti farà domande sul meteo quando gli dici di essere il manutentore della casa. È convinto stia per arrivare una forte nevicata e tu gli dirai che effettivamente tra 20 minuti dovrebbe nevicare. Chi?", Answer: "Luca Righi" },
        { Question: "Lo rassicuri. É normale che in questo periodo ci siano forti precipitazioni. Successivamente recati a conoscere la zia americana di Matte e inizia a parlare con lei. Parlate del più e del meno fino e raccontale anche del tuo vizio per il gioco. Lei sarà un po’ sorpresa e ti racconterà di un regalo che gli ha fatto suo marito per il suo compleanno. Cosa le ha regalato? ", Answer: "Cavallo" },
        { Question: "Lasciata la conversazione ti rechi da Samu chiedendogli un parere sulla serata e sulla cena. Aspetta la sua risposta e dagli un parere tuo personale. Digli però che non ti sono piaciute le verdure. A lui è piaciuto particolarmente cosa? ", Answer: "Vino" },
        { Question: "Continui la serata tranquillamente e sei cordiale con tutti. Stai pronto ad eventuali interventi. Ad un certo punto comparirà un codice preceduto da #, qual é??", Answer: "7458" }   
    ];

    useEffect(() => {
        const storedUser = localStorage.getItem("saveduser");
        const storedLevel = parseInt(localStorage.getItem("storedQuestion"), 10);

        if (storedUser) {
            if (storedUser !== username) {
                navigate("../" + storedUser);
            } else {
                setSavedUser(storedUser);
                setLevel(storedLevel || 0);
            }
        } else {
            setSavedUser(username);
            localStorage.setItem("saveduser", username);
            localStorage.setItem("storedQuestion", 0);
        }
    }, [navigate, username]);

    function QestAndReply() {
        if (level >= QestAns.length) {
            return <h2 className="question">
                Non sai cosa fare. Si creerà del casino. Appena riki finisce di parlare prendi in mano la situazione. Proponi che ordinatamente, uno alla volta si dica quello che si sà per non creare caos e, quando nessuno ha piu nulla da aggiungere, indici una votazione democratica per decidere chi chiudere in uno sgabuzzino fino all’arrivo della polizia.
            </h2>;
        }
    
        const handleSubmit = (event) => {
            event.preventDefault();
            const userAnswer = event.target.elements.answer.value.trim().toLowerCase().replace(/\s+/g, '');
            const correctAnswer = QestAns[level].Answer.toLowerCase().replace(/\s+/g, '');
    
            if (userAnswer === correctAnswer) {
                const nextLevel = level + 1;
                setLevel(nextLevel);
                localStorage.setItem("storedQuestion", nextLevel);
                event.target.reset();
            } else {
                alert("Risposta sbagliata! Riprova.");
            }
        };
    
        return (
            <div>
                <h2 className="question">{QestAns[level].Question}</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="answer" placeholder="La tua risposta" required />
                    <button type="submit">Invia</button>
                </form>
            </div>
        );
    }
    return (
        <div>
            <QestAndReply />
        </div>
    );
}

export default LorenzoCasadei;