-  const createArticleLinks = () => {
  -    return Object.keys(articles).map((key) => {
    -      const article = articles[ key ];
    -      let pathToArticlePage = article.slug;
    -      // if article is not a direct child of this section but is that of the section's subsection
      -      if (subsections[ article.sectionSlug ] !== undefined) {
      -        pathToArticlePage = article.sectionSlug + '/' + article.slug;
      -      }
    -      return (
      -        <li key={article.id}>
        -          <Link to={match.url + '/' + pathToArticlePage}>{article.title}</Link>
        +        <li key={subsection.id} className={classes.subsectionBar}>
        +          <Link to={match.url + '/' + subsection.slug} className={classes.subsectionLink}>{subsection.name}</Link>
      </li>
        );
        });
        };