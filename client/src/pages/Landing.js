import React from 'react'
import LandingStyle from '../assets/wrappers/LandingPage'
import main from '../assets/images/main.svg'
import { Logo } from '../components'
import { Link } from 'react-router-dom'
const Landing = () => {
  return (
    <LandingStyle>
      <nav>
        <Logo></Logo>
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            I'm baby wayfarers hoodie next level taiyaki brooklyn cliche blue
            bottle single-origin coffee chia. Aesthetic post-ironic venmo,
            quinoa lo-fi tote bag adaptogen everyday carry meggings +1 brunch
            narwhal.
          </p>
          <Link to="/register" className="btn btn-hero">
            Login / Register
          </Link>
        </div>

        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </LandingStyle>
  )
}

export default Landing
