import { useGetSubjectsQuery } from '@/lib/services/subject/subject.service'
import React, { useEffect, useState } from 'react'
import SecondaryButton from './SecondaryButton';
import PrimaryButton from './PrimaryButton';

function HelpRequestPopup() {
  const {data: subjects, isLoading} = useGetSubjectsQuery()
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [description, setDescription] = useState("");
  
  useEffect(() => {
    if (subjects && subjects.length > 0 && !selectedSubject && !isLoading) {
        setSelectedSubject(subjects[0]);
    }
  }, [subjects, setSelectedSubject, selectedSubject, isLoading]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const subjectId = Number(event.target.value);
    const subject = subjects?.find((s) => s.id === subjectId) || null;
    setSelectedSubject(subject);
  };

  return (
    <div className="w-1/2 h-1/2 bg-light-violet flex flex-col gap-6 absolute top-1/4 left-1/4 items-center p-7 shadow-md">
        <h1 className="font-extrabold text-3xl self-start text-primary">Choose Subject</h1>
        <select value={selectedSubject? selectedSubject.id : ""} onChange={handleChange} className="rounded-2xl border-2 border-gray-400 text-center font-bold h-[15%] w-1/2">
          {
            subjects?.map((subject) => (
              <option key={subject.id} value={subject.id} className="focus:outline-none hover:outline-none hover:ring-2 hover:ring-purple-300">{subject.name}</option>
            ))
          }
        </select>
        <h1 className="font-extrabold text-3xl self-start text-primary">Description</h1>
        <input
            className="w-full rounded-2xl h-1/2 p-6"
            placeholder="Write details concerning the subject you need help with"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex gap-4 justify-end w-full">
            <SecondaryButton text="Cancel"/>
            <PrimaryButton text="Send"/>
        </div>
    </div>
  )
}

export default HelpRequestPopup