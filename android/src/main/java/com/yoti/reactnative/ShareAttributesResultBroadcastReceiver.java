package com.yoti.reactnative;

import android.content.Intent;

import com.facebook.react.ReactApplication;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.yoti.mobile.android.sdk.AbstractShareAttributesBroadcastReceiver;

import javax.annotation.Nullable;

import com.facebook.react.ReactInstanceManager;

public class ShareAttributesResultBroadcastReceiver extends AbstractShareAttributesBroadcastReceiver {

    private Intent launchIntent() {
        return mContext.getPackageManager().getLaunchIntentForPackage(mContext.getApplicationContext().getPackageName());
    }

    @Override
    public boolean onCallbackReceived(String useCaseId, String callbackRoot, String token, String fullUrl) {
        Intent intent = launchIntent();
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        mContext.startActivity(intent);

        WritableMap params = Arguments.createMap();
        params.putString("useCaseID", useCaseId);
        params.putString("callbackRoot", callbackRoot);
        params.putString("token", token);
        params.putString("url", fullUrl);
        sendEvent("onCallbackReceived", params);
        // instruct the SDK to not make the callback
        return true;
    }

    @Override
    public void onShareFailed(String useCaseId) {
        Intent intent = launchIntent();
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        mContext.startActivity(intent);

        WritableMap params = Arguments.createMap();
        params.putString("useCaseID", useCaseId);
        sendEvent("onShareFailed", params);
    }

    @Override
    public void onCallbackSuccess(String useCaseId, byte[] response) {
    }

    @Override
    public void onCallbackError(String useCaseId, int httpErrorCode, Throwable error, byte[] response) {
    }

    private void sendEvent(String eventName, @Nullable WritableMap params) {
        final ReactInstanceManager instanceManager = ((ReactApplication) mContext).getReactNativeHost().getReactInstanceManager();
        final ReactContext reactContext = instanceManager.getCurrentReactContext();
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
}
