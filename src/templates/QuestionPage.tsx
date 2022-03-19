import { AnswerList, AnswerListProps } from '../components/AnswerList/AnswerList';
import { graphql } from 'gatsby';
import { Question } from '../components/Question';
import styled from '@emotion/styled';
import { useQuestionContext } from '../contexts/QuestionContext';
import { useMemo } from 'react';

// createPage의 context를 통해 pageNumber가 전달됨
export const query = graphql`
  query QuestionPage($pageNumber: Int!) {
    dataJson(order: { eq: $pageNumber }) {
      question
      answers {
        scoring
        value
      }
    }
    sitePage {
      path
    }  
  }
`;

type QuestionProps = {
  data: {
    dataJson: {
      question: string;
    } & AnswerListProps;
    sitePage: {
      path: string;
    }
  };
};

// query의 result가 data prop으로 전달됨
const QuestionPage = ({ data }: QuestionProps) => {
  const { question, answers } = data.dataJson;
  const { path } = data.sitePage;
  const { addScores } = useQuestionContext();

  const nextPath = useMemo(() => {
    const splitedPath: (string | number)[] = path.split('/');
    const nextStep = Number(splitedPath.pop()) + 1;
    return splitedPath.concat(nextStep).join('/')
  }, []);

  return (
    <Container>
      <Question>{question}</Question>
      <AnswerList answers={answers} nextPath={nextPath} onClick={addScores} />
    </Container>
  );
};

export default QuestionPage;

const Container = styled.div`
`;