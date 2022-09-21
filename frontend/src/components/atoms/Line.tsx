import React from 'react'

interface LineProps {
	children: React.ReactNode;
}
const Line: React.FC<LineProps> = ({children}) => {
  return (
    <div style={{margin: "10px 10px"}}>
      <h4>{children}</h4>
    </div>
  )
}

export default Line