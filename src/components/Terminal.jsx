import { useEffect, useRef, useState } from 'react';

// SystemStats component without progress bars
function SystemStats() {
  const [systemStats, setSystemStats] = useState({ security: 0, encryption: 0, firewall: 0, innovation: 0 });
  const animationRef = useRef(null);

  useEffect(() => {
    function updateSystemStats() {
      setSystemStats(prev => {
        const newStats = {
          security: Math.min(prev.security + Math.random() * 5, 100),
          encryption: Math.min(prev.encryption + Math.random() * 3, 100),
          firewall: Math.min(prev.firewall + Math.random() * 8, 100),
          innovation: Math.min(prev.innovation + Math.random() * 6, 100),
        };

        // Continue animation if any stat is below 100
        if (Object.values(newStats).some(val => val < 100)) {
          animationRef.current = requestAnimationFrame(updateSystemStats);
        }

        return newStats;
      });
    }

    const timeout = setTimeout(updateSystemStats, 100);

    return () => {
      clearTimeout(timeout);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="absolute top-4 right-4 bg-black/80 border border-[#58a6ff]/30 rounded p-3 text-xs z-10">
      <div className="text-[#58a6ff] mb-2 font-bold">SYSTEM MONITOR</div>
      <div className="space-y-1">
        <div>SECURITY: <span className="text-[#58a6ff]">{systemStats.security.toFixed(1)}%</span></div>
        <div>ENCRYPTION: <span className="text-[#58a6ff]">{systemStats.encryption.toFixed(1)}%</span></div>
        <div>FIREWALL: <span className="text-[#58a6ff]">{systemStats.firewall.toFixed(1)}%</span></div>
        <div>INNOVATION: <span className="text-[#58a6ff]">{systemStats.innovation.toFixed(1)}%</span></div>
      </div>
    </div>
  );
}

// Updated steps with $ symbol for all
const steps = [
  { text: '$ nexora-creations --init-portfolio', color: 'info', isCommand: true },
  { text: '$ Loading creative assets and 3D models...', color: 'info', isCommand: true, showLoader: true },
  { text: '$ Compiling interactive experiences...', color: 'info', isCommand: true, glitch: true },
  { text: '$ Optimizing portfolio performance...', color: 'info', isCommand: true },
  { text: '$ Portfolio launched successfully!', color: 'success', isCommand: true, celebration: true },
];

function Terminal({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [completedSteps, setCompletedSteps] = useState([]);
  const [showCursor, setShowCursor] = useState(true);
  const [glitchActive, setGlitchActive] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [loaderDots, setLoaderDots] = useState('');
  const [terminalHeight, setTerminalHeight] = useState(200); // Increased initial height
  const matrixCanvasRef = useRef(null);
  const terminalRef = useRef(null);
  const typingTimeoutRef = useRef(null);

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

    return () => {
      console.log('Terminal unmounting, cleaning up');
      clearInterval(matrixInterval);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  // Cursor blinking
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  // Loader dots animation
  useEffect(() => {
    let loaderInterval;
    if (showLoader) {
      loaderInterval = setInterval(() => {
        setLoaderDots(prev => prev.length >= 3 ? '' : prev + '.');
      }, 300);
    } else {
      setLoaderDots('');
    }

    return () => {
      if (loaderInterval) clearInterval(loaderInterval);
    };
  }, [showLoader]);

  // Typing sequence
  useEffect(() => {
    if (currentStep >= steps.length) {
      setTimeout(() => {
        console.log('Terminal sequence done, calling onComplete');
        if (onComplete) onComplete();
      }, 1500);
      return;
    }

    const step = steps[currentStep];
    let charIndex = 0;
    setCurrentText('');
    setIsTyping(true);

    function typeNextChar() {
      if (charIndex < step.text.length) {
        setCurrentText(step.text.substring(0, charIndex + 1));
        charIndex++;
        const delay = Math.random() * 20 + 10;
        typingTimeoutRef.current = setTimeout(typeNextChar, delay);
      } else {
        setIsTyping(false);
        if (step.glitch) {
          setGlitchActive(true);
          setTimeout(() => setGlitchActive(false), 300);
        }

        if (step.showLoader) {
          setShowLoader(true);
          setTimeout(() => {
            setShowLoader(false);
            moveToNext();
          }, 2000);
        } else {
          setTimeout(moveToNext, step.glitch ? 500 : 300);
        }
      }
    }

    function moveToNext() {
      setCompletedSteps(prev => [...prev, { ...step, id: currentStep }]);
      setCurrentText('');
      setCurrentStep(prev => prev + 1);
      setTerminalHeight(prev => prev + 45);
    }

    typingTimeoutRef.current = setTimeout(typeNextChar, 200);

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [currentStep, onComplete]);

  return (
    <div className="min-h-screen bg-black text-[#58a6ff] font-mono relative overflow-hidden">
      <canvas ref={matrixCanvasRef} className="absolute inset-0 opacity-10" />
      <SystemStats />
      <div className="flex items-center justify-center min-h-screen p-4 relative z-10">
        <div 
          className="bg-black/90 rounded-lg border-2 border-[#58a6ff]/50 shadow-2xl w-full max-w-3xl relative"
          ref={terminalRef}
          style={{ 
            height: `${terminalHeight}px`,
            transition: 'height 0.3s ease-in-out'
          }}
        >
          {glitchActive && (
            <div className="absolute inset-0 bg-red-500/10 animate-pulse rounded-lg"></div>
          )}
          <div className="bg-gradient-to-r from-gray-900 to-black px-6 py-4 rounded-t-lg flex items-center border-b border-[#58a6ff]/30">
            <div className="flex space-x-3">
              <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
              <div className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse"></div>
              <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div className="flex-1 text-center text-[#58a6ff] font-bold">
              NEXORA CREATIONS • SECURITY COMPILER v2025
            </div>
            <div className="text-[#58a6ff] text-sm">
              {currentStep >= steps.length ? '🚀 READY' : '⚡ INITIALIZING'}
            </div>
          </div>
          <div className="p-6 text-base">
            <div className="text-gray-400 mb-6 text-sm">
              Nexora Creations Cybersecurity Environment
            </div>
            {completedSteps.map(step => (
              <div key={step.id} className={`mb-4 ${step.color}`}>
                <div className={`font-semibold flex items-center ${step.celebration ? 'animate-bounce' : ''}`}>
                  <span className="text-gray-500 mr-2">$</span>
                  {step.text}
                  {step.celebration && <span className="ml-2 text-green-300">✓</span>}
                </div>
              </div>
            ))}
            {currentStep < steps.length && (
              <div className={`mb-4 ${steps[currentStep].color}`}>
                <div className="font-semibold flex items-center">
                  <span className="text-gray-500 mr-2">$</span>
                  {currentText}
                  {showLoader && <span className="loader-dots">{loaderDots}</span>}
                  <span 
                    className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity text-lg`}
                    style={{ color: isTyping ? '#58a6ff' : 'currentColor' }}
                  >
                    ▎
                  </span>
                </div>
              </div>
            )}
            {currentStep >= steps.length && (
              <div className="flex items-center mt-8">
                <span className="text-gray-500 mr-2">$</span>
                <span className={`text-[#58a6ff] ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
                  ▎
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Terminal;