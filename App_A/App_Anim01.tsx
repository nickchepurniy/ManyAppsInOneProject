import React, {useState} from "react";
import { StyleSheet, View, Text, Animated, TouchableOpacity, Dimensions, } from "react-native";

const windowDimensions = Dimensions.get('window')

const boxSize = 40;
const borderWidth = 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderWidth: 0,
  },
  myCircle: {
    backgroundColor: "red",
    width: boxSize,
    height: boxSize,
    borderRadius: boxSize/2,
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
    width: 800,
    fontSize: 16,
    marginLeft: 12,
  },
});


const appTitle = "\n\t This app uses only Animated.timing, i.e. there is no dragging. For dragging a PanResponder state\n\t  variable needs to be created.  See App_Anim02.tsx where dragging is used.\n";

const appName = "\n\t See console.log for value of 'windowDimensions' returned by command const windowDimensions = \n\t Dimensions.get('window') after clicking on 'Reset' ! \n ";

const appNote = "";

const appNDTitle = "";

const appNativeDriver = "";

const App = (props: any) => {

  let [showHideDoc, setShowHideDoc] = useState(true);

  // Define Center C, and four Corner positions: 
  // first letter=X-dir, second letter=Y-dir relative to C at (0,0)

  const winHeight = 0.39*props.winHeight;
  const winWidth  = 0.5*props.winWidth;
  // alert(winHeight);
  // alert(winWidth);

  const value_C  = useState(new Animated.ValueXY({x:   0     , y:    0     }))[0]

  const moveBall_C  = () => {
    Animated.timing(value_C, {
      toValue: {x:   0, y:    0},
      duration: 1000,
      useNativeDriver: false,
    }).start()
  }

  const moveBall_LT = () => {
    Animated.timing(value_C, {
      toValue: {x:-winWidth, y: -winHeight},
      duration: 1000,
      useNativeDriver: false,
    }).start()
  }

  const moveBall_RT = () => {
    Animated.timing(value_C, {
      toValue: {x: winWidth, y: -winHeight},
      duration: 1000,
      useNativeDriver: false,
    }).start()
  }

  const moveBall_RB = () => {
    Animated.timing(value_C, {
      toValue: {x: winWidth, y:  winHeight},
      duration: 1000,
      useNativeDriver: false,
    }).start()
  }

  const moveBall_LB = () => {
    Animated.timing(value_C, {
      toValue: {x:-winWidth, y:  winHeight},
      duration: 1000,
      useNativeDriver: false,
    }).start()
  }

  function toggleDoc() {
    // alert("showHideDoc"+showHideDoc);
    setShowHideDoc(!showHideDoc);  // Correct way - showHideDoc = !showHideDoc WILL NOT WORK !
    console.log(windowDimensions);
  }

  return (
    <View style={styles.container}>

      <Animated.View style={value_C.getLayout()}>
        <View style={styles.myCircle} /> 
      </Animated.View>     

      <View><Text>&nbsp;</Text></View>

      <TouchableOpacity onPress={moveBall_LT}>
        <Text style={styles.myText}> Click to move to Left-Top corner</Text>
      </TouchableOpacity>  

      <TouchableOpacity onPress={moveBall_RT}>
        <Text style={styles.myText}> Click to move to Right-Top corner</Text>
      </TouchableOpacity>  

      <TouchableOpacity onPress={moveBall_RB}>
        <Text style={styles.myText}> Click to move to Right-Bottom corner</Text>
      </TouchableOpacity>  

      <TouchableOpacity onPress={moveBall_LB}>
        <Text style={styles.myText}> Click to move to Left-Bottom corner</Text>
      </TouchableOpacity>  

      <View style={{ flexDirection: "row" }}>
        <button style={{margin: 10, width: 120, padding: 10, backgroundColor: "cyan"}}
                onClick={toggleDoc}>
          Show/Hide Doc
        </button>

        <button style={{margin: 10, width: 60, padding: 10, backgroundColor: "cyan"}}
                onClick={moveBall_C}>
          Reset
        </button>
      </View>

      { showHideDoc &&
         <View><Text style={[styles.docDesc, {color: "blue"}]}>
           <Text style={{color: "red", fontWeight: 'bold'}}> {appTitle} </Text>
             {/* appName */}
           <Text style={{color: "red"}}> {appNote}</Text>
           <Text style={{color: "red", fontWeight: 'bold'}}>{appNDTitle}</Text>
             {appNativeDriver}
         </Text></View>
      }

    </View>
  );
}

export default App;
