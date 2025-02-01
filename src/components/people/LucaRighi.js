import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LucaRighi() {
    const navigate = useNavigate();
    const username = "LucaRighi";
    const [savedUser, setSavedUser] = useState("");
    const [level, setLevel] = useState(0);

    const QestAns = [
        { Question: "Riunisciti con tua moglie e condividete le vostre descrizioni,  in modo tale da essere più uniti con tutti. Nel frattempo ti presenti e parli con un pò di persone. Ad una certa vai a cercare il manutentore e gli fai domande sul meteo. Lui ti dá un dato: tra quanti minuti dovrebbe nevicare?", Answer: "20" },
        { Question: "dopo essere stato tranquillizzato, verrà da te dopo un po una ragazza che si lamenterà per questioni d’amore. Preso dal momento, le racconti di come vi siete conosciuti te e la Leti e di tutta la vostra storia. Prima di concludere la conversazione le ricordi di quella volta che l’ha vista protagonista di un tweet. Chi è questa ragazza?", Answer: "Sofia Sharif" },
        { Question: "Ora hai capito come sono andate realmente le cose. Successivamente cerca ALBI e ora avendo la situazione chiara decidi di esporgliela. Anche lui ti parlerà di una conversazione che gli ha raccontato chi ?", Answer: "Samuele Simoncelli" }, 
        { Question: "sei venuto a conoscenza di parecchie storie e prosegui tranquillamente la serata fino a quando in un modo o nell’altro comparirà un codice numerico preceduto da #, Qual’è il codice?", Answer: "7458" }
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
                Se ti si presenta l’occasione, racconta ciò che sai, rafforza l’accusa. Appoggia una linea di indagine ordinata e democratica.
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

export default LucaRighi;