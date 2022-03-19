import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export enum ScoreValue {
  CUTE = 'cute',
  HIPHOP = 'hiphop',
  EXCITING = 'exciting',
  LONELY = 'lonely',
  SAD = 'sad',
  FRESH = 'fresh',
  SENTIMENTAL = 'sentimental'
}

type StepStatus = {
  currentQuestion: number;
  score: Record<ScoreValue, number>;
  addScores: (items: ScoreValue[]) => void;
};

export const QuestionContext = createContext<StepStatus>({
  currentQuestion: 1,
  score: {},
  addScores: () => console.log('before'),
});

type QuestionProviderProps = {
  children: ReactNode;
};

export const QuestionProvider = ({ children }: QuestionProviderProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState({} as StepStatus['score']);

  const addScores = (values: ScoreValue[]) => {
    console.log('clicked');
    setScore(prev => {
      return values.reduce((acc, value) => ({
        ...acc,
        [value]: value in acc ? acc[value] + 1 : 1
      }), prev);
    });
  };

  useEffect(() => console.log('hydrate')
    , []);

  return <QuestionContext.Provider value={{ currentQuestion, score, addScores }}>{children}</QuestionContext.Provider>;
};

