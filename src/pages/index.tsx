import styled from "@emotion/styled";
import { Link } from "gatsby";

const IndexPage = () => {
  return (
    <Container>
      <h1>싸이월드 BGM을 추천해드립니다</h1>
      <Link to='/question/1'>Start!</Link>
    </Container>
  );
};

export default IndexPage;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;