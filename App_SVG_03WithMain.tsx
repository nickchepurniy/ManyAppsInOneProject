
/******************************/
/*  import React in our code  */
/******************************/

import React, {useState, useEffect} from 'react';
import SvgPlot from './App_A/SVG_PLOTVersion4';

/***************************************************/
/*  import all the components we are going to use  */
/***************************************************/

import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { TextInput } from 'react-native-paper';

const SvgApp = () => {

                     /*  [AA, BB, CC, rr1, rr2 ] */
  var myArrayOfPlots = [
                         [  -1,   20,  -100,   10,   10 ], //  yAxCode == 0  
                         [  -1,  -40,  -400,  -20,  -20 ], 
                         [  -1,    0,     0,    0,    0 ], 
                         [   1,   60,   900,   30,   30 ], 
                         [   1,   50,   625,  -25,  -25 ], 
                         [   1,    0,     0,    0,    0 ], 
                         [  -1,  101, -2550,   50,   50 ], 
                         [  -1,   20,   -99,    9,   11 ], //  yAxCode == 1 
                         [  -1,    4,    -3,    1,    3 ],
                         [   1,   20,   -99,    9,   11 ],
                         [   1,    4,    -3,    1,    3 ],
                         [  -1,   18,   -45,   15,    3 ],
                         [   1, -101,  2550,   50,   51 ],
                         [  -1,  101, -2550,   50,   51 ],
                         [   1, -201, 10100,  100,  101 ], 
                         [  -1,  -20,   -99,   11,    9 ],   
                         [   1,   20,    99,   11,    9 ],   
                         [  -1, -101, -2550,   50,   51 ], //  large roots close together
                         [  -1,  201, 10100,  101,  100 ],
                         [  -1,  201, 10100,  501,  500 ],
                         [   1,  101,  2550,   50,   51 ],
                         [   1,  201, 10100,  101,  100 ],
                         [   1,  201, 10100,  501,  500 ],
                         [  -1,    2,    99,   -9,   11 ], //  yAxCode == 2  //
                         [   1,   -2,   -99,   -9,   11 ],  
                         [   1,    0, 10000,  100, -101 ], //  large roots far apart
                         [   1,    0, 10000,  501, -501 ],
                         [  -1,  -20,   -99,  -11,   -9 ], //  yAxCode == 3  //
                         [   1,   20,    99,  -11,   -9 ],   
                         [  -1, -101, -2550,  -50,  -51 ], //  large roots close together
                         [  -1,  201, 10100, -101, -100 ], 
                         [  -1,  201, 10100, -501, -500 ],
                         [   1,  101,  2550,  -50,  -51 ],
                         [   1,  201, 10100, -101, -100 ],
                         [   1,  201, 10100, -501, -500 ],
                         [   1,  -40,   400,   20,   20 ],
                         [  -1,   40,  -400,   20,   20 ],
                         [   3,  -12,     9,    1,    3 ],
                         [  -1,   18,   -45,   15,    3 ],
                         [   1,   10,   -24,    2,  -12 ],
                         [  -3,   -2,     1,  1/3,   -1 ],
                         [   6,   19,    -7, -7/2,  1/3 ],
                         [  -1,   18,   -81,    9,    9 ],
                         [   1,  -18,    81,    9,    9 ],
                       ] 
  
  var ArrayOfPlotsLength = myArrayOfPlots.length;

  /********************************/
  /*  Functional state variables  */
  /********************************/

  const [stepsDone,        setStepsDone        ] = useState(0);
  const [stepsRender,      setStepsRender      ] = useState(0);

  const [lastPlotNumber,   setLastPlotNumber   ] = useState(0);

  /*******************************************************/
  /*  Handle functions in (onClick and onPress) buttons  */
  /*******************************************************/

  // button = {stepsDone == 0 ? `Display Results` : `Do Next Case` }
  let restartNewCase = () => {
    console.log("stepsDone");
    console.log( stepsDone );
    // setStepsDone(0);
    if (stepsRender < myArrayOfPlots.length) {
      setStepsRender(stepsRender+1);
    }  
  }

  // button =  returnToMainMenu 
  let handleReturnToMainMenu = ()  => {
    setStepsRender(0);
  }

  useEffect(() => {
    console.log('useEffect App: stepsDone and lastPlotNumber');
    console.log(stepsDone); 
    console.log(lastPlotNumber); 
  }, [stepsDone, lastPlotNumber]);

  /*****************************************************************/
  /*  Callback Functions in components invoked from App component  */
  /*****************************************************************/

  /* Use callback to get ...  */

  //  <SvgPlot ... > 
  let singleCallbackChild = (arrayFromChild: any) => {
    setLastPlotNumber(arrayFromChild[0]);
    console.log("lastPlotNumber = ",lastPlotNumber)
  }

  /*******************/
  /*  SvgPlotRender  */
  /*******************/

  let SvgPlotRender = ()  => {

  if ( (stepsRender-1) ==  myArrayOfPlots.length) {
    setStepsRender(0);
  }  
  
  var bool_1 = ((myArrayOfPlots.length-1) == stepsRender) ? 'LAST plot'  : 'Do Next Plot'
  var bool_2 = `\n\tThis App will display ${ArrayOfPlotsLength} plots of Quadratic Equations:`
  var bool_3 = ((myArrayOfPlots.length-1) == stepsRender) 
               ? '\n\t This is the LAST plot'
               : '\n\tThe Vertex V for each plot appears in the diagram below !'

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.outerContainer}>

        <Text style={{marginTop: 2, color: "blue", fontSize: 24, }}>
          {'\n\n'} App to test the SVG_PLOT component{'\n'}
        </Text>

        {/* do SVG Plot for AA, BB, ...  */}
        <View style={styles.container}>
          {/*      Child           = {Parent}      */}
          <SvgPlot AA              = {AA}         
                   BB              = {BB}   
                   CC              = {CC}   
                   rr1             = {rr1}   
                   rr2             = {rr2}   
                   hh              = {hh}   
                   kk              = {kk}   
                   yAxis           = {yAxis}   
                   stepsDone       = {stepsDone}
                   stepsRender     = {stepsRender}
                   mutateSVGValues = {singleCallbackChild} 
          />
      
          { lastPlotNumber != 0  &&   
            <View style={{ borderWidth: 2, width: 420, position: 'absolute', top: 16, 
                           backgroundColor: stepsDone == 0 ? 'gold' : 'lawngreen',
                        }} >
              <Text>
                { (stepsRender == 0 && stepsDone == 0) ? `${bool_2}` : `${bool_3}` }
              </Text> 

              { stepsDone == 0 &&
                <TouchableOpacity onPress={() => setStepsDone(stepsDone+1) }>
                  <View style={[styles.myButton, { marginLeft: 36, width: 126 }]} >
                    <Text style={[styles.buttonText, {color: "blue", marginLeft: 2, }]}>
                      {'Click to continue '}
                    </Text>
                  </View>
                </TouchableOpacity>
              }

              { stepsDone > 0 && 
                <View>
                <TouchableOpacity onPress={() => setStepsRender(stepsRender + 1) }>
                  <View style={[styles.myButton, { marginLeft: 36, width: 130,
                         display: ((myArrayOfPlots.length-1) == stepsRender) ? "none" : "flex"
                              }]} >
                    <Text style={[styles.buttonText, {color: "blue", marginLeft: 2, }]}>
                      {bool_1}
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleReturnToMainMenu}>
                  <View style={[styles.myButton, { marginLeft: 36, width: 170,
                                display: ((myArrayOfPlots.length-1) == stepsRender) ? "flex" : "none"
                              }]} >
                    <Text style={[styles.buttonText, {color: "blue", marginLeft: 2, width: 160,}]}>
                     {((myArrayOfPlots.length-1) == stepsRender) ? `Restart the plots`  : ``}
                    </Text>
                  </View>
                </TouchableOpacity>

                </View>
              }

            </View>
          }  

        </View>  


        { stepsDone > 1 && 
           <View>
            <Text>{restartNewCase()}</Text>
           </View>
        }


      </View>

      {/*  Footer shows current STEP by displaying SD */}

      <View style={{ flexDirection: "row", borderWidth: 3, borderColor: "gold", padding: 6,
                     width: 420, margin: 4, marginLeft: 20,
                  }}>
        <Text>SR = stepsRender = {stepsRender}</Text>
        <Text>{'\t'}ArrayOfPlots.length = {myArrayOfPlots.length}</Text>
      </View>

    </SafeAreaView>
  ) 
}    // end of let SvgPlotRender = ()  => { ... }

  // button = Do SVG Plot
  let handleSVGPlot = ()  => {
    restartNewCase();
    console.log("stepsDone");
    console.log( stepsDone );
    setStepsDone(0);
  }

  let orderOfRootsRR1RR2  = () => {
    let rr1Temp;
    if (rr1 > rr2 ) {
      rr1Temp = rr1;
      rr1     = rr2;
      rr2 = rr1Temp;
    }
  }

  let ff = (hh, AA, BB, CC) => {
    return parseInt(AA*hh*hh) + parseInt(BB*hh) + parseInt(CC); 
  }

  // alert("stepsRender = " + stepsRender);

  let AA  = myArrayOfPlots[stepsRender][0];
  let BB  = myArrayOfPlots[stepsRender][1];
  let CC  = myArrayOfPlots[stepsRender][2];
  let rr1 = myArrayOfPlots[stepsRender][3];
  let rr2 = myArrayOfPlots[stepsRender][4];
  let hh  = (rr1 + rr2)/2;
  //  h = -B/(2A) OR (r1+r2)/2
  let kk  = ff(hh, AA, BB, CC);

  orderOfRootsRR1RR2();

  // rr1 != rr2
 
  let yAxis;
  if ( rr1 != rr2 ) {
    yAxis = 3 + 12*rr1/(rr1-rr2) ;
  } else {
    yAxis = 0;
  }

  /****************/
  /*  Render App  */
  /****************/

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.outerContainer}>

        {/***************/}
        {/* Render App: */}
        {/***************/}

        { (stepsRender == -1 ) &&
          <View style={{ borderWidth: 3, borderColor: "gold", padding: 6,
                         height: 60, margin: 10, top: 2,
                      }}>
            <Text style={{marginTop: -52, color: "blue", fontSize: 24, }}>
              {'\n\n'}  Do SVG Plot with Main {'\n\n'}
            </Text>

            <button style={{ marginLeft: 10, marginTop: 4, width: 120, padding: 1, height: 30,
                             backgroundColor: "orange",
                          }}
                    onClick={handleToggleDoc}>
              Show/Hide Doc
            </button>

            <button style={{ marginLeft: 10, marginTop: 4, width: 160, padding: 1, height: 30,
                             backgroundColor: "orange",
                          }}
                    onClick={handleSVGPlot}>
              Do SVG Plot
            </button>

          </View>
        }   

        { (stepsRender >= 0 ) && SvgPlotRender() }

      </View>

    </SafeAreaView>
  )  
};

  /************/
  /*  Styles  */
  /************/

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  myButton: {
    margin: 20,
    width: 120,
    padding: 0,
    backgroundColor: "cyan",
    borderWidth: 2,
  },
  buttonText: {
    textAlign: 'center',  // to center the text horizontally
    color: 'cyan',
    width: 120,
  },
  docDesc: {
    marginTop: 220,
    borderWidth: 2,
    backgroundColor: 'skyblue',
    width: 780,
    fontSize: 16,
    marginLeft: 12,
    marginBottom: 12,
  },
});


    /*******************/
    /*  Documentation  */
    /*******************/

const myDoc1 = "\n\n\tThis App was deleveloped purely to test the SVG_03.tsx code before including it into the\n\t App_QuadraticVersion3.tsx program.\n\n";

export default SvgApp;

