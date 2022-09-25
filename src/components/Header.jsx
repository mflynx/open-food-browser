import React from 'react'

const layout = {
    backgroundColor: "rgb(248, 248, 143)",
    padding: "16px 20px",
}
const Header = (props) => {
    const {children} = props;
  return (
    <div style={layout}>{children}</div>
  )
}

export default Header