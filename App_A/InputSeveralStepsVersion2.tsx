import React, {useState, useEffect} from "react";
import { SafeAreaView, View, StyleSheet, Text, } from "react-native";

// replaced this  import { TextInput } from 'react-native'; by:
import { TextInput } from 'react-native-paper';
// https://callstack.github.io/react-native-paper/text-input.html
// Did: yarn add react-native-paper

const InputSeveralSteps = (props) => {

  /*****************/
  /*  Versiion 5C  */
  /*****************/

  /******************************/
  /*  Function state variables  */
  /******************************/

  const [theArray_2,          setTheArray_2          ] = useState([[0,0]]);
  const [userDefinedArrayRBX, setUserDefinedArrayRBX ] = useState(false);
  const [readBXData,          setReadBXData          ] = useState(props.initReadBXData);

  const [localDebugMsgs,      setLocalDebugMsgs      ] = useState(!true);

    var displayMsg1: boolean;
    var displayMsg2: boolean;
    var displayMsg3: boolean;
    var displayMsg4: boolean;
    var displayMsg5: boolean;

  displayMsg1 = localDebugMsgs ? true : false
  displayMsg2 = localDebugMsgs ? true : false
  displayMsg3 = localDebugMsgs ? true : false
  displayMsg4 = localDebugMsgs ? true : false
  displayMsg5 = localDebugMsgs ? true : false
  

  const [valueB_2,            onChangeTextB          ] = useState('');
  const [valueR_2,            onChangeTextR          ] = useState('');
  const [valueN_2,            onChangeTextN          ] = useState('');

  const [isRuleNo1Valid,      setIsRuleNo1Valid      ] = useState(true);
  const [isRuleNo2Valid,      setIsRuleNo2Valid      ] = useState(true);
  const [isRuleNo3Valid,      setIsRuleNo3Valid      ] = useState(true);
  const [isRuleNo4Valid,      setIsRuleNo4Valid      ] = useState(true);

  const [minInitValue,        setMinInitValue        ] = useState(0);
  const [ruleNo1ErrorInLines, setRuleNo1ErrorInLines ] = useState(0);
  const [localDebug_2,        setLocalDebug_2        ] = useState(props.localDebug_1);
  const [buttonValueN_2,      setButtonValueN_2      ] = useState(true);
  const [readSchedule,        setReadSchedule        ] = useState(0);

  // readSchedule=0 initially, 
  // readSchedule=1 once data is read, 
  // readSchedule=2 after

  /******************************************************/
  /*  Handle functions (in onClick and onPress) buttons */
  /******************************************************/

  // button =   M>0 Creates new Schedule <br/><br/>
  //            M=0 plus click on this button runs Current Schedule
  function  onChildStationsClick () {
    if (valueR_2 == '') onChangeTextR(0); 
    
    if (localDebug_2) {
      console.log("\tChild_2: switching readBXData to false so the second read can take place")
      console.log("\tChild_2: valueR_2:");
      console.log( valueR_2  );
    }  

    setReadBXData(false);  // to run schedule
   
  }

  // button = Click to return to Parent the array defined by Child (arrayBX).
  function  onChildClick () {

    let valueT = parseInt(valueB_2);
    
  /*****************************************************************/
  /*                                                               */
  /*  The four state variables isRuleNo1Valid, ..., isRuleNo4Valid */
  /*  are set in the callback function onChildClick as the array,  */
  /*  arrayBX, is built and checked. A message will appear on the  */
  /*  screen (when code is rendered) if arrayBX does not satisfy   */
  /*  the criteria in the four rules. State variables are GLOBAL ! */
  /*                                                               */
  /*****************************************************************/

    /*************/
    /*  RuleNo2  */
    /*************/

    if ( valueB_2.length < 1) {
      if (localDebug_2) {
        console.log("\tChild_2: MUST ENTER 'number of passengers boarding' !");
      }
      setIsRuleNo2Valid(false);
      return
    }

    /*************/
    /*  RuleNo3  */
    /*************/

    if ( valueT < 0 ) {
      if (localDebug_2) {
        console.log("\tChild_2: MUST HAVE 'Number of passengers embarking initially >=   0'")
      }  
      setIsRuleNo3Valid(false);
      setIsRuleNo2Valid(true);
      return
    }

    /*************/
    /*  RuleNo1  */
    /*************/

    // const [userDefinedArrayRBX, setUserDefinedArrayRBX ] = useState(false);

    let arrayBX = (userDefinedArrayRBX) ? theArray_2 : props.arrayBX ;

    let arrayBXLength = arrayBX.length;

  
    /**************************************************************************************/
    /* Validate Rule #1: For all rows except row #0 and last 2 rows entries must be >= 0  */
    /**************************************************************************************/

    let linesWithErrors = []
    // CHANGES Jan 13:  arrayBXLength-2 -> arrayBXLength because no longer adding 2 elements
    for (let i = 1; i < arrayBXLength  ; i++) {
      if ( arrayBX[i][0] < 0 || arrayBX[i][1] < 0 ) {
        if (localDebug_2) {
          console.log('\tChild_2: Row ' + i + ' in arrayBX has NEGATIVE entries ! See Rule #1')
        }
        linesWithErrors.push(i)
      }

      // CHANGES Jan 13:  arrayBXLength-3 -> arrayBXLength-1  because no longer adding 2 elements
      if ( i == (arrayBXLength-1) && linesWithErrors.length> 0 ) { 
        setIsRuleNo1Valid(false);
        setIsRuleNo3Valid(true);
        setRuleNo1ErrorInLines(linesWithErrors);
      }
    }  

    /********************************/
    /* Validate arrayBX for Rule #2 */
    /********************************/

    if (localDebug_2) {
      console.log('\tChild_2: valueT:');
      console.log(valueT + " = number of passengers  embarked initially ");
    }  

    // Calculate minInitiallyEmbarkedValue entered by user via TextInput:

    let minInitiallyEmbarkedValue = 0;

    if (localDebug_2) {
      console.log("\tChild_2: Initially minInitiallyEmbarkedValue set to zero")
      console.log("\tChild_2: As all rows of array arrayBX, except row #0 and last 2 rows are scanned:") 
    }

    // CHANGES Jan 13:  arrayBXLength-2 -> arrayBXLength because no longer adding 2 elements
    for (let i = 1; i < arrayBXLength  ; i++) {
      minInitiallyEmbarkedValue =   parseInt(minInitiallyEmbarkedValue) 
                                  + parseInt(arrayBX[i][0]) 
                                  - parseInt(arrayBX[i][1]) ;
      if (localDebug_2) {
        console.log("\tChild_2:   minInitiallyEmbarkedValue after row i " + i + "  is scanned -> " + minInitiallyEmbarkedValue)
      }  
    }
    // CHANGES Jan 13:  arrayBXLength-3 -> arrayBXLength-1   because no longer adding 2 elements
    minInitiallyEmbarkedValue =   parseInt(arrayBX[arrayBXLength-1][0]) 
                                - minInitiallyEmbarkedValue ; 

    if (localDebug_2) {
      console.log("\tChild_2: For the 'number of passengers boarding at initial station' MUST enter: " + minInitiallyEmbarkedValue + " as a minimum value !")
    }  
      
    setMinInitValue(minInitiallyEmbarkedValue);

    // Rule #2 Must have valueT >= minInitiallyEmbarkedValue

    if ( valueT < minInitiallyEmbarkedValue ) {
      if (localDebug_2) {
      console.log(`\tChild_2: MUST HAVE 'Number of passengers embarking initially >= ' + ${minInitiallyEmbarkedValue}`)
      }
      setIsRuleNo2Valid(false);
      setMinInitValue(minInitiallyEmbarkedValue);
      setIsRuleNo3Valid(true);
      return

    }

    /***************************************************************************/
    /* Validate Rule #4  -  Check if entries for embark/disembark are correct  */
    /***************************************************************************/

    var workValueT = valueT;  // workValueT will be changing

    // CHANGES Jan 13:  arrayBXLength-2 -> arrayBXLength because no longer adding 2 elements
    for (let i = 1; i < arrayBXLength  ; i++) {
       workValueT = workValueT - arrayBX[i][1];
       if (workValueT < 0) {
         if (localDebug_2) {
           console.log('\tChild_2: For i = ' + i + 
                  ' ERROR:  Number of passengers disembarking > number of passengers in train !');
         }         
         setIsRuleNo4Valid(false);
         return;
       }

       workValueT = workValueT + arrayBX[i][0];

      if (localDebug_2) {
         console.log('\tChild_2: workValueT:');
         console.log(workValueT);
         console.log(workValueT + ' \tChild_2:  <- at end of i = ' + i);
      }   

    }   

    /***************************************************************/
    /* Place results into args of the callback function in Parent  */
    /***************************************************************/
    
    arrayBX[0][0] = valueB_2;
    props.mutateValueB_2(arrayBX, arrayBXLength);
    onChangeTextB('');
    onChangeTextN('');
    onChangeTextR('');
    setIsRuleNo1Valid(true);
    setIsRuleNo2Valid(true);
    setIsRuleNo3Valid(true);
    setIsRuleNo4Valid(true);
    setRuleNo1ErrorInLines([]);
    setReadBXData( true );

  }     /* function  onChildClick () {...} triggered by button:                    */
        /*      Click to return to Parent the array defined by Child (arrayBX).    */

  function callbackChild_2 (arrayFromGrandChild: any) {     
   
    setReadSchedule(1)

    if (localDebug_2) {
      console.log("\tChild_2: arrayFromGrandChild");
      console.log( arrayFromGrandChild );
      console.log("\tChild_2: valueR_2");
      console.log( valueR_2 );
      console.log("\tChild_2: valueB_2");
      console.log("'"+ valueB_2 + "'");
    }  

    if (valueB_2 == '') {
      onChangeTextB(0);
    }  
  
    onChangeTextR('')
    onChangeTextN('')
    setReadSchedule(0)
    // transfer arrayFromGrandChild into theArray_2 of function  onChildClick
    setTheArray_2(arrayFromGrandChild);
    setUserDefinedArrayRBX(true);
  }  // end of callbackChild_2

  const startIndex2 = 0;

  useEffect(() => {
    if (localDebug_2) 
      console.log("\tChild_2: Msg from useEffect InputSeveralSteps, new value of valueR_2 and valueB_2: '" + valueR_2 + "', '" + valueB_2 + "'" ); 
  }, [valueR_2, valueB_2 ]);

  /************/
  /*  Render  */
  /************/

  let labelN_2=`N`;
  let labelR_2=`M`;
  let buttonN1 = "Specify N if Creating a New Schedule - N is the number of stations"

  return (
    <SafeAreaView style={{flex: 1, borderWidth: 2, borderColor: "white", height: 400, width: 600,}}>
      { (props.stepsDone_2 == 0)  && (props.valueB_2 == "" ) &&
        <View style={[styles.container, 
                      {position: 'absolute', top: (displayMsg2) ? 40 : 20, left: -60, 
                       borderWidth: (displayMsg2) ? 2 : 0, marginLeft: -60,
                       borderColor: "red", height: 120, width: 600,
                      }]}>
  

          <Text style={{ textAlign: 'left', }} >
           { (displayMsg1)
               ? `valueR_2='${valueR_2}' `
              : ``
           }   
          </Text>
        
          <Text style={{ textAlign: 'left', }} >
           { (displayMsg2)
               ? `valueB_2 = '${valueB_2}'`
              : ``
           }   
          </Text>
  
          <Text style={{ textAlign: 'left', }} >
           { (displayMsg3)
               ? `readBXData = ${readBXData}`
              : ``
           }   
          </Text>
        
          <Text style={{ textAlign: 'left', }} >
           { (displayMsg4)
               ? `readSchedule = '${readSchedule}'`
              : ``
           }   
          </Text>
    
          {/*  Inner View component  */}
        { readBXData && 
          <View style={{ flexDirection: "row", position: 'absolute', 
                         top: (displayMsg1) ? 130 : -10, 
                      }} >

    
            {/* Read for number of stations  */}
              <TextInput style={{ paddingLeft: 2, height: 60, borderColor: 'red',
                                  borderWidth: 2, margin: 10, width: 75,
                               }}
                         keyboardType={'numeric'}
                         onChangeText={text => onChangeTextN(text)}
                         value={valueN_2}
                         label={labelN_2}
              />
         
              {/*  
              <button style={{ marginLeft: 10, width: 120, padding: 10, backgroundColor: "cyan",
                              display: (valueR_2 > 0) ? "none" : "flex",
                            }}
                      onClick={onChildStationsClickR}>
                 {buttonValueN_2} 
              </button>
              */}

              {/* */}    
              <View style={{ marginLeft: 10, width: 130, padding: 10, backgroundColor: "lawngreen",
                             borderWidth: 2, display: (valueR_2 > 0) ? "none" : "flex",
                         }}
              >           
                 <Text style={{ textAlign: 'center',}}> 
                  {buttonN1}  
                 </Text>           
              </View>
             

{/*-------------------------------------------------------------------------------------------*/}

            {/* Read RETURN for number of stations  */}
              <TextInput style={{ paddingLeft: 2, height: 60, borderColor: 'blue',
                                  borderWidth: 2, margin: 10, width: 45,
                               }}
                         keyboardType={'numeric'}
                         onChangeText={text => onChangeTextR(text)}
                         value={valueR_2}
                         label={labelR_2}
              />

         
              <button style={{ marginLeft: 10, width: 200, padding: 10, backgroundColor: "cyan",
                              display: (valueR_2 > 0) ? "none" : "flex",
                            }}
                      onClick={onChildStationsClick}>
                M>0 Creates new Schedule <br/><br/>
                M=0 plus click on this button runs Current Schedule
              </button>
                 
{/*-------------------------------------------------------------------------------------------*/}

            {/* Once we have read valueR_2 > 0 call InputNewSchedule  */}
            { readBXData && (valueR_2 !== '' ) && (valueR_2 != 0 )  &&  (readSchedule==0) &&
              <View style={{ position: 'absolute', top: 80, 
                             backgroundColor: (displayMsg5) ? "lawngreen"  : "white" ,
                             borderWidth: (displayMsg5) ? 2 : 0, padding: 10, 
                          }} 
              >
                <Text>
                  { (displayMsg5)
                    ? `Calling component InputNewSchedule - Enter the {valueR_2} elements{'\n'}
                       Note: length of theArray_2 = 1 + number of stations !  Need another button to exit, because this one does not !`
                    : ``
                 }   
                </Text>

                {/*               GrandChild        Child                   */} 
                <InputNewSchedule valueNGC       = {valueN_2}    
                                  mutateValue_3  = {callbackChild_2}  
                                  theArray_3     = {theArray_2}
                                  localDebug_3   = {localDebug_2}
                />
                {/* */}

              </View>
            }

          {/*  End of Inner View component  */}
          </View>
        }    

    
          {/* Read number of passengers boarding  */}
          
          <View style={{ flexDirection: "row", position: 'absolute', 
                         top: (displayMsg2) ? 120 : -10, 
                      }} >
            { !readBXData && 

            <TextInput style={{ paddingLeft: 2, height: 50, borderColor: 'blue',
                                borderWidth: 2, margin: 10, width: 420,
                             }}
                       keyboardType={'numeric'}
                       onChangeText={text => onChangeTextB(text)}
                       value={(valueB_2 == 0) ? '' : valueB_2}
                       label={"Enter number of passengers boarding at initial station "}
            />

            }  
        
            { !readBXData && 
              <button style={{margin: 10, width: 260, padding: 10, backgroundColor: "cyan"}}
                      onClick={onChildClick}>
                Click to return to Parent the array defined by Child (arrayBX).
              </button>
            }    
    
          </View>

          {/*  Rule #1 requires all elem in arrayBX >= 0  */}
          <Text style={{ textAlign: 'left', width: 624, }} >
           { (  isRuleNo1Valid )
              ? (localDebug_2) ? `\n\n\n\n\n\nRule #1 requires all elem in arrayBX >= 0` 
                             : `\n\n\n\n\n\n`
              : `\n\n\n\n Rule #1 VIOLATED: MUST HAVE 'All entries in arrayBX >= 0 !'
 Except for row #0 and last two rows !
 Check line(s) [${ruleNo1ErrorInLines}] of arrayBX in Child component InputSeveralSteps.`
           }   
          </Text>
    
          {/*  Rule #2 MUST ENTER init embark >= ${minInitValue} */}
          <Text style={{ textAlign: 'left', width: 624, }} >
           { ( isRuleNo2Valid )
              ? (localDebug_2) ? `\n\nRule #2 MUST ENTER init embark >= ${minInitValue}` 
                             : `\n\n` 
              : `\n\n Rule #2 VIOLATED: MUST ENTER 'Number of passengers embarking initially >= ${minInitValue}' ` 
           }   
          </Text>
    
          {/*  Rule #3 requires init embarking >= 0  */}
          <Text style={{ textAlign: 'left', width: 624, }} >
           { ( isRuleNo3Valid )
              ? (localDebug_2) ? `\n\nRule #3 requires init embarking >= 0` 
                             : `\n\n` 
              : `\n\n Rule #3 VIOLATED: MUST HAVE 'Number of passengers embarking initially >= 0 !'` 
           }   
          </Text>
    
          {/*  Rule #4 requires passengers disembarking < passengers in rain  */}
          <Text style={{ textAlign: 'left', width: 624, }} >
           { ( isRuleNo4Valid )
                ? (localDebug_2) ? `\n\nRule #4 requires passengers disembarking < passengers in rain` 
                               : `\n\n` 
                : `\n\n Rule #4 VIOLATED: MUST HAVE 'Number of passengers disembarking ALWAYS LESS THAN number of passengers in train !' ` , 
             ( isRuleNo4Valid ) 
                ? ``
                : theArray_2.map((entry, index) =>
                   `${'\n\t'}`+ (startIndex2 + parseInt(index))  + `${'\t['}` +  entry + `${']'}`
                   )
           }   
          </Text>
    
          {/*  display title for theArray_2:                  */}
          <Text style={{ textAlign: 'left', width: 624, }} >
           Current Schedule
          </Text>
    
          {/*  display elements of theArray_2                 */}
          <Text style={{ textAlign: 'left', width: 624, }} >
           {  ( !userDefinedArrayRBX ) 
                ? props.arrayBX.map((entry, index) =>
                   `${'\n\t'}`+ (startIndex2 + parseInt(index))  + `${'\t['}` +  entry + `${']'}`
                  )
                : theArray_2.map((entry, index) =>
                   `${'\n\t'}`+ (startIndex2 + parseInt(index))  + `${'\t['}` +  entry + `${']'}`
                   )
                   
           }   
          </Text>
    
        </View> 
      
        
      }
    </SafeAreaView>
  );
}


const InputNewSchedule = (props:any) => {

  /******************************/
  /*  Function state variables  */
  /******************************/

  // Nice compact way to generate arrays using the from method !
  // let oldArrayFrom  = Array.from({length: sizeV}, (v, i) => [i,i]);
  // Must define initTheArray before it is used in the useState method:
  const initTheArray = Array.from({length: parseInt(props.valueNGC)}, (v, i) => [i+1,i+1]);

  const [stationNumber,       onChangeTextN          ] = useState('');
  const [valueB,              onChangeTextB          ] = useState('');
  const [valueX,              onChangeTextX          ] = useState('');
  const [kount,               setKount               ] = useState(0);
  const [theArray_3,          setTheArray_3          ] = useState(initTheArray);
  const [isINSClosed,         setIsINSClosed         ] = useState(false);
  const [startIndex,          setStartIndex          ] = useState(1);
  const [messageAtEnd,        setMessageAtEnd        ] = useState('');

  const [localDebug_3,        setLocalDebug_3        ] = useState(props.localDebug_2);

  const displayMsg3 =   true;
  let sizeV = props.valueNGC;
  let len: any;
  let elem0, elem1, elem2 ;

  /*******************************************************/
  /*  Handle functions in (onClick and onPress) buttons  */
  /*******************************************************/

  //  Save and Return to main Menu
  let onChildSaveINS = () => { 

    if (theArray_3.length == 0 ) {
      // alert("theArray_3.length == 0");
      setMessageAtEnd(" TTT: theArray_3.length == 0" +
                      "\t You need to specify N > 0 to create a proper schedule !" +
                      "\n Press the Backspace key and enter a proper value of N.");
    }  

    // Need to add two dummy elements at end because there is a lag in the rendering process
    if (isINSClosed) {
      // setTheArray_3([ [0,0],...theArray_3,[-1,-1],[-2,-2] ] );
      if (localDebug_3) {  
        console.log("\t\tGrandChild: Returning theArray_3 ...");
        console.log("\t\tGrandChild: theArray_3:");
        console.log( theArray_3  );
      }

      // XXX
      props.mutateValue_3(theArray_3);
      setStartIndex(1);
    } else {
      alert("MUST Close the Updating component before SAVING !");
      return
    }
    onChangeTextN('');
  }  // end of onChildSaveINS 

  //  Close the Updating component
  let onChildCloseINS = () => { 
      // Need to add two dummy elements at end because there is a lag in the rendering process
      if (!isINSClosed) {
        setTheArray_3([ [0,0],...theArray_3 ] );
        setIsINSClosed(true);
        setStartIndex(0);
        setMessageAtEnd("Click on button to Save the Augmented array 'theArray_3'");
        onChangeTextN('');
      }  
      if (localDebug_3) {  
        console.log("\t\tGrandChild: theArray_3:")
        console.log( theArray_3  )
      }  
  }  // end of onChildCloseINS


  // Update an element in newArrayBX  
  let onChildClickINS = () => {
    
    if (sizeV == 0 || sizeV == '') {
      setMessageAtEnd("You need to specify N > 0 to create a proper schedule !\n Press the Backspace key and enter a proper value of N.");
      return;
    } else {
      setMessageAtEnd("\nNNN value must be in range [1," + props.valueNGC + "]\n" );
    }

      elem0 = parseInt(stationNumber) - 1;

      if ( 0 <= elem0 && elem0 < sizeV ) {
      elem1 = parseInt(valueB);
      elem2 = parseInt(valueX);
      if (localDebug_3) {  
        console.log("\t\tGrandChild: elem0:");   
        console.log( elem0  );   
        console.log("\t\tGrandChild: sizeV:");   
        console.log( sizeV  );   
      }  

      // setTheArray_3([...theArray_3,[elem1,elem2]]); 

      // if ( parseInt(stationNumber) < theArray_3.length) { ... }

      let firstArray = theArray_3.slice(0,elem0);
      let newNum = elem0+1
      let lastArray  = theArray_3.slice(newNum);
      let newArray = [ ...firstArray,[valueB,valueX],...lastArray ];
      setTheArray_3(newArray);

      len = theArray_3.length; 
      if (localDebug_3) {  
        console.log("\t\tGrandChild: len:");
        console.log( len  );
      }  
      onChangeTextB('');
      onChangeTextX('');
      onChangeTextN(1+((1+elem0)%sizeV));
    } else {
     alert("Must have NNN in the range [1," + props.valueNGC + "]" )
    }
  }    // end of onChildClickINS 

  useEffect(() => {
   if (localDebug_3)   
     console.log('\t\tGrandChild: Msg from useEffect InputSeveralSteps, var props.valueNGC =  ', props.valueNGC, )
  }, [props.valueNGC, theArray_3,  ] )


  /******************************/
  /*  Render InputSeveralSteps  */
  /******************************/

  return (
    <SafeAreaView style={{flex: 1}}>
      
        <View style={[styles.container, 
                      {position: 'absolute', top: (displayMsg3) ? 40 : 20, left: -60, 
                       borderWidth: (displayMsg3) ? 2 : 0,
                       borderColor: "white", width: 800, height: 360, 
                       marginLeft: 120, marginTop: 2,
                    }]}>
  
          {/* Read B, C   move read valueR_2 inside here and have switch to read valueR_2 first
              then loop thru N time ????      
          */}
          
          <View style={{ flexDirection: "row", position: 'absolute', 
                         top: (displayMsg3) ? -120 : -10, 
                      }} >

            <TextInput style={{ paddingLeft: 2, height: 50, borderColor: 'blue', width: 125,
                                 borderWidth: 2, margin: 6, marginLeft: -640, marginTop: 75, 
                              }}
                        keyboardType={'numeric'}
                        onChangeText={text => onChangeTextN(text)}
                        value={stationNumber}
                        label="Enter NNN"
            />
              
            <TextInput style={{ paddingLeft: 2, height: 50, borderColor: 'blue', width: 125,
                                borderWidth: 2, margin: 6, marginTop: 75,
                             }}
                       keyboardType={'numeric'}
                       onChangeText={text => onChangeTextB(text)}
                       value={valueB}
                       label="Enter BBB"
            />
      
            <TextInput style={{ paddingLeft: 2, height: 50, borderColor: 'blue', width: 125,
                                borderWidth: 0, margin: 6, marginTop: 75,
                             }}
                       keyboardType={'numeric'}
                       onChangeText={text => onChangeTextX(text) }
                       value={valueX}
                       label="Enter XXX"
            />
    
            <button style={{margin: 10, width: 140, padding: 10, backgroundColor: "cyan",
                            marginTop: 80, display: !isINSClosed ? "flex" : "none" ,
                            height: 50,
                          }}
                    onClick={onChildClickINS}>
              Update an element in newArrayBX  
            </button>
    

            <button style={{margin: 10, width: 140, padding: 10, backgroundColor: "cyan",
                            marginTop: 80, height: 50,
                          }}
                    onClick={onChildCloseINS}>
              Close the Updating component 
            </button>
    

            <button style={{margin: 10, width: 140, padding: 10, backgroundColor: "cyan",
                            marginTop: 80, height: 50,
                          }}
                    onClick={onChildSaveINS}>
              Save and Return to main Menu
            </button>
    
          </View>
    

          <Text style={{ paddingLeft: 6, height: 50, borderColor: 'red', borderWidth: 2, 
                         margin: 6, marginTop: 40, marginLeft: -304, width: 420,
                      }}
          > {messageAtEnd} </Text>
          
             <Text> {'\n\t'}  </Text>
          
          <Text> length of theArray = {theArray_3.length} </Text>
          <Text> {theArray_3.map((entry, index) =>
                   `${'\n\t'}`+ (startIndex + parseInt(index))  + `${'\t['}` +  entry + `${']'}`
                 )}
          </Text>

          <Text> {'\n\t'} </Text>

        </View> 
       
    </SafeAreaView>
  );
}

  /************/
  /*  Styles  */
  /************/

const styles = StyleSheet.create({
  // used in Child and GrandChild components
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 424,
    height: 20,   
  },
});

export default InputSeveralSteps;
                                                                        
