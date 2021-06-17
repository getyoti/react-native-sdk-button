package com.yoti.reactnative;

import android.content.IntentFilter;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.Collections;
import java.util.List;

public class RNYotiButtonPackage implements ReactPackage, LifecycleEventListener {
    private ShareAttributesResultBroadcastReceiver mBroadcastReceiver;
    private String mYotiCallback;
    private String mYotiBackendCallback;
    private ReactApplicationContext context;

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        context = reactContext;
        mBroadcastReceiver = new ShareAttributesResultBroadcastReceiver();
        mYotiCallback = context.getPackageName() + ".YOTI_CALLBACK";
        mYotiBackendCallback = context.getPackageName() + ".BACKEND_CALLBACK";
        context.getApplicationContext().registerReceiver(mBroadcastReceiver, new IntentFilter(mYotiCallback));
        context.getApplicationContext().registerReceiver(mBroadcastReceiver, new IntentFilter(mYotiBackendCallback));
        context.addLifecycleEventListener((LifecycleEventListener) this);

        return Collections.<ViewManager>singletonList(new RNYotiButtonViewManager());
    }

    @Override
    public List<NativeModule> createNativeModules(
            ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @Override
    public void onHostResume() {
    }

    @Override
    public void onHostPause() {
    }

    @Override
    public void onHostDestroy() {
        context.unregisterReceiver(mBroadcastReceiver);
    }
}
