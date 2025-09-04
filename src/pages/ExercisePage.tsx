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
  const { chapterId, exerciseId } = useParams<{ chapterId: string; exerciseId: string }>();

  useEffect(() => {
    const fetchExercise = async () => {
      setLoading(true);
      setError(null);
      setExerciseData(null);
      try {
        // Dynamic import based on route params
        const data = await import(`../data/chapter-${chapterId}/${exerciseId}.json`);
        setExerciseData(data.default || data);
      } catch (err) {
        console.error("Failed to load exercise data:", err);
        setError('Failed to load exercise data. Please check the URL and try again.');
      } finally {
        // Add a small artificial delay to prevent jarring flashes on fast networks
        setTimeout(() => setLoading(false), 300);
      }
    };

    if (chapterId && exerciseId) {
      fetchExercise();
    }
  }, [chapterId, exerciseId]);

  if (loading) return <ExercisePageSkeleton />;
  if (error) return <div className="text-destructive">{error}</div>;
  if (!exerciseData) return <div>No exercise data available.</div>;

  return (
    <div>
      <Button asChild variant="ghost" className="mb-6 -ml-4">
        <Link to={`/chapter/${chapterId}`}>
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