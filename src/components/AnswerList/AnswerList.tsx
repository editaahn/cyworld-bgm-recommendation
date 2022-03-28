import { ScoreValue, useQuestionContext } from '../../contexts/QuestionContext';

export type AnswerListProps = {
  answers: {
    value: string;
    scoring: ScoreValue[];
  }[];
  isLastPage: boolean;
};

export const AnswerList = ({ answers, isLastPage }: AnswerListProps) => {
  const { addScores, setNextQuestion, getResult } = useQuestionContext();

  // 이벤트 발생에 따른 state 변경
  const onClick = (scoring: ScoreValue[]) => {
    addScores(scoring);
    if (isLastPage) {
      getResult();
      return;
    }
    setNextQuestion();
  }

  return (
    <ol>
      {answers.map(({ value, scoring }) => (
        <li onClick={() => onClick(scoring)} key={value}>{value}</li>
      ))}
    </ol>
  );
};