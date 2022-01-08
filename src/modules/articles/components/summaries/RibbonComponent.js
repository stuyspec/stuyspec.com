// RibbonComponents are mapped inline to a ribbon (e.g. LatestArticlesRibbon).
// Ribbons are components for content that stretch across the window.

import React from 'react';
import { Link } from 'react-router-dom';

function RibbonComponent({ classes, article }) {
  const { section } = article;
  return (
    <div className={classes.RibbonComponent}>
      {article.media.length > 0 && (
        <div>
          <Link
            to={`${section.permalink}/${article.slug}`}
            className={classes.title}
          >
            <figure className={classes.figure}>
              <img
                src={article.media[0].thumb_attachment_url}
                alt={article.media[0].title}
              />
            </figure>
          </Link>
        </div>
      )}
      <Link to={section.permalink} className={classes.sectionLabel}>
        {section.name === 'Arts & Entertainment' ? 'A&E' : section.name}
      </Link>
      <Link
        to={`${section.permalink}/${article.slug}`}
        className={classes.title}
      >
        {article.title}
      </Link>
    </div>
  );
}

export default RibbonComponent;
