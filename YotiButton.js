import React from "react";
import PropTypes from "prop-types";
import Component from "./lib/YotiButton";

function YotiButton({
  onStartScenarioError,
  onSuccess,
  onFail,
  ...otherProps
}) {
  return (
    <Component
      {...otherProps}
      onStartScenarioError={event => onStartScenarioError(event.nativeEvent)}
      onSuccess={event => onSuccess(event.nativeEvent)}
      onFail={event => onFail(event.nativeEvent)}
    />
  );
}

YotiButton.propTypes = {
  useCaseID: PropTypes.string.isRequired,
  clientSDKID: PropTypes.string.isRequired,
  scenarioID: PropTypes.string.isRequired,
  onStartScenario: PropTypes.func.isRequired,
  onStartScenarioError: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onFail: PropTypes.func.isRequired,
  onOpenYotiApp: PropTypes.func.isRequired,
  onAppNotInstalled: PropTypes.func
};

export default YotiButton;
