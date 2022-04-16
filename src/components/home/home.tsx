import React from 'react'

import HomeFeatures from './home-features';
import HomeHero from './home-hero';
import HomeAbilities from './home-abilities';

function HomeComponent() {
  return (
    <>    
      <HomeHero />
      <HomeFeatures />
      <HomeAbilities />
    </>
  )
}

export default HomeComponent