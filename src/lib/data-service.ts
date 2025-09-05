// File: src/lib/data-service.ts

// --- Type Definitions (add Exercise to Chapter) ---
export interface Chapter {
  sl: number;
  title: string;
  exercises?: string[]; // Array of exercise IDs, e.g., ["12.1", "12.2"]
}

export interface Book {
  id: string;
  class: number;
  book: string;
  chapters: Chapter[];
}

export interface Exercise {
  id: string;
  bookId: string;
  chapterId: string;
}


// --- Data Fetching & Caching ---
let booksCache: Book[] | null = null;

/**
 * Fetches the list of all books from the public directory.
 * Caches the result to avoid repeated network requests.
 */
export async function getBooks(): Promise<Book[]> {
  if (booksCache) {
    return booksCache;
  }
  try {
    const response = await fetch('/books/books.json');
    if (!response.ok) throw new Error("Failed to fetch books index.");
    const data: Book[] = await response.json();
    booksCache = data;
    return data;
  } catch (error) {
    console.error(error);
    return []; // Return empty array on error
  }
}

/**
 * Gets a single book by its ID.
 */
export async function getBookById(bookId: string | undefined): Promise<Book | undefined> {
  if (!bookId) return undefined;
  const books = await getBooks();
  return books.find(b => b.id === bookId);
}

/**
 * Gets a single chapter by its book ID and chapter ID (serial number).
 */
export async function getChapterById(bookId: string | undefined, chapterId: string | undefined): Promise<Chapter | undefined> {
  const book = await getBookById(bookId);
  if (!book || !chapterId) return undefined;
  return book.chapters.find(c => c.sl.toString() === chapterId);
}

/**
 * Gets the list of exercises for a given chapter.
 */
export function getExercisesForChapter(chapter: Chapter | undefined): string[] {
  if (!chapter || !chapter.exercises) return [];
  
  // Sort numerically, e.g., 12.1, 12.2, 12.10
  return [...chapter.exercises].sort((a, b) => {
      const aNum = parseFloat(a);
      const bNum = parseFloat(b);
      return aNum - bNum;
  });
}