import { useGetSubjectsQuery } from '@/lib/services/subject/subject.service'
import React, { useEffect, useState } from 'react'
import SecondaryButton from './SecondaryButton';
import PrimaryButton from './PrimaryButton';

interface Props {
  receiverId: number;
  handlePrimary: (...args: any[]) => any;
  handleSecondary: (...args: any[]) => any;

}

function HelpRequestPopup({ receiverId, handlePrimary, handleSecondary } : Props) {
  const {data: subjects, isLoading} = useGetSubjectsQuery()
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(null);
  const [description, setDescription] = useState("");
  
  useEffect(() => {
    if (subjects && subjects.length > 0 && !selectedSubjectId && !isLoading) {
        setSelectedSubjectId(subjects[0].id);
    }
  }, [subjects, setSelectedSubjectId, selectedSubjectId, isLoading]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const subjectId = Number(event.target.value);
    setSelectedSubjectId(subjectId);
  };

  return (
    <div className="w-1/2 h-1/2 bg-light-violet flex flex-col gap-6 absolute top-1/4 left-1/4 items-center p-7 shadow-md">
        <h1 className="font-extrabold text-3xl self-start text-primary">Choose Subject</h1>
        <select value={selectedSubjectId? selectedSubjectId : ""} onChange={handleChange} className="rounded-2xl border-2 border-gray-400 text-center font-bold h-[15%] w-1/2">
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
            <SecondaryButton text="Cancel" onClick={handleSecondary}/>
            <PrimaryButton text="Send" onClick={ async () => handlePrimary(
              receiverId, 
              selectedSubjectId,
              description
              )}/>
        </div>
    </div>
  )
}

export default HelpRequestPopup