import { Link } from 'gatsby';
import { ScoreValue } from '../../contexts/QuestionContext';

export type AnswerListProps = {
  answers: {
    value: string;
    scoring: ScoreValue[];
  }[];
  nextPath: string;
  onClick: (values: ScoreValue[]) => void;
};

export const AnswerList = ({ answers, nextPath, onClick }: AnswerListProps) => {
  return (
    <ol>
      {answers.map(({ value, scoring }) => (
        <Link key={value} to={nextPath}>
          <li onClick={() => onClick(scoring)}>{value}</li>
        </Link>
      ))}
    </ol>
  );
};