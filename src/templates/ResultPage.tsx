import { graphql } from 'gatsby';

export const query = graphql`
  query ResultPage($category: String!) {
    resultJson(jsonId: {eq: $category}) {
      metaData {
        description
        name
      }
      songs {
        artist
        url
        title
      }
    }
  }
`;

type ResultPageProps = {
  data: {
    resultJson: {
      metaData: {
        description: string;
        name: string;
      };
      songs: {
        artist: string;
        url: string;
        title: string;
      }[];
    };
  };
};

const ResultPage = ({ data }: ResultPageProps) => {
  const { resultJson: { metaData, songs } } = data;
  const song = songs[Math.floor(Math.random() * songs.length)];

  return (
    <main>
      <header>
        <p>당신의 감성을 한 단어로 압축한다면..</p>
        <h1>{metaData.name.split('').join('.')}</h1>
      </header>
      <section>
        <p>{metaData.description}</p>
        <strong>{song.artist} - {song.title}</strong>
        <a target="_blank" href={song.url}>들으러 가기</a>
        {/* TODO: 유튜브 연결 */}
      </section>
    </main>
  );
};

export default ResultPage;