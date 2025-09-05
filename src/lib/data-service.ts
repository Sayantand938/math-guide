import booksData from '@/data/books.json';

// --- Type Definitions ---
export interface Chapter {
  sl: number;
  title: string;
}

export interface Book {
  id: string;
  class: number;
  book: string;
  chapters: Chapter[];
}

export interface Exercise {
  id: string; // e.g., "12.1"
  bookId: string; // e.g., "ganitprabha"
  chapterId: string; // e.g., "12"
}

const books: Book[] = booksData;

// --- Book Data ---
export function getBooks(): Book[] {
  return books;
}

export function getBookById(bookId: string | undefined): Book | undefined {
  if (!bookId) return undefined;
  return books.find(b => b.id === bookId);
}


// --- Chapter Data ---
export function getChapters(bookId: string | undefined): Chapter[] {
  const book = getBookById(bookId);
  return book ? book.chapters : [];
}

export function getChapterById(bookId: string | undefined, chapterId: string | undefined): Chapter | undefined {
  const book = getBookById(bookId);
  if (!book || !chapterId) return undefined;
  return book.chapters.find(c => c.sl.toString() === chapterId);
}


// --- Exercise Data (Dynamic Discovery) ---
const exerciseModules = import.meta.glob('/src/data/*/*/*.json');

const allExercises: Exercise[] = Object.keys(exerciseModules).map(path => {
  // Path is like "/src/data/ganitprabha/chapter-12/12.1.json"
  const pathParts = path.split('/');
  const fileName = pathParts.pop() as string; // "12.1.json"
  const chapterDir = pathParts.pop() as string; // "chapter-12"
  const bookId = pathParts.pop() as string; // "ganitprabha"

  const chapterId = chapterDir.split('-')[1]; // "12"
  const exerciseId = fileName.replace('.json', ''); // "12.1"

  return { id: exerciseId, bookId: bookId, chapterId: chapterId };
});

export function getExercisesForChapter(bookId: string | undefined, chapterId: string | undefined): Exercise[] {
  if (!bookId || !chapterId) return [];
  
  return allExercises
    .filter(ex => ex.bookId === bookId && ex.chapterId === chapterId)
    .sort((a, b) => {
        // Sort numerically, e.g., 12.1, 12.2, 12.10
        const aParts = a.id.split('.').map(Number);
        const bParts = b.id.split('.').map(Number);
        if (aParts[0] !== bParts[0]) return aParts[0] - bParts[0];
        const aVal = aParts[1] ?? 0;
        const bVal = bParts[1] ?? 0;
        return aVal - bVal;
    });
}