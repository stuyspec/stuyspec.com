import React from "react";
import injectSheet from "react-jss";
import { Link } from "react-router-dom";

const styles = {
  GamePage: {
    borderRadius: "5px",
    borderColor: "gray",
    color: "#000",
    display: "inlineBlock",
    marginLeft: "5px",
    marginRight: "5px"
  },
  GameText: {
    fontFamily: "Circular Std",
    fontSize: "1.3em",
    lineHeight: "1.4em",
    paddingTop: "35px",
    textAlign: "center",
    width: "300px",
    height: "300px",
    //border: "2px solid black",
    borderRadius: "15px",
    margin: "15px",
    fontWeight: "bold",
    textDecoration: "none",
    transition: "all 0.1s ease-in-out",
    '&:hover': {
      //border: '1px solid blue',
      textDecoration: 'none',
      color: 'black',
      boxShadow: "8px 8px 0px black"
    }
  },
  SectionText: {
    color: "#000",
    fontFamily: "Minion Pro",
    fontSize: "1.3em",
    lineHeight: "1.4em",
    margin: "13px",
    padding: "3px",
    textAlign: "center",
  },
  Title: {
    color: "#000",
    fontFamily: "Old English Text MT",
    fontSize: "50px",
    marginTop: "0",
    textAlign: "center",
    paddingBottom: "10px",
  },
  FlexContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    marginBottom: "150px",
    marginTop: "50px",
    margin: "auto",
    width: "90%",
    borderTop: "1px solid black",
    borderBottom: "1px solid black",
    padding: "20px",
    //backgroundColor: "#B3DAF1"
  },
  Image: {
    display: "block",
    height: "150px",
    margin: "0 auto 10px",
    width: "150px",
  },
  Link: {
    fontFamily: "Circular Std",
    fontSize: "1.3em",
    lineHeight: "1em",
    color: "black",
  }
};

const GamePage = ({ classes }) => {
  return (
    <div>
      <h1 className={classes.Title}>SpecGames</h1>
      <div key={-5} className={classes.FlexContainer}>
        <Link to="/winter-crossword" className={classes.Link} style={{textDecoration: "none"}}>
          <div className={classes.GameText} style={{backgroundColor:"rgb(171, 224, 255)",}}>
            <img src={`${process.env.PUBLIC_URL}/img/crossword_logo.jpeg`} className={classes.Image} alt="crossword_logo"/>
            <p style={{paddingTop:"10px"}}>THE WINTER CROSSWORD</p>
          </div>
        </Link>
        <Link to="/clubs-and-pubs-galore" className={classes.Link} style={{textDecoration: "none"}}>
          <div className={classes.GameText} style={{backgroundColor:"#ff9999"}}>
            <img src={`${process.env.PUBLIC_URL}/img/crossword_logo.jpeg`} className={classes.Image} alt="crossword_logo"/>
            <p style={{paddingTop:"10px"}}>CLUBS AND PUBS GALORE</p>
          </div>
        </Link>
        <Link to="/zooming" className={classes.Link} style={{textDecoration: "none"}}>
          <div className={classes.GameText} style={{backgroundColor:"#56a3ff"}}>
            <img src={`${process.env.PUBLIC_URL}/img/crossword_logo.jpeg`} className={classes.Image} alt="crossword_logo"/>
            <p style={{paddingTop:"10px"}}>ZOOMING!</p>
          </div>
        </Link>
      </div>    
    </div>
  );
};

export default injectSheet(styles)(GamePage);