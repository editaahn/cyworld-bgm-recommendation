import { createContext, ReactNode, useContext, useState } from 'react';

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

export const QuestionContext = createContext({} as StepStatus);

type QuestionProviderProps = {
  children: ReactNode;
};

export const QuestionProvider = ({ children }: QuestionProviderProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState({} as StepStatus['score']);

  const addScores = (values: ScoreValue[]) => {
    setScore(prev => {
      return values.reduce((acc, value) => ({
        ...acc,
        [value]: value in acc ? acc[value] + 1 : 1
      }), prev);
    });
  };

  return <QuestionContext.Provider value={{ currentQuestion, score, addScores }}>{children}</QuestionContext.Provider>;
};

export const useQuestionContext = () => useContext(QuestionContext);
