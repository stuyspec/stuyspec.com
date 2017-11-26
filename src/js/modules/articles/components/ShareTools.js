import React from "react";
import injectSheet from "react-jss";
import {
  ShareButtons,
  generateShareIcon,
} from "react-share";

import { STUY_SPEC_URL } from "../../../constants";

const {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  EmailShareButton,
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const LinkedinIcon = generateShareIcon('linkedin');
const EmailIcon = generateShareIcon('email');

const styles = {
  ShareTools: {
    display: "flex",
    "& > div:not(:last-child)": {
      marginRight: "14px",
    },
  },
};

const ShareTools = ({ classes, article, section }) => {
  const shareUrl = STUY_SPEC_URL + `${section.permalink}/${article.slug}`;
  const { title } = article
  return (
    <div className={classes.ShareTools}>  
      <div className={classes.shareButton} key={0}>  
        <FacebookShareButton url={shareUrl}>
          <FacebookIcon size={28} logoFillColor={"#000"} iconBgStyle={{'fill': 'white', 'stroke': '#ddd', 'stroke-width': 1.5}} round />
        </FacebookShareButton>
      </div>
      <div className={classes.shareButton} key={1}>
        <TwitterShareButton url={shareUrl}>
          <TwitterIcon size={28} logoFillColor={"#000"} iconBgStyle={{'fill': 'white', 'stroke': '#ddd', 'stroke-width': 1.5}} round />
        </TwitterShareButton>
      </div>
      <div className={classes.shareButton} key={2}>
        <LinkedinShareButton url={shareUrl}>
          <LinkedinIcon size={28} logoFillColor={"#000"} iconBgStyle={{'fill': 'white', 'stroke': '#ddd', 'stroke-width': 1.5}} round />
        </LinkedinShareButton>
      </div>
      <div className={classes.shareButton} key={3}>
        <EmailShareButton url={shareUrl}>
          <EmailIcon size={28} logoFillColor={"#000"} iconBgStyle={{'fill': 'white', 'stroke': '#ddd', 'stroke-width': 1.5}} round />
        </EmailShareButton>
      </div>
    </div>
  );
};

export default injectSheet(styles)(ShareTools);
