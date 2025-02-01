import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GiacomoBucchi() {
    const navigate = useNavigate();
    const username = "GiacomoBucchi";
    const [savedUser, setSavedUser] = useState("");
    const [level, setLevel] = useState(0);

    const QestAns = [
        { Question: "riunisciti con la tua donna ed entra nel personaggio. Ad un certo punto Matte ti presenterà un personaggio. Tra i vari spettegolezzi ti parlerà di una persona con la quale ha un rapporto stupendo e che non lascerebbe mai al mondo. Chi è? ", Answer: "Lucia Gabrielli" },
        { Question: "Dopo cerca il medico e dopo esserci entrato un pò in confidenza, confidale in segreto del tuo debito e a quanto ammonta la cifra esatta. Successivamente verrà da te l’avvocato. Ti dirà che c’è una ragazza interessata a lui. Come si chiama?", Answer: "Laura Zavatti" },
        { Question: "Dopo aver sparato due stronzate torni a fare due gag con gli altri commensali e ti riunisci con la tua donna. Parlerai con lei della storia che Ste ti ha appena raccontato e farete due gag. Continuerai soddisfatto la tua serata fino a quando non comparirà un codice preceduto da #, qual è?", Answer: "7458" }    ];

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
                cerca di capire chi è stato. Porta alla luce quello che sai accusando i cuochi. Ascolta la loro risposta. Saranno stati loro?

Se non ti soddisfa la discolpa accentua aprendo l’ipotesi del complotto. Loro stanchi, sottopagati ecc. hanno architettato tutto inscenando la morte per malattia rubando il salvavita. In realtà l’hanno avvelenato mettendo delle noci. 

se vieni accusato discolpati.
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

export default GiacomoBucchi;