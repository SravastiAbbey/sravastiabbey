import React from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { Entypo, Feather, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import AudioPlayer, {pauseAudio, unpauseAudio, stopAudioAndClear, secondsToFormattedTimeString} from "../AudioPlayer";
import { inject, observer } from "mobx-react";
import _ from 'lodash';

const PlayControllers = ({soundState, mainColor, stopAction, pauseAction, unpauseAction}) => {

  if (soundState === 'stopped') return null;

  return (
    <View style={{
      flex:1,
      flexDirection: 'row'
    }}>
      <TouchableOpacity
        onPress={stopAction}
        style={{
        marginRight:10,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        <Entypo
          name={"controller-stop"}
          size={32}
          color={mainColor}
        />
        <Text style={{
          color: mainColor
        }}>
          Stop
        </Text>
      </TouchableOpacity>
      {soundState === 'playing' ?
        <TouchableOpacity
          onPress={pauseAction}
          style={{
          marginLeft: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <MaterialIcons
            name={"pause"}
            size={32}
            color={mainColor}
          />
          <Text style={{
            color: mainColor
          }}>
            Pause
          </Text>
        </TouchableOpacity> : null
      }
      {soundState === 'paused' ?
        <TouchableOpacity
          onPress={unpauseAction}
          style={{
          marginLeft: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <Entypo
            name={"controller-play"}
            size={32}
            color={mainColor}
          />
          <Text style={{
            color: mainColor
          }}>
            Play
          </Text>
        </TouchableOpacity> : null
      }
    </View>
  );

}

@inject('observableStore')
@observer
export default class AnimatedSoundPlayerButton extends React.Component {

  constructor(props) {
    super(props);
  }

  lastPress = 0;

  state = {
    fadeValue: new Animated.Value(1.0),
    currentPositionMillis: 0,
    soundState: 'stopped'
  };

  startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(500),
        Animated.timing(this.state.fadeValue, {
          toValue: 0.0,
          duration: 1000,
          useNativeDriver: true
        }),
        Animated.delay(500),
        Animated.timing(this.state.fadeValue, {
          toValue: 1.0,
          duration: 1000,
          useNativeDriver: true
        }),
      ])
    ).start();
  };

  mainColor = '#3f7bd9';

  async playAudio() {

    this.startAnimation();
    this.setState({soundState: 'playing'});

    try {
      await AudioPlayer(this.props.sound, (playbackStatus) => {
        this.setState({currentPositionMillis: playbackStatus.positionMillis})
      }, () => {
        this.setState({soundState: 'stopped'});
        this.state.fadeValue.stopAnimation(() => {
          this.setState({fadeValue: new Animated.Value(1.0)})
        });
      });
    }
    catch (e) {
      // do something with the error
      this.stopAudio();
      this.setState({soundState: 'stopped'});
    }

  }

  checkDoubleTap = () => {
    let delta = new Date().getTime() - this.lastPress;
    this.lastPress = new Date().getTime();
    console.log(delta);
    return delta < 500;
  };

  async stopAudio() {
    this.state.fadeValue.stopAnimation(() => {
      this.setState({fadeValue: new Animated.Value(1.0)})
    });
    await stopAudioAndClear();
    this.setState({soundState: 'stopped'});
  }

  async pauseAudio() {
    this.state.fadeValue.stopAnimation(() => {
      this.setState({fadeValue: new Animated.Value(1.0)})
    });      await pauseAudio();
    this.setState({soundState: 'paused'});
  }

  async unpauseAudio() {
    this.startAnimation();
    await unpauseAudio();
    this.setState({soundState: 'playing'});
  }

  onPress = async () => {

    let doubleTap = this.checkDoubleTap();
    let {soundState} = this.state;

    // if stopped, and button pressed to play
    if (soundState === 'stopped') {
      await this.playAudio();
    }
    // if double tapped, should stop and rewind
    else if (doubleTap) {
      await this.stopAudio();
    }
    // if playing, should pause
    else if (soundState === 'playing') {
      await this.pauseAudio();
    }
    // if paused, should play
    else if (soundState === 'paused') {
      await this.unpauseAudio();
    }
  };

  render() {

    let {title, sound} = this.props;

    let durationString = secondsToFormattedTimeString(sound.durationSeconds);
    let currentPositionString = secondsToFormattedTimeString(Math.floor(this.state.currentPositionMillis/1000));

    let {soundState} = this.state;

    return (
      <View style={{
        flex:1,
        flexDirection:'column',
        alignItems: 'center',
      }}>
        <TouchableOpacity
          onPress={this.onPress}
          style={{
            marginTop:20,
            marginBottom:5,
            flex:1,
            flexDirection:'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical:10,
            paddingHorizontal:5,
            width:'90%',
            marginLeft:'5%'
          }}
        >
          <Animated.View
            style={{
              opacity: this.state.fadeValue,
              marginLeft:10,
              transform: [
                {
                  scaleX: this.state.fadeValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.7, 1.1]
                  })
                },
                {
                  scaleY: this.state.fadeValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.7, 1.1]
                  })
                }
              ]
            }}
          >
            <Entypo
              name={"sound"}
              size={30}
              color={this.mainColor}
            />
          </Animated.View>
          <View style={{
            flex: 1,
            flexDirection:'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft:10
          }}>
            <Text style={{
              color: this.mainColor,
              fontSize: 18
            }}>{title}</Text>
            { soundState !== 'stopped' ?
              <Text style={{
                marginTop:5,
                color: this.mainColor,
                fontSize: 14
              }}>{currentPositionString} / {durationString}</Text> :
              <Text style={{
                marginTop:5,
                color: this.mainColor,
                fontSize: 14
              }}>{durationString}</Text>
            }
          </View>
        </TouchableOpacity>
        <PlayControllers
          soundState={this.state.soundState}
          mainColor={this.mainColor}
          unpauseAction={this.unpauseAudio.bind(this)}
          pauseAction={this.pauseAudio.bind(this)}
          stopAction={this.stopAudio.bind(this)}
        />
      </View>

    );
  }
}
