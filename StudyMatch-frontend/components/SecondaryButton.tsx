import React from 'react'

interface ButtonProps {
    text: string;
    onClick?: (e: React.FormEvent) => Promise<void>;
    
}

const SecondaryButton: React.FC<ButtonProps> = ({ 
  text,
  onClick 
}) => {
  return (
    <button 
      className=" border-2 border-primary px-4 rounded-2xl text-primary" 
      onClick={(e) => onClick?.(e)}
    >
      {text}
    </button>
  )
}

export default SecondaryButton