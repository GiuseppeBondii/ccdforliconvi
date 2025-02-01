import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function EmanueleRocchio() {
    const navigate = useNavigate();
    const username = "EmanueleRocchio";
    const [savedUser, setSavedUser] = useState("");
    const [level, setLevel] = useState(0);

    const QestAns = [
        { Question: "La Maddi ti racconterà di lei, tu fai lo stesso. Ti racconterà di un episodio successo un pò di tempo fa, RICORDATELO. Inizia a conoscere i commensali e dialoga con loro. Verrà da te una persona in particolare che ti racconta del suo matrimonio e di un aneddoto divertente. Lo trovi interessante e inizi a conoscerlo meglio. Tra le altre cose gli chiedi se conosce Matteo personalmente, visto che sua moglie è sempre con lui. Dopo esserci entrato un pò in confidenza gli racconti dell’episodio successo alla Maddi qualche mese prima e che per questo eri furioso all’inizio, ma stai cercando di passarci sopra. Chi è questa persona ", Answer: "Samuele Simoncelli" },
        { Question: "Conclusa l’interessante chiacchierata con Samuele, riprendi a chiacchierare con gli altri commensali. Ad un certo punto verrà da te uno dei due cuochi. Parlate e conoscetevi meglio. Ad un certo punto si allontanerà dicendo che ha sete. Cosa dice di voler bere ?", Answer: "Vino" },
        { Question: "La serata proseguirà tranquillamente fino a quando in un modo o nell’altro comparirà un codice numerico preceduto da #, Qual’è il codice?", Answer: "7458" }
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
                Cerca di capire chi è stato. Se vieni accusato, discolpati.
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

export default EmanueleRocchio;