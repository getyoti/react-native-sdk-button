![YotiBanner](./yoti_banner.png)

# Yoti Button SDK for React Native

[![GitHub tag (latest SemVer)](https://img.shields.io/github/v/tag/getyoti/react-native-sdk-button?label=latest%20release)](https://github.com/getyoti/react-native-sdk-button/releases) [![Publish Release](https://github.com/getyoti/react-native-sdk-button/workflows/Publish%20Release/badge.svg)](https://github.com/getyoti/react-native-sdk-button/actions?query=workflow%3A%22Publish+Release%22)

Yoti button component for React Native [Android]([https://github.com/getyoti/android-sdk-button](https://github.com/getyoti/android-sdk-button)) and [iOS]([https://github.com/getyoti/ios-sdk-button](https://github.com/getyoti/ios-sdk-button)).

The purpose of the mobile SDK is to provide 3rd party applications the ability to request attributes from a Yoti user through Yoti mobile App. It is an interaction between a 3rd Party app and the Yoti app facilitated by a very lightweight SDK. This repository contains the module which enables your users to share their identity details with your application in a secure and trusted way.

## Prerequisite

Before you begin, kindly make sure you have at the minimum created an application and scenario on the Yoti Hub according to the [documentation](https://developers.yoti.com/yoti/getting-started-hub).

This SDK does not come with any methods for making backend calls to your server APIs.

## React Native >= 0.60.0 installation

`yarn add @getyoti/react-native-yoti-button`

Navigate to your iOS folder and update pods with:

`pod install`

React Native autolinking will handle the rest of the native configuration. Should autolinking fail, consult the [troubleshooting instructions](#troubleshooting).

## React Native 0.59.x installation

Install the library with:

`yarn add @getyoti/react-native-yoti-button`

Link the library:

`react-native link @getyoti/react-native-yoti-button`

If you're using CocoaPods, navigate to your `ios` and update your `Podfile`:

```diff
  pod 'Folly', :podspec => '../node_modules/react-native/third-party-podspecs/Folly.podspec'
+  `pod 'react-native-yoti-button', :path => '../node_modules/react-native-yoti-button/react-native-yoti-button.podspec'`
end
```

And then your pods with:

`pod install`

If autolinking fails, refer to the [troubleshooting instructions](#troubleshooting).

## Inter-app communication

Once the user has made a decision in the Yoti app to share or not share their identity with your application, the Yoti app will send the user back to your application.

No further configuration is required on Android because the SDK registers [Broadcasts](https://developer.android.com/guide/components/broadcasts) on its own.

On iOS however, we'll have to add some configuration for handling deep links. If you do not have deeplinking configured, consult the official [setup documentation](https://reactnative.dev/docs/linking) then proceed below.

Add Yoti as a query scheme to your app's `Info.plist` file:

```diff
...
<plist version="1.0">
+<dict>
+	<key>LSApplicationQueriesSchemes</key>
+	<array>
+  		<string>easyid</string>
+  		<string>yoti</string>
+	</array>
...
```

Add `RNYotiButtonViewManager` to the handlers along with `RCTLinkingManager` (if need be):

- Add `RNYotiButtonViewManager` to your imports in `ios/Appelegate.m`

  ```objective-c
  #import <react-native-yoti-button/RNYotiButtonViewManager.h>
  ```

- Extend your handlers

  ```objective-c
  - (BOOL)application:(UIApplication *)application
      openURL:(NSURL *)url
      options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
  {
      return [RNYotiButtonViewManager application:application openURL:url options:options] ||
             [RCTLinkingManager application:application openURL:url options:options];
  }
   ```

# Usage

The SDK exposes a single component which handles communication between your app and the Yoti app on a user's device.

All props are required, with the exception of `theme`.

```javascript
import React from 'react';
import { AppRegistry} from 'react-native';

import YotiButton, {
  THEME_EASYID,
  THEME_PARTNERSHIP,
  THEME_YOTI,
} from '@getyoti/react-native-yoti-button';

function AppExample() {
    return (
      <YotiButton
        clientSDKID="YOUR_CLIENT_SDK_ID"
        scenarioID="YOUR_SCENARIOD_ID"
        useCaseID="YOUR_USE_CASE_ID"
        theme={THEME_YOTI}
        onSuccess={({useCaseId, token}) => {
          // Handle successful Yoti authentication.
          // You can send the token to your backend, for example, and
          // request the user's profile using any of the backend SDKs.
        }}
        onFail={error => {
          // Handle general failures such as the user not completing the Share
          // process in the Yoti app, or when the SDK fails to retrieve a useCaseID and token
          // the error object can either be populated or `undefined`
        }}
        onOpenYotiApp={() => {
         // It is a notification that the intent has been sent to the Yoti app.
         // Handle specific behaviour if needed.
         // You may want to restore your app's UI state when this happens.
        }}
        onStartScenario={() => {
          // Called when your scenario is about to be started.
        }}
        onStartScenarioError={error => {
          // Handler for when the SDK fails to start a scenario.
          // This may occur due to incorrect API keys or a network error.
          // the error object can either be populated or `undefined`
        }}
      />
    );
}

AppRegistry.registerComponent('App', () => AppExample);
```

The SDK supports a few themes which have slightly different behaviours:

|Name              |Colour                         |Target App     |
|------------------|-------------------------------|---------------|
|THEME_YOTI        |Blue                           |Digital ID Apps|
|THEME_EASYID      |Red with white logo            |EasyID App     |
|THEME_PARTNERSHIP |White with supplementary view  |Digital ID Apps|

Depending on which theme you select it may target a specific app or have a supplementary view underneath it.
The way each themed button is used however remains the same.

To set the theme simply alter `theme` prop on your YotiButton component.

## Localisation
On Android, you may add values to the `android/app/src/main/res/values/strings.xml` file, creating the `strings.xml` file if it doesn't exist already, according to the keys below:

```xml
<resources>
    <string name="app_name">YotiSDK</string>
    <string name="yoti.sdk.error.yoti_app_version_incompatible">The current Yoti app installed is not compatible, please update your Yoti app.</string>
    <string name="yoti.sdk.yoti.button.label">CONTINUE WITH YOTI</string>
    <string name="yoti.sdk.easyid.button.label">Continue with Post Office EasyID</string>
    <string name="yoti.sdk.partnership.button.label">Continue with your Digital ID</string>
    <string name="yoti.sdk.support_info.text">Works with:</string>
</resources>
```

For iOS, include a `.strings` file named `YotiButtonSDK.strings` in your application bundle and specify the following keys based on the theme:

```
"yoti.sdk.yoti.button.label" = "Label for Yoti theme";
"yoti.sdk.partnership.button.label" = "Label for Partnership theme";
"yoti.sdk.easyid.button.label" = "Label for EasyID theme";
"yoti.sdk.support_info.text" = "Support info text for Partnership theme";
```

# Troubleshooting

<details>
	<summary>Resolving autolinking failures on Android and iOS</summary>


### iOS

Linker errors pertaining to Swift libraries such as `swiftFoundation` can be resolved with one or more of the solutions mentioned [in this oft-quoted StackOverflow discussion](https://stackoverflow.com/questions/52536380/why-linker-link-static-libraries-with-errors-ios), depending on your React Native version and project setup.

### Android

Android linking is performed in 3 steps:

#### android/settings.gradle

Add the following to your settings.gradle file as a new entry before the last line which has `include ':app'`:

```diff
+   include ':react-native-yoti-button'
+   project(':react-native-yoti-button').projectDir = new
+   File(rootProject.projectDir, '../node_modules/react-native-yoti-button/src/android')

    include ':app'
```

#### android/app/build.gradle

Find the `dependencies` block in your build.gradle file and add `implementation project(':react-native-yoti-button')`:

```diff
dependencies {
   ...
+   implementation project(':react-native-yoti-button')
}
```


#### android/app/src/main/java/..../MainApplication.java

Add an import for the package:

```diff
import android.app.Application;
import com.facebook.react.ReactApplication;
+ import com.yoti.reactnative.RNYotiButtonPackage;
```

Find the `getPackages` function and add `new RNYotiButtonPackage()` to the list of packages.

```diff
@Override
protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
+       new RNYotiButtonPackage(),
        ...
```

</details>

## Support
If you have any other questions please do not hesitate to contact clientsupport@yoti.com.
Once we have answered your question we may contact you again to discuss Yoti products and services. If you'd prefer us not to do this, please let us know when you e-mail.
