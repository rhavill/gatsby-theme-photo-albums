import {navigate} from 'gatsby'
import {useSwipeable} from 'react-swipeable'

export default function useSwipeNavigate(nextUrl, previousUrl, parentUrl) {

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {if (nextUrl) {navigate(nextUrl)}},
    onSwipedRight: () => {if (previousUrl) {navigate(previousUrl)}},
    onSwipedUp: () => {if (parentUrl) {navigate(parentUrl)}},
    onSwipedDown: () => {if (parentUrl) {navigate(parentUrl)}},
    trackMouse: true,
  })

  return swipeHandlers
}