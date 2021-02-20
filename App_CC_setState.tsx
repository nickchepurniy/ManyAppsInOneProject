// https://riptutorial.com/react-native/example/12388/setstate

// CC = Class Components

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

/******************/
/* main component */
/******************/
  
  // Option1:
  // If myDoc1 is defined as global: 
  // const myDoc1 = "\n setstate DOC option1 - global defined as const or let \n\n";
  // then in render use {myDoc1}
  // &#123; &#125;

  let myDoc1 = " setState - this will re-render the component and its child components.  Three ways of using setState:\n\n  (1) Key-Value Object - e.g. this.setState({myKey: 'myValue'});\n  (2) function is useful for updating a value based off the existing state or props: \n\n        this.setState((previousState, currentProps) => {\n\t   return {\n\t       myInteger: previousState.myInteger + 1\n\t   } \n        })\n\n  (3) Pass an optional callback to setState that will be fired when the component has re-rendered with \n        the new state. - e.g. this.setState({myKey: 'myValue'}, () { ...} );\n\n";


export default class MyParentComponent extends Component  {

  // Option2 define before constructor
  // myDoc1 = "\n setstate DOC - local before  constructor - requires this. prefix\n\n";
  // then in render use {this.myDoc1}

  /****************/
  /* constructor: */
  /****************/

  constructor(props) {
    super(props);

    this.state = {
      myInteger1: 1,
      myInteger2: 2,
      myIntegerSum: 3,
      isToggleOn:  false,
    }  // end of state

     // this DOES NOT WORK !  use Option2
     // let myDoc1 = "\n setstate DOC - local inside  constructor - required this. prefix\n\n";

    /*** bind the functions defined in this Class Component  ***/

    this.getRandomInteger1= this.getRandomInteger1.bind(this);
    this.getRandomInteger2= this.getRandomInteger2.bind(this);
    this.incrementIntegerSum= this.incrementIntegerSum.bind(this);
    this.showHideDoc = this.showHideDoc.bind(this);
  }  // end of constructor

  /*********************/
  /* Define functions: */
  /*********************/

  getRandomInteger1() {
    const randomInt1 = Math.floor(Math.random()*100);

    this.setState({
        myInteger1: randomInt1
      }, () => console.log("getRandomInteger1 RESET to " + randomInt1) 
    )
  }  

  getRandomInteger2() {
    const randomInt2 = Math.floor(Math.random()*100);

    this.setState({
        myInteger2: randomInt2
      }, () => console.log("getRandomInteger2 RESET to " + randomInt2)  
    );

  }

  incrementIntegerSum() {

    this.setState((previousState, currentProps) => {
      return {
        myIntegerSum: previousState.myInteger1 + previousState.myInteger2
      }
    }, () => console.log("NEW SUM will BE " + this.state.myIntegerSum)

    );
  }
 
  showHideDoc(){

    this.setState((previousState, currentProps) => {
      return {
        isToggleOn: !previousState.isToggleOn
      }  
    });
    // alert("isToggleOn '"+this.state.isToggleOn + "' now but will be reset !");
  }

  /************/
  /* render() */
  /************/
  
  render() {

    return (
      <View style={styles.container}>
        <Text>Parent Component IntegerSum: {this.state.myIntegerSum}</Text>

        <MyChildComponent1 myInteger1={this.state.myInteger1} />
        <MyChildComponent2 myInteger2={this.state.myInteger2} />

        <Button label="Get New Random Integer1" onPress={this.getRandomInteger1} />
        <Button label="Get New Random Integer2" onPress={this.getRandomInteger2} />
        <Button label="Add the two Random Integes"  onPress={this.incrementIntegerSum} />

        <button style={{ margin: 10, width: 120, padding: 10, backgroundColor: "cyan",
                      }}
                onClick={this.showHideDoc}>
          Show/Hide Doc
        </button>

      { this.state.isToggleOn &&
        <View style={{top: 100, backgroundColor: "lawngreen", width: 680, height:240,
                                padding: 10, borderRadius: 12, marginBottom: 10,
                                borderColor: "blue", borderWidth: 2,
                    }} >
          <Text>
            {myDoc1}
          </Text>
        </View>
      }

      </View>
    )
  }
}  

/**************/
/* components */
/**************/
  
export class MyChildComponent1 extends Component {
  /****************/
  /* constructor: */
  /****************/

  constructor(props) {
    super(props);
  }

  /************/
  /* render() */
  /************/
  
  render() {
    // this will get updated when "MyParentComponent" state changes
    return (
      <View>
        <Text>Child Component1 Integer: {this.props.myInteger1}</Text>
      </View>
    )
  }
}

  
export class MyChildComponent2 extends Component {
  /****************/
  /* constructor: */
  /****************/

  constructor(props) {
    super(props);
  }

  /************/
  /* render() */
  /************/
  
  render() {
    // this will get updated when "MyParentComponent" state changes
    return (
      <View>
        <Text>Child Component2 Integer: {this.props.myInteger2}</Text>
      </View>
    )
  }
}

export class Button extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={[styles.button, {backgroundColor: "gold"}]}>
          <Text style={[styles.buttonText, {color: "blue"}]}>{this.props.label}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

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
  }
});










