"use client"

import React, { ChangeEvent } from 'react'

function AuthField({ name, label, value, onChange }: {
    name: string,
    label: string,
    value: string,
    onChange: (value: string, fieldName: string) => void
}) {
  return (
    <div className="h-full w-full">
        <label>{name}</label>
        <input type="text"
            id={name} 
            className="border-2 border-gray-400 h-full w-full rounded-2xl p-4"
            value={value}
            onChange={(e) => onChange(e.target.value, name)}
            placeholder={label}
        />
    </div>
  )
}

export default AuthField