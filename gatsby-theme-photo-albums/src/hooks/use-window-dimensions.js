import { useState, useEffect } from 'react'

function getWindowDimensions() {
  let width =  null, height = null
  if (typeof window !== 'undefined') {
    width = window.innerWidth
    height = window.innerHeight
  }
  const orientation = height > width ? 'portrait' : 'landscape'
  return {
    width,
    height,
    orientation
  }
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}