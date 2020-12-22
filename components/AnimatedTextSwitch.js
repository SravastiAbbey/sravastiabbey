import React from 'react';
import {
  Animated,
  Easing,
    StyleSheet
} from 'react-native';
import ParsedText from "react-native-parsed-text";

class StyledText extends React.Component {

    boldRegex = /<\s*[bB][^>]*>(.*?)<\s*\/\s*[bB]>/
    italicRegex = /<\s*[iI][^>]*>(.*?)<\s*\/\s*[iI]>/
    underlineRegex = /<\s*[uU][^>]*>(.*?)<\s*\/\s*[uU]>/

    renderBold(matchingString, matches) {
        console.log(matchingString);
        return `${matches[1]}`;
    }

    renderUnderline(matchingString, matches) {
        console.log(matchingString);
        return `${matches[1]}`;
    }

    renderItalic(matchingString, matches) {
        console.log(matchingString);
        return `${matches[1]}`;
    }

    render() {
        return (
            <ParsedText
                style={this.props.style}
                parse={[
                    {pattern: this.boldRegex, style: this.styles.bold, renderText: this.renderBold},
                    {pattern: this.underlineRegex, style: this.styles.underline, renderText: this.renderUnderline},
                    {pattern: this.italicRegex, style: this.styles.italic, renderText: this.renderItalic},
                ]}
            >
                {this.props.text}
            </ParsedText>
        )
    }

    styles = StyleSheet.create({
        bold: {
            fontWeight: "bold"
        },
        italic: {
            fontStyle: 'italic'
        },
        underline: {
            textDecorationLine: 'underline'
        }
    });
}

/**
 * Component to animate TextChange with opacity effect.
 * It fades the previous text to opacity 0, changes text and animates opacity to 1 then.
 */
class AnimatedTextSwitch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      previousText: props.children,
      textOpacity: new Animated.Value(1),
      textColor: props.style.color,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

      const newText = this.props.children;
      const oldText = prevProps.children;

      const oldColor = this.state.textColor;
      const newColor = this.props.style.color;

      const skipAnimation = this.props.skipAnimation;

      if (newText !== oldText || newColor !== oldColor) {

          if (skipAnimation) {
              this.setState({
                  previousText: newText,
                  textColor: newColor,
              });
          }
          else {
              Animated.timing(
                  this.state.textOpacity,
                  {
                      toValue: 0,
                      duration: 400,
                      easing: Easing.in(Easing.sin),
                      useNativeDriver: true,
                  },
              ).start(() => {
                  this.setState({
                      previousText: newText,
                      textColor: newColor,
                  }, () => {
                      Animated.timing(
                          this.state.textOpacity,
                          {
                              toValue: 1,
                              duration: 400,
                              easing: Easing.in(Easing.sin),
                              useNativeDriver: true,
                          },
                      ).start();
                  });
              });
          }

      }

  }

  render() {
    return (
      <Animated.Text
        {...this.props}
        style={{
          ...this.props.style,
          opacity: this.state.textOpacity,
          color: this.state.textColor,
        }}
      >
          <StyledText text={this.state.previousText} />
      </Animated.Text>
    );
  }
}

export default AnimatedTextSwitch;
