// https://riptutorial.com/react-native/example/12388/setstate

// FC = Functional Components

// useState is a hook.  it returns a pair representing the current state and a function 
// that lets us update the state respectively - e.g. const [count, setCounter] = useState(0); 
// https://enmascript.com/articles/2018/10/26/react-conf-2018-understanding-react-hooks-proposal-with-simple-examples

import React, { useState, useEffect  } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const App = () => {

  /******************************/
  /* define the useState hooks: */
  /******************************/

  const [myInteger1,            setMyInteger1            ]   = useState(1);
  const [myInteger2,            setMyInteger2            ]   = useState(2);
  const [prevInteger1,          setPrevInteger1          ]   = useState(1);
  const [prevInteger2,          setPrevInteger2          ]   = useState(2);
  const [lastInteger1Input,     setLastInteger1Input     ]   = useState(false);
  const [lastInteger2Input,     setLastInteger2Input     ]   = useState(false);
  const [myIntegerSum,          setMyIntegerSum          ]   = useState(3);
  const [isToggleOn,            setIsToggleOn            ]   = useState(false);
  const [isToggleOnConversion,  setIsToggleOnConversion  ]   = useState(false);
  const [doImmediately,         setDoImmediately         ]   = useState(!false);
  const [kount,                 setKount                 ]   = useState(0);

  /*********************************************************/
  /*    Handle functions in (onClick and onPress) buttons  */
  /*********************************************************/

  // Button label="Get New Random Integer1" onPress={getRandomInteger1}
  const getRandomInteger1 = () => {
    const randomInt1 = Math.floor(Math.random()*100);
    setMyInteger1(randomInt1);
    setPrevInteger1(myInteger1);
    setLastInteger1Input(true);
    setLastInteger2Input(!true);
    setMyIntegerSum(myInteger1+myInteger2);
      setKount(kount+1);
    console.log("Integer1 was NOT updated, SUM uses previous Integer1 and previous Integer2")
    console.log(myInteger1)
    console.log(myInteger1+myInteger2)
    console.log(myInteger2)

  }  

  // Button label="Get New Random Integer2" onPress={getRandomInteger2}
  const getRandomInteger2 = () => {
    const randomInt2 = Math.floor(Math.random()*100);
    setMyInteger2(randomInt2);
    setPrevInteger2(myInteger2);
    setMyIntegerSum(myInteger1+myInteger2);
    setLastInteger1Input(!true);
    setLastInteger2Input(true);
      setKount(kount+1);
    console.log("Integer2 was NOT updated, SUM uses previous Integer2 and previous Integer1")
    console.log(myInteger2)
    console.log(myInteger1+myInteger2)
    console.log(myInteger1)
  }

  // Button label="Add the two Random Integes"  onPress={incrementIntegerSum}
  const incrementIntegerSum = () => {
    setMyIntegerSum(myInteger1+myInteger2);
      setKount(0);
    console.log("SUM uses previous Integer1 and previous Integer2")
    console.log(myInteger1+myInteger2)
    console.log(myInteger1)
    console.log(myInteger2)
  }
 
  // button = Show/Hide Doc
  const showHideDoc = () => {
    setIsToggleOn(!isToggleOn)
  }
  // button = Show/Hide Doc Conversion
  const showHideDocConversion = () => {
    setIsToggleOnConversion(!isToggleOnConversion)
  }

  // button = Do Immediately {doImmediately ? 'On' : 'Off' }
  let doImmediatelyHandle  = () => {
    (doImmediately) ? (setKount(0), setMyIntegerSum(myInteger1+myInteger2) ) 
                    : (setKount(0), setMyIntegerSum(myInteger1+myInteger2) ) 
    setDoImmediately(!doImmediately)
  }

  const Button = (props) => {
    return (
      <TouchableOpacity onPress={props.onPress}>
        <View style={[styles.button, {backgroundColor: "gold"}]}>
          <Text style={[styles.buttonText, {color: "blue"}]}>{props.label}</Text>
        </View>
      </TouchableOpacity>
    )  
  }

  /**********************/
  /*  Child Components  */
  /**********************/


  const MyChildComponent1 = (props) => {
    return (
      <View>
        <Text>Child Component1 (myInteger1)   : {'\t'} {props.myInteger1}
          {'\t'} {props.prevInteger1}
        </Text>
     </View>
    )  
  }

  
  const MyChildComponent2 = (props) => {
    return (
      <View>
        <Text>Child Component2 (myInteger2)  : {'\t'} {props.myInteger2}
          {'\t'} {props.prevInteger2}
        </Text>
      </View>
    )  
  }

  
  const MyChildComponentSum = (props) => {
    return (
      <View>
        <Text>Child ComponentSum of Integers: {'\t'} {props.myInteger1 + props.myInteger2}</Text>
      </View>
    )  
  }

  
  /************************/
  /*  UseEffect Function  */
  /************************/
  
  useEffect(() => {
    if (doImmediately) {
      setMyInteger1(myInteger1);
      setMyInteger2(myInteger2);
      setMyIntegerSum(myInteger1+myInteger2);
    }  
    console.log('myInteger1, myInteger2:');
    console.log( myInteger1 );
    console.log( myInteger2 );
  }, [myInteger1, myInteger2, ]);


  /***************/
  /*  Functions  */
  /***************/

  let useRedOn  = () => {
    incrementIntegerSum();
    return ( <Text style={{color: "red", fontSize: 20, fontWeight: 'bold'}}>On</Text>)         
  }

  let useRedOff  = () => {
    return ( <Text style={{color: "red", fontSize: 20, fontWeight: 'bold'}}>Off</Text>)         
  }

  /************/
  /*  Render  */
  /************/

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "gold", borderWidth: 2, 
                     margin: 20, width: 474, padding: 10,
                  }}
      >            
        <Text>Parent Component Integer1 :{'\t\t'} {myInteger1} {'\t'} {prevInteger1} 
          {'\t'} {lastInteger1Input ? 'LAST' : ''}
        </Text>
        <Text>Parent Component Integer2:{'\t\t'} {myInteger2}  {'\t'} {prevInteger2} 
          {'\t'} {lastInteger2Input ? 'LAST' : ''}
        </Text>
        <Text>Parent Component IntegerSum:{'\t'} {myIntegerSum} </Text>
        
        <Text>
         {'\n'}
         { ( (!doImmediately) && kount > 0 )
            ? `Above IntegerSum is computed using the Integer labelled with LAST ...`
            : ``
         }   
        </Text>
        
        <Text style={styles.Red} >
         { ( (!doImmediately) && kount > 0 )
            ? `... because useEffect has been deactivated !`
            : ``
         }   
        </Text>
      </View>   

      <View style={{ backgroundColor: "lawngreen", borderWidth: 2, 
                     margin: 20, width: 420, padding: 10,
                  }}
      >            
        <Text style={{ textAlign: 'center', }}  >
          Results displayed in Child Components{'\n\n'}
        </Text>
        {/*                    Child = Parent            */}
        <MyChildComponent1    myInteger1={myInteger1}
                              prevInteger1={prevInteger1} />
        <MyChildComponent2    myInteger2={myInteger2}
                              prevInteger2={prevInteger2} />
        <MyChildComponentSum  myInteger1={myInteger1}
                              myInteger2={myInteger2}     />
      </View>                        

      <Button label="Get New Random Integer1" onPress={getRandomInteger1} />
      <Button label="Get New Random Integer2" onPress={getRandomInteger2} />
      <Button label="Add the two Random Integes"  onPress={incrementIntegerSum} />

      <View style={{ flexDirection: "row" }}>
        <button style={{ margin: 10, width: 120, padding: 10, backgroundColor: "cyan",
                      }}
                onClick={showHideDoc}>
          Show/Hide Doc
        </button>

        <button style={{ margin: 10, width: 120, padding: 10, backgroundColor: "cyan",
                      }}
                onClick={showHideDocConversion}>
          Show/Hide Doc Conversion
        </button>

        <button style={{ margin: 10, width: 160, padding: 10, backgroundColor: "cyan",
                      }}
                onClick={doImmediatelyHandle}>
      {/* Do Immediately {doImmediately ? useRedOn() : useRedOff() }  */}
          useEffect has been {doImmediately ? '' : 'de' }activated
        </button>
      </View>  

    { isToggleOn &&
      <View style={{top: 20, backgroundColor: "lawngreen", width: 795, height: 300,
                             padding: 10, borderRadius: 12, marginBottom: 10,
                             borderColor: "blue", borderWidth: 2, left: 0, 
                  }} >
        <Text> {myDoc1} </Text>
        <Text style={{color: "red", fontsize: 20, fontWeight: 'bold'}}>
          Proper use of useState with useEffect
        </Text>
        <Text> {myDoc2} </Text>
      </View>
    }

    { isToggleOnConversion &&
      <View style={{top: 20, backgroundColor: "lawngreen", width: 780, height: 465,
                             padding: 10, borderRadius: 12, marginBottom: 10,
                             borderColor: "blue", borderWidth: 2,
                  }} >
        <Text> {myConversionDoc1} </Text>
        <Text> {myConversionDoc2} </Text>
      </View>
    }

    {/* displayed for debugging ... 
    <Text> kount = {kount}  </Text>
    ... */}

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
    justifyContent: 'center',
    alignItems: 'center',
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
    color: '#fff'
  },
  Red: {
    color: 'red',
    fontWeight: 'bold',
  },
});

  /***************/
  /*  Documents  */
  /***************/

let myDoc1 = " useState(initialStateValue) - returns a tuple [stateVar, updaterFunction] e.g.\n\n\t const [count, setCounter] = useState(0); \n\t   ...\n The first element (count) in the array pair is the name of the property you would like to use, the second element \n (setCounter) is the name of the function you will use to update the value of the property. The parameter in useState \n is the initial value of the state.\n";

let myDoc2 = "\n To ensure that the updaterFunction is activated on the current render it should be placed inside the UseEffect method\n  and its stateVar placed in the square brackets []. This App illustrates the results when this procedure is followed and\n when not by using the third button above, 'useEffect has been activated/deactivated'. Thus,  if the procedure is followed\n the updaterFunctions 'setMyInteger1', 'setMyInteger2' and 'setMyIntegerSum' are rendered producing the correct\n 'myIntegerSum'. Also note that when 'Results are displayed in Child Components' all state variables are rendered upon\n entering the Child component so no need to follow above procedure.    \n\n";

let myConversionDoc1 = myDoc1;

let myConversionDoc2 = " 10 steps to quickly change a class component to a functional component with hooks: \n\n\t (1) change 'class NameOfComponent extends Component'  to  'function NameOfComponent(props){' \n\t (2) remove the constructor\n\t (3) remove the render() method, keep the return \n\t (4) add const before all methods \n\t (5) remove this.state throughout the component   \n\t (6) remove all references to ‘this’ throughout the component  \n\t (7) Set initial state with useState(). i.e. import React, { useState } from ‘react’ \n\t\t Set a number - const [count, setCount] = useState(0) \n\t\t Set a string - const [username, setUsername] = useState(‘’) \n\t\t Set true/false - const [isOpen, setIsOpen] = useState(false) \n\t\t Set an object - const [form, setValues] = useState({ id: 0, first: ‘’, ..., })  \n\t\t Set an array - const [items, setItems] = useState([]) \n\t (8) Use corresponding inital values from constructor for the parameters in useState   \n\t (9) replace compentDidMount with useEffect \n\t (10) replace componentDidUpdate with useEffect \n\n";

