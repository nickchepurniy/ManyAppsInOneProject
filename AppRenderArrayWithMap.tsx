// React Native  Rendering an Array of Data with map() 

/******************************/
/*  import React in our code  */
/******************************/

import React, {useState, useEffect} from 'react';

/***************************************************/
/*  import all the components we are going to use  */
/***************************************************/

import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const App = () => {

  /********************************/
  /*  Functional state variables  */
  /********************************/

  const [stepsDone,   setStepsDone   ] = useState(0);
  const [showHideDoc, setShowHideDoc ] = useState(!true);

  const dataArray = [
                      [ 0, "России", "Москва",   "столица"            ],
                      [ 1, "España", "Madrid",   "es la capital de"   ],
                      [ 2, "Chile",  "Santiago", "es la capital de"   ],
                      [ 3, "Canada", "Ottawa",   "is the capital of"  ],
                      [ 4, "France", "Paris",    "est la capitale de" ],
                    ];

  /* 
     To use the map() function, attach it to an array you want to iterate over, e.g. dataArray.
     The map() function expects a callback as the argument and executes it once for each 
     element in the array. 

     For the callback functions called by onPress first use array: let nextStep = [] and define
     nextStep[1], nextStep[2], ... 
     
     Later will try to change [1] -> (1) so we would have one nextStep function with an argument 
     instead of an array with elements nextStep[0], nextStep[1], ...
  */

  /*********************************************************/
  /*    Handle functions in (onClick and onPress) buttons  */
  /*********************************************************/

  let nextStep: any = [];

  // button =  {stepsDone == 0 ? `Go to step #1` : `... Error1 ...`}
  nextStep[1] = () => {
    // setValues for STEP #1
    setStepsDone(stepsDone+1)
  }

  // button = {stepsDone == 1 ? `Go to step #2` : `... Error2 ...`}
  nextStep[2] = () => {
    // setValues for STEP #2
    setStepsDone(stepsDone+1)
  }

  // button = {stepsDone == 2 ? `Go to step #3` : `... Error3 ...`}
  nextStep[3] = () => {
    // setValues for STEP #3
    setStepsDone(stepsDone+1)
  }

  // button = {stepsDone == 3 ? `Go to step #4` : `... Error4 ...`}
  nextStep[4] = () => {
    // setValues for STEP #4
    setStepsDone(stepsDone+1)
  }

  // button = {stepsDone == 4 ? `Go to step #0` : `... Error0 ...`}
  nextStep[5] = () => {
    // setValues for STEP #0
    setStepsDone(stepsDone+1)
  }

  // button = {stepsDone == 5 }
  let restartNewCase: any = () => {
    console.log("stepsDone");
    console.log( stepsDone );
    setStepsDone(0);
  }

  // button = Show/Hide Doc
  let handleToggleDoc = ()  => {
    setShowHideDoc(!showHideDoc);
  }

  /************/
  /*  Render  */
  /************/

  return (
     <SafeAreaView style={{flex: 1}}>
      <View style={styles.outerContainer}>
       
        {/* Title in a row plus 'Show/Hide Doc' button to the right of Title */}
        {/* Appears for all STEPS (i.e. for all stepsDone values */}

        <View style={{ flexDirection: "row" }}>
          <Text style={{marginTop: 2, color: "blue", fontSize: 32, }}>
                {'\n\n'} Some Countries and Their Capitals 
          </Text>

          <button style={{ marginLeft: 10, marginTop: 84, width: 120, padding: 1, height: 30,
                           backgroundColor: "orange",
                        }}
                  onClick={handleToggleDoc}>
            Show/Hide Doc
          </button>
        </View>


        { dataArray.map((dataElem) => 
          ( (stepsDone == dataElem[0] ) &&
            <Text style={styles.dataText}>
              {dataElem[2]} {dataElem[3]}  {dataElem[1]}
            </Text>
          ))
        }

        { (stepsDone == 0 ) &&
          <TouchableOpacity onPress={() => nextStep[1]()  }>
            <View style={[styles.myButton, { marginLeft: 36, width: 250 }]} >
              <Text style={[styles.buttonText, {color: "blue", marginLeft: 2, }]}>
                {stepsDone == 0 ? `Go to step #1` : `... Error1 ...`}
              </Text>
            </View>
          </TouchableOpacity>
        }  

        { (stepsDone == 1 ) &&
          <TouchableOpacity onPress={() => nextStep[2]()  }>
            <View style={[styles.myButton, { marginLeft: 36, width: 250 }]} >
              <Text style={[styles.buttonText, {color: "blue", marginLeft: 2, }]}>
                {stepsDone == 1 ? `Go to step #2` : `... Error2 ...`}
              </Text>
            </View>
          </TouchableOpacity>
        }  

        { (stepsDone == 2 ) &&
          <TouchableOpacity onPress={() => nextStep[3]()  }>
            <View style={[styles.myButton, { marginLeft: 36, width: 250 }]} >
              <Text style={[styles.buttonText, {color: "blue", marginLeft: 2, }]}>
                {stepsDone == 2 ? `Go to step #3` : `... Error3 ...`}
              </Text>
            </View>
          </TouchableOpacity>
        }  

        { (stepsDone == 3 ) &&
          <TouchableOpacity onPress={() => nextStep[4]()  }>
            <View style={[styles.myButton, { marginLeft: 36, width: 250 }]} >
              <Text style={[styles.buttonText, {color: "blue", marginLeft: 2, }]}>
                {stepsDone == 3 ? `Go to step #4` : `... Error4 ...`}
              </Text>
            </View>
          </TouchableOpacity>
        }  

        { (stepsDone == 4 ) &&
          <TouchableOpacity onPress={() => nextStep[5]()  }>
            <View style={[styles.myButton, { marginLeft: 36, width: 250 }]} >
              <Text style={[styles.buttonText, {color: "blue", marginLeft: 2, }]}>
                {stepsDone == 4 ? `Go to step #0` : `... Error0 ...`}
              </Text>
            </View>
          </TouchableOpacity>
        }

        { stepsDone == 5  &&
          <View>
            <Text>{restartNewCase()}</Text>
          </View>
        }

        { showHideDoc &&
          <View><Text style={[styles.docDesc, {color: "blue"}]}>
            <Text style={{color: "red", fontSize: 20, fontWeight: 'bold'}}>
              {'\t'} App Documentation ... {'\n'}
            </Text>
            {myDoc1}
            {myDoc2}
            {myDoc3}
            {myDoc4}
          </Text></View>
        }


      </View>

      <View style={{ backgroundColor: 'lawngreen', width: 430, height: 130, borderWidth: 2,
                     margin: 40, padding: 10,
                  }}
      >            
        <Text style={{color: "red", fontsize: 20, fontWeight: 'bold', textAlign: 'center', 
                    }}
        >
          Version 1: {'\n\n'}
          Uses a handle function for each element in the dataArray{'\n'} 
          and there is a hard-code button for each element. 
          {'\n\n'}
          SD = {stepsDone}
        </Text>
      </View>

    </SafeAreaView>
  );
};

   /************/
   /*  myDocs  */
   /************/

   const myDoc1 = "\n  o This is version1 of 'AppRenderArrayWithMap.tsx'.  It loops through the elements of the array dataArray displaying info on one\n     element at a time.\n";

   const myDoc2 = "\n  o dataArray hold all the data used in this App. The main View starts by displaying in first row the title and a 'Show/Hide Doc' button.\n     The command dataArray.map then proceeds to display an element, dataElem, from dataArray such that stepsDone==dataElem[0].\n     Thus, a single command dataArray.map was used to print the data for each element in the array as we looped through elements. \n";
   const myDoc3 = "\n  o But for the buttons and updating the state variable 'stepsDone' we have N separate code-segment (N being the number of elements\n     in array dataArray)  which also calls N separate component of array 'nextStep'. These components are the callback functions used\n     by the 'onPress' props. \n";
   const myDoc4 = "\n  o Objective is to replace the components of the  'nextStep' array by a single function, so that in the N code-segments we change, e.g.\n    'nextStep[3]' to 'nextStep(3)' !  The second objective it to replace the N code-segments by a SINGLE array.map command ! \n\n";

  /************/
  /*  Styles  */
  /************/

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dataText: {
    textAlign: 'center',  // to center the text horizontally
    color: 'red',
    width: 550,
    fontSize: 30, 
    fontWeight: 'bold'
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
    width: 990,
    fontSize: 16,
    marginLeft: 12,
    marginBottom: 22,
  },
});

export default App;

