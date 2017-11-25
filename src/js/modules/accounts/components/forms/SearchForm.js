import React from "react";
import { Field, reduxForm } from "redux-form";
import injectSheet from "react-jss";

const styles = {
    SearchForm: {
        marginTop: "26px",
    },
    input: {
        backgroundColor: "#eee",
        borderRadius: "4px",
        height: "51px",
        marginTop: "26px",
        textAlign: "center",
        width: "410px",
    }

};

const validate = formValues => {
    const errors = {};
    return errors;
};

const renderField = ({
                         input,
                         label,
                         type,
                         classes,
                         meta: { touched, error, warning },
                     }) => {
    return (
        <div>
            <div>
                <input
                    style={{ width: "100%" }}
                    {...input}
                    placeholder={label}
                    type={type}
                    className={classes.input}
                />
                {touched &&
                ((error && <span>{error}</span>) ||
                    (warning && <span>{warning}</span>))}
            </div>
        </div>
    );
};

const SearchForm = ({ classes, handleSubmit, submitting, status }) => {
    return (
        <div className={classes.SearchForm}>
            <form onSubmit={handleSubmit}>
                <Field
                    name="search"
                    type="text"
                    component={renderField}
                    label="Enter search terms"
                    classes={classes}
                />
                <div>
                    <button
                        type="submit"
                        disabled={submitting}
                        className={classes.submitButton}
                    >
                        Go
                    </button>
                </div>
            </form>
        </div>
    );
};

export default reduxForm({
    form: "search",
    validate,
})(injectSheet(styles)(SearchForm));
