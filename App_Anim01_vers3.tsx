import React, {useState, useEffect} from "react";
import { StyleSheet, View, Text, Animated, TouchableOpacity, Dimensions, } from "react-native";
import App_Anim00 from './App_A/App_Anim00';
import AppColoredCircle from './App_A/App_Anim01_vers3_coloredCircle'


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
    margin: 20,
    borderWidth:borderWidth,
    backgroundColor:'skyblue',
    width: 540,   // 780,
    fontSize: 16,
    // marginLeft: 12,
    marginBottom: 12,
  },
});


const appTitle = "\n\t This app uses only Animated.timing, to create our animations.\n\n";
const appTitle2 = "\n\t Module Easing allows us to use\n\t various predefined easing methods such as linear, ease, quad, cubic, back, bezier, and others.\n";
const appName = "\n\t STEP 1: \n\t     First set the animated values 'value_IL', 'value_IC', and 'value_IR' for the 3 circles to be animated.\n\t ";

      {/* component AppColoredCircle is STEP_2: used to display Animated.View 
          with the specified props, i.e. which animated value (value_IC) and the functions
          associated with the 4 TouchableOpacity onPress and 3 button onClick components.
          Thus all moves are done thru these 7 functions for a give animated value !
      */}

const appNote = "\n\t STEP 2: \n\t     Use Animated.View to display the 3 circles with the the props in the AppColoredCircle\n\t      component.\n";
const appNDTitle = "\n\t STEP 3: \n\t     AppColoredCircle component also has 4 TouchableOpacity onPress and 3 button onClick\n\t      functions. All moves are done thru these 7 functions for a give animated value.\n";
const appNativeDriver = "\n";

const App = () => {

  let [showHideDoc, setShowHideDoc] = useState(!true);

  let [dimFromChildHeight, setDimFromChildHeight] = useState(-1);
  let [dimFromChildWidth,  setDimFromChildWidth]  = useState(-2);
  let [dimFromChild,  setDimFromChild]  = useState([-11,-22]);

  // For dimFromChildHeight, dimFromChildHeight to update propertly MUST INCLUDE useEffect !

  // Define Center C, and four Corner positions: 
  // first letter=X-dir, second letter=Y-dir relative to C at (0,0)

  const winHeight = 0.4*windowDimensions.height;
  const winWidth  = 0.5*windowDimensions.width ;

  const position_IL     = {x:-winWidth/2, y:  0        }
  const position_IC     = {x:   0       , y:  0        }
  const position_IR     = {x: winWidth/2, y:  0        }

  const position_LT     = {x:-winWidth  , y: -winHeight}
  const redPosition_LT  = {x:-winWidth  , y:  0        }
  const bluePosition_LT = {x:-winWidth  , y:  0        }

  const position_RT     = {x: winWidth  , y: -winHeight}
  const redPosition_RT  = {x: winWidth  , y:  0        }
  const bluePosition_RT = {x: winWidth  , y:  0        }

  const position_RB     = {x: winWidth  , y:  winHeight}
  const redPosition_RB  = {x: winWidth  , y:2*winHeight}
  const bluePosition_RB = {x: winWidth  , y:  winHeight}

  const position_LB     = {x:-winWidth  , y:  winHeight}
  const redPosition_LB  = {x:-winWidth  , y:2*winHeight}
  const bluePosition_LB = {x:-winWidth  , y:  winHeight}

  // STEP_1:
  // Declare value_IL, value_IC and value_IR as a new Animated.Value using position_IL,
  // position_IC, and position_IR, as their initial position, respectively.

  const value_IL = useState(new Animated.ValueXY(position_IL))[0]  
  const value_IC = useState(new Animated.ValueXY(position_IC))[0]  
  const value_IR = useState(new Animated.ValueXY(position_IR))[0]  

  let moveBall_IC  = () => {
    Animated.timing(value_IC, {
      toValue: position_IC,
      duration: 1000,
      useNativeDriver: false,
    }).start()
  }

  let moveBall_IL = () => {
    Animated.timing(value_IC, {
      toValue: position_IL,
      duration: 1000,
      useNativeDriver: false,
    }).start()
  }

  let moveBall_IR = () => {
    Animated.timing(value_IC, {
      toValue: position_IR,
      duration: 1000,
      useNativeDriver: false,
    }).start()
  }

  let moveBall_LT = () => {
    Animated.timing(value_IC, {
      toValue: position_LT,
      duration: 1000,
      useNativeDriver: false,
    }).start()
  }

  let moveBall_RT = () => {
    Animated.timing(value_IC, {
      toValue: position_RT,                   
      duration: 1000,
      useNativeDriver: false,
    }).start()
  }

  let moveBall_RB = () => {
    Animated.timing(value_IC, {
      toValue: position_RB,                   
      duration: 1000,
      useNativeDriver: false,
    }).start()
  }

  let moveBall_LB = () => {
    Animated.timing(value_IC, {
      toValue: position_LB,                   
      duration: 1000,
      useNativeDriver: false,
    }).start()
  }

  // RedBall: value_IL
   
  let moveRedBall_IC  = () => {
    Animated.timing(value_IL, {
      toValue: position_IC,
      duration: 1000,
      useNativeDriver: false,
    }).start()
  }

  let moveRedBall_IL = () => {
    Animated.timing(value_IL, {
      toValue: position_IL,
      duration: 1000,
      useNativeDriver: false,
    }).start()
  }

  let moveRedBall_IR = () => {
    Animated.timing(value_IL, {
      toValue: position_IR,
      duration: 1000,
      useNativeDriver: false,
    }).start()
  }

  let moveRedBall_LT = () => {
    Animated.timing(value_IL, {
      toValue: redPosition_LT,
      duration: 1000,
      useNativeDriver: false,
    }).start()
  }

  let moveRedBall_RT = () => {
    Animated.timing(value_IL, {
      toValue: redPosition_RT,                   
      duration: 1000,
      useNativeDriver: false,
    }).start()
  }

  let moveRedBall_RB = () => {
    Animated.timing(value_IL, {
      toValue: redPosition_RB,                   
      duration: 1000,
      useNativeDriver: false,
    }).start()
  }

  let moveRedBall_LB = () => {
    Animated.timing(value_IL, {
      toValue: redPosition_LB,                   
      duration: 1000,
      useNativeDriver: false,
    }).start()
  }

  // BlueBall: value_IR
   
  let moveBlueBall_IC  = () => {
    Animated.timing(value_IR, {
      toValue: position_IC,
      duration: 1000,
      useNativeDriver: false,
    }).start()
  }

  let moveBlueBall_IL = () => {
    Animated.timing(value_IR, {
      toValue: position_IL,
      duration: 1000,
      useNativeDriver: false,
    }).start()
  }

  let moveBlueBall_IR = () => {
    Animated.timing(value_IR, {
      toValue: position_IR,
      duration: 1000,
      useNativeDriver: false,
    }).start()
  }

  let moveBlueBall_LT = () => {
    Animated.timing(value_IR, {
      toValue: bluePosition_LT,
      duration: 1000,
      useNativeDriver: false,
    }).start()
  }

  let moveBlueBall_RT = () => {
    Animated.timing(value_IR, {
      toValue: bluePosition_RT,                   
      duration: 1000,
      useNativeDriver: false,
    }).start()
  }

  let moveBlueBall_RB = () => {
    Animated.timing(value_IR, {
      toValue: bluePosition_RB,                   
      duration: 1000,
      useNativeDriver: false,
    }).start()
  }

  let moveBlueBall_LB = () => {
    Animated.timing(value_IR, {
      toValue: bluePosition_LB,                   
      duration: 1000,
      useNativeDriver: false,
    }).start()
  }



  // Doc function
  function toggleDoc() {
    // alert("showHideDoc = "+showHideDoc);
    setShowHideDoc(!showHideDoc);  // Correct way - showHideDoc = !showHideDoc WILL NOT WORK !
    console.log(windowDimensions);
  }

  let mutateChild1 = (value1FromChild: any) => {
    // alert("mutateChild1 value = " + value1FromChild);  // height
    console.log("value1FromChild (height):");
    console.log(value1FromChild);
    // Must have state defined in main Parent:
    // let [dimFromChildHeight, setDimFromChildHeight] = useState(-1);
    // setDimFromChildHeight(value1FromChild);
    setDimFromChildHeight(value1FromChild);
    console.log("dimFromChildHeight before useEffect:");
    console.log(dimFromChildHeight);
    // alert('Before useEffect: '+ dimFromChildHeight);
  }

  function mutateChild2(value2FromChild: any) {
    // alert("mutateChild2 value = " + value2FromChild);
    console.log("value2FromChild:");
    console.log(value2FromChild);
    // Must have state defined in main Parent:
    // let [dimFromChildWidth, setDimFromChildWidth] = useState(-2);
    setDimFromChildWidth(value2FromChild);
    console.log("dimFromChildWidth before useEffect:");
    console.log(dimFromChildWidth);
    // alert('Before useEffect: '+ dimFromChildWidth);
  }

  function mutateChild(valuesFromChild: any) {
    // alert("mutateChild values = " + valuesFromChild[0] + ' ' + valuesFromChild[1] );
    console.log("valuesFromChild:");
    console.log(valuesFromChild);
    // Must have state defined in main Parent:
    // let [dimFromChildWidth, setDimFromChildWidth] = useState(-2);
    setDimFromChild(valuesFromChild);
  }

  useEffect(() => {
    console.log('Msg from useEffect', dimFromChildHeight, ' ', dimFromChildWidth);
    console.log('Msg from useEffect', dimFromChild[0]   , ' ', dimFromChild[1]  );
  }, [dimFromChildHeight, dimFromChildWidth, dimFromChild]);

     
  return (
    <View style={styles.container}>

      {/* component AppColoredCircle is STEP_2: used to display Animated.View with
          the specified props, i.e. which animated value (value_IC) and the functions
          associated with the 4 TouchableOpacity onPress and 3 button onClick components.
          Thus all moves are done thru these 7 functions for a give animated value !
      */}

      <AppColoredCircle 
        value_IC={value_IL} 
        moveBall_LT={moveRedBall_LT}
        moveBall_RT={moveRedBall_RT}
        moveBall_RB={moveRedBall_RB}
        moveBall_LB={moveRedBall_LB}

        moveBall_IL={moveRedBall_IL}
        moveBall_IC={moveRedBall_IC}
        moveBall_IR={moveRedBall_IR}
        bkgdColor={"red"}
      />

      <AppColoredCircle 
        value_IC={value_IC} 
        moveBall_LT={moveBall_LT}
        moveBall_RT={moveBall_RT}
        moveBall_RB={moveBall_RB}
        moveBall_LB={moveBall_LB}
        moveBall_IL={moveBall_IL}
        moveBall_IC={moveBall_IC}
        moveBall_IR={moveBall_IR}
        bkgdColor={"lawngreen"}
      />


      { showHideDoc &&
         <View><Text style={[styles.docDesc, {color: "blue"}]}>
           <Text style={{color: "red", fontWeight: 'bold'}}> 
             {appTitle} 
           </Text>
           {/*
             <Text style={{color: "blue", fontWeight: 'bold'}}> 
               {appName}
             </Text>
             <Text style={{color: "blue", fontWeight: 'bold'}}> 
               {appNote}
             </Text>
             <Text style={{color: "blue", fontWeight: 'bold'}}>{appNDTitle}</Text>
             {appNativeDriver}
           */}  
         </Text></View>
      }

      <AppColoredCircle 
        value_IC={value_IR} 
        moveBall_LT={moveBlueBall_LT}
        moveBall_RT={moveBlueBall_RT}
        moveBall_RB={moveBlueBall_RB}
        moveBall_LB={moveBlueBall_LB}
        moveBall_IL={moveBlueBall_IL}
        moveBall_IC={moveBlueBall_IC}
        moveBall_IR={moveBlueBall_IR}
        bkgdColor={"skyblue"}
      />

        <button style={{margin: 10, width: 120, padding: 10, backgroundColor: "cyan"}}
                onClick={toggleDoc}>
          Show/Hide Doc
        </button>

      {/* use callback to get height and width from App_Anim00 */}
      {/* mutateChild1 is function in Parent                   */}
      {/* mutateState1 is name used in Child component         */}
      <App_Anim00 mutateState1={mutateChild1} mutateState2={mutateChild2}
                  mutateState={mutateChild} displayDims={false}/> 

    </View>
  );
}

export default App;
