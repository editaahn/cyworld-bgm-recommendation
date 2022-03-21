exports.createPages = async ({ actions: { createPage }, graphql }) => {
  const result = await graphql(`
    {
      allQnaJson {
        totalCount
      }
    }
  `);

  // 질문 페이지 일괄 생성
  Array.from({ length: result.data.allQnaJson.totalCount }, (_, index) => {
    const pageNumber = index + 1;
    createPage({
      path: `/question/${pageNumber}`,
      component: require.resolve("./src/templates/QuestionPage.tsx"),
      context: {
        pageNumber,
      },
    });
  });
};
