import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SamueleSimoncelli() {
    const navigate = useNavigate();
    const username = "SamueleSimoncelli";
    const [savedUser, setSavedUser] = useState("");
    const [level, setLevel] = useState(0);

    const QestAns = [
        { Question: "riunisciti con tua moglie e accordatevi su cosa dire per essere uniti e coerenti se qualcuno vi domanda qualcosa. Andrai da Emanuele. Inizialmente incute un pò di timore, ma poi conoscendolo è tranquillo. Gli racconti di quel caldo torrido che c’era al tuo matrimonio e della tua figuraccia. Dialogate un pò fino a quando lui ti racconterà di un episodio successo qualche mese prima ad una persona. Chi è la protagonista di questa vicenda?", Answer: "Maddalena Alberti" },
        { Question: "Questo episodio ti lascia un pò perplesso e lo tieni a mente. Sei talmente sconvolto che decidi di raccontarlo ad ALBI. Continua a conversare (anche con altri commensali) fino a quando verrà da te il manutentore. Parletete e farete due gag come vostro solito. Ti chiederà un parere sulla cena e successivamente ti dirà il suo. Digli però che ti è piaciuto particolarmente il vino. Cosa non gli è piaciuto a lui?", Answer: "Verdura" },
        { Question: "Terminata la divertente conversazione con il manutentore continui la tua serata tranquillamente fino a quando comparirà un codice preceduto da #, qual é?", Answer: "7458" }
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
                Ricordandoti del dialogo con Ema, porta alla luce ciò che ti ha raccontato. Sarà davvero stato lui? Vuoi andare a fondo della questione e scoprire la verità.
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

export default SamueleSimoncelli;