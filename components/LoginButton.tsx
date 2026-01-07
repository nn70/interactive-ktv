"use client"
import { useSession, signIn, signOut } from "next-auth/react"

export default function LoginButton() {
    const { data: session } = useSession()

    if (session && session.user) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {session.user.image && (
                    <img
                        src={session.user.image}
                        alt="Profile"
                        style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                    />
                )}
                <span style={{ fontSize: '0.9rem' }}>{session.user.name}</span>
                <button onClick={() => signOut()} className="btn-primary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                    登出
                </button>
            </div>
        )
    }

    return (
        <button onClick={() => signIn()} className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
            登入
        </button>
    )
}
