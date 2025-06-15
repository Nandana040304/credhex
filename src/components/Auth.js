import React, { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function Auth({ onAuth }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const { data, error } = isLogin
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password })

    if (error) setError(error.message)
    else onAuth(data)
  }

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Login to CredHex' : 'Register for CredHex'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        <p>
          {isLogin ? "Don't have an account?" : "Already registered?"}
          <button type="button" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}
