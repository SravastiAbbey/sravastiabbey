import { action, observable, computed } from 'mobx';

class ObservableStore {

  fontSizes = {
    small: 14,
    medium: 18,
    large: 22,
    larger: 26
  };

  @observable baseFontFamily = 'open-sans';
  @observable baseFontSize = 22;

  @action setBaseFontFamily(value) {
    this.baseFontFamily = value;
  }

  @action setBaseFontSize(value) {
    this.baseFontSize = value;
  }

  @action setBaseFontSizeByName(fontSizeName) {
    switch(fontSizeName) {
      case 'small':
        this.setBaseFontSizeSmall();
        break;
      case 'medium':
        this.setBaseFontSizeMedium();
        break;
      case 'large':
        this.setBaseFontSizeLarge();
        break;
      case 'larger':
        this.setBaseFontSizeLarger();
        break;
    }
  }

  @action setBaseFontSizeSmall() {
    this.baseFontSize = this.fontSizes.small;
  }

  @action setBaseFontSizeMedium() {
    this.baseFontSize = this.fontSizes.medium;
  }

  @action setBaseFontSizeLarge() {
    this.baseFontSize = this.fontSizes.large;
  }

  @action setBaseFontSizeLarger() {
    this.baseFontSize = this.fontSizes.larger;
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

}

const observableStore = new ObservableStore();
export default observableStore;