import { action, observable, computed } from 'mobx';
import { AsyncStorage } from 'react-native';

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

  @action async setBaseFontFamily(value) {
    this.baseFontFamily = value;
    await storeData('baseFontFamily', value);
  }

  @action async setBaseFontSize(value) {
    this.baseFontSize = value;
    await storeData('baseFontSize', value);
  }

  @action setBaseFontSizeByName(fontSizeName) {
    switch(fontSizeName) {
      case 'small':
        return this.setBaseFontSizeSmall();
      case 'medium':
        return this.setBaseFontSizeMedium();
      case 'large':
        return this.setBaseFontSizeLarge();
      case 'larger':
        return this.setBaseFontSizeLarger();
      case 'largest':
        return this.setBaseFontSizeLargest();
    }
  }

  @action async setBaseFontSizeSmall() {
    await this.setBaseFontSize(this.fontSizes.small);
  }

  @action async setBaseFontSizeMedium() {
    await this.setBaseFontSize(this.fontSizes.medium);
  }

  @action async setBaseFontSizeLarge() {
    await this.setBaseFontSize(this.fontSizes.large);
  }

  @action async setBaseFontSizeLarger() {
    await this.setBaseFontSize(this.fontSizes.larger);
  }

  @action async setBaseFontSizeLargest() {
    await this.setBaseFontSize(this.fontSizes.largest);
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

  async initializeFromStorage() {
    //await AsyncStorage.removeItem(KEY_PREFIX+'baseFontSize');
    //await AsyncStorage.removeItem(KEY_PREFIX+'baseFontFamily');
    await this.setIfNotNull('baseFontSize');
    await this.setIfNotNull('baseFontFamily');
  }

}

const observableStore = new ObservableStore();
export default observableStore;