import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text, TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../constants/Colors';
import { inject, observer } from "mobx-react";
import styles from '../styles/main';
import HeaderBackground from "../components/HeaderBackground";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { LightenDarkenColor } from "../Utils";

const Explanation = ({textStyle, iconStyle}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (isOpen) {
    return (
      <TouchableOpacity
        onPress={() => {setIsOpen(false)}}
      >
        <Text style={textStyle}>
          At Sravasti Abbey, we strive to set these three motivations every day upon waking up. We come back to them throughout the day to renew our sense of purpose.
        </Text>
      </TouchableOpacity>
    )
  }
  else {
    return (
      <TouchableOpacity
        onPress={() => {setIsOpen(true)}}
        style={{
        flex:1,
        flexDirection:'row-reverse',
        padding:10,
      }}>
        <AntDesign
          name={"questioncircleo"}
          size={22}
          color={LightenDarkenColor(Colors.gray, 30)}
          style={iconStyle}
        />
      </TouchableOpacity>
    )
  }

};

const HeaderTitle = (props) => {
  return (
    <View style={{
      paddingBottom:10,
      flex: 1,
      textAlign:'center',
      alignSelf: 'center'
    }}>
      <Text style={{
        fontSize:17,
        textAlign:'center',
        fontWeight: "600",
        color:Colors.tintColor
      }}>Daily</Text>
      <Text style={{
        fontSize:17,
        textAlign:'center',
        fontWeight: "600",
        color:Colors.tintColor
      }}>Motivation</Text>
    </View>
  );
};

@inject('observableStore')
@observer
export default class MotivationScreen extends React.Component {
  static navigationOptions = {
    //title: 'Daily Motivation',
    headerTitle: (props) => <HeaderTitle {...props} />,
    headerTintColor: Colors.tintColor,
    headerTitleStyle :{textAlign: 'center', alignSelf:'center', flex:1},
    headerBackground: <HeaderBackground/>,
  };

  render() {

    // get MobX store for style props
    let store = this.props.observableStore;

    // combined font props from store with global styles
    let quoteTextStyle = StyleSheet.flatten([styles.quoteText, {
      fontSize: store.adjustedFontSize,
      fontFamily: store.baseFontFamily,
    }]);

    let explanationTextStyle = StyleSheet.flatten([styles.explanationText, {
      fontSize: store.adjustedFontSize,
      fontFamily: store.baseFontFamily,
    }]);

    return (
      <ScrollView style={styles.container}>
        <View style={styles.quoteContainer}>
          <Explanation textStyle={explanationTextStyle}/>
          <Text style={quoteTextStyle}>
            Today, as well as I am able, may I harm no living being with my body, speech, and mind.
          </Text>
          <Text style={quoteTextStyle}>
            Today, as well as I am able, may I help and serve sentient beings.
          </Text>
          <Text style={quoteTextStyle}>
            Today, as well as I am able, I will cultivate bodhicitta—the altruistic intention to become a Buddha for the benefit of all living beings—and may that beautiful aspiration influence all actions of my body, speech, and mind.
          </Text>
        </View>
      </ScrollView>
    );
  }
}