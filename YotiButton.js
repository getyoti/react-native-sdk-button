import React from "react";
import PropTypes from "prop-types";

import Component from "./lib/YotiButton";

const THEME_EASYID = 'THEME_EASYID';
const THEME_PARTNERSHIP = 'THEME_PARTNERSHIP';
const THEME_YOTI = 'THEME_YOTI';

function YotiButton({
  onStartScenarioError,
  onSuccess,
  onFail,
  ...otherProps
}) {
  return (
    <Component
      {...otherProps}
      onStartScenario={event => otherProps?.onStartScenario && otherProps.onStartScenario(event.nativeEvent)}
      onStartScenarioError={event => onStartScenarioError && onStartScenarioError(event.nativeEvent)}
      onOpenYotiApp={event => otherProps?.onOpenYotiApp && otherProps.onOpenYotiApp(event.nativeEvent)}
      onAppNotInstalled={event => otherProps?.onAppNotInstalled && otherProps.onAppNotInstalled(event.nativeEvent)}
      onSuccess={event => onSuccess && onSuccess(event.nativeEvent)}
      onFail={event => onFail && onFail(event.nativeEvent)}
    />
  );
}

YotiButton.propTypes = {
  useCaseID: PropTypes.string.isRequired,
  clientSDKID: PropTypes.string.isRequired,
  scenarioID: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  onStartScenario: PropTypes.func.isRequired,
  onStartScenarioError: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onFail: PropTypes.func.isRequired,
  onOpenYotiApp: PropTypes.func.isRequired,
  onAppNotInstalled: PropTypes.func
};

export {
  THEME_EASYID,
  THEME_PARTNERSHIP,
  THEME_YOTI
}

export default YotiButton;
