export default function StarReward({ earned }: { earned: boolean }) {
    if (!earned) return null;

    return (
        <div style={{
            position: 'fixed',
            top: '100px',
            right: '20px',
            background: 'rgba(255, 215, 0, 0.2)',
            border: '1px solid gold',
            padding: '10px 20px',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            animation: 'slideIn 0.5s ease-out',
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
            zIndex: 200
        }}>
            <span style={{ fontSize: '2rem' }}>⭐</span>
            <div>
                <div style={{ fontWeight: 'bold', color: 'gold' }}>獲得獎勵！</div>
                <div style={{ fontSize: '0.8rem' }}>已熱唱超過 2 分鐘</div>
            </div>
            <style jsx>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
        </div>
    );
}
