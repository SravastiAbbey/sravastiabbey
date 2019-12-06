import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading} from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'mobx-react';
import observableStore from './store';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <Provider observableStore={observableStore}>
            <AppNavigator />
          </Provider>
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/header.png'),
        require('./assets/images/heart.png'),
        require('./assets/images/heart_red.png'),
        require('./assets/images/list.png'),
        require('./assets/images/list_red.png'),
        require('./assets/images/lotus.png'),
        require('./assets/images/lotus_red.png'),
        require('./assets/images/quote.png'),
        require('./assets/images/quote_red.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        'caveat': require('./assets/fonts/Caveat-Regular.ttf'),
        'caveat-bold': require('./assets/fonts/Caveat-Bold.ttf'),
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
        'open-sans-semibold': require('./assets/fonts/OpenSans-SemiBold.ttf'),
        'open-sans-light': require('./assets/fonts/OpenSans-Light.ttf'),
        'open-sans-italic': require('./assets/fonts/OpenSans-Italic.ttf'),
        'gelasio': require('./assets/fonts/Gelasio-Regular.ttf'),
        'gelasio-bold': require('./assets/fonts/Gelasio-Bold.ttf'),
        'gelasio-semibold': require('./assets/fonts/Gelasio-SemiBold.ttf'),
        'gelasio-italic': require('./assets/fonts/Gelasio-Italic.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
