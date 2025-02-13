"use client"

import React from 'react'

function AuthField({ name, label }: {
    name: string,
    label: string
}) {
  return (
    <div className="h-full w-full">
        <label>{name}</label>
        <input type="text" 
            className="border-2 border-gray-400 h-full w-full rounded-2xl p-4"
            placeholder={label}
        />
    </div>
  )
}

export default AuthField