import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SofiaSharif() {
    const navigate = useNavigate();
    const username = "SofiaSharif";
    const [savedUser, setSavedUser] = useState("");
    const [level, setLevel] = useState(0);

    const QestAns = [
        { Question: "Dopo esserti presentato con chi vuoi, vai a cercare la Luci Gab e gli dici che vuoi provarci con ANDREA SCARDOVI. Anche lei ti indicherà un ragazzo con cui ha intenzione di provarci, chi?", Answer: "Andrea Scardovi" },
        { Question: "la SILVIA ti da il via libera quindi vai a parlarci. Portagli un bicchiere di vino per avere la sua attenzione. Insisti. Parlerete fino a quando non ti dira di dover andare in una stanza della casa e se ne andrà, Dove?", Answer: "Bagno"},
        { Question: "Scarcio è andato in bagno e te rimani come un pollo a berti il tuo vino. Delusa di come sono andate le cose decidi di raccontare la tua vicenda a LUCA. Lui ti parlerà delle sue questioni d’amore. Ti chiederà di spiegare un episodio che ti ha vista coinvolta. Raccontagli la verità nei dettagli. La vicenda coinvolge te e un’altra persona. Chi?", Answer: "Silvia Corsellini"},
        { Question: "Ti piace la conversazione e ti intrattieni. La serata poi proseguirà tranquillamente fino a quando in un modo o nell’altro comparirà un codice numerico preceduto da #, Qual’è il codice?", Answer: "7458"}
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
            return <h2 className="question">Porta alla luce ciò che sapevi fin dall’inizio. Sarà davvero stata lei? Vuoi andare a fondo della questione e scoprire la verità.
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

export default SofiaSharif;