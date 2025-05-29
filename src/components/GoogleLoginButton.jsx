import React from 'react'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

const GoogleLoginButton = () => {
  const navigate = useNavigate()

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider()
    try {
      await signInWithPopup(auth, provider)
      navigate('/home')
    } catch (err) {
      console.error('Google login error:', err.message)
    }
  }

  return (
    <button
      onClick={handleGoogleLogin}
      style={{
        padding: '0.75rem 1rem',
        borderRadius: '12px',
        backgroundColor: '#4285F4',
        color: 'white',
        border: 'none',
        fontWeight: 'bold',
        cursor: 'pointer'
      }}
    >
      Sign in with Google
    </button>
  )
}

export default GoogleLoginButton
