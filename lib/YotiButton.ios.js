import React from "react";
import RNYotiButton from "./NativeComponent";

class YotiButton extends React.Component {
  render() {
    return <RNYotiButton {...this.props} />;
  }
}

export default YotiButton;
