import React from "react";
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import Home from './components/Home';
import AgneseChierici from './components/people/AgneseChierici';
import AlbertoCortesi from './components/people/AlbertoCortesi';
import AliceBazzocchi from './components/people/AliceBazzocchi';
import AndreaScardovi from "./components/people/AndreaScardovi";
import CostanzaFrancioso from "./components/people/CostanzaFrancioso";
import EmanueleRocchio from './components/people/EmanueleRocchio';
import GiacomoBucchi from './components/people/GiacomoBucchi';
import LauraZavatti from './components/people/LauraZavatti';
import LetiziaRamacciotti from './components/people/LetiziaRamacciotti';
import LorenzoCasadei from './components/people/LorenzoCasadei';
import LucaRighi from './components/people/LucaRighi';
import LuciaGabrielli from './components/people/LuciaGabrielli';
import MaddalenaAlberti from './components/people/MaddalenaAlberti';
import MaddalenaTasselli from './components/people/MaddalenaTasselli';
import MariaCrispino60 from './components/people/MariaCrispino60';
import MattiaGusmini from './components/people/MattiaGusmini';
import MicheleRavaglia from './components/people/MicheleRavaglia';
import RiccardoMari45 from './components/people/RiccardoMari45';
import SamueleSimoncelli from './components/people/SamueleSimoncelli';
import SilviaCorsellini from './components/people/SilviaCorsellini';
import SofiaSharif44 from './components/people/SofiaSharif44';
import StefanoRomoli from './components/people/StefanoRomoli';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AgneseChierici" element={<AgneseChierici />} />
          <Route path="/AlbertoCortesi" element={<AlbertoCortesi />} />
          <Route path="/AliceBazzocchi" element={<AliceBazzocchi />} />
          <Route path="/AndreaScardovi" element={<AndreaScardovi />} />
          <Route path="/CostanzaFrancioso" element={<CostanzaFrancioso />} />
          <Route path="/EmanueleRocchio" element={<EmanueleRocchio />} />
          <Route path="/GiacomoBucchi" element={<GiacomoBucchi />} />
          <Route path="/LauraZavatti" element={<LauraZavatti />} />
          <Route path="/LetiziaRamacciotti" element={<LetiziaRamacciotti />} />
          <Route path="/LorenzoCasadei" element={<LorenzoCasadei />} />
          <Route path="/LucaRighi" element={<LucaRighi />} />
          <Route path="/LuciaGabrielli" element={<LuciaGabrielli />} />
          <Route path="/MaddalenaAlberti" element={<MaddalenaAlberti />} />
          <Route path="/MaddalenaTasselli" element={<MaddalenaTasselli />} />
          <Route path="/MariaCrispino60" element={<MariaCrispino60 />} />
          <Route path="/MattiaGusmini" element={<MattiaGusmini />} />
          <Route path="/MicheleRavaglia" element={<MicheleRavaglia />} />
          <Route path="/RiccardoMari45" element={<RiccardoMari45 />} />
          <Route path="/SamueleSimoncelli" element={<SamueleSimoncelli />} />
          <Route path="/SilviaCorsellini" element={<SilviaCorsellini />} />
          <Route path="/SofiaSharif44" element={<SofiaSharif44 />} />
          <Route path="/StefanoRomoli" element={<StefanoRomoli />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
