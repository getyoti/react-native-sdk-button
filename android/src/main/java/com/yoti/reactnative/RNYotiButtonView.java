package com.yoti.reactnative;

import android.text.TextUtils;
import android.widget.LinearLayout;

import com.yoti.mobile.android.sdk.YotiSDK;
import com.yoti.mobile.android.sdk.YotiSDKButton;
import com.yoti.mobile.android.sdk.exceptions.YotiSDKAppNotInstalledException;
import com.yoti.mobile.android.sdk.model.Scenario;
import com.yoti.mobile.android.sdk.exceptions.YotiSDKException;
import com.yoti.mobile.android.sdk.exceptions.YotiSDKNotValidScenarioException;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

import javax.annotation.Nullable;

public class RNYotiButtonView extends LinearLayout {
    private ThemedReactContext context;
    private YotiSDKButton mButton;
    private String mClientSDKID;
    private String mScenarioID;
    private String mTheme;
    private String mUseCaseId;
    private String mYotiCallback;
    private String mYotiBackendCallback;

    RNYotiButtonView(ThemedReactContext context) {
        super(context);
        this.context = context;
        YotiSDK.enableSDKLogging(true);
        mYotiCallback = context.getPackageName() + ".YOTI_CALLBACK";
        mYotiBackendCallback = context.getPackageName() + ".BACKEND_CALLBACK";
    }

    private void setListeners() {
        mButton.setOnYotiButtonClickListener(new YotiSDKButton.OnYotiButtonClickListener() {
            @Override
            public void onStartScenario() {
                WritableMap params = Arguments.createMap();
                params.putString("useCaseID", mUseCaseId);
                params.putString("scenarioID", mScenarioID);
                sendEvent("onStartScenario", params);
            }

            @Override
            public void onStartScenarioError(YotiSDKException cause) {
                WritableMap params = Arguments.createMap();
                params.putString("message", cause.getMessage());
                sendEvent("onStartScenarioError", params);
            }
        });

        mButton.setOnAppNotInstalledListener(new YotiSDKButton.OnAppNotInstalledListener() {
            @Override
            public void onAppNotInstalled(YotiSDKAppNotInstalledException cause, String appURL) {
                WritableMap params = Arguments.createMap();
                params.putString("appURL", appURL);
                params.putString("cause", cause.toString());
                params.putString("useCaseID", mUseCaseId);
                params.putString("scenarioID", mScenarioID);
                sendEvent("onAppNotInstalled", params);
            }
        });

        mButton.setOnAppCalledListener(new YotiSDKButton.OnAppCalledListener() {
            @Override
            public void onAppCalled() {
                WritableMap params = Arguments.createMap();
                params.putString("useCaseID", mUseCaseId);
                params.putString("scenarioID", mScenarioID);
                sendEvent("onOpenYotiApp", params);
            }
        });
    }

    private void sendEvent(String eventName, @Nullable WritableMap params) {
        this.context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    public void setUseCaseId(String useCaseId) {
        mUseCaseId = useCaseId;
        addScenarioIfPropsReady();
    }

    public void setClientSDKID(String clientSDKID) {
        mClientSDKID = clientSDKID;
        addScenarioIfPropsReady();
    }

    public void setScenarioID(String scenarioID) {
        mScenarioID = scenarioID;
        addScenarioIfPropsReady();
    }

    public void setTheme(String theme) {
        if (!TextUtils.isEmpty(mTheme)) {
            return;
        }
        if (theme.equals("THEME_EASYID")) {
            inflate(context, R.layout.theme_easyid, this);
        }
        if (theme.equals("THEME_PARTNERSHIP")) {
            inflate(context, R.layout.theme_partnership, this);
        }
        if (theme.equals("THEME_YOTI")) {
            inflate(context, R.layout.theme_yoti, this);
        }
        mTheme = theme;
        mButton = findViewById(R.id.RNYotiButton);
        setListeners();
        addScenarioIfPropsReady();
    }

    private void addScenarioIfPropsReady() {
        if (
                TextUtils.isEmpty(mUseCaseId) ||
                        TextUtils.isEmpty(mClientSDKID) ||
                        TextUtils.isEmpty(mScenarioID) ||
                        TextUtils.isEmpty(mTheme)
        ) {
            return;
        }
        mButton.setUseCaseId(mUseCaseId);
        try {
            Scenario scenario = new Scenario.Builder()
                    .setUseCaseId(mUseCaseId)
                    .setClientSDKId(mClientSDKID)
                    .setScenarioId(mScenarioID)
                    .setCallbackAction(mYotiCallback)
                    .setBackendCallbackAction(mYotiBackendCallback)
                    .create();
            YotiSDK.addScenario(scenario);
        } catch (YotiSDKNotValidScenarioException e) {
            WritableMap params = Arguments.createMap();
            params.putString("message", e.getMessage());
            sendEvent("onStartScenarioError", params);
        }
    }
}
