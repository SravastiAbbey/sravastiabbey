import { action, observable, computed } from 'mobx';
import { AsyncStorage } from 'react-native';
import quotesManager from './Libraries/Quotes';
import Quotes from './Libraries/Quotes';

const KEY_PREFIX = "@SravastiApp:";

const storeData = async (key, data) => {
  try {
    //console.log(`storeData: ${key}: ${data}`)
    await AsyncStorage.setItem(KEY_PREFIX+key, JSON.stringify(data));
  } catch (error) {
    // Error saving data
    //console.error(error);
  }
};

const retrieveData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(KEY_PREFIX+key);
    //console.log(`retrieveData: ${key}: ${value}`)
    return JSON.parse(value);
  }
  catch (error) {
    // Error retrieving data
    //console.error(error);
    return null;
  }
};

class ObservableStore {

  fontSizes = {
    small: 14,
    medium: 18,
    large: 22,
    larger: 26,
    largest: 30
  };

  @observable baseFontFamily = 'open-sans';
  @observable baseFontSize = 18;
  @observable quotes = observable([]);
  @observable currentQuoteIndex = 0;
  @observable currentQuote = null;

  /*
    Adjust font size for caveat to a larger size because it appears smaller
   */
  @computed get adjustedFontSize() {
    return this.baseFontFamily === 'caveat' ? this.baseFontSize + 6 : this.baseFontSize;
  }

  @action async setBaseFontFamily(value) {
    this.baseFontFamily = value;
    await storeData('baseFontFamily', value);
  }

  @action async setBaseFontSize(value) {
    this.baseFontSize = value;
    await storeData('baseFontSize', value);
  }

  @action async setBaseFontSizeByName(fontSizeName) {
    return await this.setBaseFontSize(this.fontSizes[fontSizeName]);
  }

  @computed get boldFont() {
    return this.baseFontFamily + '-bold';
  }

  @computed get italicFont() {
    return this.baseFontFamily + '-italic';
  }

  @computed get semiboldFont() {
    return this.baseFontFamily + '-semibold';
  }

  @computed get lightFont() {
    return this.baseFontFamily + '-light';
  }

  async setIfNotNull(thisKey, storageKey) {
    if (!storageKey) storageKey = thisKey;
    let value = await retrieveData(storageKey);
    if (value) {
      console.log(`Setting value from key: this.${thisKey}/${storageKey} = ${value}`);
      this[thisKey] = value;
    }
  }

  @action randomQuote() {
    const min = 0;
    const max = this.quotes.length - 1;
    const rand = Math.floor(min + Math.random() * (max - min));
    this.currentQuoteIndex = rand;
    return this.currentQuote;
  }

  @action async setFavorite(quoteId, value) {
    let index = this.quotes.findIndex(quote => quote.id === quoteId);
    this.quotes[index].favorite = value;
    await Quotes.setIsFavorite(quoteId, value ? 1 : 0);
  }

  @action setCurrentQuoteIndex(index) {
    this.currentQuoteIndex = index;
  }

  @action setCurrentQuoteById(quoteId) {
    let index = this.quotes.findIndex(quote => quote.id === quoteId);
    this.currentQuoteIndex = index;
  }

  @action setQuotes(quotes) {
    this.quotes = observable(quotes);
    console.log(this.quotes.length + " quotes set.")
  }

  async initializeFromStorage() {
    console.log("initializing store...");
    //await AsyncStorage.removeItem(KEY_PREFIX+'baseFontSize');
    //await AsyncStorage.removeItem(KEY_PREFIX+'baseFontFamily');
    await this.setIfNotNull('baseFontSize');
    await this.setIfNotNull('baseFontFamily');
  }

}

const observableStore = new ObservableStore();
export default observableStore;