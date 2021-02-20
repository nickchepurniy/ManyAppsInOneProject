
/******************************/
/*  import React in our code  */
/******************************/

import React, {useState, useEffect} from 'react';
import InputCoefficients from './App_A/InputCoefficientsVersion4';
import InputRoots12      from './App_A/InputRoots12Version4';
import SvgPlot           from './App_A/SVG_PLOTVersion4';

/***************************************************/
/*  import all the components we are going to use  */
/***************************************************/

import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';

const App = () => {

  let typeOfRoots;

  const pFP = (num) => {
    return parseFloat(num).toPrecision(4)
  }

  /********************************/
  /*  Functional state variables  */
  /********************************/

  const [valueA,            setValueA            ] = useState('');
  const [valueB,            setValueB            ] = useState('');
  const [valueC,            setValueC            ] = useState('');
  const [valueX1,           setValueX1           ] = useState(0);
  const [valueX2,           setValueX2           ] = useState(0);
 
  const [isComplex,         setIsComplex         ] = useState(false);   
  const [valueX0,           setValueX0           ] = useState(-99);
  const [valueU,            setValueU            ] = useState(-99);

  const [stepsDone,         setStepsDone         ] = useState(0);
  const [stepsRender,       setStepsRender       ] = useState(0);

  const [valueR1x,          setValueR1x          ] = useState(''); 
  const [valueR1y,          setValueR1y          ] = useState(''); 
  const [valueR2x,          setValueR2x          ] = useState(''); 
  const [valueR2y,          setValueR2y          ] = useState(''); 

  const [valueHH,           setValueHH           ] = useState('');
  const [valueKK,           setValueKK           ] = useState('');
  const [valueYaxis,        setValueYaxis        ] = useState('');

  const [showHideDoc,       setShowHideDoc       ] = useState(!true);
  const [showHideLegend,    setShowHideLegend    ] = useState(!true);
  const [showHideR12Legend, setShowHideR12Legend ] = useState(!true);
  const [rootsAreReal,      setRootsAreReal      ] = useState(true);
  const [rootsType,         setRootsType         ] = useState('');     
  const [switchOneComplex,  setSwitchOneComplex  ] = useState(0) ;

  const [isValueAZero,      setIsValueAZero      ] = useState(false);
  const [isR12ValueAZero,   setIsR12ValueAZero   ] = useState(false);

  const [valueSx1,          setValueSx1          ] = useState('');
  const [valueSx4,          setValueSx4          ] = useState('');
  const [valueS1Width,      setValueS1Width      ] = useState('');
  const [valueS4Width,      setValueS4Width      ] = useState('');


  const renderingApp = ['CoeffABC', 'Roots12'];

  /*******************************************************/
  /*  Handle functions in (onClick and onPress) buttons  */
  /*******************************************************/

  // button = {stepsDone == 0 ? `Display Results` : `Do Next Case` }
  let restartNewCase = () => {
    setStepsDone(0);
    // for enterCoeffABC
    setValueA('');
    setValueB('');
    setValueC('');
    // for enterRoots12
    setValueR1x('');
    setValueR1y('');
    setValueR2x('');
    setValueR2y('');
    console.log("*** App_Quad: restartNewCase with stepsDone:");
    console.log( stepsDone );
  }

  // button = Show/Hide Doc
  let handleToggleDoc = ()  => {
    setShowHideDoc(!showHideDoc);
  }

  // button =  returnToMainMenu 
  let handleReturnToMainMenu = ()  => {
    setStepsRender(0);
  }

  /************************/
  /*  useEffect Function  */
  /************************/

  useEffect(() => {
    if (valueA == '') setValueA("0");
    if (valueR1x == '') setValueR1x("0");
    if (valueR1y == '') setValueR1y("0");
    if (valueR2x == '') setValueR2x("0");
    if (valueR2y == '') setValueR2y("0");

    console.log('useEffect App: stepsDone and rootsAreReal');
    console.log(stepsDone); 
    console.log(rootsAreReal);
    if ( (pFP(valueR1y) == 0)  &&  (pFP(valueR2y) == 0 ) ) {
      console.log("useEffect App: has Imag components of two roots, i.e.  valueR1y and valueR2y");
      console.log(pFP(valueR1y));
      console.log(pFP(valueR2y));
      console.log("useEffect App:   setRootsAreReal(true) !");
      setRootsAreReal(true); 
    } else {
      console.log(" useEffect App:  setRootsAreReal(false) !");
      setRootsAreReal(!true);
    }

  }, [stepsDone, rootsAreReal, valueR1x, valueR2x ]);

  /*****************************************************************/
  /*  Callback Functions in components invoked from App component  */
  /*****************************************************************/

  /* Use callback to get valueA, valueB and valueC from InputCoefficients.tsx in dir App_A */

  //  <InputCoefficients ... > 
  let coeffABCCallbackChild = (arrayFromChild: any) => {
    setStepsDone(arrayFromChild[0]);
    setValueA(arrayFromChild[1]);
    setValueB(arrayFromChild[2]);
    setValueC(arrayFromChild[3]);
    setValueX1(arrayFromChild[4]);
    setValueX2(arrayFromChild[5]);
    setIsComplex(arrayFromChild[6]);
    setValueX0(arrayFromChild[7]);
    setValueU(arrayFromChild[8]);
    setIsValueAZero(arrayFromChild[9]);
  }

  // <InputRoots12 ...>
  let roots12Callback = (arrayFromInputRoots12) => {
    setStepsDone(arrayFromInputRoots12[0]);

    if ( parseFloat(arrayFromInputRoots12[1]) < parseFloat(arrayFromInputRoots12[3]) ) {
      console.log("********************************* NO EXCHANGE - valueR1x, valueR2x");
      console.log("********************************* valueR1x, valueR2x.toFixed(2)");
      console.log(pFP(arrayFromInputRoots12[1]));
      console.log(pFP(arrayFromInputRoots12[3]));
      setValueR1x(arrayFromInputRoots12[1]);
      setValueR2x(arrayFromInputRoots12[3]);
      console.log(arrayFromInputRoots12[1]);
      console.log(arrayFromInputRoots12[3]);
      console.log(valueR1x);
      console.log(valueR2x);
    } else {
      console.log("********************************* DID EXCHANGE  - valueR1x, valueR2x");
      setValueR2x(arrayFromInputRoots12[1]);
      setValueR1x(arrayFromInputRoots12[3]);
      console.log(arrayFromInputRoots12[1]);
      console.log(arrayFromInputRoots12[3]);
      console.log(valueR1x);
      console.log(valueR2x);
    }
    
    setValueR1y(arrayFromInputRoots12[2]);
    setValueR2y(arrayFromInputRoots12[4]);
    setValueA(arrayFromInputRoots12[5]);
    setValueB(arrayFromInputRoots12[6]);
    setValueC(arrayFromInputRoots12[7]);
    setRootsType(arrayFromInputRoots12[8]);
    setSwitchOneComplex(arrayFromInputRoots12[9]);
    setIsR12ValueAZero(arrayFromInputRoots12[10]);
    setValueHH(arrayFromInputRoots12[11]);
    setValueKK(arrayFromInputRoots12[12]);
    setValueYaxis(arrayFromInputRoots12[13]);
  }

  /**********************/
  /*  Render Functions  */
  /**********************/

  let displayErrorMgsWhenCoeffAIsZero= () => {
    return(
      <View style={{ borderWidth: 2, width: 460, position: 'absolute', top: 16, 
                     backgroundColor: stepsDone == 0 ? 'gold' : 'lawngreen',
                  }} >
        <Text>
          {'\n\tParent received from Child: A = '}{valueA}{", "}&nbsp;&nbsp; 
          {'B = '}{valueB}{", "}&nbsp;&nbsp; {"C = "}{valueC} {'\n'}
        </Text> 
      
        <Text style={{ color: "red", fontSize: 20, fontWeight: 'bold'}}>
          {'\n\tCoefficient A must be a non-zero number !'}
        </Text> 
      
        <TouchableOpacity onPress={handleReturnToMainMenu}>
          <View style={[styles.myButton, { marginLeft: 36, width: 170 }]} >
            <Text style={[styles.buttonText, {color: "blue", marginLeft: 2, width: 160,}]}>
              Return to Main Menu
            </Text>
          </View>
        </TouchableOpacity>

      </View>
    )        
  }

  let displayErrorMgsWhenR12AIsZero= () => {
    return(
      <View style={{ borderWidth: 2, width: 460, position: 'absolute', top: 16, 
                     backgroundColor: stepsDone == 0 ? 'gold' : 'lawngreen',
                  }} >
        <Text>
          {'\n\tParent received from Child: A = '}{valueA}{", "}&nbsp;&nbsp; 
          {'B = '}{valueB}{", "}&nbsp;&nbsp; {"C = "}{valueC} {'\n'}
        </Text> 
      
        <Text style={{ color: "red", fontSize: 20, fontWeight: 'bold'}}>
          {'\n\tCoefficient A must be a non-zero number !'}
        </Text> 
      
        <TouchableOpacity onPress={handleReturnToMainMenu}>
          <View style={[styles.myButton, { marginLeft: 36, width: 170 }]} >
            <Text style={[styles.buttonText, {color: "blue", marginLeft: 2, width: 160,}]}>
              Return to Main Menu
            </Text>
          </View>
        </TouchableOpacity>

      </View>
    )        
  }

  let displayErrorMgsWhenRootsAreComplex = () => {
    return(
      <View style={{ borderWidth: 2, width: 510, position: 'absolute', top: 16, 
                     backgroundColor: stepsDone == 0 ? 'gold' : 'lawngreen',
                  }} >
        <Text>
          {'\n\tParent received from Child: A = '}{valueA}{", "}&nbsp;&nbsp; 
          {'B = '}{valueB}{", "}&nbsp;&nbsp; {"C = "}{valueC} {'\n'}
        </Text> 
      
        <Text style={{ color: "red", fontSize: 20, fontWeight: 'bold'}}>
          {'\n\tThis Quadratic has Complex Conjugate Roots:'}
          {'\n\troot1 = '} 
          {(valueX0 == 0) ? `` : `${valueX0.toFixed(2)}`}  {'+'} 
          {(valueU == 1) ? `` : `${valueU.toFixed(2)}`} {'i   and  root2 = '} 
          {(valueX0 == 0) ? `` : `${valueX0.toFixed(2)}`}  {'-'}
          {(valueU == 1) ? `` : `${valueU.toFixed(2)}`} {'i'}
        </Text> 
      
        <TouchableOpacity onPress={handleReturnToMainMenu}>
          <View style={[styles.myButton, { marginLeft: 36, width: 170 }]} >
            <Text style={[styles.buttonText, {color: "blue", marginLeft: 2, width: 160,}]}>
              Return to Main Menu
            </Text>
          </View>
        </TouchableOpacity>

      </View>
    )        
  }

  let printCallBackValuesSetToggle = () => {
    setShowHideLegend(!showHideLegend);
  }

  let printCallBackValues = () => {
    return(
      <View style={{ borderWidth: 2, width: 630, position: 'absolute', top: -495, left: -620, 
                     backgroundColor: stepsDone == 0 ? 'gold' : 'lawngreen',
                  }} >
        <Text style={{ color: "red", fontSize: 20, fontWeight: 'bold'}}>
          {'\n\tLegend for Quadratic Ax^2 +Bx + C'}
        </Text> 
      
        <Text style={{ color: "blue", fontSize: 16, fontWeight: 'bold'}}>
          {'\n  Parent received from Child: A = '}{valueA}{", "}&nbsp;&nbsp; 
          {'B = '}{valueB}{", "}&nbsp;&nbsp; {"C = "}{valueC} {' and REAL roots:\n'}
        </Text> 
      
        <Text style={{ color: "red", fontSize: 20, fontWeight: 'bold'}}>
          {'\n\troot1 = '} {pFP(valueR1x)}, root2 = {pFP(valueR2x)} and Vertex = [{pFP(valueHH)},{pFP(valueKK)}] 
        </Text>  
      
        <Text style={{ color: "blue", fontSize: 16, fontWeight: 'bold'}}>
          {'\n  and other props:'}
        </Text> 

        <Text style={{ color: "red", fontSize: 20, fontWeight: 'bold'}}>
          {'\n\t'}Sx1 = {pFP(valueSx1)},{'Sx4 = '}{pFP(valueSx4)},  yAxis = {pFP(valueYaxis)},{'\n\t'}S1Width = {pFP(valueS1Width)}, and S4Width = {pFP(valueS4Width)}.
        </Text>  
      
      
        <TouchableOpacity onPress={handleReturnToMainMenu}>
          <View style={[styles.myButton, { marginLeft: 36, width: 170 }]} >
            <Text style={[styles.buttonText, {color: "blue", marginLeft: 2, width: 160,}]}>
              Return to Main Menu
            </Text>
          </View>
        </TouchableOpacity>

      </View>
    )        
  }

  let printCallBackR12ValuesSetToggle = () => {
    setShowHideR12Legend(!showHideR12Legend);
  }

  let printCallBackR12Values = () => {
    return(
      <View style={{ borderWidth: 2, width: 640, position: 'absolute', top: -550, left: -50, 
                     backgroundColor: stepsDone == 0 ? 'gold' : 'lawngreen',
                  }} >
        <Text style={{ color: "red", fontSize: 20, fontWeight: 'bold'}}>
          {'\n\tLegend for Quadratic Ax^2 +Bx + C'}
        </Text> 
      
        <Text style={{ color: "blue", fontSize: 16, fontWeight: 'bold'}}>
          {'\n  Parent received from Child: A = '}{valueA}{", "}&nbsp;&nbsp; 
          {'B = '}{valueB}{", "}&nbsp;&nbsp; {"C = "}{valueC} {' and REAL roots:\n'}
        </Text> 
      
        <Text style={{ color: "red", fontSize: 20, fontWeight: 'bold'}}>
          {'\n\troot1 = '} {pFP(valueR1x)}, root2 = {pFP(valueR2x)} and Vertex = [{pFP(valueHH)},{pFP(valueKK)}] 
        </Text>  
      
        <Text style={{ color: "blue", fontSize: 16, fontWeight: 'bold'}}>
          {'\n  and other props:'}
        </Text> 

        <Text style={{ color: "red", fontSize: 20, fontWeight: 'bold'}}>
          {'\n\t'}Sx1 = {pFP(valueSx1)},{'Sx4 = '}{pFP(valueSx4)},  yAxis = {pFP(valueYaxis)},{'\n\t'}S1Width = {pFP(valueS1Width)}, and S4Width = {pFP(valueS4Width)}.
        </Text>  
      
      
        <TouchableOpacity onPress={handleReturnToMainMenu}>
          <View style={[styles.myButton, { marginLeft: 36, width: 170 }]} >
            <Text style={[styles.buttonText, {color: "blue", marginLeft: 2, width: 160,}]}>
              Return to Main Menu
            </Text>
          </View>
        </TouchableOpacity>

      </View>
    )        
  }

            
  /******************/
  /*  enterCoeffABC  */
  /******************/

  let enterCoeffABC = ()  => {

  let ff = (hh, AA, BB, CC) => {
    return parseInt(AA*hh*hh) + parseInt(BB*hh) + parseInt(CC); 
  }

  let rr1, rr2;
  let AA  = valueA;
  let BB  = valueB;
  let CC  = valueC;
  if (valueX1 < valueX2) {
    rr1 = valueX1;
    rr2 = valueX2;
  } else {
    rr1 = valueX2;
    rr2 = valueX1;
  }

  // let hh  = (rr1 + rr2)/2;
  let hh  = valueX0;
  //  h = -B/(2A) OR (r1+r2)/2
  let kk  = ff(hh, AA, BB, CC);

  // rr1 != rr2
 
  let yAxis;
  if ( rr1 != rr2 ) {
    yAxis = 3 + 12*rr1/(rr1-rr2) ;
    //      3 + 12(-1)/(-4/3) = 3 + 9 = 12   for rr1=-1 and rr2=1/3
  } else {
    yAxis = 0;
  }

  //  <SvgPlot ... callback for Coeff AA, BB, ...
  let plotSVGCallbackChild = (arraySVGFromChild: any) => {
    setValueA(arraySVGFromChild[0]);
    setValueB(arraySVGFromChild[1]);
    setValueC(arraySVGFromChild[2]);
    setValueR1x(arraySVGFromChild[3]);
    setValueR2x(arraySVGFromChild[4]);
    setValueHH(arraySVGFromChild[5]);
    setValueKK(arraySVGFromChild[6]);
    setValueYaxis(arraySVGFromChild[7]);
    setValueSx1(arraySVGFromChild[8]);
    setValueSx4(arraySVGFromChild[9]);
    setValueS1Width(arraySVGFromChild[10]);
    setValueS4Width(arraySVGFromChild[11]);

    console.log("rr1, rr2, hh, kk, yAxis, Sx1, S1Width");
    console.log(valueR1x)
    console.log(valueR2x)
    console.log(valueHH)
    console.log(valueKK)
    console.log("-------------");
    console.log(valueSx1)
    console.log(valueSx4)
  }  

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.outerContainer}>

        <Text style={{marginTop: 2, color: "blue", fontSize: 24, }}>
          {'\n\n'} App to find the roots of Quadratic Equation: Ax^2 + B*x + C = 0 {'\n'}
        </Text>

        {/* Read coefficients A, B, C of quadratic:  Ax^2 + Bx + C = 0  */}
        <View style={styles.container}>
          {/*                 Child           = {Parent}      */}
          <InputCoefficients  valueA          = {valueA}
                              valueB          = {valueB}
                              valueC          = {valueC}
                              stepsDone       = {stepsDone}
                              mutateABCValues = {coeffABCCallbackChild} 
          />

          {/* coeffABCCallbackChild assigns the values read to valueA,B,C stepsDone=0  */}


          {/* If (valueA == "0" ) displayErrorMgsWhenCoeffAIsZero and return to Main Menu */} 
          { isValueAZero  && stepsDone == 1 && 
           <View style={{position: 'absolute', top: 16, left: 30,}}>
            <Text>{displayErrorMgsWhenCoeffAIsZero()}</Text>
           </View>
          }
        
          {/* If isComplex displayErrorMgsWhenRootsAreComplex and return to Main Menu */} 
          { isComplex && stepsDone == 1 && 
           <View style={{position: 'absolute', top: 16, left: 30,}}>
            <Text>{displayErrorMgsWhenRootsAreComplex()}</Text>
           </View>
          }
        
          {/*   (valueA != "0" && valueB != ""  && valueC != "" ) &&  */}  
          { ( stepsDone == 1 && !isValueAZero && !isComplex )  &&  
            <View style={{ borderWidth: 2, width: 660, position: 'absolute', top: 16, 
                           backgroundColor: 'lawngreen',
                        }} >
              <Text>
                {'\n\tParent received from Child: A = '}{valueA}{", "}&nbsp;&nbsp; 
                {'B = '}{valueB}{", "}&nbsp;&nbsp; {"C = "}{valueC}
                {'\n\n\t'} 
                <Text style={{ color: "red", fontSize: 16, fontWeight: 'bold'}}>
                  All plots use screen coordinates, i.e. y increases towards the bottom.
                </Text>
              </Text> 


              { stepsDone == 1 && 
                <View style={{ flexDirection: "row",}}>
                <TouchableOpacity onPress={() => setStepsDone(stepsDone+1) }>
                  <View style={[styles.myButton, { marginLeft: 36, width: 130 }]} >
                    <Text style={[styles.buttonText, {color: "blue", marginLeft: 2, }]}>
                      Do Next Case
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={ printCallBackValuesSetToggle }>
                  <View style={[styles.myButton, { marginLeft: 36, width: 170 }]} >
                    <Text style={[styles.buttonText, {color: "blue", marginLeft: 2, width: 160,}]}>
                      Show/Hide Legend
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleReturnToMainMenu}>
                  <View style={[styles.myButton, { marginLeft: 36, width: 170 }]} >
                    <Text style={[styles.buttonText, {color: "blue", marginLeft: 2, width: 160,}]}>
                      Return to Main Menu
                    </Text>
                  </View>
                </TouchableOpacity>

                </View>
              }

            </View>
          }  

          <View style={{ flexDirection: "row", borderWidth: 3, borderColor: "gold", padding: 6,
                           width: 820, margin: 4, marginLeft: 20,
                           position: 'absolute', top: 180, 
                        }}>
            <Text style={{ color: "red"}}> Version 4A: {'\t'}  </Text>
            <Text> 
              stepsDone = {stepsDone} {'   '} 
              valueA  = {valueA}  {'   '}
              valueB  = {valueB}  {'   '}
              valueC  = {valueC}  {'   '}
              isValueAZero = {isValueAZero ? `true` : `false`} {'   '}
              isR12ValueAZero = {isR12ValueAZero ? `true` : `false`} 
            </Text>
          </View>

        </View>  


    <View style={{flex: 1}}>
      { (stepsDone > 0 && !isValueAZero && !isComplex )  &&
      <View style={styles.outerContainer}>
        <View style={{ flexDirection: "row", borderWidth: 3, borderColor: "gold", padding: 6,
                         width: 820, margin: 4, marginLeft: 20,
                         position: 'absolute', top: -290, display: "none",
                    }}>     
        
          <Text style={{ color: "red"}}> Version 4G: {'\t'}  </Text>
          <Text> 
            stepsDone = {stepsDone} {'   '} 
            valueA  = {valueA}  {'   '}
            valueB  = {valueB}  {'   '}
            valueC  = {valueC}  {'   '}
            isValueAZero = {isValueAZero ? `true` : `false`} {'   '}
            isR12ValueAZero = {isR12ValueAZero ? `true` : `false`} 
          </Text>
        </View>    

        <Text style={{marginTop: 2, color: "blue", fontSize: 24, display: "none",}}>
          {'\n\n'} App to test the SVG_03{'\n'}
        </Text>

        {/* do SVG Plot for Coeff AA, BB, ...  */}
        <View style={styles.container}>
          {/*      Child           = {Parent}      */}
          <SvgPlot AA              = {AA}         
                   BB              = {BB}   
                   CC              = {CC}   
                   rr1             = {rr1}   
                   rr2             = {rr2}   
                   hh              = {valueX0}   
                   kk              = {kk}   
                   yAxis           = {yAxis}   
                   stepsDone       = {stepsDone}
                   stepsRender     = {stepsRender}
                   mutateSVGValues = {plotSVGCallbackChild} 
          />
      
        </View>  
      </View>
      }

      {/*  Footer shows current Rendering App  */}

      <View style={{ flexDirection: "row", borderWidth: 3, borderColor: "gold", padding: 6,
                     width: 220, margin: 4, marginLeft: 20, position: 'absolute', top: -160,
                  }}>
        <Text>Rendering App {renderingApp[stepsRender-1]}</Text>
      </View>

    </View>
   
        { stepsDone == 1 && showHideLegend && !isComplex &&
           <View>
            <Text>{printCallBackValues()}</Text>
           </View>
        }

        { stepsDone > 1 && 
           <View>
            <Text>{restartNewCase()}</Text>
           </View>
        }

        { stepsDone > 1 && 
          <View style={{ borderWidth: 2, backgroundColor: 'lawngreen',
                         width: 560, position: 'absolute', top: 300, 
                      }} >

            <Text>
              {'\n\t'}Calculated the two roots for coefficient A = {valueA},
              {' '} coefficient B = {valueB} and {'\n\t'}coefficient C = {valueC}. {'\t'}
              {typeOfRoots = (isComplex) ? ' Roots are Complex Conjugates.'
                                         : ' Both roots are Real.' }
            </Text>
            { !isComplex &&
              <Text>{'\n\t'}The roots are: x1 = {valueX1.toFixed(2)} and x2 = {valueX2.toFixed(2)}{'\n\n'}</Text>
            }
            { isComplex &&
              <View>
                <Text>{'\n\t'}The roots are:  </Text>
                <Text>{'\n\t'}x1 = {valueX0} + i*{valueU} </Text>
                <Text>{'\n\t'}x2 = {valueX0} - i*{valueU} </Text>
                <Text>{'\n\n\twhere i = sqrt(-1)'}</Text>
                <Text>{'\n\n'}</Text>
              </View>

            }

          </View>

        } 

        <View style={{ flexDirection: "row", display: 'none'}} >  
          <button style={{ margin: 10, width: 120, padding: 10, backgroundColor: "cyan"}}
                  onClick={handleToggleDoc}
          >
            Show/Hide Doc
          </button>

        </View>


      { showHideDoc && false &&
        <View><Text style={[styles.docDesc, {color: "blue"}]}>
          <Text style={{color: "red", fontSize: 20, fontWeight: 'bold'}}>
            {'\t'} Quadratic Equation App Documentation: {'\t'} Version 4B
          </Text>
            {myDoc1}
          </Text>
        </View>
      }

      </View>

    </SafeAreaView>
  ) 
}    // end of let enterCoeffABC = ()  => { ... }

  // button = ENTER COEFF A, B and C
  let handleEnterCoeffABC = ()  => {
    setStepsRender(1);
    restartNewCase();
    // proper place to do the setIsValueAZero i.e. just before reading new A, B, C values
    setIsValueAZero(false);
  }

  /******************/
  /*  enterRoots12  */
  /******************/

  let enterRoots12 = ()  => {

  //  <SvgPlot ... callback  R12 >
  let plotR12SVGCallbackChild = (arrayFromChild: any) => {
    setValueA(arrayFromChild[0]);
    setValueB(arrayFromChild[1]);
    setValueC(arrayFromChild[2]);
    setValueR1x(arrayFromChild[3]);
    setValueR2x(arrayFromChild[4]);
    setValueHH(arrayFromChild[5]);
    setValueKK(arrayFromChild[6]);
    setValueYaxis(arrayFromChild[7]);
    setValueSx1(arrayFromChild[8]);
    setValueSx4(arrayFromChild[9]);
    setValueS1Width(arrayFromChild[10]);
    setValueS4Width(arrayFromChild[11]);
  }  

  let ff = (hh, AA, BB, CC) => {
    return parseInt(AA*hh*hh) + parseInt(BB*hh) + parseInt(CC); 
  }

  // Following came back in the callback: roots12Callback
  // valueR1x, valueR1y, valueR2x, valueR2y, valueA, valueB, valueC, 
  // rootsType, switchOneComplex, isR12ValueAZero, valueHH, valueKK, valueYaxis 

  let AA  = valueA;
  let BB  = valueB;
  let CC  = valueC;
  let rr1 = valueR1x;
  let rr2 = valueR2x;
  let hh  = valueHH;
  let kk  = valueKK;
  let yAxis = valueYaxis;

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.outerContainer}>

        <Text style={{marginTop: 2, color: "blue", fontSize: 24, }}>
          {'\n\n'} App to get Quadratic Equation: Ax^2 + B*x + C = 0 given A and the roots R1 and R2 {'\n'}
        </Text>

        {/* Read coefficients R1 and R2 where the  quadratic is in form: (x-R1)*(x-R2) = 0  */}
        <View style={styles.container}>
          {/*            Child           = {Parent}                                         */}
          <InputRoots12  valueR1         = {[valueR1x,valueR1y]}      
                         valueR2         = {[valueR2x,valueR2y]}   
                         stepsDone       = {stepsDone}
                         mutateR12Values = {roots12Callback} 
          />
        
          {/* If  (valueA == "0" ) display Error Screen and return to Main Menu */}     
          { isR12ValueAZero  && stepsDone == 1 && 
           <View style={{position: 'absolute', top: 16, left: 30,}}>
            <Text>{displayErrorMgsWhenR12AIsZero()}</Text>
           </View>
          }

          { ( stepsDone == 1 && !isR12ValueAZero )  &&   
            <View style={{ borderWidth: 2, width: 440, position: 'absolute', top: 116, 
                           backgroundColor: stepsDone == 0 ? 'gold' : 'lawngreen',
                        }} >
              <Text>
    
                {'\n\tParent received from Child the coefficients A, B, C\n\t and more through the callback:\n'}
                {/*  setValueA(valueA.toPrecision(6)) */}
                {'\n\t\tA = '} {valueA} &nbsp;&nbsp;
                {'\n\t\tB = '} {valueB} &nbsp;&nbsp;
                {'\n\t\tC = '} {valueC} &nbsp;&nbsp;
                {'\n\t\trr1 = '} {parseFloat(rr1)} &nbsp;&nbsp;
                {'\n\t\trr2 = '} {parseFloat(rr2).toPrecision(3)} &nbsp;&nbsp;
                {'\n\t\thh = '} {hh.toFixed(2)} &nbsp;&nbsp;
                {'\n\t\tkk = '} {kk.toFixed(2)} &nbsp;&nbsp;
                {'\n\t\tYaxis = '} {pFP(valueYaxis)} &nbsp;&nbsp; 
                {'\n\t\trootsType = '} 
                  <Text style={{ color: "red", fontSize: 20, fontWeight: 'bold',}}>{rootsType} </Text>
              </Text> 

              <TouchableOpacity onPress={() => setStepsDone(stepsDone+1) }>
                <View style={[styles.myButton, 
                              { marginLeft: 36, width: 240, }]} >
                  <Text style={[styles.buttonText, 
                                { textAlign: 'center', color: "blue", marginLeft: 2, width: 200 }
                              ]}>
                    {'\t'} Display Detailed Results
                  </Text>
                </View>
              </TouchableOpacity>
            </View>  
          } 

          {/* do SVG Plot for R12 ...  */}
          { stepsDone == 2 && rootsType == 'Real Roots' &&
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
                       mutateSVGValues = {plotR12SVGCallbackChild} 
              />
      
            </View>  
          }

          { stepsDone == 2 && 
            <View style={{ flexDirection: "row", }} >
              <TouchableOpacity onPress={() => setStepsDone(stepsDone+1) }>
                <View style={[styles.myButton, { marginLeft: 36, width: 130 }]} >
                  <Text style={[styles.buttonText, {color: "blue", marginLeft: 2, }]}>
                    Do Next Case
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={ printCallBackR12ValuesSetToggle }>
                <View style={[styles.myButton, { marginLeft: 36, width: 170 }]} >
                  <Text style={[styles.buttonText, {color: "blue", marginLeft: 2, width: 160,}]}>
                    Show/Hide Legend
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleReturnToMainMenu}>
                <View style={[styles.myButton, { marginLeft: 36, width: 170 }]} >
                  <Text style={[styles.buttonText, {color: "blue", marginLeft: 2, width: 160,}]}>
                    Return to Main Menu
                  </Text>
                </View>
              </TouchableOpacity>

            </View>
          }
        

          {/* Footer */}
          { stepsDone >= 0  && 
            <View style={{ flexDirection: "row", borderWidth: 3, borderColor: "gold", padding: 6,
                           width: 980, margin: 4, marginLeft: 20,
                        }}>

              <Text> 
                <Text style={{ color: "red"}}> Version 4C: {'\t'}  </Text>
                <Text> 
                  stepsDone = {stepsDone} {', '} 
                  valueR1 = [{valueR1x},{valueR1y}] {', '}
                  valueR2 = [{valueR2x},{valueR2y}] {', '}
                  valueA  = {valueA}  {', '}
                  valueB  = {valueB}  {', '}
                  valueC  = {valueC}  {', '}
                  rootsType = {rootsType}  {', '}
                  switchOneComplex = {switchOneComplex} {', '} 
                  isValueAZero = {isValueAZero ? `true` : `false`} {', '} 
                  isR12ValueAZero = {isR12ValueAZero ? `true` : `false`} {', '}
                  stepsRender = {stepsRender} {', '}
                  Rendering App {renderingApp[stepsRender-1]}
                </Text>
              </Text>

            </View>

          }
        
          { stepsDone == 2 && showHideR12Legend &&
             <View>
               <Text>{printCallBackR12Values()}</Text>
             </View>
          }

        { stepsDone > 2 && 
          <View style={{ borderWidth: 2, backgroundColor: 'lawngreen',
                         width: 600, position: 'absolute', top: 530, left: 900, 
                         display: (switchOneComplex == 1) ? "flex" : "none",
                      }} >

            <Text>
              {'\n\t'}The Quadratic Equation: Ax^2 + B*x + C = 0 for roots: [{parseFloat(valueR1x).toPrecision(3)},{parseFloat(valueR1y).toPrecision(3)}] and [{parseFloat(valueR2x).toPrecision(3)},{parseFloat(valueR2y).toPrecision(3)}]{'\n\t'}would have the coefficients A = {valueA}, B = {valueB} and C = {valueC}.{'\n\t'}The roots are <Text style={{ fontWeight: 'bold', color: "red"}}> {rootsAreReal ? `REAL` : `COMPLEX CONJUGATES`} </Text>. 
              {'\n\n\t'} 
            <Text style={{ color: "red", fontSize: 16, fontWeight: 'bold'}}>
              All plots use screen coordinates, i.e. y increases toward the bottom.
            </Text>
              {'\n\t'}
            </Text>

          </View>

        } 

        
        { stepsDone > 1 && 
          <View style={{ borderWidth: 2, backgroundColor: 'lawngreen',
                         width: 620, position: 'absolute', top: 30, 
                         display: (switchOneComplex == 2) ? "flex" : "none",
                      }} >

            <Text>
              {'\n\t'}This App considers Quadratic Equations: Ax^2 + B*x + C = 0 for real values of the {'\n\t'}coefficients B and C. This means that the two roots must be both <Text style={{ fontWeight: 'bold', color: "red"}}> 'REAL'</Text> or both{'\n\t'}be <Text style={{ fontWeight: 'bold', color: "red"}}>'COMPLEX CONJUGATES'</Text>.  The roots read in are: [{valueR1x},{valueR1y}] and [{valueR2x},{valueR2y}], i.e. one complex{'\n\t'}root and one real which would produce complex-valued coefficients A, B and C. To{'\n\t'}handle such cases would require some minor changes to this App.{'\n\t'}
            </Text>

          </View>

        } 

        { stepsDone > 1 && 
          <View style={{ borderWidth: 2, backgroundColor: 'lawngreen',
                         width: 576, position: 'absolute', top: 30, 
                         display: (switchOneComplex == 3) ? "flex" : "none",
                      }} >

            <Text>
              {'\n\t'}This App considers Quadratic Equations: Ax^2 + B*x + C = 0 for real values of the {'\n\t'}coefficients B and C. This means that the two roots must be both <Text style={{ fontWeight: 'bold', color: "red"}}> 'REAL'</Text> or both{'\n\t'}be <Text style={{ fontWeight: 'bold', color: "red"}}>'COMPLEX CONJUGATES'</Text>.  The roots read in are: [{valueR1x},{valueR1y}] and [{valueR2x},{valueR2y}], i.e. two{'\n\t'}complex roots which would produce complex-valued coefficients B and C.{'\n\t'}To handle such cases would require some minor changes to this App.{'\n\t'}
            </Text>

          </View>

        } 

        { stepsDone > 2 && 
           <View>
            <Text>All plots use screen coordinates, i.e. y increases toward the bottom.</Text>
            <Text>{restartNewCase()}</Text>
           </View>
        }




        <View style={{ flexDirection: "row", display: 'none'}} >  
          <button style={{ margin: 10, width: 120, padding: 10, backgroundColor: "cyan"}}
                  onClick={handleToggleDoc}
          >
            Show/Hide Doc
          </button>

        </View>
 

        </View>
      </View>

      { showHideDoc && false &&
        <View><Text style={[styles.docDesc, {color: "blue"}]}>
          <Text style={{color: "red", fontSize: 20, fontWeight: 'bold'}}>
            {'\t'} Quadratic Equation App Documentation: {'\t'} Version 4D
          </Text>
            {myDoc1}
          </Text>
        </View>
      }


    </SafeAreaView>
  ) 
}    // end of let enterRoots12 = ()  => { ... }

  // button = ENTER A and ROOTS R1 and R2
  let handleEnterRoots12 = ()  => {
    setStepsRender(2);
    restartNewCase();
    // proper place to do the setIsR12ValueAZero i.e. just before reading new R1, R2 values 
    setIsR12ValueAZero(false);
  }

  /**************************/
  /*  Render Main App_Quad  */
  /**************************/

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.outerContainer}>

        {/********************************/}
        {/* Main Starting Render Screen: */}
        {/********************************/}

        { (stepsRender == 0 ) &&
          <View style={{ borderWidth: 3, borderColor: "gold", padding: 6,
                         height: 60, margin: 10, top: 2, width: 276,
                      }}>
            <Text style={{marginTop: -52, color: "blue", fontSize: 24, }}>
              {'\n\n'}  Quadratic Main Render{'\n\n'}
            </Text>

            <button style={{ marginLeft: 10, marginTop: 4, width: 120, padding: 1, height: 30,
                             backgroundColor: "orange",
                          }}
                    onClick={handleToggleDoc}>
              Show/Hide Doc
            </button>

            <button style={{ marginLeft: 10, marginTop: 4, width: 170, padding: 1, height: 30,
                             backgroundColor: "orange",
                          }}
                    onClick={handleEnterCoeffABC}>
              ENTER COEFF A, B and C
            </button>

            <button style={{ marginLeft: 10, marginTop: 4, width: 188, padding: 1, height: 30,
                             backgroundColor: "orange",
                          }}
                    onClick={handleEnterRoots12}>
              ENTER A and ROOTS R1, R2
            </button>

            {/* Main Footer */}
            { stepsDone >= 0   && 
              <View style={{ borderWidth: 3, borderColor: "gold", padding: 6, width: 620, 
                             top: 40, left: -180, 
                          }}>
  
                <Text> 
                  <Text style={{ color: "red"}}> Version 4E: {'\t'}  </Text>
                  <Text> 
                    stepsDone = {stepsDone} {'   '} 
                    isValueAZero = {isValueAZero ? `true` : `false`} {'   '} 
                    isR12ValueAZero = {isR12ValueAZero ? `true` : `false`} 
                  </Text>
                </Text>
             
              </View>
            }

          </View>
        }   

        { (stepsRender == 0 ) && showHideDoc &&
              <Text style={[styles.docDesc, {color: "blue"}]}>
                <Text style={{color: "red", fontSize: 20, fontWeight: 'bold'}}>
                  {'\n\t'} Quadratic Equation App Documentation: {'\t'} Version 1 
                </Text>
                {myDoc1}
                <Text style={{ color: "red", fontSize: 16, fontWeight: 'bold'}}> 
                  {'\t'}In this App all plots use screen coordinates, i.e. y  increases towards the bottom.
                </Text>
                {myDoc2}
              </Text> 
        }

        { (stepsRender == 1 ) && enterCoeffABC() }

        { (stepsRender == 2 ) && enterRoots12() }

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
    width: 820,
    fontSize: 16,
    marginLeft: 12,
    marginBottom: 12,
  },
});


    /*******************/
    /*  Documentation  */
    /*******************/
// https://irp-cdn.multiscreensite.com/c4250ca8/files/uploaded/Sandridge%20Algebra%202%20Part%201.pdf

// https://www.geogebra.org/m/EFbtkvVP

// Section 5.4 – Quadratic Functions
// f(x) = ax^2 + bx + c (General form),  f(x) = a(x − h)^2 + k, (Standard form)
// If a > 0, the parabola opens up.  k is the minimum functional value, it occurs when x = h.
// If a < 0, the parabola opens down.  k is the maximum functional value, it occurs when x = h
// https://www.math.tamu.edu/~brlynch/150fall17/Notes/150_5_4.pdf

// react-native-svg

const myDoc1 = `\n\n\tA Quadratic Equation has three forms:\n\n\t\t(1)${' '}  Standard form: Y = Ax^2 + Bx + C where the A,B, and C are real numbers,\n\t\t(2)${' '}  Factored form: Y = A(x - r1)(x - r2) with A a real number and r1, r2 real or \n\t\t\tcomplex conjugate roots and\n\t\t(3)${' '}  Vertex form: Y = A(x - h)^2 + k with A, h, and k again some real numbers .\n\n`;

 const myDoc2 = `\n\n\tTherefore in this App if A<0 the parabola opens up and the vertex is at the minimum functional value.\n\tWhen A>0 the parabola opens down and the vertex is at the maximum functional value.\n\n`;

export default App;

