import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';
import Colors from '../constants/Colors';

const images = {
  'heart': require('../assets/images/heart.png'),
  'heart_red': require('../assets/images/heart_red.png'),
  'quote': require('../assets/images/quote.png'),
  'quote_red': require('../assets/images/quote_red.png'),
  'list': require('../assets/images/list.png'),
  'list_red': require('../assets/images/list_red.png'),
  'lotus': require('../assets/images/lotus.png'),
  'lotus_red': require('../assets/images/lotus_red.png'),
}

export default class TabBarIcon extends React.Component {
  render() {
    switch (this.props.name) {
      //case 'heart':
      case 'heart_red':
      case 'quote':
      case 'quote_red':
      case 'lotus':
      case 'lotus_red':
        return(      
          <Image
            source={images[this.props.name]}
            fadeDuration={0}
          />
        );
      default:
        return (
          <Ionicons
            name={this.props.name}
            size={26}
            style={{ marginBottom: -3 }}
            color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      }
  }
}