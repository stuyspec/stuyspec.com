import React, {Component} from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';
import { makeSectionTree } from '../../sections/selectors';

const styles= {
	Footer: {
		background: '#121212',
	},
	Footer__Top: {
		background: '#000000',
		width:'100%',
	},
	Footer__Top__Main: {
		background: '#000000',
		margin: '0 auto',
		width: '1060px',
	},
	Footer__Bottom: {
		background: '#121212',
		width: '100%',
		height: '417px',
	},
	Footer__Bottom__Main: {
		background: '#121212',
		margin: '0 auto',
		width: '1060px',
	},
	Section: {
		color: '#fffefe',
		fontSize: '14px',
		fontFamily: "Circular Std",
		fontStyle: 'normal',
		fontWeight: '500',
		textDecoration: 'none',
	},
	Subsection: {
		color: '#b6b6b6',
		fontSize: '13px',
		fontFamily: 'Circular Std',
		fontStyle: 'normal',
		fontWeight: '300',
		textDecoration: 'none',
	},
	Spectator: {
		color: '#ffffff',
		padding: '10px 0px',
		margin: '0px 0px 10px 0px',
		fontFamily: 'Old English Text MT',
		fontSize: '36px',
		fontWeight: '400',
		textAlign: "left",
		height: '43px',
		width: '600px'
	},
	Section__Div: {
		margin: '20px 0px 0px 0px'
	}
}

class Footer extends Component {

	render() {

		const {classes} = this.props;

		const sectionTree = this.props.sectionTree;

		console.log(sectionTree)
		return (
				<div className={classes.Footer}>
					<div className={classes.Footer__Top}>
						<div className={classes.Footer__Top__Main}>
							<p className={classes.Spectator}>The Spectator</p>
						</div>
					</div>
					<div className={classes.Footer__Bottom}>
						<div className={classes.Footer__Bottom__Main}>
							{sectionTree.map((section) => {
								return (
										<div className={classes.Section__Div}>
											<Link to={'/' +section.slug} className={classes.Section}>
												{section.name}
											</Link><br />
											{section.subsections.map((subsection)=> {
												return (
														<div>
														<Link to={'/' + section.slug + '/' +subsection.slug} className={classes.Subsection}>
															{subsection.name}
														</Link>
														<br />
														</div>
													)
											})}
										</div>
									)
							})}
						</div>
					</div>
				</div>
			)	
	}
}

const mapStateToProps = (state) => ({
    sectionTree: makeSectionTree(state)
});

export default connect(
	mapStateToProps
)(injectSheet(styles)(Footer));