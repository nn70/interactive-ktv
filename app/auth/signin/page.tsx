"use client"
import React from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function SignInPage() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    return (
        <div className="container" style={{ paddingTop: '80px', display: 'flex', justifyContent: 'center' }}>
            <div className="card" style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}>
                <h1 className="text-gradient" style={{ marginBottom: '30px' }}>歡迎回來</h1>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <button
                        onClick={() => signIn('google', { callbackUrl })}
                        className="btn-primary"
                        style={{ background: '#DB4437' }}
                    >
                        使用 Google 登入
                    </button>

                    <button
                        onClick={() => signIn('facebook', { callbackUrl })}
                        className="btn-primary"
                        style={{ background: '#4267B2' }}
                    >
                        使用 Facebook 登入
                    </button>

                    <div style={{ margin: '20px 0', height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>

                    <h3 style={{ fontSize: '1rem', marginBottom: '10px' }}>測試登入</h3>
                    <button
                        onClick={() => signIn('credentials', { username: 'Singer', callbackUrl })}
                        className="btn-primary"
                        style={{ background: 'var(--bg-secondary)', border: '1px solid var(--accent-secondary)' }}
                    >
                        以訪客身分繼續 (Demo)
                    </button>
                </div>

                <div style={{ marginTop: '20px' }}>
                    <Link href="/" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>← 返回首頁</Link>
                </div>
            </div>
        </div>
    );
}
