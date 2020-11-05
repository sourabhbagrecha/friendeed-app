import React from 'react'
import './Landing.css'

function Landing() {
  return (
    <div className="Landing">
      <div className="title-container">
        <h2 className="title-name">Fr<span role="img" aria-label="shake-hands">🤝</span>ndeed</h2>
        <p className="title-caption">A friend in need is a friend indeed</p>
        <a href="/home" class="button4" style={{ backgroundColor: "#ffc107" }}>Let's Get Started!</a>
      </div>
    </div>
  )
}

export default Landing
