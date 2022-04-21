import { Answer, AnswerList, AnswerListProps } from '../components/AnswerList/AnswerList';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useQuestionContext } from '../contexts/QuestionContext';
import { navigate } from 'gatsby-link';
import { getImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { Background } from '../components/Background';

// createPage의 context를 통해 pageNumber가 전달됨
export const query = graphql`
  query QuestionPage($pageNumber: Int!, $regexToFindImage: String) {
    qnaJson(order: { eq: $pageNumber }) {
      question
      answers {
        scoring
        value
      }
    }
    images: allFile(
      filter: { name: { regex: $regexToFindImage }, relativePath: { regex: "images/answers/" } }
    ) {
      nodes {
        childImageSharp {
          gatsbyImageData(
            width: 300
            placeholder: DOMINANT_COLOR
          )
        }
        name
      }
    }
  }
`;

type QuestionProps = {
  data: {
    qnaJson: {
      question: string;
      answers: Pick<Answer, 'scoring' | 'value'>[];
    };
    images: { nodes: (IGatsbyImageData & { name: string; })[]; };
  };
  pageContext: {
    pageNumber: number;
    isLastPage: boolean;
  };
};

// query의 result가 data prop으로 전달됨
const QuestionPage = ({ data, pageContext }: QuestionProps) => {
  const { images, qnaJson: { question, answers } } = data;

  const answersWithImage = answers.map((answer, index) => {
    const imageData = images.nodes.find(image => Number(image.name.slice(-1)) === index + 1);
  return {
      ...answer,
      image: imageData ? getImage(imageData) : undefined,
    };
  });

  const { pageNumber, isLastPage } = pageContext;
  const { currentQuestion, finalResult, getResult } = useQuestionContext();

  // 모든 페이지 이동은 Page에서 진행
  useEffect(() => {
    if (currentQuestion !== pageNumber) {
      navigate('/question/1');
    }
  }, []);

  useEffect(() => {
    if (currentQuestion > 1) {
      navigate(`/question/${currentQuestion}`);
    }
  }, [currentQuestion]);

  useEffect(() => {
    if (finalResult) {
      navigate(`/result/${finalResult}`);
    }
  }, [finalResult]);

  return (
    <Background>
      <Container>
        <Question>{question}</Question>
        <Spacing height={30} />
        <AnswerList
          answers={answersWithImage}
          isLastPage={isLastPage}
        />
      </Container>
    </Background>
  );
};

export default QuestionPage;

const Container = styled.main`
  width: 90vw;
  max-width: 1000px;
  margin: 0 auto;
  padding: 50px 0;
`;

const Question = styled.h2`
  text-align: center;
`;

const Spacing = styled.div<{ width?: number; height?: number; }>`
  width: ${props => props.width ?? 1}px;
  height: ${props => props.height ?? 1}px;
`;