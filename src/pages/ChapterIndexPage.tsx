import { Link, useParams, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getChapterById, getExercisesForChapter } from '@/lib/data-service';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
  },
};

const ChapterIndexPage = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const chapter = getChapterById(chapterId);
  const exercises = getExercisesForChapter(chapterId);

  if (!chapter) {
    return (
      <div className="text-center">
        <h2 className="text-xl font-bold text-destructive">Chapter not found.</h2>
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
          Back to Chapters
        </Link>
      </Button>
      <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2">Chapter {chapter.sl}: {chapter.title}</h1>
      <p className="text-muted-foreground mb-8">Select an exercise to view its solutions.</p>
      
      {exercises.length > 0 ? (
        <motion.div 
          className="flex flex-wrap gap-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {exercises.map((exercise) => (
            <motion.div
              key={exercise.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild size="lg">
                  <NavLink to={`/chapter/${chapter.sl}/${exercise.id}`}>
                      {exercise.id}
                  </NavLink>
              </Button>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="text-muted-foreground">No exercises found for this chapter yet.</p>
      )}
    </div>
  );
};

export default ChapterIndexPage;