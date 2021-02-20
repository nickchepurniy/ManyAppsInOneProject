import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";

import App_Anim01 from "./App_A/App_Anim01";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    justifyContent: "flex-end", 
  },
  rectangle: {
    // flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    bottom: 4,
    borderWidth: 2,
    padding: 4,
    height: 44,
  }
});

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const App = () => {
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

  function setDimensionsInParent () {
    alert("setDimensionsInParent");
    // props.mutateState("dimen");
  }

  return (
    <View style={styles.container} >
      
      <App_Anim01 winHeight={0.8*dimensions.window.height} 
                  winWidth ={dimensions.window.width } />

      <View style={styles.rectangle}>
        <Text>
          {`Window: height - ${dimensions.window.height}, width - ${dimensions.window.width}`}
        </Text>
        <Text>
          {`Screen: height - ${dimensions.screen.height}, width - ${dimensions.screen.width}`}
        </Text>
          
      </View>
    </View>
  );
}

export default App;
                                                                        
