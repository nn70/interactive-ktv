import Link from 'next/link';
import LoginButton from './LoginButton';

export default function Navbar() {
    return (
        <nav style={{
            height: 'var(--header-height)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 20px',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            backdropFilter: 'blur(10px)',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100
        }}>
            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold' }} className="text-gradient">
                    Karaoke Plus
                </Link>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <Link href="/watch" style={{ color: 'var(--text-secondary)' }}>播放區</Link>
                    <LoginButton />
                </div>
            </div>
        </nav>
    );
}
