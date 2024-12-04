import React, { useEffect, useState, useRef } from 'react';
import { ViewerConfig, SPINE_ASSETS, SpineAsset } from '../../types/viewer';
import { ErrorHandler } from '../../utils/errorHandler';

type SpinePlayerProps = Partial<ViewerConfig> & {
  playerConfig?: Partial<typeof DEFAULT_PLAYER_CONFIG>;
  currentAsset: SpineAsset;
};

const STORAGE_KEY = 'selectedSpineAsset';
const LOAD_TIMEOUT = 10000; // 5秒のタイムアウト

const DEFAULT_PLAYER_CONFIG = {
  backgroundColor: "#cccccc",
  premultipliedAlpha: true,
  showControls: true,
  viewport: {
    padLeft: "10%",
    padRight: "10%",
    padTop: "10%",
    padBottom: "10%"
  }
};

const SpinePlayer: React.FC<SpinePlayerProps> = ({
  containerId = "player-container",
  width = "100%",
  height = "400px",
  playerConfig,
  currentAsset
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const loadTimeoutRef = useRef<NodeJS.Timeout>();

  const config = {
    ...DEFAULT_PLAYER_CONFIG,
    ...playerConfig
  };

  const cleanupPlayer = () => {
    if (playerRef.current) {
      try {
        playerRef.current.dispose();
        playerRef.current = null;
      } catch (error) {
        console.error('Error disposing player:', error);
      }
    }
  };

  const initializePlayer = async () => {
    if (typeof window === 'undefined') return;

    setIsLoading(true);
    setError(null);

    // 既存のプレイヤーをクリーンアップ
    cleanupPlayer();

    // コンテナをクリア
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }

    try {
      // @ts-ignore: Spine型定義がないため
      playerRef.current = new spine.SpinePlayer(containerId, {
        jsonUrl: currentAsset.skeleton,
        atlasUrl: currentAsset.atlas,
        animation: currentAsset.defaultAnimation,
        ...config,
        alpha: false,
        success: () => {
          console.log(`Loaded ${currentAsset.name} successfully`);
          setIsLoading(false);
        },
        error: (err: any) => {
          const error = ErrorHandler.createError(
            `Failed to load ${currentAsset.label}`,
            'ASSET',
            err
          );
          ErrorHandler.logError(error);
          setError(ErrorHandler.getErrorMessage(error));
          setIsLoading(false);
        }
      });

      // タイムアウト処理
      const timeoutId = setTimeout(() => {
        if (isLoading) {
          const error = ErrorHandler.createError(
            'Loading timed out',
            'TIMEOUT'
          );
          ErrorHandler.logError(error);
          setError(ErrorHandler.getErrorMessage(error));
          setIsLoading(false);
          cleanupPlayer();
        }
      }, LOAD_TIMEOUT);

      return () => clearTimeout(timeoutId);

    } catch (err) {
      const error = ErrorHandler.createError(
        'Failed to initialize player',
        'PLAYER',
        err
      );
      ErrorHandler.logError(error);
      setError(ErrorHandler.getErrorMessage(error));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initializePlayer();
    return cleanupPlayer;
  }, [containerId, currentAsset]);

  return (
    <div className="spine-player-wrapper">
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      {isLoading && (
        <div className="loading-indicator">
          Loading...
        </div>
      )}
      <div id={containerId} ref={containerRef} style={{ width, height }} />
    </div>
  );
};

export default SpinePlayer; 