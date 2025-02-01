import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LauraZavatti() {
    const navigate = useNavigate();
    const username = "LauraZavatti";
    const [savedUser, setSavedUser] = useState("");
    const Giornale=require('./img/image.png');
    const [level, setLevel] = useState(0);

    const QestAns = [
        { Question: "riunisciti con l’Agne per condividere le vostre descrizioni per essere uniti e coerenti se qualcuno vi domanda qualcosa. Appena finito raggiungi immediatamente il medico. Cominciate a parlare dei commensali e della serata e approndite le vostre figure. Nonostante tu lo conosca, in un tuo momento di svarione non ti ricordi da quanti anni lei è il medico personale di Matte. Subito dopo la sua risposta dici che devi andare al bagno. Da quanti anni è il medico di Matte?", Answer: "8" },
        { Question: "ad un certo punto si presenterà da te una persona dicendoti che sa del tuo segreto (cioè che pippi) ma non dirà niente a nessuno. Entri in confidenza con lei tanto è che le confessi che saresti interessata all’avvocato e chiedile cosa ne pensa. Chi sa del tuo segreto?", Answer: "Letizia Ramacciotti" },
        { Question: "Un pò titubante del fatto che qualcuno conosca il tuo segreto riprendi come se niente fosse a parlare con gli altri. Recati poi da Emanuele. Parlate e interessatevi l’un l’altro del vostro personaggio per conoscervi meglio. Quando ti sei stancata lascialo dicendo che vuoi andarti a prendere un bicchiere di vino. Quante medaglie ha vinto nella sua carriera?", Answer: "12" },
        { Question: "continui la tua serata tranquillamente facendo finta di niente e durante il proseguire della cena salterà fuori un codice preceduto da #, qual è? ", Answer: "7458" }
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
                Cerca di capire chi è stato. Se venite accusate, discolpatevi.
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

export default LauraZavatti;