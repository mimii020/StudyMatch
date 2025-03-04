"use client"

import { Search } from 'lucide-react'
import React from 'react'

interface FieldProps{
  placeholder: string;
  onChange: (value: string) => void;
}

function SearchField({ placeholder, onChange }: FieldProps) {
  return (
    <div className='w-full h-full relative'>
        <input  
        type="text" 
        className="border-2 border-gray-400 h-full w-full rounded-2xl p-4"
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}   
         />
        <Search color="gray" className='absolute right-4 top-1/3'/>
    </div>
  )
}

export default SearchField