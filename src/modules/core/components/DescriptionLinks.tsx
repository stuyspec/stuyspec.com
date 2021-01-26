import * as React from "react";
import { Link } from "react-router-dom"
import { Description } from "../types"

interface DescriptionLinksProps {
  classes: { [s: string]: string };
  descriptions: Description[];
}

const DescriptionLinks: React.SFC<DescriptionLinksProps> = ({
  classes,
  descriptions
}) => {
  return (
    <div className={classes.sectionBlock} key="about">
      <p className={classes.topLevelSectionLink} key={-1}>
        About Us
      </p>
      {descriptions.map(description => {
        return (
          <Link
            className={classes.subsectionLink}
            key={description.id}
            to={`/about/${description.slug}`}
          >
            {description.title}
          </Link>
        );
      })}
      <a
        className={classes.subsectionLink}
        key={-2}
        href="https://issuu.com/stuyspectator"
      >
        Visual Archives
      </a>
    </div>
  );
};

export default DescriptionLinks;