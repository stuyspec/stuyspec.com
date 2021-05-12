import React from "react";
import Icon from "react-icon-base";

const styles = {
  circle: {
    fill: "#fff",
    stroke: "rgb(221, 221, 221)",
    strokeWidth: "1.5px",
  },
};
const Print = props => (
  <Icon viewBox="-8 -8 40 40" {...props}>
    <g>
      <circle cx="12" cy="12" r="19" fill="#fff" style={styles.circle} />
    </g>
    <g>
      <path style={{fill: 'black'}} d="M19 8h-14c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11h-8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9h-12v4h12v-4z" />
    </g>
  </Icon>
);
// originally FaBars
export default Print;
