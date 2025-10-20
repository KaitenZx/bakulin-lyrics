import React from 'react'
import s from '../styles/header.module.scss'

const Header: React.FC = () => {
  return (
    <header className={s.topbar}>
      <img
        className={s.logoImg}
        src="/Logo.svg"
        width={176}
        height={20}
        alt="AMBAKUL.IN logo"
        decoding="async"
      />
      <button className={s.menuIcon} aria-label="Menu" type="button">
        <span />
        <span />
      </button>
    </header>
  )
}

export default Header


