// React Native TextInput example for the InputSeveralStepsVersion2

/***************/
/*  Version  2 */
/***************/

/******************************/
/*  import React in our code  */
/******************************/

import React, {useState, useEffect} from 'react';
import InputSeveralSteps from './App_A/InputSeveralStepsVersion2';

/***************************************************/
/*  import all the components we are going to use  */
/***************************************************/

import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { TextInput } from 'react-native-paper';
// https://callstack.github.io/react-native-paper/text-input.html
// Did: yarn add react-native-paper

const App = () => {

  /*********************************/
  /*  Initially loaded test array  */
  /*********************************/

  var myvalB = 134;
  var myArrayBX = [ 
                    [ myvalB ,  0 ] ,  // initially valueB_1 embarked
                    [    11  , 22 ] ,  // at station #1: 11 passengers embark,  22 disembark:
                    [    12  , 24 ] ,
                    [    13  , 26 ] ,
                    [    14  , 28 ] ,  
                    [    15  , 30 ] ,  // -130 + 65 = -65 so min valueB_1= -(-65) = 65 
                                       //  but need 15 more because -30 is done first
                                       // then +15, so min valueB_1 = 80 at step 5
                    [    16  , 32 ] ,
                    [    17  , 34 ] ,  
                    [     0  , 36 ] ,  // -232 + 98 = -134 => need 134 for valueB_1 NNN=8
                  ]

  /********************************/
  /*  Functional state variables  */
  /********************************/

  // B=Boarding, X=Exiting (Getting Off), T=Total (before departing)
  const [valueB_1,        setValueB_1          ] = useState('');
  const [valueX,          setValueX            ] = useState('');
  const [valueT,          setValueT            ] = useState('');

  const [stepsDone_1,     setStepsDone_1       ] = useState(0);

  const [showHideDoc,     setShowHideDoc       ] = useState(!true);

  const [arrayBX_1,       setArrayBX_1         ] = useState(myArrayBX);
  const [arrayBX_1Length, setArrayBX_1Length   ] = useState(arrayBX_1.length);

  const [localDebug_1,    setLocalDebug_1      ] = useState(!true);

  const [useSwitchOne,    setUseSwitchOne      ] = useState(false);

  /************************/
  /*  Callback Functions  */
  /************************/

  /* Use callback to get valueB_1 from InputSeveralSteps.tsx in dir App_A */

  // <InputSeveralSteps ... >
  let callbackChildB_1 = (arrayBXFromChild: any, arrayLen: any) => {
    setArrayBX_1Length(arrayLen);
    if (localDebug_1) {
      console.log("Parent_1: Parent received from Child: arrayBXFromChild");
      console.log(arrayBXFromChild);
    }  
    setValueT(parseInt(arrayBXFromChild[0][0]));
    // setValues for STEP #1
    setValueB_1(parseInt(arrayBXFromChild[1][0])); 
    setValueX(parseInt(arrayBXFromChild[1][1]));
    setArrayBX_1(arrayBXFromChild);
  }

  /***************/
  /*  Functions  */
  /***************/

  /*  setValueT(valueT +  valueB_1 - valueX); is available for the current render, because it is
      in useEffect !
  */ 

  let nextStep: any = () => {
    let step = stepsDone_1 + 1;
    // setValues for STEP #(stepsDone+1)
    if (!localDebug_1) {
      console.log("  nextStep: Parent_1: stepsDone_1 = " + stepsDone_1);
    }  

    // If stepsDone_1 reached end of valid station number => SKIP setValueB_1, setValueX
    if (step < arrayBX_1Length) {
      setValueB_1(parseInt(arrayBX_1[step][0])); 
      setValueX(parseInt(arrayBX_1[step][1])); 
    } else {
      { console.log("\n") }
      { console.log("********************************************************") }
      { console.log("**  Parent_1: FINISHED to process array: 'arrayBX_1'  **") }
      { console.log("********************************************************") }
      { console.log("\n") }
    }

    // set stepsDone_1 for next SEG:

    setStepsDone_1(step);

  }

  let restartNewCase = () => {
    if (localDebug_1) {
      console.log("Parent_1: stepsDone_1");
      console.log( stepsDone_1 );
      console.log('Parent_1: Restarting new run !');
    }
    setStepsDone_1(0);
    setValueB_1("");
    setValueX("");
    setValueT("");
  }

  let handleToggleDoc = ()  => {
    setShowHideDoc(!showHideDoc);
  }

  let handleToggleSwitchOne = ()  => {
    setUseSwitchOne(!useSwitchOne);
    setLocalDebug_1(!localDebug_1)
  }

  useEffect(() => {
    console.log("useEffect has stepsDone_1 in [] ..." );
    console.log("useEffect ..." +  valueT + " " +  valueB_1 + " " +  valueX );
    if (stepsDone_1 < arrayBX_1Length)
      setValueT(valueT +  valueB_1 - valueX);
  }, [stepsDone_1, ] );

  /****************/
  /*  Render App  */
  /****************/

  // Global Var:

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.outerContainer}>

        {/* Looping inside render with map: 
            Rendering an Array of Data with map() and JSX
         // http://www.hackingwithreact.com/read/1/13/rendering-an-array-of-data-with-map-and-jsx
        */} 

        {/**********************/}
        {/* Render App STEP 1: */}
        {/**********************/}

        {/* Title in a row plus 'Show/Hide Doc' and 'Toggle Debug' buttons on the right */}
        {/* Appears for all STEPS (i.e. for all stepsDone_1 values)                     */}
        {/* 'Show/Hide Doc' toggled by stateVar showHideDoc                             */}
        {/* 'Toggle Debug'  toggled by stateVar localDebug_1                            */}

        <View style={{ flexDirection: "row", borderWidth: 3, borderColor: "gold", padding: 6,
                       height: 60, margin: 10, 
                    }}>
          <Text style={{marginTop: -52, color: "blue", fontSize: 24, }}>
            {'\n\n'} Simplified Train Version 2 {'\n'}
          </Text>

          <button style={{ marginLeft: 10, marginTop: 4, width: 120, padding: 1, height: 30,
                           backgroundColor: "orange",
                         }}
                  onClick={handleToggleDoc}>
            Show/Hide Doc
          </button>

          <button style={{ marginLeft: 10, marginTop: 4, width: 120, padding: 1, height: 30,
                           backgroundColor: "orange",
                         }}
                  onClick={handleToggleSwitchOne}>
            Toggle Debug    
          </button>

        </View>

        {/****************************/}
        {/*    Render App STEP 2:    */}
        {/*  displays Hints screen   */}
        {/* toggled by localDebug_1  */}
        {/****************************/}

        <View style={[styles.container, 
                       { position: 'absolute', top: 362, left: 300,
                         borderWidth: 2, marginLeft: 20, 
                         borderColor: "red", height: 230, width: 336,
                         display: (localDebug_1) ? "flex" : "none",
                         padding: 12,
                       } 
                    ]}
        >
          <Text style={{ color: "blue", fontSize: 20,}}>{' '}Hints:</Text>
          <Text> 
            {'\n'}To open the N and M fields, click on the letters !{'\n\n'}To modify the array being created <Text style={{ color: "red", fontSize: 18,}}>backspace</Text> the M-value and enter a new N-value plus M>0.{'\n\n'}The stepsDone state variable is used only when the Current Schedule is running. See the Footer bar as the App goes through the elements of the Current Schedule.{'\n\n'}
          </Text>

        </View> 

        {/***************************************/}
        {/*          Render App STEP 3:         */}
        {/* invokes component InputSeveralSteps */}
        {/***************************************/}

        {/*                 Child          = {Parent}           */}

        <InputSeveralSteps  valueB_2       = {valueB_1}           // state variables props
                            stepsDone_2    = {stepsDone_1}
                            initReadBXData = {true}
                            arrayBX        = {arrayBX_1}
                            mutateValueB_2 = {callbackChildB_1}   // callback functions props
                            localDebug_2   = {localDebug_1}
        />

        {/***********************************************************/}
        {/*       Render App STEP 4 has following {} segments:      */}
        {/*                                                         */}
        {/*  SEG1: { (stepsDone_1 == 0 ) && (valueB_1 != "" ) &&    */}    
        {/*          <View> ... </View>                             */}
        {/*        }                                                */}
        {/*                                                         */}
        {/*  SEG2: { arrayBX_1.map((dataElem, index) =>             */}
        {/*          ( (stepsDone_1 == index+1 ) &&                 */}
        {/*            <View> ... </View>                           */}
        {/*          ))                                             */}
        {/*        }                                                */}
        {/*                                                         */}
        {/*  SEG3: { stepsDone_1 == arrayBX_1Length+1  &&           */}
        {/*          <View> ... </View>                             */}
        {/*        }                                                */}
        {/*                                                         */}
        {/*  SEG4: { All is  done just display msg for Restart      */}    
        {/*          <View> ... </View>                             */}
        {/*        }                                                */}
        {/*                                                         */}
        {/*  SEG5: { showHideDoc &&                                 */}
        {/*          <View> ... </View>                             */}
        {/*        }                                                */}
        {/*                                                         */}
        {/***********************************************************/}

        {/*  SEG1:  */}    
        { (stepsDone_1 == 0 ) && (valueB_1 != "" ) &&
          <View style={{ borderWidth: 2, width: 660, position: 'absolute', top: 96, 
                         backgroundColor: stepsDone_1 == 0 ? 'gold' : 'lawngreen',
                      }} >
            <Text>
              {'\n\tParent received from Child: valueE = '}{valueT}{' ( i.e. '}{valueT}
              {' passengers Embarked at initial station #0 )'} 
            </Text> 

            { console.log("\n") }
            { console.log("********************************************************") }
            { console.log("**  Parent_1: Starting to process array: 'arrayBX_1'  **") }
            { console.log("********************************************************") }
            { console.log(arrayBX_1) }
            { console.log("\n") }

            {/* incrementing stepsDone_1 by 1 so stepsDone_1 == 1 executes on next render */}
            <TouchableOpacity onPress={() => nextStep()  }>
              <View style={[styles.myButton, { marginLeft: 36, width: 250 }]} >
                <Text style={[styles.buttonText, {color: "blue", marginLeft: 2, }]}>
                  {stepsDone_1 == 0 ? `Let train depart from initial station #0` : `... Error ...`}
                </Text>

              </View>
            </TouchableOpacity>

          </View>
        }  

        {/*  SEG2:  */}    
        {/*  Use map to display results for an element in arrayBX_1 - one at a time  */}
        { arrayBX_1.map((dataElem, index) =>
          ( (stepsDone_1 == index+1 ) &&
            <View style={{ borderWidth: 2, backgroundColor: 'lawngreen',
                           width: 560, position: 'absolute', top: 96,
                        }} >
              <Text>
                {'\n\t'}Train arrived at station #{stepsDone_1}: {'  '}
                {valueB_1} passengers embark,  {valueX} disembark:
                {'\n\t'}There are now {valueT} passengers in the train.{'\n\n'}
              </Text>

              {/* incrementing stepsDone_1 by 1 so stepsDone_1 == index+2 
                  executes on next render 
              */}

              <TouchableOpacity onPress={() => nextStep()  }>
                <View style={[styles.myButton, { marginLeft: 36, width: 250,
                             display: (stepsDone_1 > arrayBX_1Length-1 ) ? "none" : "flex" ,
                            }]} >
                  <Text style={[styles.buttonText, {color: "blue", marginLeft: 2, }]}>
                    { (stepsDone_1 == arrayBX_1Length-1 )
                        ? `Next station is the LAST STATION !`
                        : (stepsDone_1 > arrayBX_1Length-1 ) 
                            ? ``
                            : ( stepsDone_1 == index+1 ) 
                                ? `Go to Next step ${index+2} ` 
                                : `... Error ${index+2} ...` 
                    }
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))
        }

        {/*  Once stepsDone_1 == arrayBX_1Length the arrayBX_1.map will be out of range, 
             and we can display Final comments for the LAST station in SEG3.
        */}


        {/*  SEG3:                                                    */}    
        { stepsDone_1 == arrayBX_1Length    && 
            <View style={{ borderWidth: 2, backgroundColor: 'lawngreen',
                           width: 560, position: 'absolute', top: 96,
                        }} >
             
              { (valueT == 0) &&
              <Text> 
                {'\n\t'}Train arrived EMPTY at the last station (#{stepsDone_1}) ! 
              </Text>
              } 

              { (valueT != 0) &&
              <Text> 
                {'\n\t'}Train arrived at last station (#{stepsDone_1}) and the {valueT} {' '}
                remaining passengers will disembark. 
              </Text>
              } 

              <TouchableOpacity onPress={() =>  nextStep()}>
                <View style={[styles.myButton, { marginLeft: 36, width: 250 }]} >
                  <Text style={[styles.buttonText, {color: "blue", marginLeft: 2, }]}>
                  LAST STATION 
                  { (valueT != 0) ? ` - All passenger MUST disembark !`
                                  : ` - All passenger have already disembarked !`
                  }              
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
        }

        {/*  SEG4: All is  done just display msg for Restart            */}    
        { stepsDone_1 == (arrayBX_1Length+1)    && 
            <View style={{ borderWidth: 2, backgroundColor: 'lawngreen',
                           width: 560, position: 'absolute', top: 96,
                        }} >

              <TouchableOpacity onPress={() =>  restartNewCase()}>
                <View style={[styles.myButton, { marginLeft: 36, width: 250 }]} >
                  <Text style={[styles.buttonText, {color: "blue", marginLeft: 2, }]}>
                  Restart
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
        }


        {/*  SEG5:  */}    
        {  showHideDoc &&
          <View><Text style={[styles.docDesc, {color: "blue"}]}>
            <Text style={{color: "red", fontSize: 20, fontWeight: 'bold'}}>
              {'\t'} App Documentation ... {'\n'}
            </Text>
            {myDoc1}
            {myDoc2}
            {myDoc3A}
            <Text style={{color: 'red'}}>To run the Current Schedule </Text>
            {myDoc3B}
            {myDoc4A}
            <Text style={{color: 'red'}}>To create a new Schedule </Text>
            {myDoc4B}
            {myDoc5}
            {myDoc6}
          </Text></View>
        }  

      </View>

      {/***********************/}
      {/*  Render App STEP 5  */}
      {/***********************/}

      {/*  Footer shows current STEP by displaying SD */} 

      <View style={{ flexDirection: "row", borderWidth: 3, borderColor: "gold", padding: 6,
                     width: 820, margin: 4, marginLeft: 20,
                  }}>
        <Text>SD = stepsDone_1 = {stepsDone_1}</Text>  
        <Text>{'\t'}valueB_1 = '{valueB_1}'</Text>
        <Text>{'\t'}arrayBX_1Length = {arrayBX_1Length}</Text>
        <Text>{'\t'}{useSwitchOne ? 'Debug On (See console)' : 'Debug Off'}</Text>
      </View>

    </SafeAreaView>
  );
};

   /************/
   /*  myDocs  */
   /************/

   const myDoc1 = "\n  o In this App ('A Simplified Train Control and Monitoring System'), a train starts at the initial station with a number\n     of passengers and goes through several stations where some passengers do disembark and new passengers\n     embark.  The total number of passengers in the train before departing each station is calculated and displayed.\n";

   const myDoc2 = "\n  o The App starts with a sample schedule consisting of 8 stations numbered 1 to 8. The train departs from station 0\n     and proceeds according to the schedule shown in the 'Current Schedule' array.  Above this array there is an input\n     field labelled N with some description to the right of it, followed by a second input field labelled M with a button. \n";
   
   const myDoc3A = "\n  o ";
   const myDoc3B = " - simply press on the button to the right of the M field. This will bring up a new input\n     field with it's own button. Enter the 'number of passengers boarding at initial station' and click on the button to\n     start running the 'Current Schedule'.\n  ";

   const myDoc4A = "\n  o ";
   const myDoc4B = " - first you MUST enter the 'number of stations' into the N field and also an integer > 0\n     into the M field and only then click on the button to the right of M.\n";

   const myDoc5 = "\n     Once a value of N>0 and M>0 are entered an array with N lines will appear  on the right hand side.  The lines will\n     be numbered from 1 to N, and each line will displays a sub-array containing two numbers, e.g. [1,1] for first line.\n\n     Above these N lines there will also appear three input fields and three buttons. First button is labelled 'Update an\n     element in newarrayBX_1' for the user to update the info on each station.  NNN is the station number, BBB is the\n     number of passengers boarding at that station and XXX is the number of passengers disembarking.\n";

   const myDoc6 = "\n     The size of the array being created can be modified (before it is Saved) by backspacing the M-value and entering\n     a new N-value plus M>0.\n\n";      


  /************/
  /*  Styles  */
  /************/

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: "blue",
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
    width: 250,
  },
  docDesc: {
    marginTop: 20,
    borderWidth: 2,
    backgroundColor: 'skyblue',
    width: 850,
    fontSize: 16,
    marginLeft: 12,
  },
});

export default App;

