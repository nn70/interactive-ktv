import React from 'react';

export default function AdUnit() {
    return (
        <div className="card" style={{
            padding: '20px',
            textAlign: 'center',
            background: 'rgba(255,255,255,0.02)',
            border: '1px dashed rgba(255,255,255,0.1)',
            minHeight: '250px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px'
        }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '10px' }}>廣告</span>
            <div style={{ width: '300px', height: '250px', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Ad Space (300x250)
            </div>
        </div>
    );
}
