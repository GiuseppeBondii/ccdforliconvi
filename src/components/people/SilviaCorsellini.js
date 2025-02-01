import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SilviaCorsellini() {
    const navigate = useNavigate();
    const username = "SilviaCorsellini";
    const [savedUser, setSavedUser] = useState("");
    const [level, setLevel] = useState(0);

    const QestAns = [
        { Question: "appena salutate un pò di persone intravedi da lontano un ragazzo che ti piace. Recati dalla SOFIA e dopo qualche presentazione gli dici di volerci provare con ANDREA SCARDOVI nonostante lui sia ben accompagnato da ALICE. Anche SOFIA ti indicherà un ragazzo con cui ci vorrebbe provare, chi?", Answer: "Andrea Scardovi" },
        { Question: "Accetti la situa e gli dai il via libera perche hai notato anche un altro ragazzo che vorresti conoscere meglio. E’ il figlio dell’alice, Michele, è più piccolo di te, ma nonostante ciò è molto attraente. Portagli un bicchiere di vino per avere la sua attenzione. Insisti. Parlerete fino a quando non ti dirà di dover andare in una stanza della casa e se ne andrà, Dove? ", Answer: "Camera" },
        { Question: "Miki è andato in camera e te rimani come un pollo a berti il tuo vino. A quel punto decidi di andare dalla tua amica LUCI GAB per chiederle come sta e fare due chiacchiere. Succederà qualcosa di insolito. Nonostante ciò, assecondi la sua richiesta senza farti troppe domande. Un pò sconvolta raggiungi l’Agne e SENZA DIRLE NIENTE DI CIO’ CHE HAI VISTO dille che hai sete e vuoi un po’ d’acqua. Successivamente ti proporrà di andare in un posto, ma te declini l’offerta dicendo che vuoi stare un po’ da sola. Dove voleva andare? ", Answer: "Giardino" },
        { Question: "sei un pò confusa per quello che è successo e durante il proseguire della cena salterà fuori un codice preceduto da #, qual è?", Answer: "7458" },

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
                Porta alla luce ciò che sai su le figure sulle quali sospetti maggiormente. Chiedi anche spiegazioni della scena che hai avuto con LUCIA GABRIELLI. Sarà davvero stata lei? Vuoi andare a fondo della questione e scoprire la verità. Se vieni accusata, discolpati.
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

export default SilviaCorsellini;