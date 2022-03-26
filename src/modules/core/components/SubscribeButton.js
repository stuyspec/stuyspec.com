import React from 'react';
import injectSheet from 'react-jss';

const styles = {
  SubscribeButton: {
    width: '8vw',
    height: '45px',
    padding: '4px 0',
    right: '39px',
    lineHeight: '1.5rem',
    minWidth: '135px',
    maxWidth: '150px',
    position: 'relative',
    borderRadius: '4px',
    // borderTopLeftRadius: "4px",
    // borderBottomLeftRadius: "4px",
    backgroundColor: '#DB2B39 !important',
    border: 'solid 1.5px #DB2B39',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    transition: 'filter 0.8s',
    '&:hover': {
      filter: 'opacity(75%)',
    },
    '& span': {
      background: 'transparent',
    },
  },
  text: {
    fontFamily: 'Circular Std',
    fontSize: '1.6rem',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  subscribeTo: {
    fontFamily: 'Circular Std',
    fontSize: '1.4rem',
    textAlign: 'center',
    color: '#ffffff',
  },
};

function SubscribeButton({ classes }) {
  return (
    <a href="https://stuyspec.us4.list-manage.com/subscribe?u=d92e8c831515555b06ae9eeea&id=78d0a29c4f">
      <button className={classes.SubscribeButton}>
        <span className={classes.text}>Subscribe</span>
        <span className={classes.subscribeTo}>to our newsletter</span>
      </button>
    </a>
  );
}

export default injectSheet(styles)(SubscribeButton);
