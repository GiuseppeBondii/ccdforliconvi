import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AliceBazzocchi() {
    const navigate = useNavigate();
    const username = "AliceBazzocchi";
    const [savedUser, setSavedUser] = useState("");
    const [level, setLevel] = useState(0);

    const QestAns = [
        { Question: "riunisciti con il tuo “compagno” e capite come presentarvi VELOCEMENTE. Ti raggiungerà poi anche tuo figlio, e ti confronterai anche con lui. Fai molta ATTENZIONE che lui non scopra della vera identità di Scarcio. Successivamente, DA SOLA, cerca e trova l’amministratore delegato dell’azienda di Matte. Dopo esserti presentata e fatto due gag, digli che lo vedi un pò sulle sue che conosci il rimedio giusto per lui. Se vuole la prima consulenza da te gliela fai gratuita. Ti dirà però che deve andare a parlare con una persona. Chi?", Answer: "Lorenzo Casadei" },
        { Question: "verrà da te una persona. Ti racconterà una cosa appena successa con una ragazza e tu gli racconterai di un episodio (inventa) che coinvolgeva la stessa persona, successo qualche settimana prima con Mattia. Chi è questa persona?", Answer: "Andrea Scardovi" },
        { Question: "verrà da te tuo figlio e infuriato ti chiederà qualcosa. Rispondigli dicendo tutta la verità. Finita la spiegazione chiedigli di lasciarti un attimo da sola e vai a bere qualcosa. Ad un certo punto comparirà un codice preceduto da #, Qual’ è il codice?", Answer: "7458" },
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
                Cerca di capire chi è stato. Se vieni accusata discolpati.
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

export default AliceBazzocchi;