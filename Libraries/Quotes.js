import sql from '../sql'

class Quotes {

    db = null;
    data = [];
    favorites = false;

    async openDatabase() {
        this.db = await sql.db();
        if (!this.db) throw new Error("Failed to open database");
    }

    async initializeFavorites() {
        this.favorites = true;
        console.log("Loading favorites")
        await this.openDatabase();
        try {
            let result = await this.getAllQuotes(true);
            this.data = result.rows._array;
            console.log("Num favorites = " + this.data.length);
        }
        catch (error) {
            console.error(error);
            this.data = null;
        }
    }

    async initializeAllQuotes() {
        this.favorites = false;
        await this.openDatabase();
        try {
            let result = await this.getAllQuotes(false);
            this.data = result.rows._array;
            console.log("Num quotes = " + this.data.length);
        }
        catch (error) {
            console.error(error);
            this.data = null;
        }
    }

    QUOTES_SELECT_JOIN = `
        SELECT author,category,pullquote,quote,source,favorite,quotes.id FROM quotes
        LEFT JOIN favorites ON
        quotes.id = favorites.quote_id
        ORDER BY quotes.id
    `;

    QUOTES_FAVORITES_SELECT_JOIN = `
        SELECT author,category,pullquote,quote,source,favorite,quotes.id FROM quotes
        INNER JOIN favorites ON
        quotes.id = favorites.quote_id
        ORDER BY quotes.id
    `;

    async getAllQuotes(favoritesOnly) {
        const sqlQuery = favoritesOnly ? this.QUOTES_FAVORITES_SELECT_JOIN : this.QUOTES_SELECT_JOIN;
        console.log(sqlQuery);
        return new Promise((resolve, reject) => {
            this.db.transaction(tx =>
                tx.executeSql(
                    sqlQuery,
                    [],
                    (_, result) => {
                        console.log('Finished loading data');
                        resolve(result)
                    },
                    (_, error) => {
                        console.log('Error loading data');
                        reject(error)
                    }
                )
            );
        });
    }

    async setIsFavorite(id, isFavorite) {
        if (isFavorite) {
            return new Promise((resolve, reject) => {
                this.db.transaction(tx => {
                        console.log(`INSERT OR REPLACE INTO favorites(quote_id, favorites) VALUES (${id}, 1);`);
                        tx.executeSql(
                            `INSERT OR REPLACE INTO favorites(quote_id) VALUES (${id});`,
                            [],
                            (_, result) => {
                                console.log(`Finished setting favorite id = ${id}`);
                                resolve(result)
                            },
                            (_, error) => {
                                console.log(`Error setting favorite id = ${id}`);
                                reject(error)
                            }
                        )
                    }
                );
            });
        }
        else {
            return new Promise((resolve, reject) => {
                this.db.transaction(tx => {
                    tx.executeSql(
                        `DELETE FROM favorites where quote_id = ${id};`,
                        [],
                        (_, result) => {
                            console.log(`Finished setting favorite id = ${id}`);
                            resolve(result)
                        },
                        (_, error) => {
                            console.log(`Error setting favorite id = ${id}`);
                            reject(error)
                        }
                    )
                });
            });
        }
    }

}

const quotes = new Quotes();
export default quotes;