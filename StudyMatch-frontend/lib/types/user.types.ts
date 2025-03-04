import { Skill } from "../services/skill/interface";

export type StudentProfile = {
    id: number;
    bio: string;
    firstname: string;
    lastname: string;
    desiredSkills: Skill[];
    offeredSkills: Skill[];
}

