import React, { useEffect } from 'react';

const HomePage = () => {
  useEffect(() => {
    console.log('HomePage mounted, initializing Vanta.js');
    const vantaEffect = VANTA.NET({
      el: '#homeContainer',
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0x58a6ff,
      backgroundColor: 0x0d1117,
      maxDistance: 21.0,
      spacing: 20.0,
    });

    return () => {
      console.log('HomePage unmounting, cleaning up Vanta.js');
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Top Navigation Bar */}
      <nav className="bg-gray-100 text-gray-700 p-4 shadow-sm">
        <ul className="flex justify-center space-x-8">
          <li>
            <a href="#home" className="hover:text-blue-600 transition-colors duration-300">Home</a>
          </li>
          <li>
            <a href="#team" className="hover:text-blue-600 transition-colors duration-300">Team</a>
          </li>
          <li>
            <a href="#services" className="hover:text-blue-600 transition-colors duration-300">Services</a>
          </li>
          <li>
            <a href="#portfolio" className="hover:text-blue-600 transition-colors duration-300">Portfolio</a>
          </li>
          <li>
            <a href="#contact" className="hover:text-blue-600 transition-colors duration-300">Contact</a>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div id="homeContainer" className="home-container pt-16">
        <div className="home-header text-center">
          <h1 className="home-title glitch text-4xl">NEXORA CREATIONS</h1>
          <p className="home-subtitle text-lg mt-2">Cybersecurity & Digital Innovation</p>
        </div>
        <div className="home-content text-center mt-8">
          <p>Welcome to the digital realm where security meets innovation.</p>
          <p>Portfolio loading complete. Ready for exploration.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;