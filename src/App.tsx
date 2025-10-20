import React from 'react'
import UnicornBackground from './components/UnicornBackground'
import Hero from './components/Hero'
import Header from './components/Header'
import './styles/index.scss'

const App: React.FC = () => {
  return (
    <div className="container">
      <UnicornBackground />
      <Header />
      <Hero />
    </div>
  )
}

export default App
