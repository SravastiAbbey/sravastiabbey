import React from 'react';
import { StyleSheet, Image, Text, View, ScrollView, Platform } from 'react-native';
import Colors from '../constants/Colors';
import { CheckBox } from 'react-native-elements'
import { inject, observer } from "mobx-react";
import HeaderBackground from "../components/HeaderBackground";
import styles from "../styles/main";

@inject('observableStore')
@observer
export default class MoreScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
    headerTintColor: Colors.tintColor,
    headerTitleStyle :{textAlign: 'center', alignSelf:'center', flex:1},
    headerTitleContainerStyle: Platform.OS === 'ios' ? null : {
      left: 0, // THIS RIGHT HERE
    },
    headerBackground: <HeaderBackground/>
  };

  setFontFamily = async (newFontFamily) => {
    let store = this.props.observableStore;
    await store.setBaseFontFamily(newFontFamily);
  };

  setFontSize = async (newSize) => {
    let store = this.props.observableStore;
    await store.setBaseFontSizeByName(newSize);
  };

  render() {

    let store = this.props.observableStore;
    let currentFontFamily = store.baseFontFamily;
    let currentFontSize = store.baseFontSize;

    return (
        <View style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <View>
              <Text style={styles.optionsTitleText}>
                Text Style
              </Text>

              <CheckBox
                title='Caveat'
                checked={currentFontFamily === 'caveat'}
                onPress={async () => await this.setFontFamily('caveat')}
                textStyle={{
                  fontFamily: 'caveat',
                  fontSize: 22
                }}
                containerStyle={styles.option}
              />

              <CheckBox
                title='OpenSans'
                checked={currentFontFamily === 'open-sans'}
                onPress={async () => await this.setFontFamily('open-sans')}
                textStyle={{
                  fontFamily: 'open-sans'
                }}
                containerStyle={styles.option}
              />

              <CheckBox
                title='Gelasio'
                checked={currentFontFamily === 'gelasio'}
                onPress={async () => await this.setFontFamily('gelasio')}
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
                onPress={async () => await this.setFontSize('small')}
                textStyle={{
                  fontFamily: 'open-sans',
                  fontSize: store.fontSizes.small
                }}
                containerStyle={styles.option}
              />

              <CheckBox
                title='Medium'
                checked={currentFontSize === store.fontSizes.medium}
                onPress={async () => await this.setFontSize('medium')}
                textStyle={{
                  fontFamily: 'open-sans',
                  fontSize: store.fontSizes.medium
                }}
                containerStyle={styles.option}
              />

              <CheckBox
                title='Large'
                checked={currentFontSize === store.fontSizes.large}
                onPress={async () => await this.setFontSize('large')}
                textStyle={{
                  fontFamily: 'open-sans',
                  fontSize: store.fontSizes.large
                }}
                containerStyle={styles.option}
              />

              <CheckBox
                title='Larger'
                checked={currentFontSize === store.fontSizes.larger}
                onPress={async () => await this.setFontSize('larger')}
                textStyle={{
                  fontFamily: 'open-sans',
                  fontSize: store.fontSizes.larger
                }}
                containerStyle={styles.option}
              />

              <CheckBox
                title='Largest'
                checked={currentFontSize === store.fontSizes.largest}
                onPress={async () => await this.setFontSize('largest')}
                textStyle={{
                  fontFamily: 'open-sans',
                  fontSize: store.fontSizes.largest
                }}
                containerStyle={styles.option}
              />

            </View>
          </ScrollView>
        </View>
    );
  }
}