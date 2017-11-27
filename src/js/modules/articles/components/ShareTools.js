import React from "react";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { ShareButtons, generateShareIcon } from "react-share";

import { STUY_SPEC_URL } from "../../../constants";

const {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  EmailShareButton
} = ShareButtons;

const FacebookIcon = generateShareIcon("facebook");
const TwitterIcon = generateShareIcon("twitter");
const LinkedinIcon = generateShareIcon("linkedin");
const EmailIcon = generateShareIcon("email");

const styles = {
  ShareTools: {
    display: "flex",
    "& > div:not(:last-child)": {
      marginRight: "14px"
    }
  }
};

const SHARE_BUTTON_SIZE = 28;
const SHARE_BUTTON_COLOR = "#000";

const ShareTools = ({ classes, article, section, outquotes }) => {
  const shareUrl = STUY_SPEC_URL + `${section.permalink}/${article.slug}`;
  const { title, summary } = article;
  const outquote = Object.values(outquotes).find(
    outquote => outquote.articleId === article.id
  );

  const emailBody = `${title}—${summary}\n\n${shareUrl}`;
  return (
    <div className={classes.ShareTools}>
      <div className={classes.shareButton} key={0}>
        <FacebookShareButton
          url={shareUrl}
          hashtag={"#stuyspec"}
          quote={outquote && outquote.text}
        >
          <FacebookIcon
            size={SHARE_BUTTON_SIZE}
            logoFillColor={SHARE_BUTTON_COLOR}
            iconBgStyle={{ fill: "white", stroke: "#ddd", "stroke-width": 1.5 }}
            round
          />
        </FacebookShareButton>
      </div>
      <div className={classes.shareButton} key={1}>
        <TwitterShareButton
          url={shareUrl}
          title={title}
          hashtags={["stuyspec"]}
        >
          <TwitterIcon
            size={SHARE_BUTTON_SIZE}
            logoFillColor={SHARE_BUTTON_COLOR}
            iconBgStyle={{ fill: "white", stroke: "#ddd", "stroke-width": 1.5 }}
            round
          />
        </TwitterShareButton>
      </div>
      <div className={classes.shareButton} key={2}>
        <LinkedinShareButton url={shareUrl} title={title} description={summary}>
          <LinkedinIcon
            size={SHARE_BUTTON_SIZE}
            logoFillColor={SHARE_BUTTON_COLOR}
            iconBgStyle={{ fill: "white", stroke: "#ddd", "stroke-width": 1.5 }}
            round
          />
        </LinkedinShareButton>
      </div>
      <div className={classes.shareButton} key={3}>
        <EmailShareButton
          url={shareUrl}
          subject={`StuySpec.com: ${title}`}
          body={emailBody}
        >
          <EmailIcon
            size={SHARE_BUTTON_SIZE}
            logoFillColor={SHARE_BUTTON_COLOR}
            iconBgStyle={{ fill: "white", stroke: "#ddd", "stroke-width": 1.5 }}
            round
          />
        </EmailShareButton>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  outquotes: state.outquotes.outquotes
});

export default connect(mapStateToProps)(injectSheet(styles)(ShareTools));
