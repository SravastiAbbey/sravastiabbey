const databaseVersion = "0_2";
const databaseFileBaseName = "quotes";
// this needs to match INPUT_SQLITE_FILE in App.js

export default {
    databaseVersion,
    databaseFileBaseName,
    quotesTableName: `${databaseFileBaseName}_${databaseVersion}`,  // the name of the table that contains the quotes
    databaseFileName: `${databaseFileBaseName}_${databaseVersion}.db`, // both the name of the file and the database itself
    databaseName: `${databaseFileBaseName}_${databaseVersion}` // both the name of the file and the database itself
}
