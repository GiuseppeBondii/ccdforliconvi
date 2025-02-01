import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LetiziaRamacciotti() {
    const navigate = useNavigate();
    const username = "LetiziaRamacciotti";
    const [savedUser, setSavedUser] = useState("");
    const [level, setLevel] = useState(0);

    const QestAns = [
        { Question: "Riunisciti con tuo marito e condividete le vostre descrizioni, in modo tale da essere più uniti con tutti. Successivamente cerca di interagire con un pò di persone. Aspetta che la Lalla sia da sola e decidi di andare a parlarci perchè sai il suo segreto (lei si fa di coca ma non lo dici a nessuno). Iniziate a parlare, entrate in confidenza, quando lei ti farà un nome di un ragazzo che gli piace. Chi è?", Answer: "Stefano Romoli" },
        { Question: "Dille che la vuoi aiutare e hai in mente qualcosa senza specificare il tuo piano. Dopo esserti allontanata da lei vai a parlare con Stefano chiedendogli, cosa pensa della Lalla. Insisti e prova a combinare qualcosa. Parlerete fino a quando non ti dira di dover andare in una stanza della casa e se ne andrà, Dove?", Answer: "Bagno" },
        { Question: "vai per cercare MIKI, probabilmente starà litigando con una persona. A quel punto decidi di rinunciare alla conversazione. Chi è?", Answer: "Alice Bazzocchi" },
        { Question: "ricordati bene della scena, ma non parlarne con nessuno. Ad un certo punto comparirà un codice preceduto da #, Qual’ è ", Answer: "7458" }
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
                Porta alla luce ciò che hai visto, se si presenta l’occasione. Cerca di capire chi è stato.
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

export default LetiziaRamacciotti;