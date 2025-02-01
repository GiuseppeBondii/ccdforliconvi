import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MaddalenaAlberti() {
    const navigate = useNavigate();
    const username = "MaddalenaAlberti";
    const [savedUser, setSavedUser] = useState("");
    const [level, setLevel] = useState(0);

    const QestAns = [
        { Question: "Per prima cosa racconta a Ema tutta la tua descrizione.  Inizia a conoscere i vari personaggi. Sei curiosa e cerca di conoscere quante più persone. Verrà a parlarti una donna e ti racconterà di come ha conosciuto il suo uomo. In che luogo l’ha conquistata? ", Answer: "Spiaggia" },
        { Question: "Ad un certo punto cerca il medico perchè pensi di sapere chi è. Fai in modo di avere un conversazione privata con lei, senza altre persone. Infatti qualche anno prima è stata accusata di poca professionalità perchè ha somministrato una dose troppo elevata ad un suo paziente, rischiando di farlo morire. Per questo è andata anche sul giornale e tu l’hai visto. Tira fuori questo episodio durante il discorso. Lei per mandarti via ti dirà che sta andando da qualche parte. Dove?", Answer: "Giardino" },
        { Question: "l suo comportamento non ti piace troppo, ma per ora lasci correre. Passerai una serata tranquilla. Ad un certo punto comparirà un codice numerico preceduto da #, qual è?", Answer: "7458" }    ];

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
                Porta alla luce le informazioni che hai raccolto durante i tuoi discorsi. Sarà davvero stata lei? Vuoi andare a fondo della questione e scoprire la verità.
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

export default MaddalenaAlberti;