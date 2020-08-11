import config from './config'
import * as SQLite from 'expo-sqlite';

export default {
    databaseName: config.databaseFileName,
    db: async () => {
        console.log("Opening database: " + config.databaseFileName)
        try {
            return await SQLite.openDatabase(config.databaseFileName)
        }
        catch (e) {
            console.log("Failed to open database!");
            throw e;
            return null;
        }
    }
}