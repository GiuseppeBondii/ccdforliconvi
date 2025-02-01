import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MattiaGusmini() {
    const navigate = useNavigate();
    const username = "MattiaGusmini";
    const [savedUser, setSavedUser] = useState("");
    const [level, setLevel] = useState(0);

    const QestAns = [
        { Question: "inizia a parlare con un pò di persone e cerca di capire chi sono i presenti alla cena. Verrà da te una persona in particolare e ti dirà che ha la soluzione ai tuoi problemi. Declina l’offerta dicendo che devi andare a parlare con il manutentore. Chi è?", Answer: "Alice Bazzocchi" },
        { Question: "La tua era solo una scusa e non ci andrai a parlare (o si se vuoi). Ad un certo punto verrà da te una persona e inizierete a parlare. Dopo un pò la conversazione sarà interrotta da qualcuno prepotentemente. Chi è?", Answer: "Matteo Mari" },
        { Question: "sei sconvolto che lui abbia scoperto il fatto. Sei scioccato, ma volevi solo aiutarlo. Non parli con nessuno del fatto e cerchi di fare il disinvolto davanti agli altri. Riprendi a parlare con altre persone fino a quando non comparirà un codice preceduto da #, qual è?", Answer: "7458" }
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
            return <h2>All inizio come prima cosa devi parlare con tony come da storia. Di seguito l’obbiettivo di tony: Ti presenti un po con tutti, quando ti imbatti in Mattia Pressiani, insisti di andare a parlare con lui in privato e andate. Restate a parlare qualche minuto. Qualcuno verrà da voi a fare domande sul vostro passato. Chi? (Giuseppe Bondi)

Se vieni accusato, discolpati.
Vai in cerca della verità.
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
            <h1>Benvenuto, {savedUser}!</h1>
            <QestAndReply />
        </div>
    );
}

export default MattiaGusmini;