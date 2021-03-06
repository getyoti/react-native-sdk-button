/**
 * Sample React Native App
 *
 */

import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import Header from './components/Header';
import Input from './components/Input';
import InputSpacer from './components/InputSpacer';
import YotiButton from '@getyoti/react-native-yoti-button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  welcome: {
    fontFamily: 'Prompt-SemiBold',
    fontSize: 20,
    color: '#444',
    textAlign: 'center',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  intro: {
    color: '#475056',
    fontFamily: 'Prompt-Medium',
    fontSize: 12,
    marginBottom: 15,
  },
  results: {flexGrow: 1, paddingHorizontal: 20},
  resultsContainer: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    marginBottom: 30,
  },
  resultsHeader: {paddingTop: 5, width: 200},
  resultsHeaderText: {
    textAlign: 'center',
    fontFamily: 'Prompt-Medium',
    color: 'white',
  },
  resultTitle: {
    color: '#444',
    fontFamily: 'Prompt-SemiBold',
    fontSize: 16,
    marginBottom: 0,
  },
  resultTime: {
    color: '#475056',
    fontFamily: 'Prompt-ExtraLight',
    fontSize: 8,
    marginBottom: 15,
  },
  resultText: {
    color: '#444',
    fontFamily: 'Prompt-Regular',
    fontSize: 12,
    marginBottom: 15,
  },
  resultRow: {flexDirection: 'row'},
  resultRowIcon: {fontSize: 12, marginTop: 5, marginRight: 5},
  resultsScrollViewContainer: {
    backgroundColor: 'white',
    borderWidth: 3,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  gutter: {paddingHorizontal: 20, paddingVertical: 20},
  yotiButton: {
    height: 60,
    alignSelf: 'center',
  },
  inputsTopGutter: {
    marginVertical: 20,
    width: '100%',
    borderBottomColor: '#d5dae0',
    borderBottomWidth: 2,
    borderTopColor: '#d5dae0',
    borderTopWidth: 2,
  },
});

export default () => {
  const [event, setEvent] = useState(null);
  const [useCaseID, setUseCaseID] = useState('test-123');
  const [useCaseIDFocused, setUseCaseIDFocused] = useState(false);
  const [clientSdkID, setClientSdkID] = useState('5d6a5aa0-bc47-4d62-8136-bb706d794e56');
  const [clientSdkIDFocused, setClientSdkIDFocused] = useState(false);
  const [scenarioID, setScenarioID] = useState('406e1d35-6171-459f-b667-3f533bed0a00');
  const [scenarioIDFocused, setScenarioIDFocused] = useState(false);
  const [buttonTitle, setButtonTitle] = useState('Test');
  const [buttonTitleFocused, setButtonTitleFocused] = useState(false);

  const showYotiButton =
    !useCaseIDFocused &&
    !clientSdkIDFocused &&
    !scenarioIDFocused &&
    !buttonTitleFocused &&
    useCaseID.length > 0 &&
    clientSdkID.length > 0 &&
    scenarioID.length > 0 &&
    buttonTitle.length > 0;

  useEffect(() => {
    if (!showYotiButton && event != null) {
      setEvent(null);
    }
  }, [showYotiButton]);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={{flex: 1, justifyContent: 'space-between', width: '100%'}}>
          <View style={styles.gutter}>
            <Text style={styles.intro}>
              Please fill in the required information below, and tap the Yoti
              button once you are done.
            </Text>
          </View>
          <View style={styles.results}>
            <Results event={event} />
          </View>
          <View>
            <View style={styles.inputsTopGutter}>
              <Input
                placeholder="Client SDK ID"
                onBlur={() => setClientSdkIDFocused(false)}
                onFocus={() => setClientSdkIDFocused(true)}
                value={clientSdkID}
                onChangeText={setClientSdkID}
              />
              <InputSpacer />
              <Input
                placeholder="Button Title"
                value={buttonTitle}
                onChangeText={setButtonTitle}
                onBlur={() => setButtonTitleFocused(false)}
                onFocus={() => setButtonTitleFocused(true)}
              />
              <InputSpacer />
              <Input
                placeholder="Scenario ID"
                onBlur={() => setScenarioIDFocused(false)}
                onFocus={() => setScenarioIDFocused(true)}
                value={scenarioID}
                onChangeText={setScenarioID}
              />
              <InputSpacer />
              <Input
                placeholder="Use Case ID"
                onBlur={() => setUseCaseIDFocused(false)}
                onFocus={() => setUseCaseIDFocused(true)}
                value={useCaseID}
                onChangeText={setUseCaseID}
              />
            </View>

            <View style={styles.yotiButton}>
              {showYotiButton && (
                <YotiButton
                  title={buttonTitle}
                  useCaseID={useCaseID}
                  clientSDKID={clientSdkID}
                  scenarioID={scenarioID}
                  onSuccess={({useCaseID, token}) => {
                    setEvent({
                      title: 'onSuccess',
                      details: `${useCaseID} - ${token}`,
                      isError: false,
                      timestamp: new Date(),
                    });
                    console.log({onSuccess: {useCaseID, token}});
                  }}
                  onFail={error => {
                    setEvent({
                      title: 'onFail',
                      details: error.message,
                      isError: true,
                      timestamp: new Date(),
                    });
                    console.log({onFail: error.message});
                  }}
                  onOpenYotiApp={() => {
                    setEvent({
                      title: 'onOpenYotiApp',
                      details: '',
                      isError: false,
                      timestamp: new Date(),
                    });
                    console.log('onOpenYotiApp');
                  }}
                  onStartScenario={() => {
                    setEvent({
                      title: 'onStartScenario',
                      details: '',
                      isError: false,
                      timestamp: new Date(),
                    });
                    console.log('onStartScenario');
                  }}
                  onStartScenarioError={error => {
                    setEvent({
                      title: 'onStartScenarioError',
                      details: error.message,
                      isError: true,
                      timestamp: new Date(),
                    });
                    console.log({onStartScenarioError: error.message});
                  }}
                  onYotiAppNotInstalled={error => {
                    setEvent({
                      title: 'onYotiAppNotInstalled',
                      details: 'Yoti app is not installed',
                      isError: true,
                      timestamp: new Date(),
                    });
                    console.log({onStartScenarioError: error.message});
                  }}
                />
              )}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

function Results({event}) {
  if (event == null) return null;
  const isSuccessOutcome = !event.isError;
  return (
    <View style={styles.resultsContainer}>
      <View
        style={[
          styles.resultsHeader,
          {
            backgroundColor: !isSuccessOutcome ? '#fb7570' : '#37c58f',
          },
        ]}>
        <Text style={styles.resultsHeaderText}>
          Current result: {isSuccessOutcome ? 'SUCCESS' : 'ERROR'}
        </Text>
      </View>

      <View
        style={[
          styles.resultsScrollViewContainer,
          {
            borderColor: !isSuccessOutcome ? '#fb7570' : '#37c58f',
          },
        ]}>
        <ScrollView>
          <View style={styles.resultRow}>
            <View>
              <Text style={styles.resultRowIcon}>
                {event.isError ? '❌' : '✅'}
              </Text>
            </View>
            <View>
              <Text style={[styles.resultTitle]}>{event.title}</Text>
              <Text style={[styles.resultTime]}>
                {event.timestamp.toTimeString()}
              </Text>
              <Text style={styles.resultText}>{event.details}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
