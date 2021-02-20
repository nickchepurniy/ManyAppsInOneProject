import React, {useState, useEffect} from "react";
import { SafeAreaView, View, StyleSheet, Text, } from "react-native";

import { TextInput } from 'react-native-paper';
// https://callstack.github.io/react-native-paper/text-input.html
// Did: yarn add react-native-paper

const InputCoefficients = (props) => {

  /******************************/
  /*  Function state variables  */
  /******************************/

  let   [valueA,        onChangeTextA    ] = useState('');
  let   [valueB,        onChangeTextB    ] = useState('');
  let   [valueC,        onChangeTextC    ] = useState('');
  const [isValueAZero,  setIsValueAZero  ] = useState(false);

  /******************************************************/
  /*  Handle functions in (onClick and onPress) buttons */
  /******************************************************/

  // button = Click to return to Parent the TextInput data read by Child (valueB and valueC).
  function  onChildClick () {
    // Place All results into an array
    props.mutateABCValues( [ 1, valueA, valueB, valueC, x1, x2, newCmplx, x0, U, isValueAZero ] );
    onChangeTextA('');
    onChangeTextB('');
    onChangeTextC('');
    setIsValueAZero(false);
  }

  useEffect(() => {
    console.log('Msg from useEffect InputCoefficients ', valueB, valueC);
    console.log('"'+valueB+'"'+", "+'"'+valueC+'"')
    if (valueA == '')
      { valueA = "0";
        setIsValueAZero(true);
      } else {
        setIsValueAZero(false);
      }

  }, [valueA, valueB, valueC, x1, x2, newCmplx ]);


  let x0, U, x1, x2, newCmplx;

  /***************/
  /*  Functions  */
  /***************/

  let calc_x0_U = () => {

    /****
    if (valueA == '')
      { valueA = "0";
        setIsValueAZero(true);
      } else {
        setIsValueAZero(false);
      }
    ****/

    if (valueB == '')
      { valueB = "0" }
        
    if (valueC == '')
      { valueC = "0" }
        
        
    x0 = -valueB/(2*valueA);
    if (valueB*valueB >= 4.0*valueA*valueC) {
      U  = Math.sqrt(valueB*valueB - 4.0*valueA*valueC);
      newCmplx = false;
      x1 = x0 - U/(2*valueA);
      x2 = x0 + U/(2*valueA);
    } else {
      U  = Math.sqrt(4.0*valueA*valueC - valueB*valueB) / (2*valueA);
      newCmplx = true;
    }  
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      { (props.stepsDone == 0)  && (props.valueB == ""  && props.valueC == "" ) &&
        <View style={[styles.container, 
                      {position: 'absolute', top: 20, left: -60, 
                       backgroundColor: "lawngreen", width: 480,
                       borderWidth: 0, marginLeft: -60,}]}>
  
          {/* Read coefficients A, B, C of quadratic:  Ax^2 + B*x + C = 0  */}
          
          <View style={{ flexDirection: "row", position: 'absolute', 
                         top: -10, 
                      }} >
            <TextInput style={{ paddingLeft: 2, height: 90, borderColor: 'blue',
                                borderWidth: 2, margin: 10,
                             }}
                       keyboardType={'numeric'}
                       onChangeText={text => onChangeTextA(text)}
                       value={valueA}
                       label="Enter coefficient A"
            />
      
            <TextInput style={{ paddingLeft: 2, height: 90, borderColor: 'blue',
                                borderWidth: 2, margin: 10,
                             }}
                       keyboardType={'numeric'}
                       onChangeText={text => onChangeTextB(text)}
                       value={valueB}
                       label="Enter coefficient B"
            />
      
            <TextInput style={{ paddingLeft: 2, height: 90, borderColor: 'blue',
                                borderWidth: 2, margin: 10,
                             }}
                       keyboardType={'numeric'}
                       onChangeText={text => onChangeTextC(text) }
                       value={valueC}
                       label="Enter coefficient C"
            />
    
            {calc_x0_U()}
    
            <button style={{margin: 10, width: 220, padding: 10, backgroundColor: "cyan"}}
                    onClick={onChildClick}>
              Click to return to Parent the TextInput data read by Child (valueA, valueB and valueC).
            </button>
    
          </View>
    
        </View> 
      }
    </SafeAreaView>
  );
}

  /************/
  /*  Styles  */
  /************/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 400,
  },
});

export default InputCoefficients;
                                                                        
