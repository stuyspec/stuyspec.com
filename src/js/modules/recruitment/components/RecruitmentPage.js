import React, { PureComponent } from "react";
import * as constants from "./constants";

const styles = {
    
}

const RecruitmentPage = () => {
    const sections = constants.SECTIONS;
    return (
        <div>
            {sections.map(
                section => {return (<Section name={section.name} description={section.description} quotes={section.quotes} />)}
            )}
        </div>
    )
}

export default injectSheet(styles)(RecruitmentPage);