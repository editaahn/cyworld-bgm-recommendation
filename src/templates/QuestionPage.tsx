import React from 'react';
import { AnswerList, AnswerListProps } from '../components/AnswerList/AnswerList';
import { graphql } from 'gatsby';
import { Question } from '../components/Question';
import styled from '@emotion/styled';

// createPage의 context를 통해 pageNumber가 전달됨
export const query = graphql`
  query QuestionAndAnswers($pageNumber: Int!) {
    dataJson(order: { eq: $pageNumber }) {
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
    dataJson: {
      question: string;
    } & AnswerListProps;
  };
};

// query의 result가 data prop으로 전달됨
const QuestionPage = ({ data }: QuestionProps) => {
  const { question, answers } = data.dataJson;

  return (
    <Container>
      <Question>{question}</Question>
      <AnswerList answers={answers} />
    </Container>
  );
};

export default QuestionPage;

const Container = styled.div`
`;