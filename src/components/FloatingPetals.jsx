import React from 'react'

const FloatingPetals = () => {
  const petals = Array.from({ length: 50 })

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '180px', pointerEvents: 'none', zIndex: 1 }}>
      {petals.map((_, i) => (
        <div
          key={i}
          className="petal"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${5 + Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  )
}

export default FloatingPetals
