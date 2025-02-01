import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RiccardoMari45() {
    const navigate = useNavigate();
    const username = "RiccardoMari45";
    const [savedUser, setSavedUser] = useState("");
    const [level, setLevel] = useState(0);

    const QestAns = [
        { Question: "Entri con Tommaso Domeniconi, dopo qualche presentazione, gli dici di volerci provare con la Sofia Comerci. Anche Tommaso ti indicherà una ragazza con cui ci vorrebbe provare, chi?", Answer: "Sofia Comerci" },
        { Question: "tommaso ti da il via libera quindi vai a parlarci, fai il gentile ma dovrai porgerle un bicchiere di vino per avere la sua attenzione. Insisti.Parlerete fino a quando non ti dira di dover andare in una stanza della casa e se ne andrà, Dove?", Answer: "Bagno" },
        { Question: "Sofia è andata in bagno e te rimani come un pollo a berti il tuo vino. A una certa una ragazza verrà a parlarti portandoti un bicchiere di birra, Chi?", Answer: "Chiara Cova" },
        { Question: "Ti accontenti e intrattieni la conversazione. La serata proseguirà tranquillamente fino a quando in un modo o nell’altro comparirà un codice numerico preceduto da ##, Qual’è il codice?", Answer: "2421" }
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
            return <h2>Prova a capire cosa stia succedendo. Appoggia una linea di indagine ordinata e democratica.
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
                <h2>{QestAns[level].Question}</h2>
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

export default RiccardoMari45;