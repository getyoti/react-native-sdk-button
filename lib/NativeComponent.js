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
      style={([{ flex: 1 }, style])}
    />
  );
}

export default NativeComponent;
