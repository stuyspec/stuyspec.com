import React from 'react';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';

import { pathToAds } from '../constants';

const styles = {
    TallAd: {
        width: "100%",
        marginBottom: '2rem'
    },
    img: {
        width: "100%",
        marginBottom: '2rem',
        paddingBottom: '1rem',
        borderBottom: '2px solid #b1b4ba'
    },
};

const useStyles = createUseStyles(styles);

interface IProps {
    advertisements: any[],
        ad?: any,
}

const TallAd: React.FC<IProps> = ({ advertisements, ad }) => {
    const classes = useStyles();
    return (
        <div className={classes.TallAd}>
            {Object.values(advertisements).map((ad) => {
                return (
                    <a href={ad.url} target="_blank" rel="noopener noreferrer">
                        <img className={classes.img} src={pathToAds + ad.filename} alt="Advertisement"/>
                    </a>
                )
            })}
        </div>
);
};

const mapStateToProps = (state: any) => ({
    advertisements: state.advertisements,
});

export default connect(mapStateToProps)(TallAd);
