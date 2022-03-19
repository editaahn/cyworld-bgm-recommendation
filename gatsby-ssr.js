import React from 'react';
import { QuestionProvider } from './src/contexts/QuestionContext';

export const wrapRootElement = ({ element }) => (
  <QuestionProvider>{element}</QuestionProvider>
);