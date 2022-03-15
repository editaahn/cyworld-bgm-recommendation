exports.createPages = async ({ actions: { createPage }, graphql }) => {
  const result = await graphql(`
    {
      allDataJson {
        totalCount
      }
    }
  `);

  Array(result.totalCount).forEach((_, index) => {
    const pageNumber = index + 1;
    createPage({
      path: `/question/${pageNumber}`,
      component: require.resolve("./src/templates/question.tsx"),
      context: {
        pageNumber,
      },
    });
  });
};
