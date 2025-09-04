// src\components\ExerciseDisplay.tsx
import 'katex/dist/katex.min.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LatexRenderer from './LatexRenderer';

// Updated interfaces to handle both content and problem_statement
interface SubQuestion {
  sub_question_no: string;
  content?: string;
  problem_statement?: string;
  is_correct?: boolean;
  solution: string[];
}

interface Question {
  question_no: string;
  content: string;
  sub_questions?: SubQuestion[];
  solution?: string[];
}

interface ExerciseData {
  title: string;
  chapter: string;
  questions: Question[];
}

interface ExerciseDisplayProps {
  data: ExerciseData;
}

const ExerciseDisplay = ({ data }: ExerciseDisplayProps) => {
  if (!data) {
    return <div>No exercise data available.</div>;
  }

  return (
    <div>
      {data.questions.map((question) => (
        <Card key={question.question_no} className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-start gap-2 text-lg">
              <span className="font-bold text-primary flex-shrink-0">Q{question.question_no}:</span>
              <div className="font-bold">
                <LatexRenderer text={question.content} />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {question.sub_questions && (
              <div className="space-y-4">
                {question.sub_questions.map((subQ, subIndex) => (
                  <div key={subIndex} className="p-4 border rounded-md bg-muted/50">
                    <div className="flex items-start gap-2 mb-3 font-semibold">
                      <span className="flex-shrink-0">{subQ.sub_question_no}</span>
                      <div><LatexRenderer text={subQ.content || subQ.problem_statement || ''} /></div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-sm">Solution:</h4>
                      <div className="pl-4 border-l-2 border-primary space-y-2 text-sm">
                        {subQ.solution.map((step, stepIndex) => (
                          <div key={stepIndex} className="flex items-start gap-2">
                             <span className='opacity-70 flex-shrink-0'>{stepIndex + 1}.</span> 
                             <div><LatexRenderer text={step} /></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {question.solution && (
              <div>
                <h4 className="font-semibold mb-2 text-sm">Solution:</h4>
                <div className="pl-4 border-l-2 border-primary space-y-2 text-sm">
                  {question.solution.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-start gap-2">
                       <span className='opacity-70 flex-shrink-0'>{stepIndex + 1}.</span> 
                       <div><LatexRenderer text={step} /></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ExerciseDisplay;