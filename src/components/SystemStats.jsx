import { useEffect, useRef } from 'react';

function SystemStats() {
  const securityRef = useRef(null);
  const encryptionRef = useRef(null);
  const firewallRef = useRef(null);
  const innovationRef = useRef(null);

  useEffect(() => {
    let systemStats = { security: 0, encryption: 0, firewall: 0, innovation: 0 };

    function updateSystemStats() {
      systemStats = {
        security: Math.min(systemStats.security + Math.random() * 5, 100),
        encryption: Math.min(systemStats.encryption + Math.random() * 3, 100),
        firewall: Math.min(systemStats.firewall + Math.random() * 8, 100),
        innovation: Math.min(systemStats.innovation + Math.random() * 6, 100),
      };
      securityRef.current.style.width = `${systemStats.security}%`;
      encryptionRef.current.style.width = `${systemStats.encryption}%`;
      firewallRef.current.style.width = `${systemStats.firewall}%`;
      innovationRef.current.style.width = `${systemStats.innovation}%`;
      if (Object.values(systemStats).some((val) => val < 100)) {
        requestAnimationFrame(updateSystemStats);
      }
    }

    updateSystemStats();

    return () => {};
  }, []);

  return (
    <div className="system-stats">
      <div className="system-stats-title">SYSTEM MONITOR</div>
      <div className="stat-line">
        SECURITY: <span className="stat-bar"><span className="stat-fill" ref={securityRef}></span></span>
      </div>
      <div className="stat-line">
        ENCRYPTION: <span className="stat-bar"><span className="stat-fill" ref={encryptionRef}></span></span>
      </div>
      <div className="stat-line">
        FIREWALL: <span className="stat-bar"><span className="stat-fill" ref={firewallRef}></span></span>
      </div>
      <div className="stat-line">
        INNOVATION: <span className="stat-bar"><span className="stat-fill" ref={innovationRef}></span></span>
      </div>
    </div>
  );
}

export default SystemStats;