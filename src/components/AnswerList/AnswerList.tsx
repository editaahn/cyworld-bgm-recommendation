import { ScoreValue, useQuestionContext } from '../../contexts/QuestionContext';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import styled from '@emotion/styled';
import { Spacing } from '../Spacing';

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
    <List>
      {answers.map(({ value, scoring, image }) => (
        <Item onClick={() => onClick(scoring)} key={value}>
          <AnswerText>{value}</AnswerText>
          <Spacing height={10} />
          {image &&
              <GatsbyImage
                image={image}
                alt={value}
              />
          }
        </Item>
      ))}
    </List>
  );
};

const List = styled.ul`
  display: grid;
  grid-gap: 30px;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: max(300px);
  list-style: none;
`;

const Item = styled.li`
  width: 100%; 
  display: flex; 
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
`;

const AnswerText = styled.p`
  font-weight: bold;
  text-align: center;
`;