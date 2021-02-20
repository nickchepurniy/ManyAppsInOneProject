import React, { useState, useEffect } from "react";

import { SafeAreaView, StyleSheet, View, TouchableOpacity, Text, Image,  } from "react-native";

const App = () => {

  var picImage; 

  var arrayPics = [
                    './img/puppy.png',
                    './img/9-apple-png-image.png',
                    './img/9-green-parrot-png-images-download.png',
                    './img/8-2-nest-png-image.png',
                    './img/7-rraspberry-png-image.png',
                    './img/6-toys-bears-png-image.png',
                    './img/5-pineapple-png-image-download.png',
                    './img/31-dog-png-image-picture-download-dogs.png',
                    './img/3-strawberry-png-images.png',
                    './img/3-2-squirrel-picture.png',
                    './img/2-2-mango-picture.png',
                    './img/2-2-kitten-free-download-png.png',
                    './img/15-green-grape-png-image.png',
                    './img/15-dog-png-image-picture-download-dogs.png',
                    './img/12-green-parrot-png-images-download.png',
                    './img/10-plum-png-image.png',
                    './img/1-rose-png-image-picture-download.png',
                  ];
  var arrayPicsLength = arrayPics.length;

  /********************************/
  /*  Functional state variables  */
  /********************************/

  const [showHideDoc,   setShowHideDoc    ] = useState(!true);
  const [lightsStatus,  setLightsStatus   ] = useState("?");
  const [lightsOpacity, setLightsOpacity, ] = useState(false);
  const [on,            setOn             ] = useState(false);
  const [off,           setOff            ] = useState(false);
  const [imageON,       setImageON        ] = useState(0);

  const [stepsDone,     setStepsDone      ] = useState(0);

  var msg;
  const msgOn  = 'LIGHTS ARE ON';
  const msgOff = 'LIGHTS ARE OFF';

  /******************************************************/
  /*  Handle functions (in onClick and onPress) buttons */
  /******************************************************/

  // button = On
  let handleLightOn = () => {
    if (stepsDone == 0) {
      setLightsStatus(msgOn);
      setLightsOpacity(true);
      setOn(true);
      setImageON(1);
    } else {
      msg = 'Must Skip Show before using On switch';
      setLightsStatus(msg);
      setLightsOpacity(true);
    }   
    return;
  }
   
  // button = Off
  let handleLightOff = () => {
    if (stepsDone == 0) {
      setLightsStatus(msgOff);
      setLightsOpacity(false);
      setOn(false);
      setImageON(2);
    } else {
      msg = 'Must Skip Show before using Off switch';
      setLightsStatus(msg);
      setLightsOpacity(true);
    }
    return; 
  }
   
  // button = Show/Hide Doc
  let handleToggleDoc = ()  => {
    setShowHideDoc(!showHideDoc); 
  }
      
  // button = Show Me More Pictures
  let handleMorePics = ()  => {
    if (on) {
      setLightsStatus(msgOn);
      setLightsOpacity(true);
    } else {
      setLightsStatus(msgOff);
      setLightsOpacity(false);
    }
    nextStep();
  }
      
  // button = Skip Show 
  let handleSkipPics = ()  => {
    setStepsDone(0);
    if (on) {
      setLightsStatus(msgOn);
      setLightsOpacity(true);
    } else {
      setLightsStatus(msgOff);
      setLightsOpacity(false);
    }
  }
      
  /*********************/
  /*  Other functions  */
  /*********************/

  let nextStep: any = () => {

    // set stepsDone for next SEG:

    if ( stepsDone < arrayPicsLength) {
      setStepsDone(stepsDone + 1);
    } else {
      setStepsDone(0);
    }
  }

  let showLights : any = () => {
    return (
      <SafeAreaView>
          {/* IMAGE */}
          { ( lightsStatus != "?" ) && (imageON == 1) &&
            <Image style={styles.myImage}
                   source={require('./img/lightbulb-png-830.png')}
            />
          }
          { ( lightsStatus != "?" ) && (imageON == 2) &&
            <Image style={styles.myImage}
                   source={require('./img/toppng.com-light-bulb-on-off-png-512x512.png')}
            />
          }
      </SafeAreaView>
    )
  }  

  let showPics : any = () => {
    return (
      <SafeAreaView style={{justifyContent: 'center',
                      alignItems: 'center', top: 40,  }}>
          {/* IMAGE */}
          { ( true ) && 
            ( picImage =   (stepsDone ==  1) ? require('./img/puppy.png') 
                         : (stepsDone ==  2) ? require('./img/9-apple-png-image.png')
                         : (stepsDone ==  3) ? require('./img/9-green-parrot-png-images-download.png')
                         : (stepsDone ==  4) ? require('./img/8-2-nest-png-image.png')
                         : (stepsDone ==  5) ? require('./img/7-rraspberry-png-image.png')
                         : (stepsDone ==  6) ? require('./img/6-toys-bears-png-image.png') 
                         : (stepsDone ==  7) ? require('./img/5-pineapple-png-image-download.png')
                         : (stepsDone ==  8) ? require('./img/31-dog-png-image-picture-download-dogs.png')
                         : (stepsDone ==  9) ? require('./img/3-strawberry-png-images.png')
                         : (stepsDone == 10) ? require('./img/3-2-squirrel-picture.png')
                         : (stepsDone == 11) ? require('./img/2-2-mango-picture.png')
                         : (stepsDone == 12) ? require('./img/2-2-kitten-free-download-png.png')
                         : (stepsDone == 13) ? require('./img/15-green-grape-png-image.png')  
                         : (stepsDone == 14) ? require('./img/15-dog-png-image-picture-download-dogs.png')
                         : (stepsDone == 15) ? require('./img/12-green-parrot-png-images-download.png')
                         : (stepsDone == 16) ? require('./img/10-plum-png-image.png')
                         : (stepsDone == 17) ? require('./img/1-rose-png-image-picture-download.png')
                         : null,  
              <Image style={{ width:   (stepsDone ==  1) ? 600 
                                     : (stepsDone ==  2) ? 500 
                                     : (stepsDone ==  3) ? 700 
                                     : (stepsDone ==  4) ? 500 
                                     : (stepsDone ==  5) ? 995 
                                     : (stepsDone ==  6) ? 995
                                     : (stepsDone ==  7) ? 600 
                                     : (stepsDone ==  8) ? 380 
                                     : (stepsDone ==  9) ? 995 
                                     : (stepsDone == 10) ? 700 
                                     : (stepsDone == 11) ? 700 
                                     : (stepsDone == 12) ? 700 
                                     : (stepsDone == 13) ? 995 
                                     : (stepsDone == 14) ? 700 
                                     : (stepsDone == 15) ? 300 
                                     : (stepsDone == 16) ? 995 
                                     : (stepsDone == 17) ? 390 
                                                         : 400, 
                             height:   (stepsDone ==  1) ? 600
                                     : (stepsDone ==  2) ? 500 
                                     : (stepsDone ==  3) ? 700 
                                     : (stepsDone ==  4) ? 500 
                                     : (stepsDone ==  5) ? 600 
                                     : (stepsDone ==  6) ? 700 
                                     : (stepsDone ==  7) ? 600 
                                     : (stepsDone ==  8) ? 400 
                                     : (stepsDone ==  9) ? 600 
                                     : (stepsDone == 10) ? 600 
                                     : (stepsDone == 11) ? 700 
                                     : (stepsDone == 12) ? 600 
                                     : (stepsDone == 13) ? 600 
                                     : (stepsDone == 14) ? 600 
                                     : (stepsDone == 15) ? 600 
                                     : (stepsDone == 16) ? 700 
                                     : (stepsDone == 17) ? 600 
                                                         : 300, 
                             resizeMode: 'stretch',
                           }}  
                     source={picImage} 
              />
            )
          }
      </SafeAreaView>
    )
  }  

  useEffect(() => {
    console.log("useEffect has stepsDone in [] ..." );
    }, [stepsDone, msg, msgOn, msgOff] );

  /************/
  /*  Render  */
  /************/

  return (
   <SafeAreaView style={{flex: 1}}>

      {/*  SEG1:  */}
      { (stepsDone == 0 ) && 
        showLights()  
      }

      { (stepsDone > 0 ) && 
        showPics()   
      }


      {/* STATUS MSG */}
      <View style={[styles.myMsg, { width: 180, opacity: lightsOpacity ? 1.0 : 0.3 }]} >
        <Text>{lightsStatus}</Text>
      </View>
      <View><Text>{"\n\n"}</Text></View>


      {/* BUTTONS in a row plus 'Show/Hide Doc' button */}

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={handleLightOn}>
          <View style={[styles.myButton, { width: 46 }]} >
            <Text style={[styles.buttonText, {color: "blue"}]}>
              On
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLightOff}>
          <View style={[styles.myButton, { width: 50 }]} >
            <Text style={[styles.buttonText, {color: "blue"}]}>
              Off
            </Text>
          </View>
        </TouchableOpacity>

        <button style={{ margin: 10, width: 120, padding: 10, backgroundColor: "cyan"}}
                onClick={handleToggleDoc}>
          Show/Hide Doc
        </button>

        <button style={{ margin: 10, width: 120, padding: 10, backgroundColor: "cyan"}}
                onClick={handleMorePics }>
          { ( stepsDone == 0 ) ? `Show Me More Pictures` : `Show Me Next Picture` }
        </button>

        <button style={{ margin: 10, width: 120, padding: 10, backgroundColor: "cyan"}}
                onClick={handleSkipPics }>
          Skip Show
        </button>

      </View>


      { showHideDoc &&
        <View style={styles.docDesc}>
          <Text style={{color: "red", fontsize: 20, fontWeight: 'bold', padding: 10, }}> 
            Structured App Documentation for myApps:
            {myDoc1}
            {myDoc2}
            {myDoc3}
          </Text>
        </View>
      }  

      {/*  Footer shows current STEP by displaying SD */}

      <View style={{ flexDirection: "row", borderWidth: 3, borderColor: "gold", padding: 6,
                     width: 920, margin: 4, marginLeft: 20,
                  }}>
        <Text>SD = stepsDone = {stepsDone}</Text>
        <Text>{'\t'}arrayPicsLength = {arrayPicsLength}</Text>
        <Text>{ (stepsDone > 0) ? `\tShowing pic # ${stepsDone}` : ``}</Text>
        <Text>{'\t'}
          { (stepsDone>0) ? `arrayPics[${stepsDone-1}] = ${arrayPics[stepsDone-1]}` : `` }
        </Text>

      </View>

   </SafeAreaView>

  );
}

  
  /************/
  /*  Styles  */
  /************/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  myButton: {
    margin: 10, 
    width: 120, 
    padding: 10, 
    backgroundColor: "cyan",
    borderWidth: 2,
  },
  buttonText: {
    textAlign: 'center',  // to center the text horizontally 
    color: 'cyan',
  },
  myMsg: {
    margin: 10, 
    width: 120, 
    padding: 10, 
    textAlign: 'center',  // to center the text horizontally 
    backgroundColor: "gold",
    borderWidth: 2,
    opacity:  0.3,
  },
  docDesc: {
    borderWidth: 2,
    backgroundColor: 'gold',
    width: 800,
    fontSize: 16,
    padding: 0,
    marginTop: 20,
    marginLeft: 20,  
    marginBottom: 30,
  },
  myImage: {
    width:  200, 
    height: 300, 
  },
});

  /*******************/
  /*  Documentation  */
  /*******************/

const myDoc1 = "\n\n  This is our first Functional App Component. It starts by using the 'useState' Hook for adding some local state\n  variables.  Next we introduced three bottons which have props onClick or onPress used to invoke a handle\n  function.  The handle functions in turn read and update the state variables.  This App has no Child components\n   - everything is done in the Parent (App) component.\n\n  In the next few apps we will try to add some commented titles and group the variables and functions into\n  segments like:\n"; 

const myDoc2 = "\n\t  o  Define functional state variables (using State Hook 'useState' or 'useReduce')\n\t  o  Define the handle functions used in the onClick or onPress props of the buttons\n\t  o  Callback Functions in components invoked from App component \n\t  o  Define Other functions\n\t  o  Render\n\t  o  styles = StyleSheet.create\n\t  o  Documentation text variables used for Show/Hide Doc and on rendered screen\n\t  o  export default App \n";

const myDoc3 = "\n\n  For example following commented title would appear before we define all the  handle functions: \n\n\t\t/********************************************************/ \n\t\t/*  Handle functions (in onClick and onPress) buttons  */ \n\t\t/********************************************************/\n\n  Also above  the definition of each handle function a comment, indicating the name of the button used to invoke\n  this handle function, should appear.  For the 'handleLightOn' handle function it would look like this:\n\n\t\t// button = On\n\t\tlet handleLightOn = () => { ... } \n\n";

export default App;

