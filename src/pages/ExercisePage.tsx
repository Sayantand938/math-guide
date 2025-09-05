// File: src/pages/ExercisePage.tsx
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ExerciseDisplay from '../components/ExerciseDisplay';
import { ArrowLeft } from 'lucide-react';
import ExercisePageSkeleton from '@/components/skeletons/ExercisePageSkeleton';

interface ExerciseData {
    title: string;
    chapter: string;
    questions: any[];
}

const ExercisePage = () => {
  const [exerciseData, setExerciseData] = useState<ExerciseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { bookId, chapterId, exerciseId } = useParams<{ bookId: string; chapterId: string; exerciseId: string }>();

  useEffect(() => {
    const fetchExercise = async () => {
      setLoading(true);
      setError(null);
      setExerciseData(null);
      try {
        const response = await fetch(`/books/${bookId}/chapter-${chapterId}/${exerciseId}.json`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setExerciseData(data);
      } catch (err) {
        console.error("Failed to load exercise data:", err);
        setError('Failed to load exercise data. Please check the URL and try again.');
      } finally {
        setTimeout(() => setLoading(false), 300);
      }
    };

    if (bookId && chapterId && exerciseId) {
      fetchExercise();
    }
  }, [bookId, chapterId, exerciseId]);

  if (loading) return <ExercisePageSkeleton />;
  if (error) return <div className="text-destructive">{error}</div>;
  if (!exerciseData) return <div>No exercise data available.</div>;

  return (
    <div>
      <Button asChild variant="ghost" className="mb-6 -ml-4">
        <Link to={`/book/${bookId}/chapter/${chapterId}`}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Exercises
        </Link>
      </Button>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary">{exerciseData.title}</h1>
        <p className="text-muted-foreground">{exerciseData.chapter}</p>
      </div>
      <ExerciseDisplay data={exerciseData} />
    </div>
  );
};

export default ExercisePage;