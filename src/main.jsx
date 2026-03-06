import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

function ZoomManager({ children }) {
  useEffect(() => {
    // Klavye Zoom Engelleme (Ctrl/Cmd + +/-/0)
    const handleKeyDown = (e) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === '=' || e.key === '-' || e.key === '+' || e.key === '0')
      ) {
        e.preventDefault();
      }
    };

    // Mouse/Trackpad Pinch Zoom Engelleme
    const handleWheel = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
      }
    };

    // Dokunmatik Pinch Zoom Engelleme
    const handleTouchStart = (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  return children;
}

import { HashRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <ZoomManager>
        <App />
      </ZoomManager>
    </HashRouter>
  </StrictMode>,
)
