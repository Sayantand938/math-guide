import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { type Book, getBookById } from '@/lib/data-service';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import HomePageSkeleton from '@/components/skeletons/HomePageSkeleton';
import { Button } from '@/components/ui/button';

const ChapterListPage = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const [book, setBook] = useState<Book | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setBook(getBookById(bookId));
      setLoading(false);
    }, 300);
  }, [bookId]);

  if (loading) {
    return <HomePageSkeleton />;
  }

  if (!book) {
     return (
      <div className="text-center">
        <h2 className="text-xl font-bold text-destructive">Book not found.</h2>
        <Button asChild variant="link" className="mt-4">
          <Link to="/">Go back to Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
       <Button asChild variant="ghost" className="mb-6 -ml-4">
        <Link to="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Books
        </Link>
      </Button>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary">
          {book.book} - Class {book.class}
        </h1>
        <p className="text-muted-foreground">Select a chapter to begin.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {book.chapters.map((chapter) => (
          <div key={chapter.sl}>
            <Link to={`/book/${bookId}/chapter/${chapter.sl}`} className="block outline-none focus:ring-2 focus:ring-ring rounded-xl">
              <Card className="transition-transform hover:scale-[1.02]">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Chapter {chapter.sl}: {chapter.title}</span>
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

export default ChapterListPage;