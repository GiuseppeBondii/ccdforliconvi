import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AlbertoCortesi() {
    const navigate = useNavigate();
    const username = "AlbertoCortesi";
    const [savedUser, setSavedUser] = useState("");
    const [level, setLevel] = useState(0);

    const QestAns = [
        { Question: "parla con i commensali e scopri un pò di più sui presenti. Ad un certo punto si recherà da te SAMU. Ti parlerà di una conversazione avvenuta poco prima con una persona. Chi?", Answer: "Emanuele Rocchio" },
        { Question: "la conversazione ti lascia un pò di stucco, ma decidi di tenertela per te inizialmente. Ad un certo punto si recherà da te LUCA e ti racconterà di una conversazione avvenuta con una persona. Tu gli racconterai ciò che ti ha detto Samu. Chi coinvolge il suo racconto ? ", Answer: "Sofia Sharif" }, 
        { Question: "continui la tua serata tranquillamente, chiacchierando e scherzando con gli altri commensali fino a quando non comparirà un codice preceduto da #, qual è? ", Answer: "7458" } 
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
                Sei venuto a conoscenza di alcuni episodi. Decidi di mantenere una linea di indagine ordinata e democratica. Se si presenta l’occasione puoi rafforzare le tesi esposte raccontando delle tue conversazioni.
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

export default AlbertoCortesi;