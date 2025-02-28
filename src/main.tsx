import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import { GameProvider } from './context/game-context/index.tsx';

createRoot(document.getElementById('root')!).render(
    <GameProvider>
        <App />
    </GameProvider>,
);
