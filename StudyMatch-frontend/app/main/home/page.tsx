"use client"

import SearchField from '@/components/SearchField'
import StudentCard from '@/components/StudentCard'
import React, { useState } from 'react'

const subjects = ["Algebra", "Calculus", "English", "Python"];

function HomePage() {
  const [selectedSuject, setSelectedSubject] = useState<string>(subjects[0]);
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubject(event.target.value);
    console.log(selectedSuject);
  }
  return (
    <div className="w-full h-full p-1">
      <div className="w-full flex gap-10 justify-between">
        <div className="h-[5.76%] w-[54.4%]">
          <SearchField/>
        </div>
        <select value={selectedSuject} onChange={handleChange} className="rounded-2xl border-2 border-gray-400 w-1/5 text-center font-bold">
          {
            subjects.map((subject, index) => (
              <option key={index} value={subject} className="focus:outline-none hover:outline-none hover:ring-2 hover:ring-purple-300">{subject}</option>
            ))
          }
        </select>
        <button className='bg-primary rounded-2xl text-white px-9'>Apply</button>
      </div>
      <h1 className="font-extrabold font text-xl">Discover Potential Matches</h1>
      <StudentCard/>
    </div>
  )
}

export default HomePage