import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CostanzaFrancioso() {
    const navigate = useNavigate();
    const username = "CostanzaFrancioso";
    const [savedUser, setSavedUser] = useState("");
    const [level, setLevel] = useState(0);

    const QestAns = [
        { Question: "riunisciti con tuo marito e accordatevi su cosa dire per essere uniti e coerenti se qualcuno vi domanda qualcosa. Successivamente presentati con i vari commensali e racconta del perchè sei lì e interessati agli altri. Ad un certo punto verrà da te uno dei due cuochi e inizierete a parlare. Approfondite meglio le vostre figure. Vedrai che è un po’ strana e si allontanerà dalla conversazione dicendo che deve andare in un posto. Dove? ", Answer: "Bagno" },
        { Question: "finita la conversazione, cerca altre persone con cui interagire fino a quando si presenterà da te un uomo misterioso. Ti racconterà di un fatto accaduto molto tempo prima e ti parla di soldi. Quanti? ", Answer: "100.000"},
        { Question: "Ad un certo punto verrà da te una persona che pensa già di conoscerti. Parlaci e dopo un pò, in maniera stizzita, liquida il discorso dicendo che vuoi andare a prendere una boccata d’aria fresca in giardino. Chi è?", Answer: "Maddalena Alberti"},
        { Question: "Seppur con qualche difficoltà, la serata procede tranquilla fino a quando non comparirà un codice preceduto da #, qual è?", Answer: "7458"}
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
                Se vieni accusata discolpati. Porta alla luce ciò che sai su Bux e il suo debito. Sarà davvero stato lui? Vuoi andare a fondo della questione e scoprire la verità.
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
                event.target.reset(); // Resetta il campo input
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

export default CostanzaFrancioso;