// /lib/projectData.ts

// Define the structure for a project item
export interface Project {
    id: string; // Unique ID matching the query parameter
    title: string;
    text: string;
    youtubeLink?: string;
    numImages: number;
}

// Store the project data
export const projectsData: Project[] = [
  {
    id: 'melankolija', // Matches ?q=melankolija
    title: 'Melankolija (2023)',
    text: `A photo book created as a final thesis, a deeply personal and creative journey where emotions are explored through visual storytelling. From the initial concept of the book, to the photography, book design, and final layout — every part of the process was done independently, allowing me to fully express my artistic vision. The book consists of 124 pages and is divided into six thematic chapters, all connected by the main theme of melancholy. Each section captures a different facet of this emotion, revealing its beauty, depth, and complexity.`,
    numImages: 43
  },
  {
    id: 'nowayout', // Matches ?q=nowayout
    title: 'no way out – foto esej (2024)',
    text: `Created in 2024 as part of a university project at the Faculty of Graphic Arts, no way out was inspired by Can’t Catch Me Now, an emotional song from The Hunger Games. Blending the lyrics, melody and visual storytelling, the series explores the emotional imprint people leave on one another. It speaks to the idea that every connection—whether romantic or platonic—leaves a lasting trace. No matter the physical distance, memories and emotions inevitably resurface, reminding us of bonds that time and space cannot erase. no way out was selected as one of the top 10 photo essays of the year and was exhibited at the faculty’s annual exhibiton.`,
    youtubeLink: 'https://www.youtube.com/watch?v=6GU-W3uHzIc',
    numImages: 10
  },
  {
    id: 'nobru', // Matches ?q=nobru
    title: 'Artist Promo Shoot: nobru',
    text: `In this project, I collaborated with music artist nobru to create a series of promotional photographs for social media and digital platforms. The goal and the idea behind creative direction was to capture not just his visual identity, but also the playful energy of his music and the laid-back, expressive nature of his personality. Through a mix of candid and styled shots, we aimed to reflect Nobru’s authenticity—balancing charisma with a sense of ease and nonchalance. One of the photographs from this series was selected as Spotify cover photo.`,
    numImages: 5
  },
];

// Helper function to find a project by ID
export function getProjectById(id: string | null): Project | undefined {
    if (!id) return undefined;
    return projectsData.find(project => project.id === id);
}