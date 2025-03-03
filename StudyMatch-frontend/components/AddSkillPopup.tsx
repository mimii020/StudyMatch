"use client"
import { Separator } from '@radix-ui/react-separator'
import React, { useEffect, useState } from 'react'
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import { useGetSubjectsQuery } from '@/lib/services/subject/subject.service';
import { useSearchSkillsQuery } from '@/lib/services/skill/skill.service';
import { useAddSkillMutation, useGetMyProfileQuery } from '@/lib/services/profile/user.profile.service';
import { AddSkillRequest } from '@/lib/services/profile/interface';
import { SkillTypeEnum } from '@/lib/enums/skill.type.enum';

interface PopupProps {
    title: string;
    onSecondaryClick: (...args: any[]) => Promise<void>;
    onPrimaryClick: (...args: any[]) => Promise<void>;
}

function AddSkillPopup({ 
      title,   
      onSecondaryClick,
      onPrimaryClick 
    } : PopupProps) {
    const [input, setInput] = useState<string>("");
    const [isSkillsOpen, setIsSkillsOpen] = useState(true);
    const { data: subjects, isLoading } = useGetSubjectsQuery();
    const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    
    useEffect(() => {
      if (subjects && subjects.length > 0 && !selectedSubject && !isLoading) {
        setSelectedSubject(subjects[0])
      }
    }, [subjects, selectedSubject, isLoading]);
    
    const { data: skills } = useSearchSkillsQuery({
      subjectId: selectedSubject?.id!,
      query: searchQuery
    },
    {
      skip: !selectedSubject
    }
  );
  console.log("skillsssss",skills);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(skills?.[0]|| null);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const subjectId = Number(event.target.value);
        const subject = subjects?.find((s) => s.id === subjectId) || null;
        setSelectedSubject(subject);
        setSearchQuery("");
        console.log(selectedSubject);
      }

  const handleSkillClick = (skill: Skill) => {
      setSelectedSkill(skill);
      setInput(skill.name);
      setIsSkillsOpen(false);
  }
  
  return (
    <div className="h-1/2 w-1/2 bg-light-violet rounded-2xl flex flex-col p-6 gap-4 absolute top-1/4 left-1/4">
        <h1 className="text-primary font-extrabold text-2xl">{title}</h1>
        <Separator/>
        <input
            type="text"
            placeholder={input}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-6 rounded-2xl h-[15%]"
        />
        {
          isSkillsOpen ? 
          <div className="overflow-auto h-1/2 scrollbar-hide">
            <div className="w-full h-full">
              {
                skills?.map((skill) => (
                  <button 
                    key={skill.id} 
                    className="w-full border-2 border-light-gray hover:bg-primary p-4 rounded-2xl hover:text-white" 
                    onClick={async () => handleSkillClick(skill)}>
                      {skill.name}
                  </button>
                ))
              }
            </div>
          </div>

          : <div className='h-1/2'></div>
        }

        <select value={selectedSubject? selectedSubject.id : ""} onChange={handleChange} className="rounded-2xl border-2 border-gray-400 text-center font-bold h-[15%] w-full">
          {
            subjects?.map((subject) => (
              <option key={subject.id} value={subject.id} className="focus:outline-none hover:outline-none hover:ring-2 hover:ring-purple-300">{subject.name}</option>
            ))
          }
        </select>
        <div className="flex justify-end gap-2 mt-auto">
            <SecondaryButton text="Cancel" onClick={onSecondaryClick}/>
            <PrimaryButton text="Add Skill" onClick={async () =>onPrimaryClick(selectedSkill?.id!)}/>
        </div>
    </div>
  )
}

export default AddSkillPopup