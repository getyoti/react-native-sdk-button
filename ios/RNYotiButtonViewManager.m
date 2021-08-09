#import "RNYotiButtonViewManager.h"
#import "RNYotiButtonView.h"
#import <yoti_sdk/yoti_sdk-Swift.h>

@implementation RNYotiButtonViewManager

RCT_EXPORT_MODULE(RNYotiButton)

RCT_EXPORT_VIEW_PROPERTY(useCaseID, NSString);
RCT_EXPORT_VIEW_PROPERTY(clientSDKID, NSString);
RCT_EXPORT_VIEW_PROPERTY(scenarioID, NSString);
RCT_EXPORT_VIEW_PROPERTY(onStartScenario, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onStartScenarioError, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onSuccess, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onFail, RCTBubblingEventBlock);
RCT_EXPORT_VIEW_PROPERTY(onOpenYotiApp, RCTBubblingEventBlock);

- (UIView *)view {
  return [[RNYotiButtonView alloc] init];
}

+ (BOOL)application:(UIApplication *)app
            openURL:(NSURL *)URL
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
    return [YotiSDK application:app open:URL options:options];
}

@end
