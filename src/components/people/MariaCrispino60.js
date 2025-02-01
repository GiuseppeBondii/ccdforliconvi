import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MariaCrispino60() {
    const navigate = useNavigate();
    const username = "MariaCrispino60";
    const [savedUser, setSavedUser] = useState("");
    const [level, setLevel] = useState(0);

    const QestAns = [
        { Question: "riunisciti con il tuo uomo ed entra nel personaggio. Appena puoi vai a parlare con la MADDI ALBERTI. Ti racconterà di lei. Da cosa trae ispirazione per i suoi dipinti (singolare)?", Answer: "Paesaggio" },
        { Question: "Finita la conversazione cerca e vai a parlare con Mattia. Continua la conversazione fino a quando qualcuno irromperà e ti chiederà espressamente di andartene. Qualcuno è arrivato e ha interrotto la vostra conversazione. Chi è?", Answer: "Matteo Mari" },
        { Question: "scossa da quello che hai sentito (ricordatelo bene) te ne vai e prosegui la serata senza dire a nessuno ciò che hai scoperto (neanche a BUX). Ad un certo punto comparirà un codice preceduto da #, qual è?", Answer: "7458" },
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
                Porta alla luce ciò che hai sentito durante la conversazione tra Mattia e Matteo. Sarà davvero stato lui? Vuoi andare a fondo della questione e scoprire la verità.
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

export default MariaCrispino60;