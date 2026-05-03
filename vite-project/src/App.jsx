import './App.css'
import Dashboard from './components/dashboard';
import ILOPage from './components/ILO';
import ILODetail from './components/info';
import TokenMinter from './components/token';
import LiquidityLocker from './components/locker';
import CreateILO from './components/NewILO';
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/launches" element={<ILOPage />} />
        <Route path="/info" element={<ILODetail />} />
        <Route path="/token-minter" element={<TokenMinter />} />
        <Route path="/locker" element={<LiquidityLocker />} />
        <Route path="/liquidity-locker" element={<div>Liquidity Locker Page (Coming Soon)</div>} />
        <Route path="/create" element={<CreateILO />} /> 
      </Routes>
    </BrowserRouter>
  );
}