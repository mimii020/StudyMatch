import React from 'react'

interface Text {
    text: string;
    padding?: string;
}

const PrimaryButton: React.FC<Text> = ({ text, padding }) => {
  return (
    <button style = {{ padding: `${padding}` }} className="bg-primary px-4 rounded-2xl text-white">{text}</button>
  )
}

export default PrimaryButton