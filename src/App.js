import './styles/App.scss';
import React from "react";
import MainApp from './components/MainApp';
import { SolanaWallets } from './components/SolanaWallets';
import Router from './routes';

function App() {
  return (
    <SolanaWallets>
      <MainApp>
        <Router />
      </MainApp>
    </SolanaWallets>
  );
}

export default App;
