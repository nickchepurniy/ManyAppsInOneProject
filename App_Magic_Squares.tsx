import React, { Component, useState} from "react";
import { SafeAreaView, StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";

import Draggable from "./App_A/Draggable01_Ver15";

let TILE_WIDTH = 50, TILE_HEIGHT = 50, NUMBER_OF_TILES_IN_ROW = 3, NUMBER_OF_TILES_IN_COLUMN = 3;
let BOTTOM_RIGHT_CORNER_X = NUMBER_OF_TILES_IN_COLUMN*TILE_HEIGHT, DEBUG = !true;

const brc_x = BOTTOM_RIGHT_CORNER_X;
const swap_gap = 20;
const debug = DEBUG;
// if (debug) console.log('BOTTOM_RIGHT_CORNER_X = ' + brc_x);

// SOLVE The 3x3 Magic Square Completely
// https://www.youtube.com/watch?v=zPnN046OM34

// How to Build a Magic Square
// https://www.youtube.com/watch?v=Yks7q1PEd-U

const myDoc1 = "Definition of a Magic Square of ODD Order:\nA Magic Square of order N is an NxN square matrix whose elements consist of consecutive integers (from 1 to N²) arranged so that the sum of each row, column, and both diagonals are equal to the same sum (which is called the MAGIC NUMBER), with N being an ODD integer. For sequential elements 1, 2, ..., N² the MAGIC NUMBER = N*(1+N²)/2\n\nThis App uses FOUR botton (in backgroundColor='cyan'). Initially, the Status Button is hidden and there is no Status\ndescription. Also, initially, the Tutor Button and corresponding descriptions are hidden.\n\n DRAG and DROP COMMANDS which can be used to create a Magic Square (of order N=3, i.e. a NxN matrix):\n Initially dragable objects, circles, are located in the ballContainer. These objects can be dropped into another position\nin the dropZoneContainer Drop  #1  thru Drop  #9 or Swap #1 thru Swap #3. Any object (Source) located in the dropZoneContainer (Drop and/or Swap) or the ballContainer can be moved to a new position (Target) within the dropZoneContainer or ballContainer. Attempting to drop the Source outside dropZoneContainer or ballContainer will bring the Source back to its original position. When moving objects back to the ballContainer the location of the Target position must be the position the object occupied originally. This move can be done directly or using the corresponding C1 thru C9 buttons which appear below the ballContainer.\n\nYou can either click the 'Status Button' and try to solve the problem or click both the 'Tutor Button' and 'Simple Algorithm' and follow the instructions. Do close this screen before proceeding with your selected option !\n";

const myMsg1 = "Above C1 thru C9 elements are buttons, used to bring back the circles into their initial positions.  To see \nthe availability status of a Step click once any red circle. To see the Game Status click twice any red circle !\n "

const myDoc2 = "To obtain the Magic Square we need to drag the circles in the ballContainer and drop them in the dropZoneContainer's locations Drop#1 thru Drop#9 so that the sum of each row, column, and both diagonals are equal to the MAGIC NUMBER (which for N=3 would be 15). First observe that the circles in the ballContainer are in fact the elements of a 3 by 3 matrix, with the 3 rows displayed sequentially. First row being (1,2,3), second row (4,5,6) and third row ((7,8,9).\n\nThere are eight solutions. Here we describe the basic solution which has numbers 4,5 and 6 on the anti-diagonal and 2,5 and 8 on the diagonal. From the basic solution we can obtain the other solutions by using rotation and translation operations. For higher odd-order Magic Squares see:\n\n\thttps://magic-squares-and-city-map.herokuapp.com\n\n\We next proceed with the basic solution for the 3x3 Magic Square:\n\nIn all the Steps described below we will always drag a row (from the ballContainer) such that it's middle element is dropped on the diagonal of the matrix (positions Drop#1, Drop#5 and Drop#9). What we are doing is in fact ROTATING the 3 by 3 matrix (in the ballContainer) 45 degrees counter-clock wise, and dropping its middle-column (2,5,8) along the diagonal of the matrix in the dropZoneContainer's (positions Drop#1, Drop#5 and Drop#9).  In this App N=3 (number of rows) so we will have 3 Steps. When the middle-row (4,5,6) is dragged all its elements are dropped inside the dropZoneContainer (at positions Drop#7, Drop#5 and Drop#3), but for all other rows some elements will be dropped outside the dropZoneContainer. So we need to apply the MTOS (Move To Opposite Side) rule, which simply states: Any element dropped outside the dropZoneContainer must be moved by N positions to the opposite side. Thus, elements dropped on the left are moved in the right direction by N positions, the elements on top are moved downwards by N positions, etc ... The MTOS rule is applicable for a Magic Square of any odd order N !\n\nStep 1:  Move the elements in the middle row [i.e. second row (4,5,6)] along the anti-diagonal (diagonal perpendicular to the diagonal of the matrix i.e. at positions Drop#7, Drop#5 and Drop#3). Click on 'Show/Hide Steps Availability' and then click on any circle to see if condition is satisfied. Should have circle 5 in position Drop#5, circle 4 in position Drop#7 and circle 6 in position Drop#3.\n\nStep 2:  Move the elements in the first row [i.e. (1,2,3)] above the anti-diagonal such that its middle element drops on the diagonal, and then apply the MTOS rule for the elements dropped outside. Click on any circle to see if condition is satisfied. Should have circle 2 in position Drop#1, circle 1 in position Drop#6 and circle 3 in position Drop#8.\n\nStep 3:  Move the elements in the third row [i.e. (7,8,9)] below the anti-diagonal such that its middle element drops on the diagonal, and then apply the MTOS rule for the elements dropped outside. Click on any circle to see if condition is satisfied. Should have circle 8 in position Drop#9, circle 7 in position Drop#2 and circle 9 in position Drop#4.\n"

export default class Screen extends Component {

  constructor(props) {
    super(props);
      this.state = {
        
        /* gameState = arr (in other components). If arr[ii][jj] = 1 it means cell is OCCUPIED */

        gameState:
          [
            [ 0,  0,  0],        // 3 rows for Drop
            [ 0,  0,  0],
            [ 0,  0,  0],
            [ 0,  0,  0],        // 1 row for Swap
            [ 1,  1,  1],        // 3 rows for ballContainer
            [ 1,  1,  1],
            [ 1,  1,  1] 
          ],
        
        /* positionState holds the actual numbers, e.g. if 
             diagSum = parseInt(pos[0][0]) + parseInt(pos[1][1]) + parseInt(pos[2][2]);
           then diagSum  == 15 is one of the requirements for the Magic Squares solution !
        */

        positionState:           
          [
            [ 0,  0,  0],        // 3 rows for Drop
            [ 0,  0,  0],
            [ 0,  0,  0],
            [ 0,  0,  0],        // 1 row for Swap
            [ 1,  2,  3],        // 3 rows for ballContainer
            [ 4,  5,  6],
            [ 7,  8,  9]
          ],
        counterFilledCells: [0,0,swap_gap],
        // cFC =[filledCells in Drop Area, filledCells in Swap Area, swap_gap]
        isToggleOn:  false,
        isAlgorithmOn: false,
        counterTwoParent: [1,2,3,4,5,6,7,8,9],  
        anyArrayWith3Elements: [1,2,3],
        showNote1: !true,     // Note between Swap row and the numbered circles home position 
        isStatusButtonDisplayed: !false,
        isTutorsButtonDisplayed: !false,
        mutateDebug2D:  !true,
        isSolutionAttained: ! true,
        isSolForTutor1Attn: ! true,
        isSolForTutor2Attn: ! true,
        isSolForTutor3Attn: ! true,
      }  // end of this.state

      /**********************/
      /* .bind() functions: */
      /**********************/

      this.mutateCounterAll    = this.mutateCounterAll.bind(this);
      this.mutateCounterOne    = this.mutateCounterOne.bind(this);
      this.mutateCounterTwo    = this.mutateCounterTwo.bind(this);
      this.mutateCounterThree  = this.mutateCounterThree.bind(this);
      this.doToggleButton      = this.doToggleButton.bind(this);
      this.doToggleTutorButton = this.doToggleTutorButton.bind(this);
      this.showHideDoc         = this.showHideDoc.bind(this);
      this.showAlgorithm       = this.showAlgorithm.bind(this);

  }   // end of constructor              

  /*********************/
  /* Define functions: */
  /*********************/

  // mutate = modify
  mutateCounterAll = (arr, pos) =>  {     
    /*** this.props.counterAllCallback (in Child component)
    === this.mutateCounterAll (in Parent Component) ***/

    console.log("*************************************************************")
    console.log("***  CRITERIA FOR ATTAINING SOLUTION (in this test code)  ***")
    console.log("***  arr[0][0] == 2 && arr[1][1] == 5 && arr[2][2] == 8   ***")
    console.log("*************************************************************")

    if ( this.state.isSolForTutor1Attn && this.state.isSolForTutor2Attn &&
         this.state.isSolForTutor3Attn     ) 
      {
        this.setState({ isSolutionAttained: true }, () => {
        console.log("isSolutionAttained set to TRUE in Parent")
      })
      } else {
        this.setState({ isSolutionAttained: !true }, () => {
        console.log("isSolutionAttained set to FALSE in Parent")
      })
    }

  }  // mutateCounterAll = (arr, pos) =>  { ... }    

  mutateCounterOne = (arr, pos) =>  {     

    console.log("*************************************************************")
    console.log("***  CRITERIA FOR ATTAINING SOLUTION (in this test code)  ***")
    console.log("***  arr[2][0] == 4 && arr[1][1] == 5 && arr[0][2] == 6   ***")
    console.log("*************************************************************")

    //    isSolForTutor1Attn: ! true,
    if ( pos[2][0] == 4 && pos[1][1] == 5 && pos[0][2] == 6 ) {
      this.setState({ isSolForTutor1Attn: true }, () => {
        console.log("isSolForTutor1Attn set to TRUE in Parent")
      })
    } else {
      this.setState({ isSolForTutor1Attn: !true }, () => {
        console.log("isSolForTutor1Attn set to FALSE in Parent")
      })
    }

  }  // mutateCounterOne = (arr, pos) =>  { ... }    

  mutateCounterTwo = (arr, pos) =>  {     

    console.log("*************************************************************")
    console.log("***  CRITERIA FOR ATTAINING SOLUTION (in this test code)  ***")
    console.log("***  arr[0][0] == 2 && arr[1][2] == 1 && arr[2][1] == 3   ***")
    console.log("*************************************************************")

    //    isSolForTutor1Attn: ! true,
    if ( pos[0][0] == 2 && pos[1][2] == 1 && pos[2][1] == 3 ) {
      this.setState({ isSolForTutor2Attn: true }, () => {
        console.log("isSolForTutor2Attn set to TRUE in Parent")
      })
    } else {
      this.setState({ isSolForTutor2Attn: !true }, () => {
        console.log("isSolForTutor2Attn set to FALSE in Parent")
      })
    }

  }  // mutateCounterTwo = (arr, pos) =>  { ... }    

  mutateCounterThree = (arr, pos) =>  {     

    console.log("*************************************************************")
    console.log("***  CRITERIA FOR ATTAINING SOLUTION (in this test code)  ***")
    console.log("***  arr[2][2] == 8 && arr[0][1] == 7 && arr[1][0] == 9   ***")
    console.log("*************************************************************")

    //    isSolForTutor1Attn: ! true,
    if ( pos[2][2] == 8 && pos[0][1] == 7 && pos[1][0] == 9 ) {
      this.setState({ isSolForTutor3Attn: true }, () => {
        console.log("isSolForTutor3Attn set to TRUE in Parent")
      })
    } else {
      this.setState({ isSolForTutor3Attn: !true }, () => {
        console.log("isSolForTutor3Attn set to FALSE in Parent")
      })
    }

  }  // mutateCounterThree = (arr, pos) =>  { ... }    

  doToggleButton = () => {
    this.setState({
      isStatusButtonDisplayed: !this.state.isStatusButtonDisplayed
      // button is in component Draggable
    });
  }  

  doToggleTutorButton = () => {
    // alert("Change state for isTutorsButtonDisplayed -> " + this.state.isTutorsButtonDisplayed)
    this.setState({
      isTutorsButtonDisplayed: !this.state.isTutorsButtonDisplayed
      // button is in component Draggable
    });
  }  

  showHideDoc = () => {
    this.setState({
      isToggleOn: !this.state.isToggleOn
    });
    // console.log("isToggleOn '"+this.state.isToggleOn + "' now but will be reset !");
  }
      
  showAlgorithm = () => {
    this.setState({
      isAlgorithmOn: !this.state.isAlgorithmOn
    });
    // console.log("isAlgorithmOn '"+this.state.isAlgorithmOn + "' now but will be reset !");
  }



  render() {

    return (
      <SafeAreaView style={styles.mainContainer}>

        {/***********  Drop rows 0,1,2 (with columns 0,1,2 inside each row)  ***********/}
        {this.state.anyArrayWith3Elements.map((iElem, indexI) => (
        <View style={styles.dropZoneContainer} key={indexI} >
          {this.state.anyArrayWith3Elements.map((jElem, indexJ) => (
            <View style={styles.dropZone} key={indexJ} >
              <Text style={styles.text}>Drop #{3*indexI+indexJ+1}</Text>
            </View>
          ))}
        </View>
        ))}


        <View style={styles.dropZoneSwapContainer}>
          {/*********** row 3 (Swap) has 3 column elements  ***********/}
          {this.state.anyArrayWith3Elements.map((kElem, indexK) => ( 
            <View style={styles.dropZone} key={indexK} >
              <Text style={styles.text}>Swap #{indexK+1}</Text>
            </View>
          ))}  
        </View>

        {/***********
            The top-left corner of the next element should touch the bottom-left corner of 
            the Swap #1 element.  Use nested Text components to achieve different colors.
        ***********/}
    
        <View>
        { this.state.showNote1 && 
          <Text style={{ width: 680, height: 20, backgroundColor: 'cyan', justifyContent: 'center',
                         position: 'absolute', left: brc_x, 
                         top: 0, borderColor: "blue", borderWidth: 2, color: "blue",}}>
              &nbsp; The top-left corner of the
              <Text style={{color: "red", fontWeight: "bold",}}>
                &nbsp; next element &nbsp;
              </Text> 
              should touch the bottom-left corner of the 
              <Text style={{color: "red", fontWeight: "bold",}}>
                &nbsp; Swap #1 element
              </Text> !
          </Text>  
        }
        </View>

        <View style={styles.ballContainer}>
          {this.state.counterTwoParent.map((circle, index) => (
            <Draggable key={index}
                       circleBeingDragged={index+1}
                       gameState={this.state.gameState} 
                       positionState={this.state.positionState}            
                       counterFilledCells={this.state.counterFilledCells}
                       counterAllCallback={this.mutateCounterAll}
                       counterOneCallback={this.mutateCounterOne}
                       counterTwoCallback={this.mutateCounterTwo}
                       counterThreeCallback={this.mutateCounterThree}
                       isStatusButtonDisplayed={this.state.isStatusButtonDisplayed}
                       isTutorsButtonDisplayed={this.state.isTutorsButtonDisplayed}
                       debug2Draggable={this.state.mutateDebug2D}
            />     
          ))}  

          {/* 
              debug2Draggable used by Child to show src and targ for c# buttons et al
              isStatusButtonDisplayed is req'd since button is in component Draggable
           ?  isStatusButtonDisplayed is req'd since button is in component Draggable
              circleBeingDragged req'd by c# buttons et al
              arr=gameState, pos=positionState, counterFilledCells = cFC all  req'd
          */}

        </View> 

        <View style={{top: 56,}}>
          <Text style={{ fontSize:16, fontWeight: "bold", textAlign: "left", color: "blue"}}>
            {myMsg1}
          </Text>
        </View>

        {this.state.isSolutionAttained && this.state.isStatusButtonDisplayed &&
          <View style={{top: 60,}}>         
            <Text style={{color: "blue", fontSize:28,  fontWeight: "bold",}}>
              Solution Attained 
            </Text>
          </View>  
        }

        { (!this.state.isSolutionAttained) &&  this.state.isStatusButtonDisplayed && 
          <View style={{top: 60,}}>         
            <Text style={{color: "blue", fontSize:28,  fontWeight: "bold",}}>
              NO Solution Attained
            </Text>
          </View>  
        }


        {this.state.isSolForTutor1Attn && this.state.isTutorsButtonDisplayed &&
          <View style={{top: 60,}}>         
            <Text style={{color: "blue", fontSize:28,  fontWeight: "bold",}}>
              Step 1  Attained 
            </Text>
          </View>  
        }

        
        { (!this.state.isSolForTutor1Attn) &&  this.state.isTutorsButtonDisplayed &&
          <View style={{top: 60,}}>         
            <Text style={{color: "blue", fontSize:28,  fontWeight: "bold",}}>
             Step 1  NOT  Attained
            </Text>
          </View>  
        }

        {this.state.isSolForTutor2Attn && this.state.isTutorsButtonDisplayed &&
          <View style={{top: 60,}}>         
            <Text style={{color: "blue", fontSize:28,  fontWeight: "bold",}}>
              Step 2  Attained 
            </Text>
          </View>  
        }

        { (!this.state.isSolForTutor2Attn) &&  this.state.isTutorsButtonDisplayed &&
          <View style={{top: 60,}}>         
            <Text style={{color: "blue", fontSize:28,  fontWeight: "bold",}}>
             Step 2  NOT  Attained
            </Text>
          </View>  
        }

        {this.state.isSolForTutor3Attn && this.state.isTutorsButtonDisplayed &&
          <View style={{top: 60,}}>         
            <Text style={{color: "blue", fontSize:28,  fontWeight: "bold",}}>
              Step 3  Attained 
            </Text>
          </View>  
        }

        { (!this.state.isSolForTutor3Attn) &&  this.state.isTutorsButtonDisplayed &&
          <View style={{top: 60,}}>         
            <Text style={{color: "blue", fontSize:28,  fontWeight: "bold",}}>
             Step 3  NOT  Attained
            </Text>
          </View>  
        }

        <View style={{ flexDirection: "row", top: 132 }}>
          <button style={{ margin: 10, width: 112, padding: 10, backgroundColor: "cyan",
                        }}
                  onClick={this.doToggleButton}>
            Show/Hide Status Availability
          </button>

          <button style={{ margin: 10, width: 112, padding: 10, backgroundColor: "cyan"}}
                  onClick={this.doToggleTutorButton}>
            Show/Hide Steps Availability
          </button>

          <button style={{ margin: 10, width: 120, padding: 10, backgroundColor: "cyan",
                        }}
                  onClick={this.showHideDoc}>
            Show/Hide Doc
          </button>

          <button style={{ margin: 10, width: 120, padding: 10, backgroundColor: "cyan",
                        }}
                  onClick={this.showAlgorithm}>
            Simple Algorithm
          </button>
        </View>

        { this.state.isToggleOn && 
          <View style={{top: 130, backgroundColor: "lawngreen", width: 780, height:380, 
                        left: -20, padding: 10, borderRadius: 12, marginBottom: 10,
                        borderColor: "blue", borderWidth: 2,
                      }} >
            <Text>
              {myDoc1}
            </Text>
          </View>
        }

        { this.state.isAlgorithmOn && 
          <View style={{top: 130, backgroundColor: "lawngreen", width: 780, height:500, 
                        left: -20, padding: 10, borderRadius: 12, marginBottom: 10,
                        borderColor: "blue", borderWidth: 2,
                      }} >
            <Text>
              {myDoc2}
            </Text>
          </View>
        }

      </SafeAreaView>
    );
  }


}   // END  class Screen Component 

const RADIUS = 30;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    left:  50, // Must be consistent with xLeft in "Loop thru all the DROP cells and the SWAP row:" 
    top:  50,  // Must be consistent with yTop  in "Loop thru all the DROP cells and the SWAP row:"
  },
  ballContainer: {
    top: 20,            // swap_gap     
    justifyContent: 'flex-start',
    height: 56,
    width: 475,
    borderWidth: 2,
    flexDirection: "row",
  },
  dropZone: {
    flexDirection: "row",
    height: 50,
    width:  50,
    margin:  0,
    backgroundColor: "gold",
    borderColor: "red",
    borderBottomColor: 'red',
    borderBottomWidth: 2,
    borderWidth: 2,
  },
  text: {
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    textAlign: "center",
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    color: "red",
  },
  dropZoneContainer: {
    flexDirection: "row",
  },
  dropZoneSwapContainer: {
    flexDirection: "row",
    top: 20,            // swap_gap     
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    margin: 30,
  },
  floatingButton1: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 175,
    width: RADIUS,
    height: RADIUS,
    backgroundColor: '#fff',
    borderRadius: RADIUS,
  },
  floatingButton2: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: RADIUS,
    height: RADIUS,
    backgroundColor: '#fff',
    borderRadius: RADIUS,
  },
  counter: {
    fontSize: 20,
  }
});




