import React, { useState, useEffect } from 'react';
import SpinePlayer from './SpinePlayer';
import { SPINE_ASSETS, SpineAsset } from '../types/viewer';

const App: React.FC = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentAsset, setCurrentAsset] = useState(SPINE_ASSETS[0]);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // SSRとCSRで一貫したローディング状態を表示
  if (!isHydrated) {
    return <div className="loading-indicator">Loading...</div>;
  }

  const handleAssetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newAsset = SPINE_ASSETS.find(asset => asset.name === event.target.value);
    if (newAsset) {
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem('selectedSpineAsset', newAsset.name);
        }
      } catch (error) {
        console.error('Failed to save to localStorage:', error);
      }
      setCurrentAsset(newAsset);
    }
  };

  return (
    <div className="container">
      <h1>Spine Animation Viewer</h1>
      <div className="animation-controls">
        <select 
          value={currentAsset.name}
          onChange={handleAssetChange}
          className="animation-select"
        >
          {SPINE_ASSETS.map(asset => (
            <option key={asset.name} value={asset.name}>
              {asset.label}
            </option>
          ))}
        </select>
      </div>
      <div className="player-container">
        <SpinePlayer 
          height="600px" 
          currentAsset={currentAsset}
        />
      </div>
    </div>
  );
};

export default App; 