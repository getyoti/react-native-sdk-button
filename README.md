![YotiBanner](./yoti_banner.png)

# Yoti Button SDK for React Native

Yoti button component for React Native [Android]([https://github.com/getyoti/android-sdk-button](https://github.com/getyoti/android-sdk-button)) and [iOS]([https://github.com/getyoti/ios-sdk-button](https://github.com/getyoti/ios-sdk-button)).

The purpose of the mobile SDK is to provide 3rd party applications the ability to request attributes from a Yoti user through Yoti mobile App. It is an interaction between a 3rd Party app and the Yoti app facilitated by a very lightweight SDK. This repository contains the module which enables your users to share their identity details with your application in a secure and trusted way.

## Prerequisite

Before you begin, kindly make sure you have at the minimum created an application and scenario according to the [documentation](https://www.yoti.com/developers).

This SDK does not come with any methods for making backend calls to your server APIs.

## React Native >= 0.60.0 installation

`yarn add react-native-yoti-button`

Navigate to your iOS folder and update pods with:

`pod install`

React Native autolinking will handle the rest of the native configuration. Should autolinking fail, consult the [troubleshooting instructions](#troubleshooting).

## React Native 0.59.x installation

Install the library with:

`yarn add react-native-yoti-button`

Link the library:

`react-native link react-native-yoti-button`

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

All props are required. 

```javascript
import React from 'react;
import { AppRegistry} from 'react-native';

import YotiButton from 'react-native-yoti-button';

function AppExample() {
    return (
      <YotiButton
        title="LOGIN"
        useCaseID="YOUR_USE_CASE_ID"
        clientSDKID="YOUR_CLIENT_SDK_ID"
        scenarioID="YOUR_SCENARIOD_ID"
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
