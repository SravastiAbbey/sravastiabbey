import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading} from 'expo';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'mobx-react';
import observableStore from './store';
import {SQLite} from 'expo-sqlite';

export default class App extends React.Component {

  state = {
    isLoadingComplete: false,
  };

  async componentDidMount() {
    await observableStore.initializeFromStorage();
  }

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

  async doesFavoritesColumnExist(db) {
    return new Promise((resolve, reject) => {
      db.transaction(tx =>
          tx.executeSql(
              "PRAGMA table_info('quotes-new');",
              [],
              (_, result) => {
                console.log(result);
                if (result.rows._array.find(obj => obj.name === "favorite")) {
                  console.log('Favorites column exists');
                  resolve(true);
                }
                else {
                  console.log('Favorites column does not exist');
                  resolve(false);
                }

              },
              (_, error) => {
                console.log('Error creating favorites column');
                reject(error)
              }
          )
      );
    });
  }

  async createFavoritesColumn(db) {
    return new Promise((resolve, reject) => {
      db.transaction(tx =>
          tx.executeSql(
              "ALTER TABLE 'quotes-new' ADD favorite INTEGER",
              [],
              (_, result) => {
                console.log('Favorites column created');
                resolve(result)
              },
              (_, error) => {
                console.log('Error creating favorites column');
                reject(error)
              }
          )
      );
    });
  }

  /*
   The SQLite file has to be copied from the assets to the app document directory
   on the phone before it can be used. But we only want to do that once, when the
   app is initially installed so that we don't overwrite user favorites, which are
   stored in the favorites column. The favorites column is added to the SQLite
   database after it is copied below.
   */
  async copySqliteFile() {
    let destinationDirectory = `${FileSystem.documentDirectory}SQLite`;
    let destinationFile = `${destinationDirectory}/quotes-new.db`;
    console.log("Destination file = " + destinationFile);
    let checkIfExists = await FileSystem.getInfoAsync(destinationFile);
    console.log(checkIfExists);
    if (checkIfExists.exists) return;
    let result = await FileSystem.makeDirectoryAsync(destinationDirectory, {intermediates:true});
    console.log(result);
    result = await FileSystem.downloadAsync( Asset.fromModule(require('./assets/quotes-new.db')).uri, destinationFile);
    console.log(result);
    let db = await SQLite.openDatabase("quotes-new.db");
    try {
      let favColExists = await this.doesFavoritesColumnExist(db);
      if (!favColExists) {
        console.log("Creating favorite column...");
        result = await this.createFavoritesColumn(db);
        console.log(result);
      }
      else {
        console.log("Not creating favorite column...");
      }
    }
    catch (error) {
      console.log(error.message);
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
      this.copySqliteFile()
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
