import React from "react";
import injectSheet from "react-jss";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

import ArticleReference from "./ArticleReference";
import RightRail from "./RightRail";

import { ArticleMedia } from './ArticleMedia';
import { Extension } from './extensions/Extension';
import { IArticle } from "../queries";

const isBrowserFirefox =
  navigator.userAgent.toLowerCase().indexOf("firefox") > -1;

const styles = {
  ArticleBody: {
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "19px",
    lineHeight: 1.4,
    padding: "0 0 18px",
    "& p": {
      marginBottom: "20px",
    },
    "& t": {
      display: "inline-block",
      marginRight: "40px",
    },
    "& h4": {
      textAlign: "center",
      fontWeight: "bold",
      textTransform: "uppercase",
    },
    "& h5": {
      fontSize: "18px",
      fontWeight: "bold",
      textTransform: "uppercase",
    },
    "& h2": {
      fontWeight: "bold",
      textTransform: "uppercase",
      textAlign: "center",
    },
    "& p:first-child": {
      marginTop: "8px",
    },
    "& > div > p::first-letter": {
      // dropcap
      float: "left",
      fontSize: "64px",
      lineHeight: "40px",
      padding: "0px 6px 0px 3px",
      paddingTop: isBrowserFirefox ? "5px" : "11px",
    },
    "& > div > p ~ p::first-letter": {
      float: "none",
      fontSize: "18px",
      lineHeight: 1.44,
      padding: 0,
    },
    "& spec-reference": {
      display: "none",
    },
  },
  print: {
    color: "#000",
    fontFamily: "Minion Pro",
    fontStyle: "italic",
    "& a": {
      "&:hover, &:active, &:focus": {
        color: "#999",
      },
    },
  },
  content: {
    marginTop: "13px",
  },
  "@media (max-width: 991px)": {
    ArticleBody: {
      "& > figure": {
        padding: "0 10%",
      },
    },
    articleContent: {
      padding: "0 10%",
    },
  },
  "@media (max-width: 767px)": {
    ArticleBody: {
      "& > figure": {
        padding: "0 2%",
        "& > div > img": {
          marginLeft: "-2%",
          width: "100vw",
        },
      },
    },
    articleContent: {
      padding: "0 2%",
    },
  },
};

interface IProps {
  classes: any,
  article: IArticle
}

class ArticleBody extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);

    //creates div in which to store article contents
    this.articleContentDiv = document.createElement("div");
  }

  private createArticleContent = (element: HTMLDivElement | null) => {
    //React gives us a DOM element from the render() method if it's been mounted.
    //We fill this in with article content if it's not null.
    if (element != null) {
      element.appendChild(this.articleContentDiv)
    }
  }

  private articleContentDiv: HTMLDivElement;

  render() {
    //Sets the div's contents to hold the HTML provided by the server.
    this.articleContentDiv.innerHTML = this.props.article.content;

    const { article, classes } = this.props;
    const featuredMedia = article.media ? article.media.filter(m => m.is_featured) : []

    //Here we loop through the contents of the article div to find every element of tag type article-extension.
    //We then create an Extension for each instance to render extension content inside the element.
    const extensions = [];
    const extensionElements = this.articleContentDiv.getElementsByTagName("article-extension");
    if (extensionElements) {
      for (let i = 0; i < extensionElements.length; i++) {
        const type = extensionElements[i].getAttribute("type");
        const props = extensionElements[i].getAttribute("props");
        const media = extensionElements[i].getAttribute("media");
        if (type && props) {
          extensions.push(
            <Extension
              type={type}
              props={props}
              root={extensionElements[i]}
              article={article}
              media={media || undefined}
              key={i}
            />
          )
        }
      }
    }

    return (
      <Row>
        <Col xs={12} sm={12} md={8} lg={8} className={classes.ArticleBody}>
          {featuredMedia && (
            <ArticleMedia article={article} media={featuredMedia} />
          )}
          <ArticleReference article={article} />
          <div
            className={classes.articleContent}
            ref={this.createArticleContent}
          >
            {
              extensions
            }
          </div>
        </Col>
        <Col xsHidden smHidden mdOffset={1} md={3} lgOffset={1} lg={3}>
          <RightRail />
        </Col>
      </Row>
    );
  }
}

export default injectSheet(styles)(ArticleBody);
