import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";
import { Grid, Row, Col } from "react-bootstrap/lib";

import { getArticlesWithContributors } from "../../articles/selectors";
import { getSections } from "../../sections/selectors";
import { getUsers } from "../../users/selectors";
import { getMedia } from "../../media/selectors";
import { fetchArticles } from "../../articles/actions";
import { fetchMedia } from "../../media/actions";
import { addRowHeight } from '../../core/actions';
import { Byline } from "../../articles/components";


/**
 * TODO: Use margins to make image look bigger
 */
const styles = {
  HomePage: {
    marginTop: "23px 0px 13px",
  },
  Byline: {
    display: 'inline',
    fontFamily: 'Circular Std',
    fontSize: '12px',
    fontWeight: 'bold',
    marginRight: '6px',
    textTransform: 'uppercase',
    '& p': {
      display: 'inline',
      margin: 0,
      '& a': {
        color: '#000',
        '&:hover': {
          color: '#000'
        },
      },
    },
  },
  bigArticle: {
    paddingLeft: 0,
    paddingRight: "13px",
  },
  bigTitle: {
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "36px",
  },
  bigTitleBlock: {
    margin: "4px 0px 2px",
  },
  bigPreview: {
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "14px",
    lineHeight: "1.14",
    marginTop: "4px",
  },
  bigImage: {
    height: '338.4px',
    width: '512px',
  },
  mediumArticle: {
    paddingLeft: 0,
    marginRight: "13px",
    paddingRight: "13px",
  },
  mediumTitle: {
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "17px",
    fontWeight: "bold",
  },
  mediumTitleBlock: {
    marginBottom: 0,
    marginTop: "10px",
  },
  mediumPreview: {
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "14px",
    lineHeight: "1.14",
    marginTop: "2px",
  },
  mediumImage: {
    height: "161.3px",
    width: "242px",
  },
  mediumBlock: {
    borderBottom: "solid 2px #ddd",
    marginBottom: "14px",
  },
  lastMediumBlock: {
    marginBottom: 0,
  },
  smallArticle: {
    padding: 0,
  },
  smallTitle: {
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "17px",
    fontWeight: "bold",
    marginBottom: "6px",
  },
  smallPreview: {
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "14px",
    lineHeight: "1.14",
    marginBottom: "14px",
    marginTop: "4px",
  },
  smallImage: {
    display: "inline",
    float: 'right',
    height: "47px",
    margin: "8px 0px 9px 14px",
    width: "72px",
  },
  smallBlock: {
    borderBottom: "solid 2px #ddd",
    marginBottom: "14px",
  },
  lastSmallBlock: {},
  loading: {
    height: "300px",
    width: "300px",
  },
};

class HomePage extends Component {
  addRowHeightToState = () => {
    this.props.addRowHeight(document.getElementById('homepageRow').clientHeight)
  };
  createBigArticle = () => {
    articleKeys = Object.keys(this.props.articles);
    const { classes } = this.props;
    const bigArticle = this.props.articles[ articleKeys[ 0 ] ];
    return (
      <div>
        <img src={this.props.media[ bigArticle.mediaId ].url} className={classes.bigImage}/>
        <h1 className={classes.bigTitleBlock}>
          <Link to={`${this.props.sections[ bigArticle.sectionSlug ].permalink}/${bigArticle.slug}`}
                className={classes.bigTitle}>{bigArticle.title}</Link>
        </h1>
        <Byline classes={classes} contributors={bigArticle.contributors} homepage={true}/>
        <p className={classes.bigPreview}>
          This is a preview of the article. Wow, look at that big image. It is HUGE. So how was your day? Did you do
          anything interesting. Now I need more words to fill up space so blah blah blah lobster!
        </p>
      </div>
    )
  };

  createMediumArticles = () => {
    articleKeys = Object.keys(this.props.articles);
    const { classes } = this.props;
    const mediumArticleIndexes = articleKeys.slice(1, 3);
    const mediumArticles = mediumArticleIndexes.map(index => {
      return this.props.articles[ index ];
    });
    return mediumArticles.map((mediumArticle, index) => {
      return (
        <div className={index !== 1 ? classes.mediumBlock :
          classes.lastMediumBlock}
             key={mediumArticle.id}>
          <img src={this.props.media[ mediumArticle.mediaId ].url} className={classes.mediumImage}/>
          <h6 className={classes.mediumTitleBlock}>
            <Link to={`${this.props.sections[ mediumArticle.sectionSlug ].permalink}/${mediumArticle.slug}`}
                  className={classes.mediumTitle}>{mediumArticle.title}</Link>
          </h6>
          <Byline classes={classes} contributors={mediumArticle.contributors} homepage={true}/>
          <p className={classes.mediumPreview}>
            This is a preview of the article. Wow, look at that big image. It is HUGE. So how was your day? Did you do
            anything interesting. Now I need more words to fill up space so blah blah blah lobster!
          </p>
        </div>
      )
    })
  };
  createSmallArticles = () => {
    articleKeys = Object.keys(this.props.articles);
    const { classes } = this.props;
    const smallArticleIndexes = articleKeys.slice(3, 7);
    const smallArticles = smallArticleIndexes.map(index => {
      return this.props.articles[ index ];
    });
    return smallArticles.map((smallArticle, index) => {
      return (
        <div className={index !== 3 ? classes.smallBlock :
          classes.lastSmallBlock}
             key={smallArticle.id}>
          <Link to={`${this.props.sections[ smallArticle.sectionSlug ].permalink}/${smallArticle.slug}`}
                className={classes.smallTitle}>{smallArticle.title}</Link>
          <br className={classes.br}/>
          <Byline classes={classes} contributors={smallArticle.contributors} homepage={true}/>
          <br className={classes.br}/>
          <img src={this.props.media[ smallArticle.mediaId ].url} className={classes.smallImage}/>
          <p className={classes.smallPreview}>
            This is a preview of the article. Wow, look at that big image. It is HUGE. So how was your day? Did you do
            anything interesting. Now I need more words to fill up space so blah blah blah lobster!
          </p>
        </div>
      );
    })
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchArticles();
    this.props.fetchMedia();
  };

  render() {
    const { classes, rowHeight } = this.props;
    var lineStyle = {};
    if (rowHeight !== 0) {
      lineStyle = {
        borderRight: "solid 2px #ddd",
        height: `${rowHeight}px`,
        marginRight: "10px",
      };
    }
    if (this.props.fetched) {
      return (
        <div className={classes.HomePage}>
          <Grid>
            <Row id="homepageRow" onLoad={this.addRowHeightToState}>
              <Col md={6} className={classes.bigArticle} style={lineStyle}>
                {this.createBigArticle()}
              </Col>
              <Col md={3} className={classes.mediumArticle} style={lineStyle}>
                {this.createMediumArticles()}
              </Col>
              <Col md={3} className={classes.smallArticle}>
                {this.createSmallArticles()}
              </Col>
            </Row>
          </Grid>
        </div>
      );
    } else {
      return (
        <div>
          <img
            src="https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/19030585_1210056409103585_1755383162605573147_n.jpg?oh=807f98c5050de9527b08bf52bcff63a2&oe=5A36E66E"
            className={classes.loading}/>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  articles: getArticlesWithContributors(state),
  sections: getSections(state),
  users: getUsers(state),
  media: getMedia(state),
  fetched: state.articles.isFetched && state.media.isFetched,
  rowHeight: state.core.rowHeight,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchArticles: fetchArticles,
    fetchMedia: fetchMedia,
    addRowHeight: addRowHeight,
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectSheet(styles)(HomePage));
