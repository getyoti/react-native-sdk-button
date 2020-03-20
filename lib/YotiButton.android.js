import React from "react";
import { NativeModules, NativeEventEmitter } from "react-native";
import RNYotiButton from "./NativeComponent";

const nativeEvents = [
  "onCallbackReceived",
  "onShareFailed",
  "onStartScenario",
  "onStartScenarioError",
  "onYotiAppNotInstalled",
  "onOpenYotiApp"
];

const nativeEventsToCommonProp = new Map([
  ["onCallbackReceived", "onSuccess"],
  ["onShareFailed", "onFail"]
]);

class YotiButton extends React.Component {
  componentDidMount() {
    this.eventSubscriptions = new Map();
    this.registerListeners();
  }

  registerListeners() {
    const eventEmitter = new NativeEventEmitter(NativeModules.RNYotiButton);
    nativeEvents.forEach(nativeEvent => {
      this.eventSubscriptions.set(
        nativeEvent,
        eventEmitter.addListener(nativeEvent, event => {
          let propName = nativeEvent;
          if (nativeEventsToCommonProp.has(nativeEvent)) {
            propName = nativeEventsToCommonProp.get(nativeEvent);
          }
          this.props.hasOwnProperty(propName) &&
            this.props[propName]({ nativeEvent: event });
        })
      );
    });
  }

  render() {
    return <RNYotiButton {...this.props} />;
  }

  componentWillUnmount() {
    nativeEvents.forEach(nativeEvent => {
      if (this.eventSubscriptions.has(nativeEvent)) {
        this.eventSubscriptions.get(nativeEvent).remove();
      }
    });
  }
}

export default YotiButton;
