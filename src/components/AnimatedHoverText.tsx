import React, { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'

type Segment = { text: string; italic?: boolean; underline?: boolean; isDot?: boolean }
type Line = string | Segment[] | Segment
type AnimatedHoverTextProps = {
  lines: Line[]
  className?: string
}

function normalizeLine(line: Line): Segment[] {
  if (typeof line === 'string') return [{ text: line }]
  if (Array.isArray(line)) return line
  return [line]
}

const AnimatedHoverText: React.FC<AnimatedHoverTextProps> = ({ lines, className }) => {
  const rootRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const items = Array.from(root.querySelectorAll('[data-item]'))

    function runAnimation(item: HTMLElement, fromIndex: number) {
      const visibleLetters = item.querySelectorAll('[data-visible] .letter')
      const hiddenLetters = item.querySelectorAll('[data-hidden] .letter')

      gsap.to(visibleLetters, {
        yPercent: 100,
        ease: 'back.out(2)',
        duration: 0.6,
        stagger: { each: 0.023, from: fromIndex },
      })

      gsap.to(hiddenLetters, {
        yPercent: 100,
        ease: 'back.out(2)',
        duration: 0.6,
        stagger: { each: 0.023, from: fromIndex },
        onComplete: () => {
          gsap.set(visibleLetters, { clearProps: 'all' })
          gsap.set(hiddenLetters, { clearProps: 'all' })
        },
      })
    }

    function onMouseOver(this: Element, ev: Event) {
      const item = this as HTMLElement
      const target = ev.target as HTMLElement

      // allow re-trigger when finished
      if (!gsap.isTweening(item.querySelectorAll('[data-visible] .letter')) && item.classList.contains('hovered')) {
        item.classList.remove('hovered')
      }

      if (!(target && target.classList.contains('letter'))) return

      item.classList.add('hovered')
      const indexHover = Array.from(target.parentElement!.children).indexOf(target)
      runAnimation(item, indexHover)
    }

    function onMouseMove(this: Element, ev: MouseEvent) {
      const item = this as HTMLElement
      const visibleLetters = item.querySelectorAll('[data-visible] .letter')
      if (!visibleLetters.length) return
      if (gsap.isTweening(visibleLetters)) return

      const rect = item.getBoundingClientRect()
      const x = ev.clientX - rect.left
      let closestIdx = 0
      let minDist = Infinity
      visibleLetters.forEach((el, idx) => {
        const r = (el as HTMLElement).getBoundingClientRect()
        const cx = r.left + r.width / 2 - rect.left
        const d = Math.abs(cx - x)
        if (d < minDist) { minDist = d; closestIdx = idx }
      })
      item.classList.add('hovered')
      runAnimation(item, closestIdx)
    }

    items.forEach((el) => {
      el.addEventListener('mouseover', onMouseOver as EventListener)
      el.addEventListener('mousemove', onMouseMove as EventListener)
    })
    return () => items.forEach((el) => {
      el.removeEventListener('mouseover', onMouseOver as EventListener)
      el.removeEventListener('mousemove', onMouseMove as EventListener)
    })
  }, [])

  const rendered = useMemo(() => {
    function renderLetters(segments: Segment[]) {
      const nodes: React.ReactNode[] = []
      let globalIdx = 0
      segments.forEach((seg) => {
        if (seg.isDot) {
          nodes.push(
            <span key={`dot-${globalIdx++}`} className={['letter', 'dot'].join(' ')} aria-hidden />,
          )
          return
        }
        const chars = Array.from(seg.text)
        chars.forEach((ch) => {
          const isSpace = ch === ' '
          nodes.push(
            <span
              key={`l-${globalIdx++}`}
              className={[
                'letter',
                seg.italic ? ' italic' : '',
                seg.underline ? ' underline' : '',
              ].join('')}
            >
              {isSpace ? '\u00A0' : ch}
            </span>,
          )
        })
      })
      return nodes
    }

    const items = lines.map((line, li) => {
      const segments = normalizeLine(line)
      return (
        <li key={li} data-item>
          <span data-hidden aria-hidden>
            {renderLetters(segments)}
          </span>
          <span data-visible>
            {renderLetters(segments)}
          </span>
        </li>
      )
    })

    return items
  }, [lines])

  return (
    <ul ref={rootRef} className={className}>
      {rendered}
    </ul>
  )
}

export default AnimatedHoverText


