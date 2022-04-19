import { ScoreValue, useQuestionContext } from '../../contexts/QuestionContext';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';

export type Answer = {
  value: string;
  scoring: ScoreValue[];
  image?: IGatsbyImageData;
};

export type AnswerListProps = {
  answers: Answer[];
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
  };

  return (
    <ol>
      {answers.map(({ value, scoring, image }) => (
        <li onClick={() => onClick(scoring)} key={value}>
          {value}
          {/* {image && <img src={image} />} */}
          {image && <GatsbyImage image={image} alt={value} objectFit="contain" objectPosition="30%" />}
        </li>
      ))}
    </ol>
  );
};