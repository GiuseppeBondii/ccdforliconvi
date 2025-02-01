import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function StefanoRomoli() {
    const navigate = useNavigate();
    const username = "StefanoRomoli";
    const [savedUser, setSavedUser] = useState("");
    const [level, setLevel] = useState(0);

    const QestAns = [
        { Question: "parla con un pò di commensali, racconta chi sei e fai due gag. Ad un certo punto Matte ti presenterà una persona. Una volta andavo via Matte, raccontagli tutta la verità, cioè dicendo che ancora non ti è andata giù la questione del licenziamento, provi odio ecc. A chi la stai raccontando? ", Answer: "Andrea Scardovi" },
        { Question: "Successivamente verrà da te una persona mandata da un’altra persona. In pratica piaci a qualcuno ma questa si vergogna di dirtelo e quindi ha mandato una sua amica. Digli che non ti interessa e dopo un pò liquidala dicendo che devi andare al bagno. A chi piaci?", Answer: "Laura Zavatti" },
        { Question: "Uscito dal bagno, cerca qualcuno con cui confidare che sei un piacione e un figo. Troverai Bux e ti confiderai con lui. Racconta a chi piaci e fateci due gag sopra. Continuerai soddisfatto la tua serata fino a quando non comparirà un codice preceduto da #, qual è? ", Answer: "7458" }    ];

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
                Cerca di capire chi è stato. Se vieni accusato discolpati.
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

export default StefanoRomoli;