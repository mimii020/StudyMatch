import React from 'react'

interface ButtonProps {
    text: string;
    padding?: string;
    onClick?: (...args: any[]) =>Promise<void>;
}

const PrimaryButton: React.FC<ButtonProps> = ({ 
  text, 
  padding,
  onClick 
}) => {
  return (
    <button 
      style = {{ padding: `${padding}`}} 
      className="bg-primary px-4 rounded-2xl text-white" 
      onClick={(e) => onClick?.(e)}>
        {text}
      </button>
  )
}

export default PrimaryButton