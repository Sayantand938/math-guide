import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { getChapters } from '@/lib/data-service';
import { ChevronRight } from 'lucide-react';
import chapterMap from '@/data/chapter-map.json';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const HomePage = () => {
  const chapters = getChapters();

  return (
    <div>
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-primary">
          {chapterMap.book} - Class {chapterMap.class}
        </h1>
        <p className="text-muted-foreground">Select a chapter to begin.</p>
      </motion.div>

      <motion.div
        className="grid gap-4 md:grid-cols-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {chapters.map((chapter) => (
          <motion.div
            key={chapter.sl}
            variants={itemVariants}
            whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 300 } }}
            whileTap={{ scale: 0.98 }}
          >
            <Link to={`/chapter/${chapter.sl}`} className="block outline-none focus:ring-2 focus:ring-ring rounded-xl">
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Chapter {chapter.sl}: {chapter.title}</span>
                    <ChevronRight className="text-muted-foreground flex-shrink-0" />
                  </CardTitle>
                </CardHeader>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default HomePage;