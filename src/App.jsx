import { useState, useEffect } from 'react';
import Terminal from './components/Terminal';
import LogoAnimation from './components/LogoAnimation';
import HomePage from './components/HomePage';

function App() {
  const [currentPage, setCurrentPage] = useState('terminal');

  const handleTerminalComplete = () => {
    console.log('Terminal completed, transitioning to LogoAnimation');
    setCurrentPage('logo');
  };

  const handleLogoComplete = () => {
    console.log('LogoAnimation completed, transitioning to HomePage');
    setCurrentPage('home');
  };

  useEffect(() => {
    console.log('Current page:', currentPage);
    // Fallback timer to prevent getting stuck
    const timeout = setTimeout(() => {
      if (currentPage === 'terminal') {
        console.warn('Terminal timeout, forcing transition to LogoAnimation');
        handleTerminalComplete();
      } else if (currentPage === 'logo') {
        console.warn('LogoAnimation timeout, forcing transition to HomePage');
        handleLogoComplete();
      }
    }, 15000); // 15s fallback
    return () => clearTimeout(timeout);
  }, [currentPage]);

  return (
    <div className="app-container">
      {currentPage === 'terminal' && (
        <div>
          <Terminal onComplete={handleTerminalComplete} />
          <p className="debug-text">Debug: Terminal is rendering</p>
        </div>
      )}
      {currentPage === 'logo' && (
        <div>
          <LogoAnimation onComplete={handleLogoComplete} />
          <p className="debug-text">Debug: LogoAnimation is rendering</p>
        </div>
      )}
      {currentPage === 'home' && (
        <div>
          <HomePage />
          <p className="debug-text">Debug: HomePage is rendering</p>
        </div>
      )}
    </div>
  );
}

export default App;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);