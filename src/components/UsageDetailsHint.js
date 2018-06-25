import React, { Component } from "react";
import "../../node_modules/react-vis/dist/style.css";
import PropTypes from "prop-types";
import Usage from "./Usage";
import {
  Hint,
} from "react-vis";

class UsageDetailsHint extends Component {
  constructor(props) {
    super(props);
    // this.setHoverValue = this.setHoverValue.bind(this);
    // this.clearHoverValue = this.clearHoverValue.bind(this);
  }

  state = {};

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <Hint
        value={detailsValue}
        format={this.hintFormat}
        align={{ horizontal: Hint.AUTO, vertical: Hint.ALIGN.TOP_EDGE }}
      >
        <div className={classes.detailsDiv}>
          <Usage
            data={{
              used: detailsValue.used,
              generated: [detailsValue.generated],
            }}
            height={120}
            width={120}
            yDomain={null}
          />
        </div>
      </Hint>
    );
  }
}

UsageDetailsHint.propTypes = {};

export default UsageDetailsHint;
