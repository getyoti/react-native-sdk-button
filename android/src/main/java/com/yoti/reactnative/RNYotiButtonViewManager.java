package com.yoti.reactnative;

import android.util.Log;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

public class RNYotiButtonViewManager extends SimpleViewManager<RNYotiButtonView> {
    private static final String REACT_CLASS = "RNYotiButton";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public RNYotiButtonView createViewInstance(ThemedReactContext context) {
        return new RNYotiButtonView(context);
    }

    @ReactProp(name = "useCaseID")
    public void setUseCaseID(RNYotiButtonView view, String useCaseId) {
        view.setUseCaseId(useCaseId);
    }

    @ReactProp(name = "clientSDKID")
    public void setClientSDKID(RNYotiButtonView view, String clientSDKID) {
        view.setClientSDKID(clientSDKID);
    }

    @ReactProp(name = "scenarioID")
    public void setScenarioID(RNYotiButtonView view, String scenarioID) {
        view.setScenarioID(scenarioID);
    }

    @ReactProp(name = "theme")
    public void setTheme(RNYotiButtonView view, String theme) {
        view.setTheme(theme);
    }
}
