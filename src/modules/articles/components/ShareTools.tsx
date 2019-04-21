import React from "react";
import injectSheet from "react-jss";
import { 
  FacebookShareButton, 
  TwitterShareButton, 
  LinkedinShareButton, 
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  EmailIcon,
} from "react-share";

import { Print } from "../../core/icons";

import { IArticle } from "../queries";

const styles = {
  ShareTools: {
    display: "flex",
    "& > div:not(:last-child)": {
      marginRight: "14px",
    },
  },
};

const navButtonStyles = {
  NavButton: {
    background: "none",
    borderWidth: 0,
    margin: 0,
    padding: 0,
    "&:hover": {
      cursor: "pointer",
    },
  },
  icon: {
    display: "inline",
    margin: 0,
  },
};

interface INavButtonProps {
  classes: any,
  children: React.ReactNode,
  onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
}

const NavButton: React.FunctionComponent<INavButtonProps> = ({ classes, children, onClick }) => {
  return (
    <button className={classes.NavButton} onClick={onClick}>
      <div className={classes.icon}>{children}</div>
    </button>
  );
};
const StyledNavButton = injectSheet(navButtonStyles)(NavButton);

const SHARE_BUTTON_SIZE = 28;
const SHARE_BUTTON_COLOR = "#000";

interface IProps {
  classes: any,
  
}

interface IProps {
  classes: any,
  
}

interface IProps {
  classes: any,
  article: IArticle
}

const ShareTools: React.FunctionComponent<IProps> = ({ classes, article }) => {
  const { section, title, preview, outquotes } = article;
  const shareUrl =
    window.location.hostname + `/${section.permalink}/${article.slug}`;
  const outquote = (outquotes && outquotes[0]) || undefined;

  const emailBody = `${title}: ${preview}\n\n${shareUrl}`;
  return (
    <div className={classes.ShareTools}>
      <div key={0}>
        <FacebookShareButton
          url={shareUrl}
          hashtag={"#stuyspec"}
          quote={outquote && outquote.text}
        >
          <FacebookIcon
            size={SHARE_BUTTON_SIZE}
            logoFillColor={SHARE_BUTTON_COLOR}
            iconBgStyle={{ fill: "white", stroke: "#ddd", strokeWidth: 1.5 }}
            round
          />
        </FacebookShareButton>
      </div>
      <div key={1}>
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
      <div key={2}>
        <LinkedinShareButton url={shareUrl} title={title} description={preview}>
          <LinkedinIcon
            size={SHARE_BUTTON_SIZE}
            logoFillColor={SHARE_BUTTON_COLOR}
            iconBgStyle={{ fill: "white", stroke: "#ddd", "stroke-width": 1.5 }}
            round
          />
        </LinkedinShareButton>
      </div>
      <div key={3}>
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
      <div key={4}>
        <StyledNavButton onClick={window.print}>
          <Print size={28} />
        </StyledNavButton>
      </div>
    </div>
  );
};

export default injectSheet(styles)(ShareTools);
