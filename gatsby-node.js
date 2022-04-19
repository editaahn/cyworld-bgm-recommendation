exports.createPages = async ({ actions: { createPage }, graphql }) => {
  const result = await graphql(`
    {
      allQnaJson {
        totalCount
      }
      allResultJson {
        distinct(field: jsonId)
      }
    }
  `);

  const questionCount = result.data.allQnaJson.totalCount;
  // 질문 페이지 일괄 생성
  Array.from({ length: questionCount }, (_, index) => {
    const pageNumber = index + 1;
    createPage({
      path: `/question/${pageNumber}`,
      component: require.resolve("./src/templates/QuestionPage.tsx"),
      context: {
        pageNumber,
        regexToFindImage: `/${pageNumber}-/`,
        isLastPage: questionCount === pageNumber,
      },
    });
  });

  // 결과 페이지 일괄 생성
  const categories = result.data.allResultJson.distinct;
  categories.forEach((category) => {
    createPage({
      path: `/result/${category}`,
      component: require.resolve("./src/templates/ResultPage.tsx"),
      context: {
        category,
      },
    });
  });
};
