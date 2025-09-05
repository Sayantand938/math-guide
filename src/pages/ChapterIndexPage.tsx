import { useState, useEffect } from 'react';
import { Link, useParams, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getChapterById, getExercisesForChapter, type Chapter, type Exercise } from '@/lib/data-service';
import { ArrowLeft } from 'lucide-react';
import ChapterIndexPageSkeleton from '@/components/skeletons/ChapterIndexPageSkeleton';

const ChapterIndexPage = () => {
  const { bookId, chapterId } = useParams<{ bookId: string; chapterId: string }>();
  const [chapter, setChapter] = useState<Chapter | undefined>(undefined);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      const chapterData = getChapterById(bookId, chapterId);
      if (chapterData) {
        setChapter(chapterData);
        setExercises(getExercisesForChapter(bookId, chapterId));
      }
      setLoading(false);
    };
    
    // Simulate network delay
    setTimeout(loadData, 300);
  }, [bookId, chapterId]);

  if (loading) {
    return <ChapterIndexPageSkeleton />;
  }

  if (!chapter) {
    return (
      <div className="text-center">
        <h2 className="text-xl font-bold text-destructive">Chapter not found.</h2>
        <Button asChild variant="link" className="mt-4">
          <Link to={`/book/${bookId}`}>Go back to Chapters</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Button asChild variant="ghost" className="mb-6 -ml-4">
        <Link to={`/book/${bookId}`}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Chapters
        </Link>
      </Button>
      <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2">Chapter {chapter.sl}: {chapter.title}</h1>
      <p className="text-muted-foreground mb-8">Select an exercise to view its solutions.</p>
      
      {exercises.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {exercises.map((exercise) => (
            <div key={exercise.id}>
              <Button asChild size="lg">
                  <NavLink to={`/book/${bookId}/chapter/${chapter.sl}/${exercise.id}`}>
                      {exercise.id}
                  </NavLink>
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No exercises found for this chapter yet.</p>
      )}
    </div>
  );
};

export default ChapterIndexPage;