import React, { useState } from "react";
import SecondaryButton from "./SecondaryButton";
import PrimaryButton from "./PrimaryButton";

interface PopupProps {
  currentBio?: string;
  onSecondaryClick: (e: React.FormEvent) => Promise<void>;
  onPrimaryClick: (bio: string) => Promise<void>;
}

const EditBioPopup: React.FC<PopupProps> = ({ currentBio, onSecondaryClick, onPrimaryClick }) => {
  const [bio, setBio] = useState(currentBio || "");
  
  return (
    <div className="p-6 bg-light-violet w-1/2 h-1/3 flex flex-col gap-4 z-50 fixed top-1/2">
      <div className="w-full h-full">
        <input 
          type="text" 
          className="rounded-2xl h-full w-full p-6" 
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>
      <div className="flex gap-4 justify-end">
        <SecondaryButton text="Discard" onClick={onSecondaryClick}/>
        <PrimaryButton text="Save" onClick={()=>onPrimaryClick(bio)}/>
      </div>
    </div>
  );
}

export default EditBioPopup;
