import {SQLite} from 'expo-sqlite';

class Quotes {

    db = null;
    data = [];

    async initialize() {
        this.db = await SQLite.openDatabase("quotes-new.db");
        if (!this.db) throw new Error("Failed to open database");
        try {
            let result = await this.getAllQuotes();
            this.data = result.rows._array;
            console.log("Num quotes = " + this.data.length);
        }
        catch (error) {
            console.error(error);
            this.data = [
                {
                    quote: "Ooops. Failed to load quotes.",
                    author: "",
                    category: ""
                }
            ]
        }
    }

    QUOTES_SELECT_JOIN = `
        SELECT * FROM 'quotes'
        LEFT JOIN 'favorites' ON
        quotes.id = favorites.quote_id
        ORDER BY id
    `;

    async getAllQuotes() {
        return new Promise((resolve, reject) => {
            this.db.transaction(tx =>
                tx.executeSql(
                    this.QUOTES_SELECT_JOIN,
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
        let value = isFavorite ? 1 : 0;
        return new Promise((resolve, reject) => {
            this.db.transaction(tx =>
                tx.executeSql(
                    `UPDATE quotes SET favorite = ${value} WHERE id = ${id};`,
                    [],
                    (_, result) => {
                        console.log(`Finished setting favorite id = ${id}, value = ${value}`);
                        resolve(result)
                    },
                    (_, error) => {
                        console.log(`Error setting favorite id = ${id}, value = ${value}`);
                        reject(error)
                    }
                )
            );
        });
    }

}

const quotes = new Quotes();
export default quotes;