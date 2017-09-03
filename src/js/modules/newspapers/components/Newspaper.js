import React from "react";
import injectSheet from "react-jss";
import { getNewspapers } from "../selectors";

const styles = {
  newspaperContainer: {},
  newspaperPage: {},
  issuu: {
    width: 500,
    height: 500,
  },
};

const IssuuViewer = ({ newspapers, volume, issue }) => {
  const newspaper = newspapers.find(
    newspaper => newspaper.volume === volume && newspaper.issue === issue,
  );
  return (
    <div className={classes.newspaperPage}>
      <div className={classes.newspaperContainer}>
        <h3>Volume {volume} Issue {issue}</h3>
        <iframe
          className={classes.issuu}
          src={`//e.issuu.com/embed.html#${newspaper.config}`}
          frameborder="0"
          allowfullscreen
        />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  newspapers: getNewspapers(state),
});

export default connect(mapStateToProps)(injectSheet(styles)(IssuuViewer));
