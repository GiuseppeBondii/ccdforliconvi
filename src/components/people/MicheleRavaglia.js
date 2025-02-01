import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MicheleRavaglia() {
    const navigate = useNavigate();
    const username = "MicheleRavaglia";
    const [savedUser, setSavedUser] = useState("");
    const [level, setLevel] = useState(0);

    const QestAns = [
        { Question: "riunisciti con tua madre e sii curioso porgendogli domande su ciò che ti interessa sapere. Parla anche con altri commensali, raccontando tu chi sei e cercando di scoprire chi sono gli altri. Noterai una ragazza che ti piace (te lo dirò in seguito), ma ad un certo punto si avvicinerà a te un’altra ragazza facendoti delle avance. Insisterà e sarai così gentile da iniziare a parlarci. Quando la conversazione ti ha tediato, liquidala dicendo che devi andare un attimo in camera da letto perchè hai dimenticato una cosa. Chi è questa persona a cui piaci?", Answer: "Silvia Corsellini" },
        { Question: "Sali in camera perchè ormai l’hai usata come scusa, ma mentre sei li ti accorgi di una lettera dentro una borsa. Decidi di scoprire di più. Leggila molto attentamente. A chi è stata inviata? ", Answer: "Matteo Mari" },
        { Question: "sconvolto della notizia appena scoperta, lascia la lettera SULLA SCRIVANIA e infuriato corri a parlare con tua madre. Con chiunque stia parlando prendila da parte e chiedile delle spiegazioni. Allontanata tua madre, decidi di architettatare il piano, senza dirlo a nessuno. Ricordandoti della malattia di Matte decidi di rubare il suo salvavita (senza farti vedere assolutamente sennò finisce il gioco). SEI TU IL COLPEVOLE. Cosa gli rubi? ", Answer: "Dispositivo" },
        { Question: "sapendo di essere il colpevole, torni assieme agli alti e fai il disinvolto. NESSUNO DOVRA’ SOSPETTARE DI TE, e fai finta di niente. Per distrarti decidi di andare a parlare con la bellissima ragazza che ti piaceva all’inzio, AGNESE. Portale un bicchiere di vino per avere la sua attenzione. Insisti. Conquistala come un gentiluomo. Fai colpo. Ad un certo punto comparirà un codice preceduto da #, Qual’ è il codice?", Answer: "7458" }
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
                Bastardo io tifo per te. NON TI FARE BECCARE, PUOI DIRE QUELLO CHE VUOI, ANCHE MENTIRE. suggerimento: fingi, se qualcuno ti accusa, che proprio adesso che hai scoperto chi era tuo padre, volevi iniziare a consocerlo, avere una vita con lui ecc. ecc. 
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

export default MicheleRavaglia;