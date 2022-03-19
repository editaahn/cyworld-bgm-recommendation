import React from 'react';
import { QuestionContext } from './src/contexts/QuestionContext';

export const wrapRootElement = ({ element }) => (
  <QuestionContext>{element}</QuestionContext>
);