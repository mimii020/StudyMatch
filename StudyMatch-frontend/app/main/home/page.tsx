"use client"

import FiltersPopup from '@/components/FiltersPopup';
import HelpRequestPopup from '@/components/HelpRequestPopup';
import SearchField from '@/components/SearchField'
import StudentCard from '@/components/StudentCard'
import { SkillTypeEnum } from '@/lib/enums/skill.type.enum';
import { useSendHelpRequestMutation } from '@/lib/services/help-request/help.request.service';
import { CreateHelpRequest } from '@/lib/services/help-request/interface';
import { SearchStudentSkill, StudentSearchRequest } from '@/lib/services/profile/interface';
import { useLazySearchStudentsQuery } from '@/lib/services/profile/user.profile.service';
import { Skill } from '@/lib/services/skill/interface';
import { useGetSubjectsQuery } from '@/lib/services/subject/subject.service';
import React, { useCallback, useEffect, useState } from 'react'


function HomePage() {
  const [selectedOfferedSkills, setSelectedOfferedSkills] = useState<Skill[]>([]);
  const [selectedDesiredSkills, setSelectedDesiredSkills] = useState<Skill[]>([]);
  const [isFiltersPopupOpen, setFiltersPopupOpen] = useState(false);
  const [requestPopupOpen, setRequestPopupOpen] = useState(false);
  const [receiverId, setReceiverId] = useState<number | null>(null);
  const [sendHelpRequest] = useSendHelpRequestMutation();  
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");


  const handleFiltersPrimaryClick = async () => {
    setFiltersPopupOpen(false);
  }

  const onOfferedToggle = useCallback((skill: Skill) => {
    setSelectedOfferedSkills((prev) => 
      prev.some((s) => s.id === skill.id) ? prev.filter((s) => s.id != skill.id)
      : [...prev, skill]
    );
  }, []);

  const onDesiredToggle = useCallback((skill: Skill) => {
    setSelectedDesiredSkills((prev) => 
      prev.some((s) => s.id === skill.id) ? prev.filter((s) => s.id != skill.id)
      : [...prev, skill]
    );
  }, []);
    
  useEffect(() => {
    console.log("Updated offered skills:", selectedOfferedSkills);
    console.log("Updated desired skills:", selectedDesiredSkills);
  }, [selectedOfferedSkills, selectedDesiredSkills]);

  const onFirstnameChagne = (value: string) => {
    setFirstname(value);
  }

  const onLastnameChagne = (value: string) => {
    setLastname(value);
  }

  const [triggerSearch, {
    data: students,
    isLoading: isSearchLoading,
    isError: isSearchError
  }] = useLazySearchStudentsQuery();


  const handleRequestSecondary = () => {
    setRequestPopupOpen(false);
  }

  const handleRequestPrimary = async (
    receiverId: number,
    subjectId: number, 
    description: string
  ) => {
    const helpRequest: CreateHelpRequest = {
      receiverId: receiverId,
      subjectId: subjectId,
      description: description
    };

    try {
      console.log(receiverId);
      console.log(subjectId);
      console.log(description);
      const response = await sendHelpRequest(helpRequest);
      console.log(response);
      setRequestPopupOpen(false);
    } catch (err) {
      console.error('Sending Help Request failed:', err);
    }
  }

  const handleApply = async () => {
    const finalOfferedSkills: SearchStudentSkill[] = selectedOfferedSkills.map((skill) => {
      const studentSkill: SearchStudentSkill = {
        skillId: skill.id,
        skillType: SkillTypeEnum.OFFERED
      };
      return studentSkill
    });

    const finalDesiredSkills: SearchStudentSkill[] = selectedDesiredSkills.map((skill) => {
      const studentSkill: SearchStudentSkill = {
        skillId: skill.id,
        skillType: SkillTypeEnum.OFFERED
      };
      return studentSkill
    });

    const finalSkills: SearchStudentSkill[] = finalDesiredSkills.concat(finalOfferedSkills);
    const studentSearchRequest: StudentSearchRequest = {
      firstname: firstname,
      lastname: lastname,
      skills: finalSkills,
    };

    await triggerSearch(studentSearchRequest);

    setSelectedDesiredSkills([]);
    setSelectedOfferedSkills([]);
    setFirstname("");
    setLastname("");
    console.log("students",students);
  };


  return (
    <div className="w-full h-full p-1 relative">
      <div className="w-full flex gap-10 justify-between">
        <div className="h-[5.76%] w-[54%]">
          <SearchField 
            placeholder="Enter a student's firstname"
            onChange={onFirstnameChagne}
          />
        </div>
        <div className="h-[5.76%] w-[54%]">
          <SearchField 
            placeholder="Enter a student's lastname"
            onChange={onLastnameChagne}
          />
        </div>
        <button className='border-2 border-gray-400 rounded-2xl px-9' onClick={() => setFiltersPopupOpen(true)}>Filters</button>
        <button className='bg-primary rounded-2xl text-white px-9' onClick={handleApply}>Apply</button>
      </div>
      <h1 className="font-extrabold font text-xl mt-4 mb-4">Discover Potential Matches</h1>
      { (students !== undefined) && <div className="grid grid-cols-3 gap-4 py-6 h-full">
        {
          students.map((student) => (
              <StudentCard 
                key={student.id} 
                student={student}
                handlePrimaryClick={async () => {
                  setRequestPopupOpen(true)
                  setReceiverId(student.id)
                }}
              />
          ))
        }
      </div>
      }
      {
        isFiltersPopupOpen && <FiltersPopup
          onOfferedToggle={onOfferedToggle}
          onDesiredToggle={onDesiredToggle}
          onPrimaryClick={handleFiltersPrimaryClick}
        />
      }

      {
        requestPopupOpen && receiverId && <HelpRequestPopup
          receiverId={receiverId} 
          handleSecondary={handleRequestSecondary}
          handlePrimary={handleRequestPrimary}
        />
      }
    </div>
  )
}

export default HomePage