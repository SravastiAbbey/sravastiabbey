import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import Colors from '../constants/Colors';
import { CheckBox } from 'react-native-elements'
import { inject, observer } from "mobx-react";

@inject('observableStore')
@observer
export default class MoreScreen extends React.Component {
  static navigationOptions = {
    title: 'App Settings',
    headerTintColor: Colors.tintColor,
    headerTitleStyle :{textAlign: 'center', alignSelf:'center', flex:1},
    headerBackground: (
      <Image style={{ flex: 1, width: undefined, height: undefined, resizeMode: 'contain' }} 
        source={require('../assets/images/header.png')}
      />
    ),
  };

  setFontFamily = (newFontFamily) => {
    let store = this.props.observableStore;
    store.setBaseFontFamily(newFontFamily);
  };

  setFontSize = (newSize) => {
    let store = this.props.observableStore;
    store.setBaseFontSizeByName(newSize);
  };

  render() {

    let store = this.props.observableStore;
    let currentFontFamily = store.baseFontFamily;
    let currentFontSize = store.baseFontSize;

    return (
      <View>
        <Text style={styles.optionsTitleText}>
          Text Style
        </Text>

        <CheckBox
          title='Caveat'
          checked={currentFontFamily === 'caveat'}
          onPress={() => this.setFontFamily('caveat')}
          textStyle={{
            fontFamily: 'caveat',
            fontSize: 22
          }}
          containerStyle={styles.option}
        />

        <CheckBox
          title='OpenSans'
          checked={currentFontFamily === 'open-sans'}
          onPress={() => this.setFontFamily('open-sans')}
          textStyle={{
            fontFamily: 'open-sans'
          }}
          containerStyle={styles.option}
        />

        <CheckBox
          title='Gelasio'
          checked={currentFontFamily === 'gelasio'}
          onPress={() => this.setFontFamily('gelasio')}
          textStyle={{
            fontFamily: 'gelasio'
          }}
          containerStyle={styles.option}
        />

        <Text style={styles.optionsTitleText}>
          Text Size
        </Text>

        <CheckBox
          title='Small'
          checked={currentFontSize === store.fontSizes.small}
          onPress={() => this.setFontSize('small')}
          textStyle={{
            fontFamily: 'open-sans',
            fontSize: store.fontSizes.small
          }}
          containerStyle={styles.option}
        />

        <CheckBox
          title='Medium'
          checked={currentFontSize === store.fontSizes.medium}
          onPress={() => this.setFontSize('medium')}
          textStyle={{
            fontFamily: 'open-sans',
            fontSize: store.fontSizes.medium
          }}
          containerStyle={styles.option}
        />

        <CheckBox
          title='Large'
          checked={currentFontSize === store.fontSizes.large}
          onPress={() => this.setFontSize('large')}
          textStyle={{
            fontFamily: 'open-sans',
            fontSize: store.fontSizes.large
          }}
          containerStyle={styles.option}
        />

        <CheckBox
          title='Larger'
          checked={currentFontSize === store.fontSizes.larger}
          onPress={() => this.setFontSize('larger')}
          textStyle={{
            fontFamily: 'open-sans',
            fontSize: store.fontSizes.larger
          }}
          containerStyle={styles.option}
        />

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  optionsTitleText: {
    fontSize: 16,
    marginLeft: 15,
    marginTop: 9,
    marginBottom: 12,
  },
  optionIconContainer: {
    marginRight: 9,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EDEDED',
    marginLeft: 0,
    marginRight: 0,
    margin: 0
  },
  optionText: {
    fontSize: 15,
    marginTop: 1,
  },
});