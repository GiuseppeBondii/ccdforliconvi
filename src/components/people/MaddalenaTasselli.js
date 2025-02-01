import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MaddalenaTasselli() {
    const navigate = useNavigate();
    const username = "MaddalenaTasselli";
    const [savedUser, setSavedUser] = useState("");
    const [level, setLevel] = useState(0);

    const QestAns = [
        { Question: "saluta e presentati con un pò di persone. Ad una certa verrà da te una persona che sarà lieta di conoscerti. Ti farà varie domande e vorrà approfondire la tua storia. Chi è?", Answer: "Lucia Gabrielli" },
        { Question: "Conclusa la conversazione si recherà da te il manutentore per conoscerti. Scoprirai che ha un vizio particolare. A seguito della scoperta sei un po’ indispettita perchè secondo te non si trattano così gli animali e raccontagli dell’animale che ti è stato regalato. Su quale animale scommette (singolare)?", Answer: "Cavallo" }, 
        { Question: "sali in camera dicendo che ti sei dimenticata qualcosa. Troverai incustodita una lettera sulla scrivania. Leggila molto attentamente e decidi di metterla in tasca. Il contenuto (non il destinatario) a chi fa riferimento? ", Answer: "Michele Ravaglia" }, 
        { Question: "Sei scioccata, e dopo aver preso la lettera ed essertela messa in tasca, torni di sotto dagli altri commensali. NON DIRE NIENTE A NESSUNO DI CIO’ CHE HAI SCOPERTO. Continua la tua serata in modo non sospettoso, fino a quando non comparirà un codice preceduto da #, qual è? ", Answer: "7458" }
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
                Non essere la prima a parlare. Aspetta che il momento sia propizio e leggi a voce alta il contenuto della lettera. Discutetene insieme e cercate la verità.
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

export default MaddalenaTasselli;