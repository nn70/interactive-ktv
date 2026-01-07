"use client"
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { searchVideos, VideoResult } from '@/lib/youtube';
import VideoCard from '@/components/VideoCard';
import Link from 'next/link';

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q');
    const [results, setResults] = useState<VideoResult[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (query) {
            setLoading(true);
            searchVideos(query).then(data => {
                setResults(data);
                setLoading(false);
            });
        }
    }, [query]);

    return (
        <div className="container" style={{ paddingTop: '40px' }}>
            <header style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                <h1 className="text-gradient">Search Results: "{query}"</h1>
            </header>

            {loading ? (
                <div style={{ textAlign: 'center', marginTop: '50px', color: 'var(--accent-secondary)' }}>
                    Searching...
                </div>
            ) : (
                <div className="grid-layout">
                    {results.map(video => (
                        <VideoCard key={video.id} video={video} />
                    ))}
                    {results.length === 0 && !loading && (
                        <p>No results found.</p>
                    )}
                </div>
            )}
        </div>
    );
}
