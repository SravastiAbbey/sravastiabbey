import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import {LightenDarkenColor} from "../Utils";

export default styles = StyleSheet.create({
  container: {
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
});