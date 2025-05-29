import React from 'react'
import banner from '../assets/banner.png'
import FloatingPetals from './FloatingPetals'

const HeroBanner = () => {
  return (
    <div className="hero-banner" style={{ position: 'relative' }}>
      <FloatingPetals />
      <img src={banner} alt="Mia's Spring Banner" />
    </div>
  )
}

export default HeroBanner
