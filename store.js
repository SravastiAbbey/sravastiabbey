import { action, observable } from 'mobx';

class ObservableStore {

  @observable quoteFontFamily = 'caveat';
  @observable quoteFontSize = 22;

  @action setQuoteFontFamily(value) {
    this.quoteFontFamily = value;
  }

  @action setQuoteFontSize(value) {
    this.quoteFontSize = value;
  }

}

const observableStore = new ObservableStore();
export default observableStore;