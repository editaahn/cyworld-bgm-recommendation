import styled from "@emotion/styled";
import { Link } from "gatsby";
import { Container } from "../components/Container";
import '../../global.css';
import { Background } from "../components/Background";

const IndexPage = () => {
  return (
    <Background>
      <Container>
        <TitleWrapper>
          <Title>싸이월드 BGM을 추천해드립니다</Title>
        </TitleWrapper>
        <StartButton>
          <Link to='/question/1'>Start!</Link>
        </StartButton>
      </Container>
    </Background>
  );
};

export default IndexPage;

const TitleWrapper = styled.div`
  max-width: 375px;
  padding: 0 30px;
`;

const Title = styled.h1`
  text-align: center;
  word-break: keep-all;
`;

const StartButton = styled.div`
  width: 200px;
  height: 40px;
  border-radius: 20px;
  box-shadow: 1px 0px 10px 5px #fff9;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;

  a {
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 40px;
    font-size: 18px;
    font-weight: bold;
  }
`;