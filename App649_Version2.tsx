import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

  /***************/
  /*             */
  /*  Version 2  */
  /*             */
  /***************/

var anewArray = [] ;

const App = () => {

  const myNumbers = [ [19,25,26,32,38,42] ]

  const oneToTen  = [ [22,24,38,41,47,49,21],          // 2020-12-02
                      [ 3,10,13,21,27,45,23],          // 2020-12-05
                      [10,11,14,19,27,39,40],          // 2020-12-09
                      [27,28,29,36,46,48,49],          // 2020-12-12
                      [10,12,20,25,31,34,42],          // 2020-12-16
                      [ 1, 8,10,11,17,35,41],          // 2020-12-19
                      [ 7,15,24,31,33,34, 3],          // 2020-12-23
                      [21,26,28,33,34,42,43],          // 2020-12-26
                      [ 7,14,30,32,38,45, 6],          // 2020-12-30
                      [16,17,20,42,47,49,40],          // 2021-01-02
                    ]

  let initValue = 0;
  let initResults = Array.from({length: oneToTen.length}, () => initValue);
  // let initResults = Array.from({length: oneToTen.length}, (_,index) => index);

  const [results,       setResults      ] = useState(initResults);
  const [L1,            setL1           ] = useState(0);

  /******************************/
  /* define the useState hooks: */
  /******************************/

  const [stepsDone,     setStepsDone    ] = useState(0);
  const [isToggleOn,    setIsToggleOn   ] = useState(false);

  /*********************************************************/
  /*    Handle functions in (onClick and onPress) buttons  */
  /*********************************************************/

  // button = Show/Hide Doc
  const showHideDoc = () => {
    setIsToggleOn(!isToggleOn)
  }

  // button: Restart
  let restartNewCase = () => {
    setStepsDone(0);
    anewArray=[]
    setResults(initResults);
  }

  // buttons: `Go to Next step #${index+1}`
  //          `Finished`
  let nextStep: any = (step: number) => {
    setStepsDone(step)
  }  
        /* Example of if/else inside another if/else:
           if (index == 0 ) {
             return ('[' + elem + ',' )
           } else { if (index ==  (wrk.length-1))  {
                    return (elem + ']' )
                  } else {
                    return (elem + ',' )
                  }
           } 
        */   
           
  /***************/
  /*  Functions  */
  /***************/

  let dispArr = (arrToDisp) => { 
   return (arrToDisp.map ((elem, index, wrk) => {
        return (
          (wrk.length == 0 ) ? `[]`
            : (wrk.length == 1 ) ? `[${elem}]`
              : (index == 0 ) ? `[ ${elem},`
                              :  (index ==  (wrk.length-1)) 
                                   ? `${elem}]`
                                   : `${elem},`
               
            )}       
          ))
  }

  let sharedLength = (arrToDisp, myArr) => {
    const filteredArray12 = arrToDisp.filter(value => myArr.includes(value));
    const lenArray12 = filteredArray12.length;
    return lenArray12
  }

  let sharedElems = (arrToDisp, myArr) => {
    const filteredArray12 = arrToDisp.filter(value => myArr.includes(value));
    const lenArray12 = filteredArray12.length;
    return filteredArray12
  }

  useEffect(() => {
    console.log('useEffect: stepsDone, L1:');
    console.log( stepsDone, L1  );
    setL1(workL1) ;
    updateResults();
  }, [stepsDone, L1, workL1  ]);

  let updateResults = () => {
    //  Here firstArray, newNum, lastArray and newArray are LOCAL variables
    let firstArray = results.slice(0,stepsDone);
    let newNum = stepsDone+1
    let lastArray  = results.slice(newNum);
    let newArray = [ ...firstArray,L1,...lastArray ];
    console.log("newArray:");
    console.log( newArray  );
    setResults(newArray);
  }

  let processElements = (index) => {
    // firstArray, lastArray, ... are defined as GLOBALS before 'Render' section.
    // workArr was passed to map arg 3 so substituting oneToTen for workArr
    firstArray = dispArr(myNumbers[0]);
    lastArray  = dispArr(oneToTen[index]);
    workL1 = sharedLength(oneToTen[index],myNumbers[0]); 
    // sharedElemsArray = (workL1 == 0) ? `[]`
    //                                 : `dispArr(sharedElems(oneToTen[index],myNumbers[0]))` 

    sharedElemsArray = dispArr(sharedElems(oneToTen[index],myNumbers[0]));

    /*****************************************************************************/
    /*        array.splice(index[, deleteCount, element1, ..., elementN])        */
    /*****************************************************************************/

    /*    Index here is the starting point for removing elements in the array    */
    /*    deleteCount is the number of elements to be deleted from that index    */
    /*    element1, …, elementN is the element(s) to be added                    */
    /* This method changes an array, by adding, removing and inserting elements. */

    /*   saving results with latest to the LEFT                                  */ 
    /* (anewArray.length <=  stepsDone) ? anewArray.splice(0,0,workL1) : null    */
    /*   saving results with latest to the RIGHT                                 */ 

    (anewArray.length <=  stepsDone) ? anewArray.splice(anewArray.length,0,workL1) 
                                     : null  
    dispNewArray = dispArr(anewArray); 
    aNewArrayLength = anewArray.length; 

    dispResults  = dispArr(results); 
    console.log("workL1 = " + workL1);
  }

  /************/
  /*  Render  */
  /************/

  // Here workL1, firstArray, lastArray, ...  are GLOBAL variables
  var workL1, firstArray, lastArray, sharedElemsArray, dispNewArray, 
      aNewArrayLength, dispResults ;
  var myFirstArray, myLastArray, myNewArray, myLen;

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>

        { oneToTen.map((dataElem, index, workArr) =>
          ( (stepsDone == index ) &&
            <View style={{ borderWidth: 2, backgroundColor: 'lawngreen', marginLeft: 20, 
                           width: 660, position: 'absolute', top: 60,
                        }} >
              <Text>
                {'\n\t'} Version 2 {'\n\n  '}

                {/* invoke 'processElements' to get the GLOBAL variables */}
                { processElements(index) }
                {'\n\t'}Doing #{stepsDone}: {'  '}
                { firstArray } {' and '} { lastArray  }
                {' share '}
                  <Text style={styles.Red}> {workL1} </Text>
                {' elems: '}

                {/*   sharedElemsArray */} 
                {/*   keep this as in Version 1 */}
                { (workL1 == 0) ? `[]`
                                : `${ sharedElemsArray }` }
                {'.\n'}
                {'\n\t'} shared elements:
                  <Text style={styles.Red}> {workL1} </Text>
                {'\n\n\tnewArray manipulations:\n\t\t'}
                {/*   saving results with latest to the RIGHT  */} 
                { dispNewArray } 

                { (stepsDone == 0) ? '\n\t\t[' : '\n\t\t[ '}
                { anewArray.slice(0,anewArray.length-1).map((x,index) => x+',') }
                <Text style={styles.Red}>{workL1}</Text>
                {']'}
                {'\n'}

                {'\tnewArrayLen='}
                <Text style={styles.Red}>{ aNewArrayLength } </Text>
                {' stepsDone='} 
                <Text style={styles.Red}>{ stepsDone } </Text>

                {'\n\n\n\t'} results: { dispResults }
                {'\n\t\t      [ '}
                { results.slice(0,stepsDone).map((x,index) => x+',') }
                <Text style={styles.Red}>{workL1}</Text>
                { myLastArray  = results.slice(stepsDone+1), 
                  myNewArray = [ ...myLastArray ],
                  myLen = myNewArray.length,    
                  myNewArray.map((x,index) => (index == myLen-1) ? (',') : null) }

                {/* Notes on using statements inside curly brackets: */}
                {/*     Only last one will be printed !              */}
                {/*     Last command should not end with a ,         */}
                {/*     Cannot have a blank line at end              */}

                { myFirstArray = results.slice(0,stepsDone), 
                  myLastArray  = results.slice(stepsDone+1), 
                  myNewArray = [ ...myLastArray ],
                  myLen = myNewArray.length,    
                  myNewArray.map((x,index) => (index < myLen-1) ? (x+',') : x)
                } 

                {']\n'}{'\n'}

                { '\n\t'}Step #{stepsDone}: {' was done comparing '} 
                { firstArray } {' and '} { lastArray } {' arrays !'} 

              </Text>

              <TouchableOpacity onPress={() => nextStep(stepsDone + 1 )  }>
                <View style={[styles.myButton, { marginLeft: 36, width: 132 
                            }]} >
                  <Text style={[styles.buttonText, {color: "blue", marginLeft: 2, }]}>
                    { ( anewArray.length < oneToTen.length )  
                      ? `Go to Next step #${index+1}`
                      : `Finished`
                    }  
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))
        }


        { stepsDone == oneToTen.length  &&
          <View>
            <Text>
              {'\n\n\n\n\n\n\n\t'}All elements done !
            </Text>

            <TouchableOpacity onPress={() =>  restartNewCase()}>
              <View style={[styles.myButton, { marginLeft: 36, width: 220, height: 120,  }]} >
                <Text>
                  {/*  anewArray.splice(0,0,L1) */} {'\n'}
                  { (anewArray.length <  stepsDone) ? anewArray.splice(0,0,L1) : null }
                  {'\t'} { dispArr(anewArray)  } {'\n\n'}
                </Text>
                <Text style={[styles.buttonText, {color: "blue", marginLeft: 2, 
                                                  fontSize: 20, fontWeight: 'bold',
                            }]}>
                  Restart
                </Text>
              </View>
            </TouchableOpacity>

          </View>  
        }

        {/* */}
        <button style={{ margin: 10, width: 120, padding: 10, backgroundColor: "cyan",
                      }}
                onClick={showHideDoc}>
          Show/Hide Doc
        </button>
        {/* */}

      </View>  

      
    { isToggleOn &&
      <View style={{top: 20, backgroundColor: "lawngreen", width: 788, height: 600,
                             padding: 10, borderRadius: 12, marginBottom: 10,
                             borderColor: "blue", borderWidth: 2, left: 10,
                  }} >
        <Text style={{color: "red", fontsize: 20, fontWeight: 'bold'}}>
          App Documentation - Version 2:
        </Text>
        <Text> {myDoc1} </Text>
        <Text style={{color: "red", fontsize: 20, fontWeight: 'bold'}}>
          Method A: (Global array)
        </Text>
        <Text> {myDoc2} </Text>
        <Text style={{color: "red", fontsize: 20, fontWeight: 'bold'}}>
          Method B: (useState method)
        </Text>
        <Text> {myDoc3} </Text>
        <Text style={{color: "red", fontsize: 20, fontWeight: 'bold'}}>
          In Summary
        </Text>
        <Text> {myDoc4} </Text>
      </View>
    }

    </View>
  )
}  

export default App;

  /**************/
  /* StyleSheet */
  /**************/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
   button: {
   backgroundColor: '#444',
   padding: 10,
   marginTop: 10,
   borderWidth: 2,
   borderColor: "blue",
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',  // to center the text horizontally
  },
  myButton: {
    margin: 20,
    width: 260,
    padding: 0,
    backgroundColor: "cyan",
    borderWidth: 2,
  },
  Red: {
    color: 'red', 
    fontWeight: 'bold',
  },
});

  /***************/
  /*  Documents  */
  /***************/

let myDoc1 = "\n In this App we start by defining a single element (SOURCE) and an array of the elements (TARGET). The elements\n themselves consist of an array of 6 or 7 integers. The single element (SOURCE) is compared to each element in the\n array of elements (TARGET), and the number of integers in common is recorded (as shared elemnts) using two\n different methods:\n\n";

let myDoc2= "\n Here the global array, anewArray, is initialized as:  anewArray=[], and as the App loops through the elements of the TARGET the number of 'shared elements' is pushed (added to the end o f the 'anewArray' array) using the 'splice' method. You can see the the 'shared elements' number being pushed to the array and its current length under the heading 'newArray manipulations:'.  \n\n";

let myDoc3= "\n A state array variable, 'results' is initialized with the function, 'setResults',  defined by useState command. The initial values are all 0 (zero) and the length of 'results' is set to the length of the TARGET array. As the App loops through the elements of the TARGET the corresponding entry is updated with the number of 'shared elements' by invoking the 'updateResults' function from 'useEffect'.  You can see the the 'shared elements' number being updated (replacing the original 0 (zero) values)  appearing on second line under the heading 'newArray manipulations:'.\n\n";

let myDoc4= "\n In Version 1 all the calculations are invoked from the rendered section and results displayed immediately, while Version 2 invokes just one function i.e. { processElements(index) } and stores the results in GLOBAL variables defined outside the rendered section which are then used inside the render. There is not much difference between the two version apart from the fact that Version 1 might be easier to understand since it avoids the extra step of storing results into GLOBAL variables.\n\n";        


