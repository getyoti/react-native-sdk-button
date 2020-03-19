package com.yoti.reactnative;

import android.content.IntentFilter;
import android.text.TextUtils;
import android.widget.LinearLayout;
import com.yoti.reactnative.R;

import com.yoti.mobile.android.sdk.YotiSDK;
import com.yoti.mobile.android.sdk.YotiSDKButton;
import com.yoti.mobile.android.sdk.model.Scenario;
import com.yoti.mobile.android.sdk.exceptions.YotiSDKException;
import com.yoti.mobile.android.sdk.exceptions.YotiSDKNoYotiAppException;
import com.yoti.mobile.android.sdk.exceptions.YotiSDKNotValidScenarioException;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

import javax.annotation.Nullable;

public class RNYotiButtonView extends LinearLayout {
    private ThemedReactContext context;
    private YotiSDKButton mButton;
    private ShareAttributesResultBroadcastReceiver mBroadcastReceiver;
    private String mYotiCallback;
    private String mYotiBackendCallback;
    private String mClientSDKID;
    private String mScenarioID;
    private String mUseCaseId;

    RNYotiButtonView(ThemedReactContext context) {
        super(context);
        this.context = context;
        inflate(context, R.layout.yotibutton, this);
        mButton = findViewById(R.id.RNYotiButton);
        mBroadcastReceiver = new ShareAttributesResultBroadcastReceiver();
        mYotiCallback = context.getPackageName() + ".YOTI_CALLBACK";
        mYotiBackendCallback = context.getPackageName() + ".BACKEND_CALLBACK";
        context.getApplicationContext().registerReceiver(mBroadcastReceiver, new IntentFilter(mYotiCallback));
        context.getApplicationContext().registerReceiver(mBroadcastReceiver, new IntentFilter(mYotiBackendCallback));

        YotiSDK.enableSDKLogging(true);

        mButton.setOnYotiButtonClickListener(new YotiSDKButton.OnYotiButtonClickListener() {
            @Override
            public void onStartScenario() {
                sendEvent("onStartScenario", null);
            }

            @Override
            public void onStartScenarioError(YotiSDKException cause) {
                WritableMap params = Arguments.createMap();
                params.putString("message", cause.getMessage());
                sendEvent("onStartScenarioError", params);
            }
        });

        mButton.setOnYotiAppNotInstalledListener(new YotiSDKButton.OnYotiAppNotInstalledListener() {
            @Override
            public void onYotiAppNotInstalledError(YotiSDKNoYotiAppException cause) {
                sendEvent("onYotiAppNotInstalled", null);
            }
        });

        mButton.setOnYotiCalledListener(new YotiSDKButton.OnYotiCalledListener() {
            @Override
            public void onYotiCalled() {
                sendEvent("onOpenYotiApp", null);
            }
        });
    }

    private void sendEvent(String eventName, @Nullable WritableMap params) {
        this.context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    public void setTitle(String title) {
        mButton.setText(title);
    }

    public void setUseCaseId(String useCaseId) {
        mButton.setUseCaseId(useCaseId);
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

    private void addScenarioIfPropsReady() {
        if (
                TextUtils.isEmpty(mUseCaseId) ||
                TextUtils.isEmpty(mClientSDKID) ||
                TextUtils.isEmpty(mScenarioID)
        ) {
            return;
        }

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