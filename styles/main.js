import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import {LightenDarkenColor} from "../Utils";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  quoteContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 10
  },
  practiceContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 10,
    paddingBottom:50
  },
  bodyText: {
    padding: 10,
    fontSize: 16,
    color: Colors.tintColor,
    fontFamily: 'open-sans',
  },
  blockQuote: {
    fontSize: 16,
    padding:1,
    color: LightenDarkenColor(Colors.tintColor, 50),
    fontFamily: 'open-sans-italic',
  },
  blockQuoteContainer: {
    padding: 20,
    paddingLeft: 20,
  },
  headerText: {
    padding: 20,
    paddingLeft: 10,
    fontSize: 22,
    color: Colors.tintColor,
    fontFamily: 'open-sans-bold',
    textAlign:'center',
    marginTop:30,
    marginBottom: 10
  },
  quoteText: {
    padding: 10,
    color: Colors.tintColor,
  },
  explanationText: {
    padding: 10,
    color: Colors.gray,
  },
  quoteAuthor: {
    color: Colors.gray,
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 8,
    marginRight: 10,
    alignSelf: 'flex-end',
  },
  quoteCategory: {
    color: Colors.gray,
    fontSize: 12,
    marginRight: 10,
    alignSelf: 'flex-end',
  },
  quoteSource: {
    color: Colors.gray,
    fontSize: 12,
    textDecorationLine: 'underline',
    marginTop: 20,
    marginRight: 10,
    alignSelf: 'flex-end',
  },
  optionsTitleText: {
    fontSize: 16,
    marginLeft: 15,
    marginTop: 9,
    marginBottom: 12,
    textAlign: 'center',
    backgroundColor: 'white'
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
    flex: 1
  },
  optionText: {
    fontSize: 15,
    marginTop: 1,
  },
});