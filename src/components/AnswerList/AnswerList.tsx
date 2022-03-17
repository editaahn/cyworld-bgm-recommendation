import React from 'react';

export type AnswerListProps = {
  answers: {
    value: string;
    scoring: string[];
  }[];
};

export const AnswerList = ({ answers }: AnswerListProps) => {
  return (
    <ol>
      {answers.map(({ value }) => (
        <li>{value}</li>
      ))}
    </ol>
  );
};