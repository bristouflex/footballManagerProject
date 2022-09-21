import React from 'react'

interface ButtonProps {
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
	children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <div style={{ margin: "10px"}}>
        <button style={{padding: "10px", cursor: "pointer"}} onClick={onClick}>{children}</button>
    </div>
  )
}