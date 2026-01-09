import { projectData as artventure } from './ARTventure/data';
import { projectData as artventureCopy } from './ARTventureCopy/data';
import { projectData as smartBikelaneLights } from './SmartBikelaneLights/data';
import { projectData as coreography } from './COREography/data';
import { projectData as mechanicalWalker } from './MechanicalWalker/data';
import { projectData as memoryIsle } from './MemoryIsle/data';
import img1 from '../assets/projectImages/1.png';
import img2 from '../assets/projectImages/2.png';
import img3 from '../assets/projectImages/3.png';
import img4 from '../assets/projectImages/4.png';
import img5 from '../assets/projectImages/5.png';

export interface ProjectData {
  title: string;
  shortDescription: string;
  longDescription: string;
  images: string[];
  tags: string[];
}

// Map images to projects
const imageMap: Record<string, string> = {
  'ARTventure': img1,
  'ARTventureCopy': img1,
  'Smart bikelane lights': img3,
  'COREography': img4,
  'Mechanical Walker': img2,
  'Memory Isle': img5,
};

export const projects: ProjectData[] = [
  { ...artventure, images: [imageMap[artventure.title] || ''] },
  { ...artventureCopy, images: [imageMap[artventureCopy.title] || ''] },
  { ...smartBikelaneLights, images: [imageMap[smartBikelaneLights.title] || ''] },
  { ...coreography, images: [imageMap[coreography.title] || ''] },
  { ...mechanicalWalker, images: [imageMap[mechanicalWalker.title] || ''] },
  { ...memoryIsle, images: [imageMap[memoryIsle.title] || ''] },
];

export const getProjectByTitle = (title: string): ProjectData | undefined => {
  return projects.find(p => p.title.toLowerCase() === title.toLowerCase());
};

