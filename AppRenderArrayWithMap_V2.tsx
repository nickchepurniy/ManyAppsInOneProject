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
                      [ 0, "России",      "Москва",   "столица "                   ],
                      [ 1, "España",      "Madrid",   "es la capital de "          ],
                      [ 2, "Chile",       "Santiago", "es la capital de "          ],
                      [ 3, "Canada",      "Ottawa",   "is the capital of "         ],
                      [ 4, "France",      "Paris",    "est la capitale de "        ],
                      [ 5, "Italia",      "Roma",     "è la capitale d'"           ],
                      [ 6, "Deutschland", "Berlin",   "ist die Hauptstadt von "    ],
                      [ 7, "Brazil",      "Brasilia", "é a capital do "            ],
                    ];

  const sizeOfDataArray = dataArray.length;                  

  /* To use the map() function, attach it to an array you want to iterate over, e.g. dataArray.
     The map() function expects a callback as the argument and executes it once for each 
     element in the array. 

     Array.prototype.map passes 3 arguments: the element, the index, the array
  */

  /*********************************************************/
  /*    Handle functions in (onClick and onPress) buttons  */
  /*********************************************************/

  // button = {stepsDone == dataElem[0] ? `Go to step #${stepsDone+1}` : `Error${stepsDone}`}
  let nextStep: any = () => {
    setStepsDone(stepsDone+1)
  }

  // button = { stepsDone ==  1 + sizeOfDataArray && ... }
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
          {/* Title */}
          <Text style={{marginTop: 2, color: "blue", fontSize: 32, }}>
                {'\n\n'} Countries and Their Capitals - Vers 2 
          </Text>

          {/* button */}
          <button style={{ marginLeft: 10, marginTop: 84, width: 120, padding: 1, height: 30,
                           backgroundColor: "orange",
                        }}
                  onClick={handleToggleDoc}>
            Show/Hide Doc
          </button>
        </View>


        {/*  Use map to display reults for an element in dataArray - one at a time  */}
        { dataArray.map((dataElem) => 
          ( (stepsDone == dataElem[0] ) &&
            <Text style={styles.dataText}>
              {dataElem[2]} {dataElem[3]}{dataElem[1]}
            </Text>
          ))
        }

        {/*  Use map to increment the 'stepsDone' state variable thru callback of onPress  */}
        { dataArray.map((dataElem) =>
          ( (stepsDone == dataElem[0] ) &&
            <TouchableOpacity onPress={() => nextStep(stepsDone)  }>
              <View style={[styles.myButton, { marginLeft: 36, width: 250 }]} >
                <Text style={[styles.buttonText, {color: "blue", marginLeft: 2, }]}>
                  {stepsDone == dataElem[0] ? `Go to step #${stepsDone+1}` : `Error${stepsDone+1}`}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        }  

         {/*  print End of File msg  */}
        { stepsDone ==  sizeOfDataArray &&
            <TouchableOpacity onPress={() => nextStep(stepsDone)  }>
              <View>  
                <Text style={[styles.dataText,{textAlign: 'center',color: "lawngreen"}]}>
                  {'<...>\n'}You have reached the end of the array !
                </Text>
              </View>
              <View style={[styles.myButton, { marginLeft: 36, width: 250 }]} >
                <Text style={[styles.buttonText, {color: "blue", marginLeft: 2, }]}>
                  We are done - Click me to restart
                </Text>
              </View>  
            </TouchableOpacity>
          
        }

         {/*  Restart  */}
        { stepsDone ==  1 + sizeOfDataArray &&
          <View>
            <Text>{restartNewCase()}</Text>
          </View>
        }

        { showHideDoc &&
          <View><Text style={[styles.docDesc, {color: "blue"}]}>
            <Text style={{color: "red", fontSize: 20, fontWeight: 'bold'}}>
              {'\t'} App Documentation  -  Version 2 ! {'\n'}
            </Text>
            {myDoc1}
            {myDoc2}
            {myDoc4}
          </Text></View>
        }

      </View>

      <View style={{ backgroundColor: 'lawngreen', width: 430, height: 180, borderWidth: 2,
                     margin: 40, padding: 10,
                  }}
      >
        <Text style={{color: "red", fontsize: 20, fontWeight: 'bold', textAlign: 'center',
                    }}
        >
          Version 2: {'\n\n'}
          Uses a SINGLE handle function for ALL the elements in {'\n'}
          the dataArray and by using the map method on the{'\n'} 
          dataArray only one button is required{'\n'} 
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

   const myDoc1 = "\n  o In this version the App loops through the elements of the array dataArray displaying info on one element at a time. Any number\n     of new elements can be added, modified or delete in the 'dataArray' array and there is no need to further modify the code.\n";
   const myDoc2 = "\n  o dataArray holds all the data used in this App. The main View starts by displaying in first row the title and a 'Show/Hide Doc' button.\n     The command dataArray.map then proceeds to display an element, dataElem, from dataArray such that stepsDone==dataElem[0].\n     Thus, a single command dataArray.map was used to print the data for each element in the array as we looped through the elements. \n";
   const myDoc4 = "\n  o The components of the  'nextStep' array were replaced  by a single function, so now 'nextStep(3)' is used!  An array.map command\n      is also used to increment the state variable 'stepsDone' !  An extra step was added at the end to indicate that the  user has reached \n      the end of the array. \n\n";

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

