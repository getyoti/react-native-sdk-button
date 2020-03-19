import React from "react";
import { requireNativeComponent } from "react-native";

const RNYotiButtonNativeComponent = requireNativeComponent(
  "RNYotiButton",
  null
);

function NativeComponent(props) {
  const style = props.style || {};
  return (
    <RNYotiButtonNativeComponent
      {...props}
      style={(style, [{ width: 230, height: 48 }])}
    />
  );
}

export default NativeComponent;
