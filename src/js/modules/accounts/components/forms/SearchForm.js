import React from "react";
import { Field, reduxForm } from "redux-form";
import injectSheet from "react-jss";
import { Search } from "../../../core/icons";

const styles = {
    SearchForm: {
        margin: "26px 0 40px",
        textAlign: "center",
    },
    input: {
        backgroundColor: "#eee",
        borderRadius: "4px",
        border: "none",
        color: "#888",
        fontFamily: "Circular Std",
        fontSize: "18px",
        fontWeight: "500",
        height: "51px",
        padding: "14px 44px",
        textAlign: "left",
        width: "410px",
    },
    submitButton: {
        backgroundColor: "#3572b7",
        borderRadius: "0 4px 4px 0",
        border: "none",
        color: "#fff",
        fontFamily: "Minion Pro",
        fontStyle: "italic",
        fontSize: "18px",
        height: "51px",
        margin: "0 auto",
        textAlign: "center",
        width: "74px",
    },
    search: {
        width: "17px",
        height: "17px",
        position: "relative",
        left: "33px",
        bottom: "2px",
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
                <input
                    {...input}
                    placeholder={label}
                    type={type}
                    className={classes.input}
                />
    );
};

const SearchForm = ({ classes, handleSubmit, submitting, status }) => {
    return (
        <div className={classes.SearchForm}>
            <form onSubmit={handleSubmit} >
                <div className={classes.form}>
                <Search className={classes.search}/>
                <Field
                    name="search"
                    type="text"
                    component={renderField}
                    label={"Enter search terms"}
                    classes={classes}
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
        </div>
    );
};

export default reduxForm({
    form: "search",
    validate,
})(injectSheet(styles)(SearchForm));