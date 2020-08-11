import {TouchableOpacity} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import {LightenDarkenColor} from "../Utils";
import Colors from "../constants/Colors";
import React from "react";

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

export default Heart;