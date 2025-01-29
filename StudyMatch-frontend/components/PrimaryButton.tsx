import React from 'react'

interface Text {
    text: string;
}

const PrimaryButton: React.FC<Text> = ({ text }) => {
  return (
    <button className="bg-primary px-4 rounded-2xl text-white">{text}</button>
  )
}

export default PrimaryButton