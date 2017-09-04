import React from "react";
import injectSheet from "react-jss";
import { getNewspapers } from "../selectors";

const styles = {
  IssuuViewer: {},
  issuu: {
    width: 500,
    height: 500,
  },
};

const IssuuViewer = ({ classes, newspapers, volume, issue }) => {
  const newspaper = newspapers[newspapers.length - 1];
  if (volume && issue) {
    const newspaper = newspapers.find(
      (volume, issue) =>
        volume === newspaper.volume && issue === newspaper.issue,
    );
  }
  return (
    <div className={classes.IssuuViewer}>
      <h3>
        Volume {newspaper.volume} Issue {newspaper.issue}
      </h3>
      <iframe
        className={classes.issuu}
        src={`//e.issuu.com/embed.html#${newspaper.config}`}
        frameborder="0"
        allowfullscreen
      />
    </div>
  );
};

const mapStateToProps = state => ({
  newspapers: getNewspapers(state),
});

export default connect(mapStateToProps)(injectSheet(styles)(IssuuViewer));
