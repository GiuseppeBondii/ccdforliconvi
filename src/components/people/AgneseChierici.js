import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AgneseChierici() {
    const navigate = useNavigate();
    const username = "AgneseChierici";
    const [savedUser, setSavedUser] = useState("");
    const [level, setLevel] = useState(0);

    const QestAns = [
        { Question: "riunisciti con la tua compare e accordatevi su cosa dire per essere uniti e coerenti se qualcuno vi domanda qualcosa. Ad un certo punto Matte ti presenterà una persona. Quando va via Matte spiega a questa persona della sua intolleranza e del fatto che te e la LALLA non lo sopportate per i vari motivi (parla sempre al plurale, te e la Lalla). Sottolinea che avete un rapporto stupendo con la moglie. Con chi stai interagendo?", Answer: "Giacomo Bucchi" },
        { Question: "continui ad interagire con un po’ di persone. Ad un certo punto arriverà una persona da te, un po’ scossa, quasi sconvolta. Chiedile cosa ha fatto, prova a capire cosa le sia successo. Ti dirà che ha bisogno di qualcosa e tu glielo porti. Le proponi anche di andare in giardino. Di cosa aveva bisogno questa persona? ", Answer: "Acqua" },
        { Question: "Rimani confusa per quello che è successo. Continui la serata tranquillamente, ma ad un certo punto si presenterà a te un ragazzo affascinante che ti porgerà un bicchiere di vino. TAAACCC avrai un colpo di fulmine. Durante il proseguire della cena salterà fuori un codice preceduto da #, qual è?", Answer: "7458" }    ];

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

export default AgneseChierici;