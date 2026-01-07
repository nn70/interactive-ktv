export default function Home() {
  return (
    <div className="container" style={{ paddingTop: '80px', textAlign: 'center' }}>
      <h1 className="text-gradient" style={{ fontSize: '4rem', marginBottom: '20px' }}>
        Karaoke Plus
      </h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '40px' }}>
        Sing, Sync, and Shine!
      </p>

      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2>準備好高歌一曲了嗎？</h2>
        <form action="/search" style={{ margin: '20px 0', display: 'flex', gap: '10px' }}>
          <input
            type="text"
            name="q"
            placeholder="搜尋歌曲..."
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              outline: 'none'
            }}
          />
          <button type="submit" className="btn-primary">搜尋</button>
        </form>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>或</p>
        <a href="/watch" style={{ color: 'var(--accent-secondary)', textDecoration: 'underline' }}>前往測試播放器</a>
      </div>
    </div>
  )
}
