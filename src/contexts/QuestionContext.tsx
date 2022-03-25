import { findKey } from 'lodash';
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
  finalResult: ScoreValue | null;
  addScores: (items: ScoreValue[]) => void;
  setNextQuestion: () => void;
  getResult: () => void;
};

export const QuestionContext = createContext({} as StepStatus);

type QuestionProviderProps = {
  children: ReactNode;
};

export const QuestionProvider = ({ children }: QuestionProviderProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [score, setScore] = useState({} as StepStatus['score']);
  const [testResult, setTestResult] = useState<ScoreValue | null>(null);

  const addScores = (values: ScoreValue[]) => {
    setScore(prev => {
      return values.reduce((acc, value) => ({
        ...acc,
        [value]: value in acc ? acc[value] + 1 : 1
      }), prev);
    });
  };

  const setNextQuestion = () => {
    setCurrentQuestion(prev => prev + 1);
  };

  const getResult = () => setTestResult(() => {
    if (!score) {
      return null;
    }
    const highestScore = Math.max(...Object.values(score));
    return findKey(score, value => value === highestScore) as ScoreValue;
  });

  return (
    <QuestionContext.Provider
      value={{
        currentQuestion,
        score,
        finalResult: testResult,
        addScores,
        setNextQuestion,
        getResult
      }}>
      {children}
    </QuestionContext.Provider>
  );
};

export const useQuestionContext = () => useContext(QuestionContext);
