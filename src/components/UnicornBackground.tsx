import React from 'react'

type UnicornBackgroundProps = {
  projectId?: string
}

const UnicornBackground: React.FC<UnicornBackgroundProps> = ({ projectId = 'uTLUl6lRI3nc6Lb87ovX' }) => {
  const src = `https://www.unicorn.studio/embed/${projectId}`
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'auto' }} aria-hidden>
      <iframe
        src={src}
        title="Unicorn Background"
        style={{ border: 'none', width: '100%', height: '100%' }}
        loading="lazy"
        referrerPolicy="no-referrer"
      />
    </div>
  )
}

export default UnicornBackground


