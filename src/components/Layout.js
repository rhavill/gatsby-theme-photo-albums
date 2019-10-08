import React from "react"
import Header from './Header';

export default ({children, location}) => (
  <div className='wrapper'>
    <Header path={location.pathname}/>
    <div className="container page">
      {children}
    </div>
  </div>
)