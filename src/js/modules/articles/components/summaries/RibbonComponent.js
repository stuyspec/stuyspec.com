import React from "react";
import { Link } from "react-router-dom";

const RibbonComponent = ({ classes, article, section, featuredMedia }) => {
  return (
    <div className={classes.RibbonComponent}>
      {featuredMedia && (
        <div>
          <figure className={classes.figure}>
            <img src={featuredMedia.thumbAttachmentUrl} />
          </figure>
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