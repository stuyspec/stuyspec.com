import React from 'react';
import injectSheet from 'react-jss';
import {Link} from 'react-router-dom';

const styles = {
  PageFooter: {
    background: '#121212',
    height: '408px',
    paddingTop: '9px',
  },
  pageFooterMain: {
    margin: '0 auto',
    width: '1000px',
    display: 'flex',
    flexDirection: 'row',
  },
  sectionFlex: {
    height: '350px',
    display: 'flex',
    flexFlow: 'column wrap',
    flex: '4 0 0',
    width: '700px',
  },
  sectionBlock: {
    marginTop: '23px',
    marginRight: '20px',
  },
  topLevelSectionLink: {
    color: '#fffefe',
    fontSize: '14px',
    fontFamily: "Circular Std",
    fontStyle: 'normal',
    fontWeight: '500',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  subsectionLink: {
    color: '#b6b6b6',
    fontSize: '13px',
    fontFamily: 'Circular Std',
    fontStyle: 'normal',
    fontWeight: '300',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  fillerDiv: {
    flex: '1 0 0',
    marginRight: '20px',
  }
};

const PageFooter = ({classes, sectionsWithSubsections}) => {
  const makeSectionLinks = () => {
    return (sectionsWithSubsections.map((topLevelSection) => {
        return (
          <div className={classes.sectionBlock} key={topLevelSection.id}>
            <Link to={`/${topLevelSection.slug}`} className={classes.topLevelSectionLink}>
              {topLevelSection.name}
            </Link><br/>
            {
              Object.keys(topLevelSection.subsections).map((subsectionSlug) => {
                return makeSubsectionLink(
                  topLevelSection.slug,
                  topLevelSection.subsections[subsectionSlug]);
              })
            }
          </div>
        );
      })
    );
  };
  const makeSubsectionLink = (topLevelSectionSlug, subsection) => {
    return (
      <div>
        <Link to={`/${topLevelSectionSlug}/${subsection.slug}`} className={classes.subsectionLink}>
          {subsection.name}
        </Link>
        <br/>
      </div>
    );
  };

  return (
    <div className={classes.PageFooter}>
      <div className={classes.pageFooterMain}>
        <div className={classes.fillerDiv}></div>
        <div className={classes.sectionFlex}>
         {makeSectionLinks()}
        </div>
        <div className={classes.fillerDiv}></div>
      </div>
    </div>
  );
};

export default (injectSheet(styles)(PageFooter));