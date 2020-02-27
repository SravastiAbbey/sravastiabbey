/*
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("sravasti-abbey-favorites");

const CREATE_TABLE=`
    CREATE TABLE IF NOT EXISTS favorites (
    id INTEGER PRIMARY KEY NOT NULL,
    quoteId INTEGER NOT NULL,
  )`;

export const createFavoritesTable = () => {
    return new Promise((resolve, reject) => {
        db.transaction(
            tx.executeSql(
                CREATE_TABLE,
                [],
                (_, result) => {
                    console.log('Finished creating favorites table');
                    resolve(result)
                },
                (_, error) => {
                    console.log('Error creating favorites table');
                    reject(error)
                }
            )
        );
    });
};

export const setFavorite = (quoteId) => {
    return new Promise((resolve, reject) => {
        db.transaction(
          tx.executeSql(
              '',
              [],
              (_, result) => {
                  resolve(result)
              },
              (_, error) => {
                  reject(error)
              }
          )
        );
    });
};
*/
/*
The package at "node_modules/to-readable-stream/index.js" attempted to import the Node standard library module "stream". It failed because React Native does not include the Node standard library. Read more at https://docs.expo.io/versions/latest/introduction/faq/#can-i-use-nodejs-packages-with-expo
 */