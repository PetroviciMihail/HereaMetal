import React, { useState, useRef } from "react";
import { TextInput, View, StyleSheet, Platform } from "react-native";

const AutoGrowTextInput = ({
  value,
  onChangeText,
  style,
  containerStyle,
  ...otherProps
}) => {
  const [firstLineHeigth, setFirstLineHeigth] = useState(0);
  const [realLineHeigth, setRealLineHeigth] = useState(0);
  const [numberofLines, setNumberofLines] = useState(1);
  const inputRef = useRef(null);

  const handleContentSizeChange = (event) => {
    const contentHeight = event.nativeEvent.contentSize.height;
    // console.log("\ncontenHeight : " + contentHeight);
    if (
      Math.round(event.nativeEvent.contentSize.height / 28) !== numberofLines
    ) {
      console.log(
        "setNumebr of lines" +
          Math.round(event.nativeEvent.contentSize.height / 28),
      );
      setNumberofLines(Math.round(event.nativeEvent.contentSize.height / 28));
    }

    // if (firstLineHeigth === 0) {
    //   setFirstLineHeigth(event.nativeEvent.contentSize.height);
    //   setNumberofLines(Math.round(event.nativeEvent.contentSize.height / 28));
    //   console.log("first lineHeight: " + event.nativeEvent.contentSize.height);
    //   return;
    // } else if (
    //   realLineHeigth === 0 &&
    //   event.nativeEvent.contentSize.height > firstLineHeigth
    // ) {
    //   const realLineHeight =
    //     event.nativeEvent.contentSize.height - firstLineHeigth;
    //   setRealLineHeigth(realLineHeight);

    //   const numberOfLines = Math.round(
    //     (contentHeight - firstLineHeigth) / realLineHeight + 3,
    //   );
    //   setNumberofLines(numberOfLines);
    //   console.log("realLineHeight: " + realLineHeight);
    // } else if (realLineHeigth !== 0) {
    //   console.log("ultimul else");
    //   console.log("contentHeight: " + contentHeight);
    //   console.log("firstLineHeigth: " + firstLineHeigth);
    //   console.log("realLineHeigth: " + realLineHeigth);
    //   const numberOfLines = Math.round(
    //     (contentHeight - firstLineHeigth) / realLineHeigth + 1,
    //   );
    //   console.log("number of lines: " + numberOfLines);
    //   setNumberofLines(numberOfLines);
    // }
  };

  const handleChangeText = (text) => {
    onChangeText(text);
    if (Platform.OS === "web") {
      if (text.length === 0) {
        setNumberofLines(1);
      }
      console.log("numarul de backslash n" + text.split("\n").length);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={handleChangeText}
        multiline={!otherProps.secureTextEntry}
        numberOfLines={Platform.OS === "web" ? numberofLines : undefined}
        onContentSizeChange={handleContentSizeChange}
        style={[styles.input, style]}
        {...otherProps}
      />
    </View>
  );
};

export default AutoGrowTextInput;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 3 },
  input: {
    borderWidth: 0,
    borderColor: "#ccc",
    borderRadius: 8,
  },
});
