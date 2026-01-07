"use client"
import React, { ChangeEvent } from 'react';

interface SubtitleControlProps {
    offset: number;
    onOffsetChange: (newOffset: number) => void;
    onFileUpload: (file: File) => void;
}

export default function SubtitleControl({ offset, onOffsetChange, onFileUpload }: SubtitleControlProps) {

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onFileUpload(e.target.files[0]);
        }
    };

    return (
        <div className="card" style={{ marginTop: '20px', display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>字幕同步微調 (毫秒)</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button
                        className="btn-primary"
                        style={{ padding: '5px 15px', fontSize: '1.2rem' }}
                        onClick={() => onOffsetChange(offset - 500)}
                    >
                        -
                    </button>
                    <span style={{ minWidth: '60px', textAlign: 'center', fontWeight: 'bold' }}>
                        {offset > 0 ? `+${offset}` : offset} ms
                    </span>
                    <button
                        className="btn-primary"
                        style={{ padding: '5px 15px', fontSize: '1.2rem' }}
                        onClick={() => onOffsetChange(offset + 500)}
                    >
                        +
                    </button>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginLeft: 'auto' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>上傳歌詞 (LRC/SRT)</span>
                <input
                    type="file"
                    accept=".srt,.lrc"
                    onChange={handleFileChange}
                    style={{
                        background: 'rgba(255,255,255,0.05)',
                        padding: '8px',
                        borderRadius: 'var(--radius-sm)',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer'
                    }}
                />
            </div>
        </div>
    );
}
