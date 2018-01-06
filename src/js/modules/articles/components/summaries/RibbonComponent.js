import React from "react";
import { Link } from "react-router-dom";

const RibbonComponent = ({ classes, article }) => {
  let featuredMedia = null;
  if (article.media.length > 0) {
    featuredMedia = article.media.find(medium => medium.isFeatured);
  }
  const { section } = article;
  return (
    <div className={classes.RibbonComponent}>
      {featuredMedia && (
        <div>
          <Link
            to={`${section.permalink}/${article.slug}`}
            className={classes.title}
          >
            <figure className={classes.figure}>
              <img src={featuredMedia.thumbAttachmentUrl} />
            </figure>
          </Link>
        </div>
      )}
      <Link to={section.permalink} className={classes.sectionLabel}>
        {section.name === "Arts & Entertainment" ? "A&E" : section.name}
      </Link>
      <Link
        to={`${section.permalink}/${article.slug}`}
        className={classes.title}
      >
        {article.title}
      </Link>
    </div>
  );
};

export default RibbonComponent;
