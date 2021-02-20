import React, { useState, useReducer } from "react";
import useForceUpdate from 'use-force-update';

import { StyleSheet, View, Animated, TouchableOpacity, Text, PanResponder } from "react-native";

const App = () => {

  const forceUpdate = useForceUpdate();

  const centerPosition  = { x:    0, y:    0 };
  const panInitPosition = { x:  250, y:  200 };
  const panLeftPosition = { x: -300, y:  -50 };

  const [showHideDoc,   setShowHideDoc    ] = useState( !true);
  
  const [firstHandleClick, setFirstHandleClick ] = useState(0);

  const [prevBkgrColor, setPrevBkgrColor  ] = useState("lawngreen");
  const [bkgrColor,     setBkgrColor      ] = useState("lawngreen");
  const [showColorNo,   setShowColorNo    ] = useState(0);
  const [versionNumber, setVersionNumber  ] = useState("One");

  const [onMoveSW,      setOnMoveSW       ] = useState(true);
  const [myMsg,         setMyMsg          ] 
      = useState( `Click on 'RotateBkgrColor' button - to select Color and versionNumber`)
  const [myMsg2,        setMyMsg2         ] 
      = useState( 'Pan Responder used only for dragging - Reset and LT buttons use same function calls !' );
  const [panStatus,     setPanStatus      ] = useState( '' );
  const [panStatusAG,   setPanStatusAG    ] = useState( '' );
  const [panStatusMove, setPanStatusMove  ] = useState( '' );

  const pan = useState(new Animated.ValueXY(centerPosition))[0];

  let handleRestartInit = () => {
    pan.flattenOffset();

    pan.setOffset({
      x: pan.x.setValue(panLeftPosition.x),
      y: pan.y.setValue(panLeftPosition.y),
    });

    setMyMsg('handleRestartInit');
  }

  let handleRestartCenter = () => {
    pan.flattenOffset();

    pan.setOffset({
      x: pan.x.setValue(centerPosition.x),
      y: pan.y.setValue(centerPosition.y),
    });

    setMyMsg('handleRestartCenter');
  }

  let handleLT_I = () => {
    pan.flattenOffset();

    pan.setOffset({
      x: pan.x.setValue(panInitPosition.x),
      y: pan.y.setValue(panInitPosition.y),
    });

    setMyMsg('handleT_I');
  }

  let handleLT_C = () => {
    pan.flattenOffset();

    pan.setOffset({
      x: pan.x.setValue(centerPosition.x),
      y: pan.y.setValue(centerPosition.y),
    });

    setMyMsg('handleT_C');
  }

  let myClearMsgs = () => {
    setMyMsg('');
    setPanStatusAG('');
    setPanStatusMove('');
    setPanStatus('');
  };

  const panResponder = useState(
    PanResponder.create({
      onStartShouldSetPanResponder: () => onMoveSW,
      // when user starts moving finger or cursor
      onMoveShouldSetPanResponder: () => onMoveSW,
      // this function will fire if 
      onPanResponderGrant: (...args) => {
        // must do a gesture on screen e.g. click or press and move mouse  to see console.log msg
        console.log("Pan Responder was Granted Access");
        setPanStatus("")
        // setLeftValue(leftValue)
        setPanStatusAG('AG, xy = ' + pan.x._value + ", " + pan.y._value );
        // getLayout
        console.log("pan.getLayout()");
        console.log(pan.getLayout());
        console.log('AG: ',args[1].moveX);
        console.log('AG dx: ',args[1].dx);
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
      },

      onPanResponderMove: (_, gesture) => {
        setPanStatusMove("Move: gesture.dx = " + gesture.dx + " gesture.dy = " + gesture.dy + 
                          " gesture.x0 = " + gesture.x0 + " gesture.moveX = " + gesture.moveX );
        pan.x.setValue(gesture.dx)
        pan.y.setValue(gesture.dy)
      },
   
      onPanResponderRelease: () => {
        console.log({...pan.x}, 'BEFORE')
        pan.flattenOffset();
        console.log({...pan.x}, 'AFTER')
        setPanStatus("Released");
      }
    })
  )[0]

  console.log("panResponder.panHandlers:");
  console.log(panResponder.panHandlers);
  console.log("pan.getLayout():");
  console.log(pan.getLayout());

  let bkgrColorForCircle = ["lawngreen", "red","skyblue","gold"]
  let versionNumberText = ['One', 'Two', 'Three', 'Four']

  let prevVersionNumber;
  let prevShowColorNo;

  let handleBkgrColor = () => {
    setFirstHandleClick(firstHandleClick + 1);
    prevShowColorNo   = showColorNo;
    setPrevBkgrColor(bkgrColor);  
    prevVersionNumber = versionNumber;
    forceUpdate();
    setShowColorNo((showColorNo + 1 ) % 4 , console.log('inside showColorNo = ' + showColorNo) );

    setBkgrColor(bkgrColorForCircle[showColorNo]);
    setVersionNumber(versionNumberText[showColorNo]);  
    setBkgrColor(bkgrColorForCircle[showColorNo]);

    forceUpdate();

    { (firstHandleClick == 0)  && 
      setMyMsg(`Color of circle indicates Version Number of Pan Responder's Animated.View - Click again to Rotate `);
    }

    { (firstHandleClick  > 0 ) &&
      setMyMsg(`handleBkgrColor: bkgrColor = ${bkgrColor}  versionNumber = ${prevVersionNumber}`);
    }
  } 

  function toggleDoc() {
    // alert("showHideDoc"+showHideDoc);
    setShowHideDoc(!showHideDoc);  // Correct way - showHideDoc = !showHideDoc WILL NOT WORK !
  }

  /****************/
  /*  Render App  */
  /****************/

  return (
    <View style={styles.container}>
        <Animated.View style={[styles.myCircle,
                               { backgroundColor: (firstHandleClick >=2 ) && prevBkgrColor, 
                               },
                               /*  left: leftValue, top: topValue,  */
                               /* pan.getLayout()  * used in Versions 1 and 2 */ 
                               /* { top: pan.y, left: pan.x} ,     * used in Version 3 */
                               /* { transform: [{
                                     translateX: pan.x, translateY: pan.y 
                                 }]},        * used in Version 4 -  works for x but not for y */                                 /* { transform: pan.getTranslateTransform(), },  * used in Version 5 */ 
                               { transform: [ 
                                     {translateX: pan.x} , {translateY: pan.y} 
                                     ] }       /* used in Version 6 - works OK now */
                             ]}
                               {...panResponder.panHandlers}  /* used in all Versions  */ 
        />

        <View><Text style={{ fontSize:14, fontWeight: "bold", textAlign: "left", color: "blue"}}>
          {myMsg2}
        </Text></View>

        <View style={{ flexDirection: "row" }}>
          <button style={{margin: 10, width: 70, padding: 10, backgroundColor: "cyan"}}
                  onClick={handleRestartInit}>
            Reset_I
          </button>
 
          <button style={{margin: 10, width: 80, padding: 10, backgroundColor: "cyan"}}
                  onClick={handleRestartCenter}>
            Reset_C
          </button>
 
          <button style={{margin: 10, width: 120, padding: 10, backgroundColor: "cyan"}}
                  onClick={handleBkgrColor}>
            RotateBkgrColor
          </button>
 
          <button style={{margin: 10, width: 70, padding: 10, backgroundColor: "cyan"}}
                  onClick={handleLT_I}>
            LT_I
          </button>
 
          <button style={{margin: 10, width: 80, padding: 10, backgroundColor: "cyan"}}
                  onClick={handleLT_C}>
           LT_C
          </button>
 
          <button style={{margin: 10, width: 120, padding: 10, backgroundColor: "cyan"}}
                  onClick={toggleDoc}>
            Show/Hide Doc
          </button>

          <button style={{margin: 10, width: 120, padding: 10, backgroundColor: "cyan"}}
                  onClick={myClearMsgs}>
            Clear msgs
          </button>

        </View>
        <View><Text style={{ fontSize:20, fontWeight: "bold", textAlign: "left", color: "blue"}}>
          {myMsg}
        </Text></View>

        <View><Text style={{ fontSize:20, fontWeight: "bold", textAlign: "left", color: "blue"}}>
          {panStatusAG}
        </Text></View>

        <View><Text style={{ fontSize:20, fontWeight: "bold", textAlign: "left", color: "blue"}}>
          {panStatusMove}
        </Text></View>
 
        <View><Text style={{ fontSize:20, fontWeight: "bold", textAlign: "left", color: "blue"}}>
          {panStatus}
        </Text></View>
 
      { showHideDoc && 
        <View><Text style={[styles.docDesc, {color: "blue"}]}>
          <Text style={{color: "red", fontWeight: 'bold'}}> {"\n"} &nbsp; Notes: {"\n\n"} </Text>
            { appTitle }
            {appName}
        </Text></View>
      }  
         <View><Text>{"\n\n"}</Text></View>
  
      {/* Shows the panResponder options used in Animated.View */}
      { showHideDoc && false &&
         <View style={{ borderWidth: 3, borderColor: "blue", borderRadius: 5,
                        backgroundColor: "lawngreen", 
                     }} >
           <Text style={styles.myText}>
             {myVersion1}
             {myVersion2}
             {myVersion3}
             {myVersion4}
             {myVersion5}
             {myVersion6}
           </Text>
         </View>
      }

       <View><Text>{"\n\n"}</Text></View>

   </View>
  );
}

  /************/
  /*  Styles  */
  /************/

const boxSize = 100;
const myBorderWidth = 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  myCircle: {
    width: boxSize,
    height: boxSize,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: boxSize/2,
  },
  myText: {
    margin: 0,
    borderWidth: 3,
    borderRadius: 5,
    borderColor: "red",
    color: "red",
  },
  docDesc: {
    marginTop: 20,
    borderWidth: myBorderWidth,
    backgroundColor:'skyblue',
    width: 780,
    fontSize: 16,
    marginLeft: 12,
  },
});

  /************/
  /*  myDocs  */
  /************/

const appTitle = "\n    Pan Responder  -  In this app two types of buttons are available for moving the circle:\n\t    (1) Reset buttons use the setOffset method on the animated variable (pan) inside the\n\t           onPanResponderGrant of the created PanResponder  -  which requires a click on circle before \n\t           clicking the Reset button.\n\t    (2) LT buttons specify left and top in the style props of the Animated.View - and do not require\n\t            the extra click !\n\n  ";

const appName = " The Pan Responder allows you to detect how the user is moving the cursor on the screen which would allow\n    you to determine the behaviour - i.e. the gesture state. The Pan Responder allows you to create a responder\n    (i.e. actions to take for a gesture that occurs on screen). For example the onPanResponderGrant function\n    initialized some value.\n\n" ;

const appNote = "\n\n   Adding pan.getLayout() to the style props of Animated.View:";

const appLayout = "\n    From console.log we see that pan.getLayout() has a left and top props - which now allows us to drag the circle\n    around the screen !  This was achieved through the handlers:  onPanResponderGrant, onPanResponderMove\n    and onPanResponderRelease.";

const appNativeDriver = "\n\n   To write our own custom code we need to set the style props in the  Animated.View component. There are\n    several different way we can do this so that we can move the circle:\n ";

const myVersion1 = "\n  Version 1:\n  Use pan.getLayout() which has left and top props and include {...panResponder.panHandlers} as a props, and use  \n  onPanResponderMove: Animated.event( [ null, { dx: pan.x, dy: pan.y } ]) \n ";

// #16 - Version 2  - replacing the Animated.event(...) function with our own

const myVersion2 = "\n  Version 2:\n  Keep pan.getLayout() and {...panResponder.panHandlers} as props and use our own onPanResponderMove: \n\t       onPanResponderMove: (_, gesture) => { pan.x.setValue(gesture.dx) pan.y.setValue(gesture.dy) }, \n ";

const myVersion3 = "\n  Version 3:\n  Remove pan.getLayout() from styles in Animated.View and use left, top directly in Animated.View.\n\t\t\t\t\t\t\t\t      { top: pan.y, left: pan.x} , \n "; 

const myVersion4 = "\n  Version 4:\n  Remove pan.getLayout() from styles in Animated.View and use a transform in Animated.View;\n\t\t\t  { transform: [{translateX: pan.x, translateY: pan.y}] }       \t  <--  works for x but not for y !\n ";

const myVersion5 = " \n  Version 5:\n  Instead of Version 4 can use:\t { transform: pan.getTranslateTransform(), }, \n ";

const myVersion6 = "\n  Version 6:\n  Corrected Version4:\n\t\t\t  { transform: [{translateX: pan.x}, {translateY: pan.y}] }       \t  <--  works OK now for x and y !\n ";


export default App;

