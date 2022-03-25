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
        videoId
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
        videoId: string;
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
        {/* TODO: 유튜브 연결 */}
        <iframe width="560" height="315"
          src={`https://www.youtube.com/embed/${song.videoId}`} 
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen={true}
        >
        </iframe>
      </section>
    </main >
  );
};

export default ResultPage;