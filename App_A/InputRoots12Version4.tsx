import React, {useState, useEffect} from "react";
import { SafeAreaView, View, StyleSheet, Text, } from "react-native";

import { TextInput } from 'react-native-paper';
// https://callstack.github.io/react-native-paper/text-input.html
// Did: yarn add react-native-paper

const InputRoots12 = (props) => {

  /******************************/
  /*  Function state variables  */
  /******************************/

  // z = x + iy
  let   [valueR1x,         onChangeTextR1x     ] = useState('');
  let   [valueR1y,         onChangeTextR1y     ] = useState('');
  let   [valueR2x,         onChangeTextR2x     ] = useState('');
  let   [valueR2y,         onChangeTextR2y     ] = useState('');
  let   [valueA,           onChangeTextA       ] = useState('');
  const [valueB,           setValueB           ] = useState('');
  const [valueC,           setValueC           ] = useState('');
  const [valueHH,          setValueHH          ] = useState('');
  const [valueKK,          setValueKK          ] = useState('');
  const [rootsType,        setRootsType        ] = useState('');
  const [switchOneComplex, setSwitchOneComplex ] = useState(0) ;
  const [valueYaxis,       setValueYaxis       ] = useState('');
  const [isR12ValueAZero,  setIsR12ValueAZero  ] = useState(false);

  /******************************************************/
  /*  Handle functions in (onClick and onPress) buttons */
  /******************************************************/

  // button = Click to return to Parent the TextInput data read by Child (valueB and valueC).
  function  onChildClick () {
    //  Place variables for Parent to access thru callback
    props.mutateR12Values( [ 1, valueR1x, valueR1y, valueR2x, valueR2y, valueA, valueB, valueC, rootsType, switchOneComplex, isR12ValueAZero, valueHH, valueKK, valueYaxis ] );
    onChangeTextR1x('');
    onChangeTextR1y('');
    onChangeTextR2x('');
    onChangeTextR2y('');
    onChangeTextA('');
    setValueB('');
    setValueC('');
    setRootsType('');
    setSwitchOneComplex(0);
    setIsR12ValueAZero(false);
    setValueHH('');
    setValueKK('');
    setValueYaxis('');
  }

  useEffect(() => {
    console.log('useEffect InputRoots12  valueR1x, valueR1y, valueR2x, valueR2y:');
    console.log("'",valueR1x, valueR1y, valueR2x, valueR2y,"'" );

    if (valueA == '')
      { valueA = "0";
        setIsR12ValueAZero(true);
      } else {
        setIsR12ValueAZero(false);
      }

    if (valueR2x == '')
      { valueR2x = "0" }

    if (valueR1x == '')
      { valueR1x = "0" }

    if (valueR2y == '')
      { valueR2y = "0" }

    if (valueR1y == '')
      { valueR1y = "0" }

    let workR1x;
    let workR2x;

    let workR1y;
    let workR2y;

    if (valueR1x == '') {
      workR1x="0";
    } else {
      workR1x=parseFloat(valueR1x);
    }

    if (valueR2x == '') {
      workR2x="0";
    } else {
      workR2x=parseFloat(valueR2x);
    }

    if (valueR1y == '') {
      workR1y="0";
    } else {
      workR1y=parseFloat(valueR1y);
    }

    if (valueR2y == '') {
      workR2y="0";
    } else {
      workR2y=parseFloat(valueR2y);
    }

    if ( (workR1y == "0")  &&  (workR2y == "0" ) ) {
      // Real Roots e.g. 1 0 2 0  B=-3,  C=2
      setRootsType("Real Roots"); 
      setSwitchOneComplex(1) ;
      console.log(rootsType);
      console.log("=====  valueA, workR1x, workR2xy: =====");
      console.log(parseFloat(valueA));
      console.log(parseFloat(workR1x));
      console.log(parseFloat(workR2x));

      setValueB((-parseFloat(valueA)*(parseFloat(workR1x) + parseFloat(workR2x))).toPrecision(3));
      setValueC((valueA*parseFloat(workR1x)*parseFloat(workR2x)).toPrecision(3) );
      setValueHH(-valueB/(2*valueA));
      //  because  HH, KK, etc are initialized and reset to string '' by useState  
      //  we cannot use + (it concatanates) but even if h2,h1,h0 are integers the + sign
      //  still will concatanate - so must replace h2 by parseFloat(h2) and 
      //  replace h1 by parseFloat(h1) in order that = adds them !
      let h2  = valueA*(-valueB/(2*valueA))*(-valueB/(2*valueA)); 
      let h1  = valueB*(-valueB/(2*valueA));
      let h0  = valueC
      setValueKK(parseFloat(h2)+parseFloat(h1)+parseFloat(h0) );

      let rr1, rr2;
      if (workR1x < workR2x) {
        rr1 = workR1x;
        rr2 = workR2x;
      } else {
        rr1 = workR2x;
        rr2 = workR1x;
      }


      let yAxis;
      if ( rr1 != rr2 ) {
        yAxis = 3 + 12*parseFloat(rr1)/(parseFloat(rr1) - parseFloat(rr2)) ;
        // yAxis = 12*parseFloat(rr1); =  -72
        // yAxis = parseFloat(rr1) - parseFloat(rr2); = -2  ~ (-6) - (-4) OK
      } else {
        yAxis = 0;
      }
      
      setValueYaxis(yAxis);  

      console.log("valueA, valueB, valueC");
      console.log("'", valueA,"',"," '" , valueB,"', ","'", valueC,"'" );
      console.log("workR1x, workR2x");
      console.log( workR1x," ", workR2x );
      console.log( parseFloat(workR1x),", ", parseFloat(workR2x) );

    } else { if ( (workR1y == 0)  ||  (workR2y == 0 ) )  {
               // Only One Complex Root e.g. 1 0 2 3  B=NaN,  C=NaN
               // rootsType="One Complex";
               setRootsType("One Complex"); 
               setSwitchOneComplex(2) ;
               setValueB(NaN);
               setValueC(NaN);
             } else { if ( (workR1x == workR2x)  &&  
                           ( parseFloat(workR1y) + parseFloat(workR2y) == 0 ) )  {
                        // Complex Conjugate roots e.g.   1 1 1 -1  B=-2,  C=2
                        // rootsType="Two Complex Conjugate";
                        setRootsType("Two Complex Conjugate"); 
                        console.log(rootsType);
                        setSwitchOneComplex(1) ;
                        // setValueB(-2*workR1x);
                        // setValueC(workR1y*workR1y + workR2y*workR2y );
                        // alert("=====  valueA, workR1x, workR2x: =====");
                        console.log("=====  valueA, workR1x, workR2x, workR1y, workR2y: =====");
                        console.log(parseFloat(valueA));
                        console.log(parseFloat(workR1x));
                        console.log(parseFloat(workR2x));
                        console.log(parseFloat(workR1y));
                        console.log(parseFloat(workR2y));
                        setValueB((-2*parseFloat(valueA)*parseFloat(workR1x)).toPrecision(3));
                        setValueC(( parseFloat(workR1x)*parseFloat(workR1x)*parseFloat(valueA) + 
                                    parseFloat(workR2y)*parseFloat(workR2y)*parseFloat(valueA) 
                                  ).toPrecision(3) );
                        console.log("=====  valueA, valueB, valueC  =====");
                        console.log(valueA);
                        console.log(valueB);
                        console.log(valueC);
                        console.log("=======================================================");
                      } else {
                        // Two Complex Roots but NOT Complex Conjugates e.g. 1 1 1 1 B=NaN, C=NaN
                        // rootsType="Two Complex Non-Conjugate";
                        setRootsType("Two Complex Non-Conjugate");
                        setSwitchOneComplex(3) ;
                        setValueB(NaN);
                        setValueC(NaN);
                      }
             }
    }  
  }, [valueR1x, valueR1y, valueR2x, valueR2y, valueA, valueB, valueC, rootsType, switchOneComplex ]);

  /***************/
  /*  Functions  */
  /***************/

  /************************************************************

   B and C values when roots are Complex Conjugates:

   We start with
        (x-x1-i*y1)*(x-x2-i*y2) = 0
   Must have x2=x1 and y2=-y1 in R1R2 form:
        (x-x1-i*y1)*(x-x1+i*y1) = 0
         x^2          -x*x1 +x*i*y1               line1
          -x1*x       +x1*x1 - x1*i*y1            line2
             -i*y1*x +i*y1*x1 - i^2*y1^2  = 0     line3
   Cancelling +x*i*y1 in line1 with -i*y1*x in line3,
   cancelling -x1*i*y1 in line2 with +i*y1*x1 in line3 
   and using i^2=-1 get
         x^2          -x*x1                       line1
          -x1*x       +x1*x1                      line2
                              +y1^2  = 0          line3
   which when written as polynomial in x becomes
         x^2 + x*(-x1-x1) + (x1^2+y1^2) = 0 
   or in terms of B and C
         x^2 + B*x        + C  = 0
   Therefore get coefficients B and C as:      
          B = -2*x1  and C = (x1^2+y1^2)
  ************************************************************/

  let calc_BC = () => {


    if ( (valueR1y == "0")  &&  (valueR2y == "0" ) ) {
      // Real Roots e.g. 1 0 2 0  B=-3,  C=2
      // rootsType="Real Roots"; 
      setRootsType("Real Roots"); 
      setSwitchOneComplex(1) ;

      setValueB(-parseInt(valueA)*(parseInt(valueR1x) + parseInt(valueR2x)));
      setValueC(valueA*parseInt(valueR1x)*parseInt(valueR2x) );

      return true

    } else {

      // Must have x2=x1 and y2=-y1 in R1R2 form: 
      if (! ( (valueR2x == valueR1x) && (valueR2y == -valueR1y)) ) {
         // alert("Must have x2=x1 and y2=-y1 in R1R2 form:")
         console.log("valueR2x, valueR1x, valueR2y,valueR1y");
         console.log( valueR2x, valueR1x, valueR2y,valueR1y );
         return false
      } else {
        return true
      }
    }  
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      { (props.stepsDone == 0)  &&
        <View style={[styles.container, 
                      {position: 'absolute', top: 20, left: -60, 
                       backgroundColor: "lawngreen", width: 900,
                       borderWidth: 0, marginLeft: -360,}]}>
  
          {/* Read roors R1x, R1y, R2x, R2y of quadratic:   (x-R1)*(x-R2) = 0  */}
          
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
                                borderWidth: 2, margin:  5, width: 160, 
                             }}
                       keyboardType={'numeric'}
                       onChangeText={text => onChangeTextR1x(text)}
                       value={valueR1x}
                       label="Enter root R1x"
            />
      
            <TextInput style={{ paddingLeft: 2, height: 90, borderColor: 'blue',
                                borderWidth: 2, margin:  5, width: 160, 
                             }}
                       keyboardType={'numeric'}
                       onChangeText={text => onChangeTextR1y(text) }
                       value={valueR1y}
                       label="Enter root R1y"
            />
    
            <TextInput style={{ paddingLeft: 2, height: 90, borderColor: 'blue',
                                borderWidth: 2, margin:  5, width: 160, 
                             }}
                       keyboardType={'numeric'}
                       onChangeText={text => onChangeTextR2x(text)}
                       value={valueR2x}
                       label="Enter root R2x"
            />
      
            <TextInput style={{ paddingLeft: 2, height: 90, borderColor: 'blue',
                                borderWidth: 2, margin:  5, width: 180, 
                             }}
                       onChangeText={text => onChangeTextR2y(text) }
                       value={valueR2y}
                       label="Enter root R2y"
            />
    
            {/*  call calc_BC()  */}
            {calc_BC()}
    
            <button style={{margin: 10, width: 220, padding: 10, backgroundColor: "cyan"}}
                    onClick={onChildClick}>
              Click to return to Parent the TextInput data read by Child (valueA and R1, R2).
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

export default InputRoots12;
                                                                        
