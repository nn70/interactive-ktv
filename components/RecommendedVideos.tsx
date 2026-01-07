import React from 'react';
import Link from 'next/link';

// Mock Data
const recommendations = [
    { id: '1', title: 'G.E.M.鄧紫棋 - 光年之外 (KTV必點)', channel: 'GEM鄧紫棋', img: 'https://i.ytimg.com/vi/T4SimnaiktU/hqdefault.jpg', videoId: 'T4SimnaiktU' },
    { id: '2', title: '周興哲 Eric Chou - 你，好不好？', channel: 'Eric周興哲', img: 'https://i.ytimg.com/vi/wSBXfzlqntE/hqdefault.jpg', videoId: 'wSBXfzlqntE' },
    { id: '3', title: '周杰倫 Jay Chou - 告白氣球 Love Confession', channel: '杰威爾音樂 JVR Music', img: 'https://i.ytimg.com/vi/bu7nU9Mhpyo/hqdefault.jpg', videoId: 'bu7nU9Mhpyo' },
    { id: '4', title: '田馥甄 Hebe Tien - 小幸運 (我的少女時代)', channel: '華研國際', img: 'https://i.ytimg.com/vi/_sQSXwdtxlY/hqdefault.jpg', videoId: '_sQSXwdtxlY' },
    { id: '5', title: 'A-Lin - 有一種悲傷 (比悲傷更悲傷的故事)', channel: 'A-Lin', img: 'https://i.ytimg.com/vi/BRcPpRaNHWO/hqdefault.jpg', videoId: 'BRcPpRaNHWO' },
];

export default function RecommendedVideos() {
    return (
        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
            <h3 style={{ padding: '15px 20px', fontSize: '1.1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                推薦影片
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {recommendations.map(video => (
                    <Link key={video.id} href={`/watch?v=${video.videoId}`} style={{
                        display: 'flex',
                        gap: '10px',
                        padding: '10px 15px',
                        textDecoration: 'none',
                        transition: 'background 0.2s',
                    }}
                        className="rec-item"
                    >
                        <div style={{ position: 'relative', width: '120px', minWidth: '120px', height: '68px', borderRadius: '4px', overflow: 'hidden' }}>
                            <img src={video.img} alt={video.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', overflow: 'hidden' }}>
                            <span style={{ fontSize: '0.9rem', fontWeight: '500', lineHeight: '1.2', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{video.title}</span>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{video.channel}</span>
                        </div>
                    </Link>
                ))}
            </div>
            <style jsx>{`
        .rec-item:hover {
            background: rgba(255,255,255,0.05);
        }
      `}</style>
        </div>
    );
}
