"use client"
import React, { useMemo } from 'react';

export interface Subtitle {
    id: string;
    startTime: number; // seconds
    endTime: number; // seconds
    text: string;
}

interface SubtitleDisplayProps {
    currentTime: number;
    subtitles: Subtitle[];
    offset?: number; // milliseconds
}

export default function SubtitleDisplay({ currentTime, subtitles, offset = 0 }: SubtitleDisplayProps) {
    const activeSubtitle = useMemo(() => {
        const adjustedTime = currentTime + (offset / 1000);
        return subtitles.find(sub => adjustedTime >= sub.startTime && adjustedTime <= sub.endTime);
    }, [currentTime, subtitles, offset]);

    // Find next lines for preview (optional)
    const nextSubtitles = useMemo(() => {
        const adjustedTime = currentTime + (offset / 1000);
        return subtitles.filter(sub => sub.startTime > adjustedTime).slice(0, 1);
    }, [currentTime, subtitles, offset]);

    return (
        <div className="subtitle-container" style={{
            textAlign: 'center',
            padding: '20px',
            minHeight: '150px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div className="current-line" style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: activeSubtitle ? 'var(--accent-secondary)' : 'var(--text-secondary)',
                textShadow: activeSubtitle ? '0 0 10px var(--accent-secondary)' : 'none',
                transition: 'all 0.2s ease',
                minHeight: '3rem'
            }}>
                {activeSubtitle ? activeSubtitle.text : '...'}
            </div>

            {nextSubtitles.map(sub => (
                <div key={sub.id} style={{ opacity: 0.5, fontSize: '1.2rem', marginTop: '10px' }}>
                    {sub.text}
                </div>
            ))}
        </div>
    );
}
