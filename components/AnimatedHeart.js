import {Animated, Easing, TouchableOpacity} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import {LightenDarkenColor} from "../Utils";
import Colors from "../constants/Colors";
import React, {Component} from "react";

const Heart = ({isFavorite, toggleFavorite}) => {

    if (isFavorite) {
        return (
            <TouchableOpacity
                onPress={() => {
                    toggleFavorite(false);
                }}
                style={{
                    flex:1,
                    flexDirection:'row-reverse',
                    padding:10,
                }}>
                <AntDesign
                    name={"heart"}
                    size={22}
                    color={LightenDarkenColor(Colors.tintColor, 70)}
                />
            </TouchableOpacity>
        )
    }
    else {
        return (
            <TouchableOpacity
                onPress={() => {
                    toggleFavorite(true);
                }}
                style={{
                    flex:1,
                    flexDirection:'row-reverse',
                    padding:10,
                }}>
                <AntDesign
                    name={"hearto"}
                    size={22}
                    color={LightenDarkenColor(Colors.gray, 30)}
                />
            </TouchableOpacity>
        )
    }

};

/*
    This whole thing is simply so that the heart fades and re-appears with the text when
    the user touches the screen to trigger a new quote.
 */
class AnimatedHeart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            previousQuoteId: props.quoteId,
            isFavorite: props.isFavorite,
            opacity: new Animated.Value(1)
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.quoteId !== prevProps.quoteId) {
            console.log(this.props);
            Animated.timing(
                this.state.opacity,
                {
                    toValue: 0,
                    duration: 400,
                    easing: Easing.in(Easing.sin),
                },
            ).start(() => {
                this.setState({isFavorite:this.props.isFavorite, previousQuoteId:this.props.quoteId}, () => {
                    Animated.timing(
                        this.state.opacity,
                        {
                            toValue: 1,
                            duration: 400,
                            easing: Easing.in(Easing.sin),
                        },
                    ).start();
                });
            });
        }
        else if (this.state.isFavorite !== this.props.isFavorite) {
            this.setState({isFavorite:this.props.isFavorite});
        }
    }

    render() {
        return (
            <Animated.View
                style={{
                    opacity: this.state.opacity,
                    minWidth: 30,
                }}
            >
                <Heart isFavorite={this.state.isFavorite} toggleFavorite={this.props.toggleFavorite}/>
            </Animated.View>
        );
    }
}

export default AnimatedHeart;