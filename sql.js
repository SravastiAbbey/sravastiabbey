import config from './config'
import {SQLite} from 'expo-sqlite';
import Config from "./config";

const databaseName = config.databaseMakeName(config.databaseFileBaseName, config.databaseVersion)

export default {
    databaseName: databaseName,
    db: async () => await SQLite.openDatabase(databaseName)
}