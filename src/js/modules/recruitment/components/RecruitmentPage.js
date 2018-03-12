import React, { PureComponent } from "react";
import injectSheet from "react-jss";

import { Section } from "./Section";
import * as constants from "../constants";

const styles = {
    
}

const RecruitmentPage = () => {
    //const sections = constants.SECTIONS;
    return (
        /*<div>
            {sections.map(
                section => <Section name={section.name} description={section.description} quotes={section.quotes} />
            )}
        </div>
        */
       <div>
           <Section name="Web" description="Best department" quotes={{text: "Fight the power", source: "Nich"}} />
        </div>
    );
};

export default injectSheet(styles)(RecruitmentPage);