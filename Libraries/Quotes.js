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

    async getAllQuotes() {
        return new Promise((resolve, reject) => {
            this.db.transaction(tx =>
                tx.executeSql(
                    "SELECT * FROM 'quotes-new' LIMIT 0,30",
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

}

const quotes = new Quotes();
export default quotes;