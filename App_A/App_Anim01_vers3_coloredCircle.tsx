import React, {useState, useEffect} from "react";
import { StyleSheet, View, Text, Animated, TouchableOpacity, Dimensions, } from "react-native";

const windowDimensions = Dimensions.get('window')

const boxSize = 120;
const borderWidth = 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  myCircle: {
    top: 350,
    backgroundColor: "red",
    width: boxSize,
    height: boxSize,
    borderRadius: boxSize/2,
    borderWidth: 2,
  },
  myText: {
    margin: 2,
    borderWidth: 2,
    borderColor: "blue",
    color: "blue",
  },
  docDesc: {
    marginTop: 20,
    borderWidth:borderWidth,
    backgroundColor:'skyblue',
    width: 780,
    fontSize: 16,
    marginLeft: 12,
  },
});


const App = (props) => {
  let colorC =   (props.bkgdColor == "red") ? "redCircle" 
               : (props.bkgdColor == "lawngreen") ? "greenCircle" 
               : (props.bkgdColor == "skyblue") ? "blueCircle" : "myCircle"
  return (
    <>
      {/* STEP_2: display Animated.View with initial position of animated value: */}
      <Animated.View style={props.value_IC.getLayout()}>
        <View style={[styles.myCircle, {top: 2, backgroundColor: props.bkgdColor,}]}> 
          <Text style={{ textAlign: 'center', // <-- the magic
                         fontWeight: 'bold',
                         fontSize: 18,
                         marginTop: boxSize/3,
                         width: boxSize,
                      }}> 
                      {colorC}
          </Text>
        </View> 
      </Animated.View>     

      <View><Text>&nbsp;</Text></View>

      <TouchableOpacity onPress={props.moveBall_LT}>
        <Text style={[styles.myText, {padding: 3, backgroundColor: props.bkgdColor}]}> 
          Click to move to Left-Top corner
        </Text>
      </TouchableOpacity>  

      <TouchableOpacity onPress={props.moveBall_RT}>
        <Text style={[styles.myText, {padding: 3, backgroundColor: props.bkgdColor}]}> 
          Click to move to Right-Top corner
        </Text>
      </TouchableOpacity>  

      <TouchableOpacity onPress={props.moveBall_RB}>
        <Text style={[styles.myText, {padding: 3, backgroundColor: props.bkgdColor}]}> 
          Click to move to Right-Bottom corner
        </Text>
      </TouchableOpacity>  

      <TouchableOpacity onPress={props.moveBall_LB}>
        <Text style={[styles.myText, {padding: 3, backgroundColor: props.bkgdColor}]}> 
          Click to move to Left-Bottom corner
        </Text>
      </TouchableOpacity>  

      <View style={{ flexDirection: "row" }}>
        <button style={{margin: 10, width: 70, padding: 10, backgroundColor: props.bkgdColor}}
                onClick={props.moveBall_IL}>
          Reset_L
        </button>

        <button style={{margin: 10, width: 70, padding: 10, backgroundColor: props.bkgdColor}}
                onClick={props.moveBall_IC}>
          Reset_C
        </button>

        <button style={{margin: 10, width: 70, padding: 10, backgroundColor: props.bkgdColor}}
                onClick={props.moveBall_IR}>
          Reset_R
        </button>
      </View>
    </>
  )
}

export default App;
