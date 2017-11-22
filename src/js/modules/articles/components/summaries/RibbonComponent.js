import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const RibbonComponent = ({
  classes,
  article,
  section,
  sections,
  featuredMedia,
}) => {
  return (
    <div className={classes.RibbonComponent}>
      {featuredMedia && (
        <div>
          <Link to={`${section.permalink}/${article.slug}`} className={classes.title}>
            <figure className={classes.figure}>
              <img src={featuredMedia.thumbAttachmentUrl} />
            </figure>
          </Link>
        </div>
      )}
      <Link to={section.permalink} className={classes.sectionLabel}>
        {section.name === "Arts & Entertainment" ? "A&E" : section.name}
      </Link>
      <Link to={`${section.permalink}/${article.slug}`} className={classes.title}>
        {article.title}
      </Link>
    </div>
  );
};

const mapStateToProps = state => ({
  sections: state.sections.sections,
});

export default connect(mapStateToProps)(RibbonComponent);
