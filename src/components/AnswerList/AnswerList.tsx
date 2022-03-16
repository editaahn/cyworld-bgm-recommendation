import React from 'react';

export type AnswerListProps = {
  answers: {
    value: string;
    scoring: string[];
  }[];
};

export const AnswerList = ({ answers }: AnswerListProps) => {
  console.log(answers);
  return (
    <ol>
      {answers.map(({ value }) => (
        <li>{value}</li>
      ))}
    </ol>
  );
};