import React from 'react';
import { AnswerList } from '../components/AnswerList/AnswerList';
import { graphql, useStaticQuery } from 'gatsby';

export const query = graphql`
  query QuestionAndAnswers($pageNumber: Int!) {
    dataJson(order: {eq: $pageNumber }) {
      question
      answers {
        scoring
        value
      }
    }
  }
`;

const Question = ({ data }) => {
  console.log(data)
  return (
    <AnswerList question={data?.dataJson.question ?? ''} answers={data?.dataJson.answers ?? []} />
  );
};

export default Question;