export interface User {
  photo_max_orig: string;
  first_name: string;
  idea: string;
  isMatch?: boolean;
  last_name: string;
  skills: string[];
  user_id: number;
  summary: string;
  settings: SearchSettings;
}
export interface SearchSettings {
  desiredSkills: string[];
}
