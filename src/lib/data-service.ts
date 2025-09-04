import chapterMapData from '@/data/chapter-map.json';

// --- Type Definitions ---

// This describes the structure of a single chapter entry
export interface Chapter {
  sl: number;
  title: string;
}

// This describes the entire structure of chapter-map.json
interface ChapterMap {
  class: number;
  book: string;
  chapters: Chapter[];
}

export interface Exercise {
  id: string; // e.g., "12.1"
  chapterId: string; // e.g., "12"
}

// --- Type assertion to inform TypeScript about the JSON structure ---
const chapterMap: ChapterMap = chapterMapData;


// --- Chapter Data ---

/**
 * Returns a list of all chapters from the chapter-map.json file.
 */
export function getChapters(): Chapter[] {
  return chapterMap.chapters;
}

/**
 * Finds a single chapter by its ID (serial number).
 * @param chapterId The serial number of the chapter (e.g., '12')
 */
export function getChapterById(chapterId: string | undefined): Chapter | undefined {
  if (!chapterId) return undefined;
  // `c` is now correctly typed as `Chapter`
  return chapterMap.chapters.find(c => c.sl.toString() === chapterId);
}


// --- Exercise Data (Dynamic Discovery) ---

// Use Vite's special import.meta.glob to find all exercise files.
// This is done at build time, so it's very efficient.
const exerciseModules = import.meta.glob('/src/data/chapter-*/*.json');

const allExercises: Exercise[] = Object.keys(exerciseModules).map(path => {
  // Path is like "/src/data/chapter-12/12.1.json"
  const pathParts = path.split('/');
  const fileName = pathParts.pop() as string; // "12.1.json"
  const chapterDir = pathParts.pop() as string; // "chapter-12"

  const chapterId = chapterDir.split('-')[1]; // "12"
  const exerciseId = fileName.replace('.json', ''); // "12.1"

  return { id: exerciseId, chapterId: chapterId };
});

/**
 * Dynamically finds all available exercises for a given chapter ID.
 * @param chapterId The ID of the chapter (e.g., '12')
 */
export function getExercisesForChapter(chapterId: string | undefined): Exercise[] {
  if (!chapterId) return [];
  
  return allExercises
    .filter(ex => ex.chapterId === chapterId)
    .sort((a, b) => {
        // Sort numerically, e.g., 12.1, 12.2, 12.10
        const aParts = a.id.split('.').map(Number);
        const bParts = b.id.split('.').map(Number);
        if (aParts[0] !== bParts[0]) return aParts[0] - bParts[0];
        return aParts[1] - bParts[1];
    });
}