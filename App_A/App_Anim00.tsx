import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

// const App = ({buttonMsgChildClick, onChildClick}) => {

const App = (props) => {
  const [dimensions, setDimensions] = useState({ window, screen });

  const onChange = ({ window, screen }) => {
    setDimensions({ window, screen });
  };

  useEffect(() => {
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  });

  function  onChildClick () {
    // alert("button Msg in Child was Clicked");
    props.mutateState1(dimensions.window.height);
    props.mutateState2(dimensions.window.width);
    props.mutateState(dimensions.window);
  }

  return (
      ( props.displayDims ) ? 
        ( <View style={{flex: 1, justifyContent: "flex-end", }} >
          <View style={styles.rectangle}>
            <Text>{`Window Dimensions: height - ${dimensions.window.height}, width - ${dimensions.window.width}`}</Text>
            <Text>{`Screen Dimensions: height - ${dimensions.screen.height}, width - ${dimensions.screen.width}`}</Text>
            <View style={{ flexDirection: "row" }}>
              <button style={{margin: 10, width: 220, padding: 10, backgroundColor: "cyan"}}
                      onClick={onChildClick}>
                LOAD dimFromChild (3 props)
              </button>
            </View>  
          </View>
          </View>
        ) : null  
    );
}

const styles = StyleSheet.create({
  rectangle: {
    // flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    bottom: 4,
    borderWidth: 2,
    padding: 4,
    height: 120,
  }
});

export default App;
                                                                        
