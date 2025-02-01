import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AndreaScardovi() {
    const navigate = useNavigate();
    const username = "AndreaScardovi";
    const [savedUser, setSavedUser] = useState("");
    const [level, setLevel] = useState(0);

    const QestAns = [
        { Question: "saluta l’ALICE e capisci un pò la strategia da adottare e mettetevi d’accordo su cosa raccontare agli altri presenti. Assicurati che non ci sia MIKI. Ad un certo punto verrà Matte Mari e ti presenterà una persona. Una volta andato via Matte, quello ti racconterà un fatto molto importante. Chi è?", Answer: "Stefano Romoli" },
        { Question: "si presenterà da te una ragazza. Ti farà delle avance, ma tu fedele all’accordo con ALICE continuerai a mentire dicendo che ti stai frequentando e bla bla bla...quando ti sei stancato per liquidarla dille che hai bisogno di andare al bagno. Chi era questa persona?", Answer: "Sofia Sharif" },
        { Question: "Racconta dell’approccio di Sofia ad Alice. Lei ti racconterà una storia “Divertente” successa tra Sofia e un ragazzo presente che non conoscevi. chi è questa persona? ", Answer: "Mattia Gusmini" },
        { Question: "la serata procede tranquilla fino a quando non comparirà un codice preceduto da #, qual è?", Answer: "7458" }    ];

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
                Porta alla luce ciò che hai scoperto, formulando un’accusa contro Ste.
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

export default AndreaScardovi;