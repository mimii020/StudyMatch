"use client"

import { Search } from 'lucide-react'
import React from 'react'

function SearchField() {
  return (
    <div className='w-full h-full relative'>
        <input  
        type="text" 
        className="border-2 border-gray-400 h-full w-full rounded-2xl p-4"
        placeholder="Search for your next skill match!"    
         />
        <Search color="gray" className='absolute right-4 top-1/3'/>
    </div>
  )
}

export default SearchField