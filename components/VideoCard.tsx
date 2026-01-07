import React from 'react';
import Link from 'next/link';

interface VideoResult {
    id: string;
    title: string;
    thumbnail: string;
    channelTitle: string;
}

export default function VideoCard({ video }: { video: VideoResult }) {
    return (
        <Link href={`/watch?v=${video.id}`} className="video-card" style={{ display: 'block' }}>
            <div className="card" style={{ padding: '0', overflow: 'hidden', height: '100%', transition: 'transform 0.2s' }}>
                <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                    <img
                        src={video.thumbnail}
                        alt={video.title}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />
                </div>
                <div style={{ padding: '15px' }}>
                    <h3 style={{
                        fontSize: '1rem',
                        marginBottom: '5px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                    }}>
                        {video.title}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        {video.channelTitle}
                    </p>
                </div>
            </div>
        </Link>
    );
}
