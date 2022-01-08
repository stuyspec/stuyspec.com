import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form';
import injectSheet from 'react-jss';
import { Search } from '../../core/icons/index';

const styles = {
  SearchForm: {
    margin: '26px 0 40px',
    display: 'flex',
    justifyContent: 'center',
  },
  inputContainer: {
    alignItems: 'center',
    display: 'flex',
    '& input': {
      backgroundColor: '#eee',
      borderRadius: '4px 0 0 4px',
      border: 'none',
      color: '#333 !important',
      fontFamily: 'Circular Std',
      fontSize: '18px',
      fontWeight: 500,
      height: '51px',
      padding: '14px 44px',
      textAlign: 'left',
      width: '420px',
    },
  },
  submitButton: {
    backgroundColor: '#3572b7 !important',
    borderRadius: '0 4px 4px 0',
    border: 'none',
    color: '#fff',
    fontFamily: 'Circular Std',
    fontSize: '18px',
    height: '51px',
    margin: '0 auto',
    textAlign: 'center',
    width: '74px',
  },
  search: {
    width: '17px',
    height: '17px',
    position: 'relative',
    left: '33px',
    backgroundColor: 'transparent !important',
    bottom: '2px',
  },
  '@media (max-width: 767px)': {
    inputContainer: {
      padding: '0 10%',
      width: '100%',
      '& input': {
        width: '90%',
      },
    },
  },
  '@media (max-width: 576px)': {
    inputContainer: {
      padding: 0,
    },
  },
};

class SearchForm extends PureComponent {
  componentWillMount() {
    const { query, initialize } = this.props;
    if (query) {
      initialize({ query });
    }
  }

  render() {
    const { classes, handleSubmit, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit} className={classes.SearchForm}>
        <div className={classes.inputContainer}>
          <Search fill="black" className={classes.search} />
          <Field
            name="query"
            type="text"
            component="input"
            placeholder="Enter search terms"
            autoFocus
          />
          <button
            type="submit"
            disabled={submitting}
            className={classes.submitButton}
          >
            Go
          </button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'search',
})(injectSheet(styles)(SearchForm));
