export default {
    databaseVersion: 0.1,
    databaseFileBaseName: 'quotes-new',
    databaseMakeName: (baseName, version) => {
        return `${baseName}-${version}.db`
    }
}