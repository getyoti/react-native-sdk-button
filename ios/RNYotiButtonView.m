#import "RNYotiButtonView.h"
#import <UIKit/UIKit.h>
#import <React/RCTViewManager.h>
#import <React/RCTUtils.h>
#import <yoti_sdk/yoti_sdk-Swift.h>

@interface RNYotiButtonView () <YTBSDKDelegate, YTBBackendDelegate>

@property NSString *_useCaseID;
@property NSString *_clientSDKID;
@property NSString *_scenarioID;
@property NSString *_theme;
@property (nonatomic, copy) RCTBubblingEventBlock _onStartScenario;
@property (nonatomic, copy) RCTBubblingEventBlock _onStartScenarioError;
@property (nonatomic, copy) RCTBubblingEventBlock _onSuccess;
@property (nonatomic, copy) RCTBubblingEventBlock _onFail;
@property (nonatomic, copy) RCTBubblingEventBlock _onOpenYotiApp;
@property (strong, nonatomic) IBOutlet YotiButton *_but;

@end

@implementation RNYotiButtonView

- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    self._but = [[YotiButton alloc] initWithFrame:frame];
    self._but.useCaseID = self._useCaseID;
    [self._but setExclusiveTouch:YES];
    RNYotiButtonView * __weak weakSelf = self;
    self._but.action = ^void(YotiButton* button) {
        [weakSelf buttonDidTouchUpInside:button];
    };
    [self addSubview:self._but];
    [NSLayoutConstraint activateConstraints:@[
        [self._but.widthAnchor constraintEqualToAnchor:self.widthAnchor],
    ]];
    return self;
}

-(void)buttonDidTouchUpInside:(YotiButton*)sender {
  NSString* useCaseID = sender.useCaseID;
  
  NSError* error = nil;
  YTBScenarioBuilder *firstScenarioBuilder = [[YTBScenarioBuilder alloc] init];
  firstScenarioBuilder.useCaseID = self._useCaseID;
  firstScenarioBuilder.clientSDKID = self._clientSDKID;
  firstScenarioBuilder.scenarioID = self._scenarioID;
  YTBScenario *firstScenario = [firstScenarioBuilder create:&error];
  [YotiSDK addScenario: firstScenario];
  self._onStartScenario(nil);
  [YotiSDK startScenarioForUseCaseID:useCaseID theme:sender.theme withDelegate:self error:&error];

  if (error != nil) {
    self._onStartScenarioError(RCTMakeError(error.localizedDescription, nil, nil));
  }
}

// MARK: Yoti callbacks

- (void)yotiSDKDidFailFor:(NSString *)useCaseID appStoreURL:(NSURL *)appStoreURL with:(NSError *)error {
  self._onFail(RCTMakeError(error.localizedDescription, nil, nil));
}

- (void)yotiSDKDidSucceedFor:(NSString * _Nonnull)useCaseID baseURL:(NSURL * _Nullable)baseURL token:(NSString * _Nullable)token url:(NSURL * _Nullable)url {
  self._onSuccess(@{
    @"useCaseID": useCaseID,
    @"token": token,
    @"url": url
  });
}

- (void)yotiSDKDidOpenYotiApp {
  if (self._onOpenYotiApp) {
    self._onOpenYotiApp(nil);
  }
}

- (void)backendDidFinishWith:(NSData * _Nullable)data error:(NSError * _Nullable)error {}

// MARK: - Setters

-(void)setUseCaseID:(NSString *)useCaseID {
  self._useCaseID = useCaseID;
  self._but.useCaseID = self._useCaseID;
}

-(void)setClientSDKID:(NSString *)clientSDKID {
  self._clientSDKID = clientSDKID;
}

-(void)setScenarioID:(NSString *)scenarioID {
  self._scenarioID = scenarioID;
}

-(void)setTheme:(NSString *)theme {
  if ([theme  isEqual:  @"THEME_EASYID"]) {
    self._but.theme = YTBThemeEasyID;
    return;
  }

  if ([theme  isEqual:  @"THEME_YOTI"]) {
    self._but.theme = YTBThemeYoti;
    return;
  }

  if ([theme  isEqual:  @"THEME_PARTNERSHIP"]) {
    self._but.theme = YTBThemePartnership;
    return;
  }
}

-(void)setOnStartScenario:(RCTBubblingEventBlock)onStartScenario {
  self._onStartScenario = onStartScenario;
}

-(void)setOnStartScenarioError:(RCTBubblingEventBlock)onStartScenarioError {
  self._onStartScenarioError = onStartScenarioError;
}

-(void)setOnSuccess:(RCTBubblingEventBlock)onSuccess {
  self._onSuccess = onSuccess;
}

-(void)setOnFail:(RCTBubblingEventBlock)onFail {
  self._onFail = onFail;
}

-(void)setOnOpenYotiApp:(RCTBubblingEventBlock)onOpenYotiApp {
  self._onOpenYotiApp = onOpenYotiApp;
}

@end
