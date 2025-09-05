import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { type Chapter, getChapters } from '@/lib/data-service';
import { ChevronRight } from 'lucide-react';
import chapterMap from '@/data/chapter-map.json';
import HomePageSkeleton from '@/components/skeletons/HomePageSkeleton';

const HomePage = () => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate network delay for showing skeleton
    setTimeout(() => {
      setChapters(getChapters());
      setLoading(false);
    }, 300); 
  }, []);

  if (loading) {
    return <HomePageSkeleton />;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary">
          {chapterMap.book} - Class {chapterMap.class}
        </h1>
        <p className="text-muted-foreground">Select a chapter to begin.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {chapters.map((chapter) => (
          <div key={chapter.sl}>
            <Link to={`/chapter/${chapter.sl}`} className="block outline-none focus:ring-2 focus:ring-ring rounded-xl">
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

export default HomePage;