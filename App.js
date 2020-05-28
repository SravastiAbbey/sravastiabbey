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
import sql from './sql'

// imported SQLite file, converted from csv
const INPUT_SQLITE_FILE='quotes-new.db';

// can be used to force app to reload database
const forceReloadData = false;

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

  async createTable(db) {
    return new Promise((resolve, reject) => {
      db.transaction(tx =>
          tx.executeSql(
              SQL_QUERY_CREATE_TABLE,
              [],
              (_, result) => {
                console.log('Table created');
                resolve(result)
              },
              (_, error) => {
                console.log('Error creating table');
                reject(error)
              }
          )
      );
    });
  }

  async dropTable(db) {
    return new Promise((resolve, reject) => {
      db.transaction(tx =>
          tx.executeSql(
              SQL_QUERY_DROP_TABLE,
              [],
              (_, result) => {
                console.log('Table dropped');
                resolve(result)
              },
              (_, error) => {
                console.log('Error dropping table');
                reject(error)
              }
          )
      );
    });
  }

  async copyTableData(db) {
    return new Promise((resolve, reject) => {
      db.transaction(tx =>
          tx.executeSql(
              SQL_QUERY_COPY_DATA,
              [],
              (_, result) => {
                console.log('Data copied');
                resolve(result)
              },
              (_, error) => {
                console.log('Error copying data');
                reject(error)
              }
          )
      );
    });
  }
  async logTableInfo(db, tableName) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        console.log("Table info for " + tableName);
        tx.executeSql(
            `PRAGMA table_info('${tableName}');`,
            [],
            (_, result) => {
              console.log(result);
              resolve(result)
            },
            (_, error) => {
              console.log('Error copying data');
              reject(error)
            }
        )
      });
    });
  }

  /*
   Check if database file exists in the app document directory. If it does not,
   copy it from the assets and then create the quotes table (with the favorites
   and index column) and copy the data over. forceReloadData can be used
   to force a reload of quotes from the sqlite file.
   */
  async copySqliteFile() {
    // destination file and destination directory
    let destinationDirectory = `${FileSystem.documentDirectory}SQLite`;
    let destinationFile = `${destinationDirectory}/${sql.databaseName}`;
    console.log("Destination file = " + destinationFile);
    if (forceReloadData) {
      console.log("Deleting to force reload")
      await FileSystem.deleteAsync(destinationFile);
      let db = await sql.db();
      db._db.close();
    }
    // does destination database file exist?
    let checkIfExists = await FileSystem.getInfoAsync(destinationFile);
    console.log("Checking if destination file exists.", checkIfExists);
    // if destination file exists, abort
    if (checkIfExists.exists) return;
    // if not, lets make the /SQLite directory
    let checkIfDirectoryExists = await FileSystem.getInfoAsync(destinationDirectory);
    console.log("Checking if destination directory exists.", checkIfDirectoryExists);
    if (!checkIfDirectoryExists) {
      console.log("Creating destination directory: " + destinationDirectory);
      let result = await FileSystem.makeDirectoryAsync(destinationDirectory, {intermediates:true});
      console.log(result);
    }
    // copy the database file from the assets into the documents directory
    console.log("Copying file in assets to app directory")
    result = await FileSystem.downloadAsync( Asset.fromModule(require('./assets/'+INPUT_SQLITE_FILE)).uri, destinationFile);
    console.log(result);
    let db = await sql.db();
    await this.logTableInfo(db, 'favorites');
    await this.logTableInfo(db, 'quotes');
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
