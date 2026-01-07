"use client"
import React, { useRef, useEffect } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';

interface VideoPlayerProps {
    videoId: string;
    onTimeUpdate: (time: number) => void;
    onPlayerReady?: (event: any) => void;
    onStateChange?: (event: any) => void;
    isPlaying?: boolean;
}

export default function VideoPlayer({ videoId, onTimeUpdate, onPlayerReady, onStateChange }: VideoPlayerProps) {
    const playerRef = useRef<any>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            if (playerRef.current && playerRef.current.getCurrentTime) {
                const currentTime = playerRef.current.getCurrentTime();
                onTimeUpdate(currentTime);
            }
        }, 50); // High frequency for smooth subs

        return () => clearInterval(interval);
    }, [onTimeUpdate]);

    // Keyboard controls
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!playerRef.current) return;

            // Check if active element is an input or textarea to avoid conflict
            const activeTag = document.activeElement?.tagName.toLowerCase();
            if (activeTag === 'input' || activeTag === 'textarea') return;

            if (e.key === 'ArrowLeft') {
                const currentTime = playerRef.current.getCurrentTime();
                playerRef.current.seekTo(Math.max(0, currentTime - 5), true);
            } else if (e.key === 'ArrowRight') {
                const currentTime = playerRef.current.getCurrentTime();
                playerRef.current.seekTo(currentTime + 5, true);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const onReady: YouTubeProps['onReady'] = (event) => {
        playerRef.current = event.target;
        if (onPlayerReady) onPlayerReady(event);
    };

    const opts: YouTubeProps['opts'] = {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 1,
            modestbranding: 1,
            rel: 0,
            fs: 0, // Disable native fullscreen
            playsinline: 1, // Fix for iOS mobile playback
        },
    };

    return (
        <div className="video-responsive" style={{ aspectRatio: '16/9', width: '100%', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            <YouTube
                videoId={videoId}
                opts={opts}
                onReady={onReady}
                onStateChange={onStateChange}
                style={{ width: '100%', height: '100%' }}
                iframeClassName="youtube-iframe"
            />
        </div>
    );
}
