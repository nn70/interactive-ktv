"use client"
import React, { useState, useEffect, Suspense } from 'react';
import VideoPlayer from '@/components/VideoPlayer';
import SubtitleDisplay, { Subtitle } from '@/components/SubtitleDisplay';
import Parser from 'srt-parser-2';
import * as jschardet from 'jschardet';
import SubtitleControl from '@/components/SubtitleControl';
import StarReward from '@/components/StarReward';
import AdUnit from '@/components/AdUnit';
import RecommendedVideos from '@/components/RecommendedVideos';
import { useSearchParams } from 'next/navigation';

import { parseLrc } from '@/lib/lrcParser';

// Default Sample (LRC Format)
const defaultLrc = `[00:01.00]歡迎來到 Karaoke Plus!
[00:04.50]請在下方上傳您的 .lrc 或 .srt 字幕檔...
[00:07.50]這是 LRC 格式的預設範例 (LRC 為主)
[00:12.00]如果不準，可以使用微調功能。`;

// Default Subtitles parsed from LRC
const defaultSubtitles: Subtitle[] = parseLrc(defaultLrc);

function WatchPageContent() {
    const searchParams = useSearchParams();
    const urlVideoId = searchParams.get('v');
    const defaultVideoId = "Bbp9ZaJD_eA"; // Default Video
    const videoId = urlVideoId || defaultVideoId;

    const [currentTime, setCurrentTime] = useState(0);
    const [subtitles, setSubtitles] = useState<Subtitle[]>(defaultSubtitles);
    const [offset, setOffset] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [watchTime, setWatchTime] = useState(0); // seconds
    const [hasReward, setHasReward] = useState(false);
    // videoId handled above

    const parser = new Parser();

    // Accumulate watch time
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying && !hasReward) {
            interval = setInterval(() => {
                setWatchTime(prev => {
                    const newTime = prev + 1;
                    if (newTime >= 120 && !hasReward) { // 2 minutes
                        setHasReward(true);
                    }
                    return newTime;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, hasReward]);

    const handleStateChange = (event: any) => {
        // YouTube Player State: 1 = Playing
        setIsPlaying(event.data === 1);
    };

    const handleFileUpload = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const arrayBuffer = e.target?.result as ArrayBuffer;
            if (arrayBuffer) {
                try {
                    // Detect encoding
                    const uint8Array = new Uint8Array(arrayBuffer);
                    let binary = "";
                    const len = uint8Array.byteLength;
                    for (let i = 0; i < len; i++) {
                        binary += String.fromCharCode(uint8Array[i]);
                    }

                    const detected = jschardet.detect(binary);
                    const encoding = detected.encoding || 'utf-8';
                    console.log(`Detected encoding: ${encoding} with confidence ${detected.confidence} `);

                    // Decode
                    const decoder = new TextDecoder(encoding);
                    const text = decoder.decode(arrayBuffer);

                    let parsed: Subtitle[] = [];

                    // Determine format based on extension or content
                    // Prioritize LRC as per request or use extension check
                    if (file.name.toLowerCase().endsWith('.srt')) {
                        parsed = parser.fromSrt(text).map(item => ({
                            id: item.id,
                            startTime: item.startSeconds,
                            endTime: item.endSeconds,
                            text: item.text
                        }));
                    } else {
                        // Default to LRC parser for .lrc or others
                        parsed = parseLrc(text);
                    }

                    setSubtitles(parsed);
                } catch (err) {
                    console.error("Error parsing subtitle:", err);
                    alert("字幕解析失敗，請確認檔案格式 (支援 LRC 與 SRT)。");
                }
            }
        };
        reader.readAsArrayBuffer(file);
    };

    return (
        <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>

            <div className="watch-grid">
                {/* Left Column: Video & Controls */}
                <div style={{ minWidth: 0 }}> {/* minWidth 0 prevents grid blowout from iframe */}
                    <header style={{ marginBottom: '20px' }}>
                        <h1 className="text-gradient" style={{ fontSize: '1.5rem' }}>正在播放</h1>
                    </header>

                    <div className="card" style={{ padding: '0', overflow: 'hidden', background: 'transparent', border: 'none', boxShadow: 'none' }}>
                        {/* Reward */}
                        <StarReward earned={hasReward} />

                        {/* Fullscreen Wrapper */}
                        <div className="fullscreen-container" id="ktv-player-container">
                            {/* Video Section with Overlay Button */}
                            <div style={{ position: 'relative' }}>
                                <VideoPlayer
                                    videoId={videoId}
                                    onTimeUpdate={(time) => setCurrentTime(time)}
                                    onStateChange={handleStateChange}
                                />
                                <button
                                    className="fs-btn"
                                    onClick={() => {
                                        const elem = document.getElementById('ktv-player-container');
                                        if (document.fullscreenElement) {
                                            document.exitFullscreen();
                                        } else if (elem) {
                                            elem.requestFullscreen();
                                        }
                                    }}
                                    title="全螢幕 (含字幕)"
                                >
                                    ⛶
                                </button>

                                {/* Subtitles Overlay (Inside relative container) */}
                                <div className="subtitle-overlay">
                                    <SubtitleDisplay
                                        currentTime={currentTime}
                                        subtitles={subtitles}
                                        offset={offset}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="controls-wrapper" style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <SubtitleControl
                                offset={offset}
                                onOffsetChange={setOffset}
                                onFileUpload={handleFileUpload}
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column: Sidebar */}
                <div className="sidebar">
                    <AdUnit />
                    <RecommendedVideos />
                </div>
            </div>
        </div>
    );
}

export default function WatchPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <WatchPageContent />
        </Suspense>
    );
}
