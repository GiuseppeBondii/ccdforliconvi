import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LuciaGabrielli() {
    const navigate = useNavigate();
    const username = "LuciaGabrielli";
    const [savedUser, setSavedUser] = useState("");
    const [level, setLevel] = useState(0);

    const QestAns = [
        { Question: "relazionati con Matte e interagisci con un pò di persone accogliendole nella casa. Ad una certa vai a salutare la zia americana di Matte. Dille che era da tanto tempo che non vedevi l’ora di conoscerla e sei molto lieta. Parlate un pò e scopri di più su di lei. Tirala un pò lunga. Da quanti anni vive in america?", Answer: "15" },
        { Question: "Mentre MATTE è lontano, con discrezione, gli prendi il telefono e inizi a leggere i messaggi. Assicurati di essere da sola e che nessuno possa leggere i messaggi con te. Fai una scoperta agghiacciante. Chi è questa persona? ", Answer: "Alice Bazzocchi" },
        { Question: "sei sconvolta della scoperta e vorresti piangere, ma ti trattieni. Arriverà la Silvia e ti porgerà una domanda. Ascoltala con la testa mogia e mandala via simlando il pianto (se riesci) dicendole che non è il momento giusto. Accentua il fatto che sei sconvolta ma NON RACCONTARLE NIENTE. Ad un certo punto comparirà un codice preceduto da #, Qual’ è il codice? ", Answer: "7458" }
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
                cerca di capire chi è stato. Porta alla luce quello che sai e se vieni accusata discolpati.
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

export default LuciaGabrielli;