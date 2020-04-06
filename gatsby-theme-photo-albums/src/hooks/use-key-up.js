// This hook was copied from https://usehooks.com/useKeyPress/ and modified
import { useState, useEffect } from 'react'

export default function useKeyUp(targetKey) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false)

  // Add event listeners
  useEffect(() => {
    // If released key is our target key then set to false
    const upHandler = (e) => {
      if (e.key === targetKey) {
        setKeyPressed(true)
      }
    }
    window.addEventListener('keyup', upHandler)
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keyup', upHandler)
    }
  }, [targetKey])

  return keyPressed
}