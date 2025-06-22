import { useEffect, useRef, useState } from 'react';
import SystemStats from './SystemStats';

const steps = [
  { text: 'init nexora-creations-portfolio', color: 'info', isCommand: true },
  { text: 'Deploying cybersecurity protocols', color: 'info', isCommand: true },
  { text: 'Optimizing encryption algorithms', color: 'info', isCommand: true, glitch: true },
  { text: 'Initializing firewall systems', color: 'info', isCommand: true },
  { text: 'launch portfolio', color: 'info', isCommand: true, celebration: true },
];

function Terminal({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [completedSteps, setCompletedSteps] = useState([]);
  const [showCursor, setShowCursor] = useState(true);
  const [glitchActive, setGlitchActive] = useState(false);
  const matrixCanvasRef = useRef(null);
  const terminalCanvasRef = useRef(null);
  const terminalRef = useRef(null);
  const statusRef = useRef(null);

  useEffect(() => {
    console.log('Terminal mounted, starting animations');
    const matrixCanvas = matrixCanvasRef.current;
    const matrixCtx = matrixCanvas.getContext('2d');
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
    const chars = '01{}</>[]NEXORACREATIONSSECURITYENCRYPTION';
    const columns = matrixCanvas.width / 14;
    const drops = Array(Math.floor(columns)).fill(1);

    function drawMatrix() {
      matrixCtx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
      matrixCtx.fillStyle = '#58a6ff';
      matrixCtx.font = '14px Fira Code';
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        matrixCtx.fillText(text, i * 14, drops[i] * 14);
        if (drops[i] * 14 > matrixCanvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const matrixInterval = setInterval(drawMatrix, 50);

    const terminalCanvas = terminalCanvasRef.current;
    const terminalCtx = terminalCanvas.getContext('2d');
    const terminal = terminalRef.current;
    terminalCanvas.width = terminal.offsetWidth;
    terminalCanvas.height = terminal.offsetHeight;
    const terminalChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const fontSize = 12;
    const terminalColumns = terminalCanvas.width / fontSize;
    const terminalDrops = Array(Math.floor(terminalColumns)).fill(0);

    function drawTerminalRain() {
      terminalCtx.fillStyle = 'rgba(13, 17, 23, 0.1)';
      terminalCtx.fillRect(0, 0, terminalCanvas.width, terminalCanvas.height);
      terminalCtx.fillStyle = 'rgba(88, 166, 255, 0.2)';
      terminalCtx.font = `${fontSize}px Fira Code`;
      for (let i = 0; i < terminalDrops.length; i++) {
        const text = terminalChars[Math.floor(Math.random() * terminalChars.length)];
        terminalCtx.fillText(text, i * fontSize, terminalDrops[i] * fontSize);
        if (terminalDrops[i] * fontSize > terminalCanvas.height && Math.random() > 0.99) {
          terminalDrops[i] = 0;
        }
        terminalDrops[i]++;
      }
    }

    const terminalInterval = setInterval(drawTerminalRain, 100);

    function resizeTerminalCanvas() {
      terminalCanvas.width = terminal.offsetWidth;
      terminalCanvas.height = terminal.offsetHeight;
      terminalDrops.length = Math.floor(terminalCanvas.width / fontSize);
      for (let i = 0; i < terminalDrops.length; i++) {
        if (!terminalDrops[i]) terminalDrops[i] = 0;
      }
    }

    window.addEventListener('resize', resizeTerminalCanvas);

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    function typeTerminalText() {
      if (currentStep >= steps.length) {
        statusRef.current.textContent = '🚀 READY';
        statusRef.current.classList.add('success');
        setTimeout(() => {
          console.log('Terminal sequence done, calling onComplete');
          if (onComplete) onComplete();
        }, 1500);
        return;
      }

      const step = steps[currentStep];
      let charIndex = 0;
      setCurrentText('');

      function typeText() {
        if (charIndex < step.text.length) {
          setCurrentText(step.text.substring(0, charIndex + 1));
          charIndex++;
          setTimeout(typeText, Math.random() * 20 + 10);
        } else {
          if (step.glitch) {
            setGlitchActive(true);
            setTimeout(() => setGlitchActive(false), 300);
          }
          setCompletedSteps((prev) => [...prev, { ...step, id: currentStep }]);
          setCurrentText('');
          setCurrentStep((prev) => prev + 1);
          setTimeout(typeTerminalText, 300);
        }
      }

      setTimeout(typeText, 200);
    }

    setTimeout(typeTerminalText, 500);

    return () => {
      console.log('Terminal unmounting, cleaning up');
      clearInterval(matrixInterval);
      clearInterval(terminalInterval);
      clearInterval(cursorInterval);
      window.removeEventListener('resize', resizeTerminalCanvas);
    };
  }, [currentStep, onComplete]);

  return (
    <div className="terminal-container">
      <canvas className="matrix-bg" ref={matrixCanvasRef}></canvas>
      <SystemStats />
      <div className="terminal" ref={terminalRef}>
        <div className="terminal-header">
          <div className="terminal-buttons">
            <div className="terminal-button"></div>
            <div className="terminal-button"></div>
            <div className="terminal-button"></div>
          </div>
          <div className="flex-1 text-center">NEXORA CREATIONS • SECURITY COMPILER v2025</div>
          <div className="status-indicator" ref={statusRef}>⚡ INITIALIZING</div>
        </div>
        <div className="terminal-body">
          <canvas className="terminal-rain" ref={terminalCanvasRef}></canvas>
          <div className="scanline"></div>
          <div className="terminal-line info">Nexora Creations Cybersecurity Environment</div>
          {completedSteps.map((step) => (
            <div key={step.id} className={`terminal-line ${step.color}`}>
              <span className="prompt-char"></span>
              {step.text}
              {step.celebration && <span className="success">✓</span>}
            </div>
          ))}
          {currentStep < steps.length && (
            <div className={`terminal-line ${steps[currentStep].color}`}>
              <span className="prompt-char"></span>
              {currentText}
              <span className="cursor" style={{ opacity: showCursor ? 1 : 0 }}></span>
            </div>
          )}
          {currentStep >= steps.length && (
            <div className="terminal-line">
              <span className="prompt-char"></span>
              <span className="cursor" style={{ opacity: showCursor ? 1 : 0 }}></span>
            </div>
          )}
          {glitchActive && <div className="glitch-overlay"></div>}
        </div>
      </div>
    </div>
  );
}

export default Terminal;