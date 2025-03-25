"use client"
import { Separator } from '@radix-ui/react-separator'
import React, { useEffect, useState } from 'react'
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import { useGetSubjectsQuery } from '@/lib/services/subject/subject.service';
import { useGetSkillsBySubjectIdQuery, useSearchSkillsQuery } from '@/lib/services/skill/skill.service';
import SkillList from './SkillList';
import { Skill } from '@/lib/services/skill/interface';


interface PopupProps {
    onOfferedToggle: (skill: Skill) => void;
    onDesiredToggle: (skill: Skill) => void;
    onPrimaryClick: (...args: any[]) => Promise<void>;
}

function FiltersPopup({
        onOfferedToggle,
        onDesiredToggle,  
        onPrimaryClick
    } : PopupProps) {    
    const { data: subjects, isLoading } = useGetSubjectsQuery();
    const [selectedOfferedSubject, setSelectedOfferedSubject] = useState<Subject | null>(null);
    const [selectedDesiredSubject, setSelectedDesiredSubject] = useState<Subject | null>(null);


    useEffect(() => {
      if (subjects && subjects.length > 0 && !selectedOfferedSubject && !isLoading) {
        setSelectedOfferedSubject(subjects[0])
      }

      if (subjects && subjects.length > 0 && !selectedDesiredSubject && !isLoading) {
        setSelectedDesiredSubject(subjects[0])
      }
    }, [subjects, selectedOfferedSubject, selectedDesiredSubject, isLoading]);
    
    const { data: offeredSkills } = useGetSkillsBySubjectIdQuery(
      selectedOfferedSubject?.id!,
    {
      skip: !selectedOfferedSubject
    }
  );

    const { data: desiredSkills } = useGetSkillsBySubjectIdQuery(
        selectedDesiredSubject?.id!,
    {
        skip: !selectedDesiredSubject
    }
    );

    console.log("skillsssss",offeredSkills);
    console.log("skillsssss",desiredSkills);


    const handleOfferedChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const subjectId = Number(event.target.value);
        const subject = subjects?.find((s) => s.id === subjectId) || null;
        setSelectedOfferedSubject(subject);
        console.log(selectedOfferedSubject);
      }

    const handleDesiredChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const subjectId = Number(event.target.value);
    const subject = subjects?.find((s) => s.id === subjectId) || null;
    setSelectedDesiredSubject(subject);
    console.log(selectedDesiredSubject);
    }
  
  return (
    <div className="h-1/2 w-1/2 bg-light-violet rounded-2xl flex flex-col p-6 gap-4 absolute top-1/4 left-1/4">
        <h1 className="text-primary font-extrabold text-2xl">Select Offered Skills</h1>
        <Separator/>
        <select value={selectedOfferedSubject? selectedOfferedSubject.id : ""} onChange={handleOfferedChange} className="rounded-2xl border-2 border-gray-400 text-center font-bold h-[15%] w-1/2">
          {
            subjects?.map((subject) => (
              <option key={subject.id} value={subject.id} className="focus:outline-none hover:outline-none hover:ring-2 hover:ring-purple-300">{subject.name}</option>
            ))
          }
        </select>
        <div className="w-full mt-4">
            {
                (offeredSkills!) && <SkillList
                    onToggle={onOfferedToggle} 
                    skillList={offeredSkills!} 
                />
            }
            
        </div>
        <h1 className="text-primary font-extrabold text-2xl">Select Desired Skills</h1>
        <select value={selectedDesiredSubject? selectedDesiredSubject.id : ""} onChange={handleDesiredChange} className="rounded-2xl border-2 border-gray-400 text-center font-bold h-[15%] w-1/2">
          {
            subjects?.map((subject) => (
              <option key={subject.id} value={subject.id} className="focus:outline-none hover:outline-none hover:ring-2 hover:ring-purple-300">{subject.name}</option>
            ))
          }
        </select>
        <div className="w-full mt-4">
            {
                (desiredSkills!) && <SkillList 
                    onToggle={onDesiredToggle}
                    skillList={desiredSkills!} 
                />
            }
            
        </div>
        <div className="flex justify-end gap-2 mt-auto">
            <PrimaryButton text="Save Filters" onClick={onPrimaryClick}/>
        </div>
    </div>
  )
}

export default FiltersPopup