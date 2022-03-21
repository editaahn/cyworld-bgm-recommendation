import { AnswerList, AnswerListProps } from '../components/AnswerList/AnswerList';
import { graphql } from 'gatsby';
import { Question } from '../components/Question';
import styled from '@emotion/styled';
import { useQuestionContext } from '../contexts/QuestionContext';
import { useMemo } from 'react';

// createPage의 context를 통해 pageNumber가 전달됨
export const query = graphql`
  query QuestionPage($pageNumber: Int!) {
    qnaJson(order: { eq: $pageNumber }) {
      order
      question
      answers {
        scoring
        value
      }
    }
  }
`;

type QuestionProps = {
  data: {
    qnaJson: {
      question: string;
      order: number;
    } & AnswerListProps;
  };
};

// query의 result가 data prop으로 전달됨
const QuestionPage = ({ data }: QuestionProps) => {
  const { order, question, answers } = data.qnaJson;
  const { addScores } = useQuestionContext();

  return (
    <Container>
      <Question>{question}</Question>
      <AnswerList answers={answers} nextPath={`/question/${order + 1}`} onClick={addScores} />
    </Container>
  );
};

export default QuestionPage;

const Container = styled.div`
`;