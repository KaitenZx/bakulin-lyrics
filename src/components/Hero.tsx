import React from 'react'
import AnimatedHoverText from './AnimatedHoverText'
import s from '../styles/hero.module.scss'

const Hero: React.FC = () => {
  return (
        <div className={s.stack}>
          <div className={s.metaRow}>
            <div className={`${s.tldr} mono`}>TL;DR 33YO DESIGNER, CYPRUS</div>
            <a
              className={s.cta}
              href="https://t.me/iambakulin"
              target="_blank"
              rel="noopener"
              aria-label="Write me on Telegram"
            >
              WRITE ME
            </a>
          </div>

          <div className={s.headline}>
            <AnimatedHoverText
              className={s.lines}
              lines={[
                'My name is Denis.',
                [
                  { text: "I'm " },
                  { text: 'creative', italic: true },
                  { text: ' producer' },
                ],
                [
                  { text: 'and ' },
                  { text: 'glitch-artist', underline: true },
                  { text: ' ', underline: false },
                  { text: '•', isDot: true },
                ]
              ]}
            />
          </div>
        </div>
  )
}

export default Hero


