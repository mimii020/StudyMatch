import React from 'react'

interface Text {
    text: string;
}

const SecondaryButton: React.FC<Text> = ({ text }) => {
  return (
    <button className=" border-2 border-primary px-4 rounded-2xl text-primary">{text}</button>
  )
}

export default SecondaryButton