// File: src/pages/HomePage.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { type Book, getBooks } from '@/lib/data-service';
import { ChevronRight } from 'lucide-react';
import HomePageSkeleton from '@/components/skeletons/HomePageSkeleton';

const HomePage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      const booksData = await getBooks();
      setBooks(booksData);
      setLoading(false);
    };

    // Simulate delay for a smoother loading experience
    setTimeout(() => loadBooks(), 300);
  }, []);

  if (loading) {
    return <HomePageSkeleton />;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary">
          Math Guide
        </h1>
        <p className="text-muted-foreground">Select a book to begin.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {books.map((book) => (
          <div key={book.id}>
            <Link to={`/book/${book.id}`} className="block outline-none focus:ring-2 focus:ring-ring rounded-xl">
              <Card className="transition-transform hover:scale-[1.02]">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>{book.book} - Class {book.class}</span>
                    <ChevronRight className="text-muted-foreground flex-shrink-0" />
                  </CardTitle>
                </CardHeader>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;