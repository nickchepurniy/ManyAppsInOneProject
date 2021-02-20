/* 
    Draggable01_Ver15.tsx
      class Draggable
      class ButtonRound
      FUNCTIONS:
        isDropArea(gesture) - gmX = gesture.moveX, gmY = gesture.moveY; are coordinates
            and this function determines in which cell the circle was release. 
        getPrevious_JJ_II(circleId)   
        dispGamePos
        isInMatrix

    developer tools shortcut:  Option + ⌘ + J  (Opens/Closes developer tools)

    There are two types of data that control a component: props and state. 
      props are set by the parent and they are fixed throughout the lifetime of a component. 
      For data that is going to change, we have to use state.

    You should initialize state in the constructor, and then call setState when you want 
    to change it. 

    setState() schedules an update to a component’s state object. When state changes, 
    the component responds by re-rendering.

    // https://reactjs.org/docs/faq-state.html

    // https://riptutorial.com/react-native/example/12388/setstate

    In your component, you can call this.forceUpdate() to force a rerender.
*/


import React, { Component, useState } from "react";
import { SafeAreaView, StyleSheet, View, PanResponder, Animated, Text, 
         Platform, Button } from "react-native";

let TILE_WIDTH = 50, TILE_HEIGHT = 50, NUMBER_OF_TILES_IN_ROW = 3, NUMBER_OF_TILES_IN_COLUMN = 3;
let BOTTOM_RIGHT_CORNER_X = NUMBER_OF_TILES_IN_COLUMN*TILE_HEIGHT, DEBUG = !true;

const debug = !DEBUG;

export default class Draggable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDraggable: true,
      pan: new Animated.ValueXY(),
      opacity:  new Animated.Value(0.75),
      circleBeingDragged: this.props.circleBeingDragged,
      isStatusButtonDisplayed: this.props.isStatusButtonDisplayed,
      isTutorsButtonDisplayed: this.props.isTutorsButtonDisplayed,
      debug2D:  this.props.debug2Draggable,
    };  // end of this.state
    
    this.myHandleTutor1 = this.myHandleTutor1.bind(this);

    ( this.state.circleBeingDragged== 1 )
      ?  console.log("Draggable Component " +  this.state.circleBeingDragged+ " loaded") 
      :  ( this.state.circleBeingDragged== 2 ) ? console.log("...")  
      :  ( this.state.circleBeingDragged== 9 ) 
      ? console.log("Draggable Component " +  this.state.circleBeingDragged+ " loaded")
      : null;

  } // end of constructor

  /*********************/
  /* Define functions: */
  /*********************/

  myHandleStatus() {  // XYZ click  
  // - here counterAllCallback is used because user clicked on 'Status Button'

    this.props.counterAllCallback(this.props.gameState, this.props.positionState);
  }

  myHandleTutor1 = () => {  // Tutor1  click  
  // - here counterOneCallback is used because user clicked on 'Tutor1 Button'

    this.props.counterOneCallback(this.props.gameState, this.props.positionState);
    this.props.counterAllCallback(this.props.gameState, this.props.positionState);
  }


  myHandleTutor2() {  // Tutor2  click  
  // - here counterTwoCallback is used because user clicked on 'Tutor2 Button'

    this.props.counterTwoCallback(this.props.gameState, this.props.positionState);
    this.props.counterAllCallback(this.props.gameState, this.props.positionState);
  }

  myHandleTutor3() {  // Tutor3  click  
  // - here counterThreeCallback is used because user clicked on 'Tutor3 Button'

    this.props.counterThreeCallback(this.props.gameState, this.props.positionState);
    this.props.counterAllCallback(this.props.gameState, this.props.positionState);
  }


  
  myHandleClick() {  // C#  click  i.e. for the C1 thru C9 buttons
  // Here user is moving one of C1 - C9 circles back to  ballContainer and we want to update
  // status in case we had an ATTAINED SOLUTION and upon move the solution is no longer true.

    let arr                = this.props.gameState ;
    let pos                = this.props.positionState ;
    let cFC                = this.props.counterFilledCells ;
    let cell_being_dragged = this.props.circleBeingDragged;  
        // i.e. one of the 9 circles in the ballContainer
    
    const centerPosition  = {x: 0,   y: 0  };

    if ( this.state.debug2D ) {
      console.log("************   INITIAL VALUES  ************** ")
      console.log("mutateCounterAll receives elem[0][0] from Child: " + pos[0][0])
      console.log("Parent elem[0][0]: " + this.props.positionState[0][0])

      console.log("mutateCounterAll receives elem[1][1] from Child: " + pos[1][1])
      console.log("Parent elem[1][1]: " + this.props.positionState[1][1])

      console.log("mutateCounterAll receives elem[2][2] from Child: " + pos[2][2])
      console.log("Parent elem[2][2]: " + this.props.positionState[2][2])

      console.log("***  Function myHandleClick inside Draggable invoked by circle #" 
            + this.state.circleBeingDragged); 
    }

    // Since circle # is dropped back to it initial position => gameState[?] = 1
    this.state.pan.flattenOffset();
    this.state.pan.setOffset({
      x: this.state.pan.x.setValue(centerPosition.x),
      y: this.state.pan.y.setValue(centerPosition.y),
    });

    const i = this.state.circleBeingDragged- 1;
    
    // Get home position of cell in the ballContainer. The buttons C1 thru C9 will drop the
    // circle into this position - this is the TARGET (where cell will end up !)

    let targ_pos_j = 4 + Math.floor(i/3)  ;
    let targ_pos_i = i%3 ;

    // targ_pos_j should be 4, 5 or 6:
    ( 3 < targ_pos_j &&  targ_pos_j < 7 )
      ? console.log("targ_pos_j = " + targ_pos_j + " for circle with label " + parseInt(i+1))
      : console.log("targ_pos_j OUT OF RANGE !!!");

    if ( this.state.debug2D ) {
      console.log("circle # = " + (i+1)  + " -->  targ_pos_j = " + targ_pos_j 
                + " targ_pos_i = " + targ_pos_i)
    }
        /* The for loop scans i=0 thru 8 which need to go into last three rows of arr */ 
        /*     i=0 -> arr[4,0]   i=1 -> arr[4,1]   i=2 -> arr[4,2]  */
        /*     i=3 -> arr[5,0]   i=4 -> arr[5,1]   i=5 -> arr[5,2]  */
        /*     i=6 -> arr[6,0]   i=7 -> arr[6,1]   i=8 -> arr[6,2]  */

    // Restore gameState and positionState of circle being dropped back to initial position. 
    //   Array gameState has elements with 0 or 1 i.e. 0 if empty and 1 if occupied, whereas in
    //   array positionState elements specify circle number, with 0 meaning it is empty !

    if ( cFC[0] == 0 && cFC[1] == 0 ) return;

    // Next, find last position where circle this.state.circleBeingDraggedwas placed by scanning the
    // 3 Drop rows, 1 Swap row and 3 ballContainer rows

    let lastJJ_II = [-1,-1];

    var new_cell_being_dragged = this.state.circleBeingDragged;
    
    if ( this.state.debug2D ) {
      console.log("new_cell_being_dragged = " + new_cell_being_dragged );
    }  

    // using function lastJJ_II get the position of SOURCE cell:
    let jj_ii_of_src_cell = this.lastJJ_II(new_cell_being_dragged, pos);
    console.log("getPrevious_JJ_II at [" + jj_ii_of_src_cell[0] + "," 
                + jj_ii_of_src_cell[1] + "]");

    let src_j = jj_ii_of_src_cell[0];
    let src_i = jj_ii_of_src_cell[1];
 
    if ( src_j < 3 ) cFC[0] = cFC[0] - 1;  
    // Decrement cFC[0] ONLY  if [jj][ii] was in DROP Container

    // Update SOURCE (src) cell:

    arr[src_j][src_i] = 0;      // to indicate cell NOW is empty
    pos[src_j][src_i] = 0;  // 0 means empty

    console.log("src_j, src_i  (SOURCE)");
    console.log(src_j, src_i);
    console.log("targ_pos_j, targ_pos_i   (TARGET)");
    console.log( targ_pos_j, targ_pos_i );
    console.log("***********************************************************************");

    // Update ballContainer (where originally the 9 circles were placed)
    // Update TARGET (targ) cell:

    arr[targ_pos_j][targ_pos_i] = 1;     // to indicate cell is occupied
    pos[targ_pos_j][targ_pos_i] = i+1;   // by circle # i+1 = this.state.circleBeingDragged
    
    // return data to Parent thru the Callback function (defined in Parent)
    this.props.counterOneCallback(this.props.gameState, this.props.positionState);
    this.props.counterTwoCallback(this.props.gameState, this.props.positionState);
    this.props.counterThreeCallback(this.props.gameState, this.props.positionState);
    this.props.counterAllCallback(arr, pos);
  }

  


  // Define function lastJJ_II - to use it see below !

  lastJJ_II = (new_cell_being_dragged, pos) => {
    const number_of_tiles_in_row = NUMBER_OF_TILES_IN_ROW;
    const number_of_tiles_in_column = NUMBER_OF_TILES_IN_COLUMN;
    const tile_width  = TILE_WIDTH;
    const tile_height = TILE_HEIGHT;
    var ii=0, jj=0;  // ii(ROW), jj(COL)

    // console.log("**** INSIDE new_cell_being_dragged ???")
    console.log("**** Function prevPos: searching for CBD=" +new_cell_being_dragged);     
    for (let icol=0; icol<number_of_tiles_in_row; icol++) {
      for (let jrow=0; jrow< 2*number_of_tiles_in_column + 1 ; jrow++) {
        console.log("Prev: jrow,icol = " + jrow + " " + icol + " pos[jrow][icol]="+pos[jrow][icol]," CBD=" +new_cell_being_dragged);
        if ( new_cell_being_dragged == pos[jrow][icol] ) {
          jj=jrow; ii=icol;
          console.log(" - - - - - -  found CBC  - - - - - - -");
          console.log("jj, ii = " + jj + ", " + ii);
          break;  // leave the j-loop
        }  

      }
      if ( (jj != 0) || (ii != 0)) break;
    }  
    console.log("**** Function prevPos: found CBD at jj,ii = " + jj + " " + ii + "  ****")
    console.log("***********************************************************************")

    if ( jj==0 && ii==0 ) {
      console.log("\n??? Function prevPos: DID NOT FIND CBD=" + new_cell_being_dragged + 
                  " in array pos ???\n");
    }

    return [jj,ii];
  };


  componentWillMount() { // Add a listener for the delta value change
    this._val = { x:0, y:0 }
    this.state.pan.addListener((value) => this._val = value); // Initialize PanResponder with move handling
  

    this.panResponder = PanResponder.create({

      onStartShouldSetPanResponder: (e, gesture) => {
        console.log("Msg from onStartShouldSetPanResponder: Starting ... with  x: " 
                    + this._val.x + " y: " + this._val.y);
        return true },

      onPanResponderGrant: (e, gesture) => {
        this.state.pan.setOffset({
          x: this._val.x,
          y:this._val.y
        })
        this.state.pan.setValue({ x:0, y:0})
      },

      /*
      onPanResponderMove: Animated.event([
        null, { dx: this.state.pan.x, dy: this.state.pan.y },
        ], { useNativeDriver: true, } ),
      */

      onPanResponderMove: (e, gesture) => {
        let mover = Animated.event([ null, { dy: this.state.pan.y, dx: this.state.pan.x }]);
        // console.log('E: ', e, ', Gesture: ', gesture)
        return mover(e, gesture) ;
      },

      onPanResponderRelease: (e, gesture) => {
        console.log("onPanResponder Released ... this.isDropArea(gesture) invoked ...");
        console.log("Entering onPanResponderRelease ... should invoke 'counterAllCallback'"); 
        // invoking 'counterAllCallback' will display updated correct status
  
      this.props.counterOneCallback(this.props.gameState, this.props.positionState);
      this.props.counterTwoCallback(this.props.gameState, this.props.positionState);
      this.props.counterThreeCallback(this.props.gameState, this.props.positionState);
      this.props.counterAllCallback(this.props.gameState, this.props.positionState);
                                   
        /* console.log("onPanResponderRelease ..." ) */

        // this.isDropArea returns drop_it

        if (this.isDropArea(gesture)) {
          Animated.timing(this.state.opacity, {
          toValue: 0,
          duration: 100
        }).start(() =>
          this.setState({
            showDraggable: false
          })
        );
        } else {
          Animated.spring(this.state.pan, {
            toValue: { x: 0, y: 0 },
            friction: 5
          }).start();
        }
      },
  
    });
  }

  isDropArea(gesture) {
    console.log("\n---------------- DEBUGGING isDropArea(gesture) ----------------"); 
    console.log("circleBeingDragged= " + this.props.circleBeingDragged);

    if (debug) {
      console.log("\n\t  ╭─────────╮" +    
                  "\n\t  │ PART 1  │" + 
                  "\n\t  ╰─────────╯"  ); 
    }              

    const number_of_tiles_in_row = NUMBER_OF_TILES_IN_ROW;
    const number_of_tiles_in_column = NUMBER_OF_TILES_IN_COLUMN;
    const tile_width  = TILE_WIDTH;
    const tile_height = TILE_HEIGHT;

    let arr = this.props.gameState ;
    let pos = this.props.positionState ;
    let cFC = this.props.counterFilledCells ;
    let cell_being_dragged = this.props.circleBeingDragged;  
        // i.e. one of the 9 circles in the ballContainer

    let swap_gap = cFC[1];        // 20

    let gmX = gesture.moveX, gmY = gesture.moveY;
    console.log( "TARGET cell " + cell_being_dragged + " was  dragged to position:" +
                 "\n\t" + gmX, gmY );

    if (debug) {
      // console.log( "Cell " + cell_being_dragged + " was  dragged ... setting ii=-1, jj=-1");
      console.log( "TARGET cell " + cell_being_dragged + " was dragged ...");
      // "\n\t\tsetting ii=-1, jj=-1");
    }

    let flattenedArray;
    let isInsideGrid;

    // We have the coordinates of the drop position: (gesture.moveX, gesture.moveY)
    // Loop thru all the cells to determine in which tile of the grid it was dropped 

    let drop_it;
    let ii=-1, jj=-1;
    let xLeft =  50;  //  See styles mainContainer -> left: 50,
    let yTop  =  50;  //  See styles mainContainer -> top: 50,
    let xMin, xMax, yMin, yMax;

    if (debug) {
      console.log("Searching for TARGET in DROP Container");
    }

    /*********************************/
    /* Loop thru all the DROP cells: */
    /*********************************/

    for (let i=0; i<number_of_tiles_in_row; i++) {
      xMin = xLeft + i*tile_width;   xMax = xLeft + (i+1)*tile_width;
      for (let j=0; j<number_of_tiles_in_column; j++) {
        yMin = yTop + j*tile_height; yMax = yTop + (j+1)*tile_height; 
        drop_it =  ( ( xMin < gesture.moveX && gesture.moveX < xMax )   
                 &&  ( yMin < gesture.moveY && gesture.moveY < yMax ) )
                 ? true : false;
        if (drop_it) { 
          ii = i; jj = j; 
          // console.log("Target dropped in SWAP element: ii(COL) = " + ii + ", jj(ROW) = " + jj);
          console.log("Target dropped in DROP Container - found valid jj, ii: "); 
          console.log("Found TARGET in Drop Container at jj(ROW), ii(COL):");
          console.log("\n\t\t" +  jj, ii );
          break;  // leave the j-loop
        }  
      }
      if (drop_it) break;  // leave the i-loop
    }  

    if (debug && !drop_it) {
      console.log("Searching for TARGET in SWAP Container");
    }
    
    /*******************************************************/
    /* If not found among the DROP cells try the SWAP row: */
    /*******************************************************/

    /* SWAP Container has one row - so need only 'for (let i=0; ...)' loop */

    if ( ii == -1 || jj == -1) {
      let j4Top = 3*tile_height + swap_gap + yTop, j4Bottom = j4Top + tile_height; 
      for (let i=0; i<number_of_tiles_in_row; i++) {
        xMin = xLeft + i*tile_width;   xMax = xLeft + (i+1)*tile_width;
        drop_it =  ( ( xMin < gesture.moveX && gesture.moveX < xMax  )   
                 &&  ( j4Top < gesture.moveY && gesture.moveY < j4Bottom ) )
                 ? true : false;
        if (drop_it) { 
          ii = i; jj = 3;   /* jj=0,1,2 were used by DROP Container */
          if (debug) {
            // console.log("Target dropped in SWAP element: ii(COL) = " + ii + ", jj(ROW) = " + jj);
            console.log("Target dropped in SWAP Container - found valid jj, ii: " + 
                        "\n\t\t" +  jj, ii );
          }  
          break;  // leave the i-loop
        }  
      }
    }

    if (debug && !drop_it) {
      console.log("Searching for TARGET in ballContainer");
    }

    /*******************************************************************************/
    /* If not found among the DROP cells, nor the SWAP row then try ballContainer: */
    /*******************************************************************************/

    if ( ii == -1 || jj == -1) {
      let new_i, new_j;  /* to be used with arr */
      let j5Top = 4*tile_height + swap_gap + yTop, j5Bottom = j5Top + tile_height; 
      for (let i=0; i<number_of_tiles_in_row*number_of_tiles_in_column; i++) {
        xMin = xLeft + i*tile_width;   xMax = xLeft + (i+1)*tile_width;
        console.log("\n**********************************");
        console.log("****** Calculating drop_it: ******");
        console.log("**********************************\n");
        drop_it =  ( ( xMin < gesture.moveX && gesture.moveX < xMax  )   
                 &&  ( j5Top < gesture.moveY && gesture.moveY < j5Bottom ) )
                 ? true : false;
        /* The for loop scans i=0 thru 8 which need to go into last three rows of arr */ 
        /*     i=0 -> arr[4,0]   i=1 -> arr[4,1]   i=2 -> arr[4,2]  */
        /*     i=3 -> arr[5,0]   i=4 -> arr[5,1]   i=5 -> arr[5,2]  */
        /*     i=6 -> arr[6,0]   i=7 -> arr[6,1]   i=8 -> arr[6,2]  */

        new_j = 4 + Math.floor(i/3)  ;
        new_i = i%3 ; 
        // console.log("i -> arr[new_j, new_i]")
        // console.log(i + " -> arr[" + new_j + ",", new_i +"]")

        if (drop_it) { 
          jj = new_j; ii = new_i;
          if (debug) {
            console.log("Target dropped in  ballContainer - found valid jj, ii:" +
                        "\n\t\t" +  jj, ii );
          }  
          break;  // leave the i-loop
        }  
      }
    }

    /************************************************************************/
    /* If drop was outside Grid and not in ballContainer - display and exit */
    /************************************************************************/

    /* Function this.dispGamePos displays the positions of all the cells */

    if ( ii == -1 || jj == -1) {
      if (this.state.debug2D) this.dispGamePos(arr, pos, cFC, ii, jj);

      console.log("Invalid drop position - no further action !")
      return (false)
    }
    
    /* if a valid TARGET was found then need to UPDATE gameState and positionState */


    /*****************/
    /*  ╭─────────╮  */
    /*  │ PART 2  │  */
    /*  ╰─────────╯  */
    /*****************/

    /********************************************************************/
    /* Updating cells dragged from SWAP, inside or outside of the Grid  */
    /********************************************************************/

    if (debug) {
      console.log("\n\t  ╭─────────╮" +    
                  "\n\t  │ PART 2  │" + 
                  "\n\t  ╰─────────╯"  ); 

      /*****
      console.log("We are attempting to drop cell " + cell_being_dragged + ". There are two cases: \n  (1) cell " 
      + cell_being_dragged + " was Outside Grid (DROP and SWAP) before drag (i.e. comes from the ballContainer), \n  (2) cell " 
      + cell_being_dragged + " was ALREADY Inside DROP or in the SWAP row. ");
      *****/
    } 

    // Let boolean variable isInsideGrid = true if cell was inside before drag

    /***************************************************************/
    /* "Flattening" an array means taking a multidimensional array */
    /* and turning it into a regular "single" dimensional array.   */
    /***************************************************************/

    flattenedArray = [].concat(...pos);
    // console.log('flattenedArray');
    // console.log(flattenedArray);
    isInsideGrid = this.isInMatrix(cell_being_dragged, flattenedArray,0,12);

    if (debug) {
      console.log('isInsideGrid = ' + isInsideGrid);
    }

    let jj_ii_of_cell = this.prevPos(cell_being_dragged,pos);
    let old_jj = jj_ii_of_cell[0];
    let old_ii = jj_ii_of_cell[1];

    // console.log('old_ii = ' + old_ii);
    // console.log('old_jj = ' + old_jj);

    if (isInsideGrid) {
      if (debug) console.log("Target cell " + cell_being_dragged + " was INSIDE Grid before drag.")
      // if (debug) console.log("If the cell where we want to drop is OCCUPIED we skip drop, otherwise: (1) drop and (2) SET SOURCE back to EMPTY CELL");
      if (arr[jj][ii] == 0) {
        // Inside cell dragged to another empty cell -> Must set to 0 prev pos !
        if (debug) console.log("cell_being_dragged="+cell_being_dragged);
        if (debug) console.log("isDropArea: Previous Position found as jj, ii = " + jj_ii_of_cell);
        if (debug) console.log("SET SOURCE back to EMPTY CELL (jj,ii) = " + old_jj + ", " + old_ii);

        arr[old_jj][old_ii] = 0;
        pos[old_jj][old_ii] = 0;
        if ( old_jj < 3 ) cFC[0] = cFC[0] - 1;   // Only if [old_jj][old_ii] is in DROP Container

        // (1) mark TARGET cell as occupied, i.e. set arr[jj][ii] = 1;
        // (2) store cell_being_dragged into pos[jj][ii], and
        // (3) update cFC[0] counter only if [jj][ii] in DROP Container

        arr[jj][ii] = 1;
        pos[jj][ii] = cell_being_dragged;
        /* counterFilledCells: [0,swap_gap],   // [filledCells,otherStaff]   */
        if ( jj < 3 ) cFC[0] = cFC[0] + 1;   // Increment cFC[0] ONLY  if [jj][ii] in DROP Container

        if (debug) console.log("Yes arr[" + jj + "][" + ii + "] == 0  - so we drop it and SET SOURCE back to EMPTY CELL + cFC[0] = " + cFC[0]);
        
        /* SET SOURCE to 0 since we dropped ??? */
        arr[old_jj][old_ii] = 0;
        pos[old_jj][old_ii] = 0;

        return (drop_it) ;

      } else {
        if (debug) console.log("Cell at jj(ROW), ii(COL) = " + jj + " " + ii + 
                               " ALREADY MARKED");
        return (!drop_it) ;
      }

    } else {
      if (debug) console.log("Target cell " + cell_being_dragged + " was OUTSIDE Grid before drag.")
      if (debug) console.log("Next drop TARGET if cell is not occupied, i.e. if (arr[" + jj + "][" + ii + "] == 0)");
      console.log("\tAt jj,ii = " + jj + "  " + ii + "   arr[jj][ii] = "  + arr[jj][ii] );
      // console.log(arr);

      if (arr[jj][ii] == 0) {
        // (1) mark TARGET cell as occupied, i.e. set arr[jj][ii] = 1;
        // (2) store cell_being_dragged into pos[jj][ii], and
        // (3) update cFC[0] counter  (cells in DROP Container)

        arr[jj][ii] = 1;
        pos[jj][ii] = cell_being_dragged;
        if ( jj < 3 ) cFC[0] = cFC[0] + 1;
     
        if (debug) {
          console.log("Yes arr[" + jj + "][" + ii + "] == 0  (was in Drop) - so we drop it ");
          // console.log('old_jj = ' + old_jj);
          // console.log('old_ii = ' + old_ii);
        }  
        arr[old_jj][old_ii] = 0;
        pos[old_jj][old_ii] = 0;
        return (drop_it) ;
      } else {
        if (debug) console.log("Cell at jj(ROW), ii(COL) = " + jj + " " + ii + 
                               " ALREADY MARKED");
        return (!drop_it) ;
      }
    }

  }

  prevPos = (cell_being_dragged,pos) => {
    const number_of_tiles_in_row = NUMBER_OF_TILES_IN_ROW;
    const number_of_tiles_in_column = NUMBER_OF_TILES_IN_COLUMN;
    const tile_width  = TILE_WIDTH;
    const tile_height = TILE_HEIGHT;
    var ii=0, jj=0;  // ii(ROW), jj(COL)

    console.log("Function prevPos: searching for CBD=" +cell_being_dragged);     
    for (let icol=0; icol<number_of_tiles_in_row; icol++) {
      for (let jrow=0; jrow< 2*number_of_tiles_in_column + 1 ; jrow++) {
        // console.log("Prev: jrow,icol = " + jrow + " " + icol + " pos[jrow][icol]="+pos[jrow][icol]," CBD=" +cell_being_dragged);
        if ( cell_being_dragged == pos[jrow][icol] ) {
          jj=jrow; ii=icol;
          break;  // leave the j-loop
        }  

      }
      if ( jj != 0 && ii != 0) break;
    }  
    console.log("Function prevPos: found CBD at jj,ii = " + jj + " " + ii)

    if ( jj==0 && ii==0 ) {
      console.log("\n??? Function prevPos: DID NOT FIND CBD=" + cell_being_dragged + 
                  " in array pos ???\n");
    }

    return [jj,ii];
  };


  dispGamePos = (arr, pos, cFC, ii, jj) => {
    alert("gameState = [ [ " + arr[0][0] + ", " 
                             + arr[0][1] + ", "
                             + arr[0][2] + " ] \n "
    + "                       [ " + arr[1][0] + ", "
                                  + arr[1][1] + ", "
                                  + arr[1][2] + " ]\n " 
    + "                       [ " + arr[2][0] + ", "
                                  + arr[2][1] + ", "
                                  + arr[2][2] + " ]\n\n " 
    + "                       [ " + arr[3][0] + ", "
                                  + arr[3][1] + ", "
                                  + arr[3][2] + " ]\n\n " 
    + "                       [ " + arr[4][0] + ", "
                                  + arr[4][1] + ", "
                                  + arr[4][2] + " ] " 
    +                       " [ " + arr[5][0] + ", "
                                  + arr[5][1] + ", "
                                  + arr[5][2] + " ] " 
    +                       " [ " + arr[6][0] + ", "
                                  + arr[6][1] + ", "
                                  + arr[6][2] + " ] ]" );

    alert("positionState = [ [ " + pos[0][0] + ", " 
                             + pos[0][1] + ", "
                             + pos[0][2] + " ] \n "
    + "                          [ " + pos[1][0] + ", "
                                     + pos[1][1] + ", "
                                     + pos[1][2] + " ]\n " 
    + "                          [ " + pos[2][0] + ", "
                                     + pos[2][1] + ", "
                                     + pos[2][2] + " ]\n\n " 
    + "                          [ " + pos[3][0] + ", "
                                     + pos[3][1] + ", "
                                     + pos[3][2] + " ]\n\n " 
    + "                          [ " + pos[4][0] + ", "
                                     + pos[4][1] + ", "
                                     + pos[4][2] + " ] " 
    +                          " [ " + pos[5][0] + ", "
                                     + pos[5][1] + ", "
                                     + pos[5][2] + " ] " 
    +                          " [ " + pos[6][0] + ", "
                                     + pos[6][1] + ", "
                                     + pos[6][2] + " ] ]" );
    if ( ii == -1 || jj == -1) {
      console.log(" no drop inside grid occured ! - now cFC[0] = " + cFC[0] );
    } else if (ii == 0 && jj == 0) {
              console.log("checking Win status: ");
           } else {
             console.log("CELL NOT EMPTY: position [" + jj + ", " + ii + 
                   " ]  already occupied. Now cFC[0] = " + cFC[0]);
           }

    // checkWin:

    // Syntax: var arrayName = new Array(expectedLength);

    let debug = !true;

    var checkWinStat = false;

    if ( cFC[0] == 9 ) { 
      var rowSum = new Array(3), colSum = new Array(3);
      var rowOK  = new Array(3), colOK  = new Array(3);
      var i, j, diagSum, antiSum, diagOK, antiOK;

      for (i = 0; i < 3; i++) {
        rowSum[i] = parseInt(0);
        for (j = 0; j < 3; j++) {
          rowSum[i] += parseInt(pos[j][i]);                
        }
        if (debug) console.log("for row i="+i + " sum = " + rowSum[i]);
        if (rowSum[i] == 15 ) {
          rowOK[i] = true;
        } else {
          rowOK[i] = false;
        }
      }

      for (i = 0; i < 3; i++) {
        colSum[i] = parseInt(0);
        for (j = 0; j < 3; j++) {
          colSum[i] += parseInt(pos[i][j]);                
        }
        if (debug) console.log("for col i="+i + " sum = " + colSum[i]);
        if (colSum[i] == 15) {
          colOK[i] = true;
        } else {
          colOK[i] = false;
        }
      }

      diagSum = parseInt(pos[0][0]) + parseInt(pos[1][1]) + parseInt(pos[2][2]);
      antiSum = parseInt(pos[2][0]) + parseInt(pos[1][1]) + parseInt(pos[0][2]);

      if (debug) console.log( pos[0][0] + pos[1][1] + pos[2][2]);
      if (debug) console.log( pos[2][0] + pos[1][1] + pos[0][2]);

      if (diagSum  == 15) {
        diagOK = true;
      } else {
        diagOK = false;
      }
      if (debug) console.log("diag: " + diagSum + diagOK);
      
      if (antiSum == 15) {
        antiOK = true;
      } else {
        antiOK = false;
      }
      if (debug) console.log("anti: " + antiSum + antiOK);
 
      checkWinStat = rowOK && colOK && diagOK && antiOK;
      if (debug) console.log("checkWinStat = " + checkWinStat + "," + rowOK + colOK + diagOK + antiOK);

    }

  }   //  dispGamePos = (arr, pos, cFC, ii, jj) => {...}

  // If 'Show Status' button was clicked in Parent then dispGamePos will be executed  OUTDATED !

  /******
  (1) Get flattenedArray from nestedArrays using:

          const flattenedArray = [].concat(...nestedArrays);

  ******/

  isInMatrix = (lookForNum, FlatArrayOfNumbers, from, to) => {
    /* myArray.slice(from,to) = array starting with 'from' element up to by not including 'to'. */
    // console.log('FlatArrayOfNumbers.slice(from,to)');
    // console.log(FlatArrayOfNumbers.slice(from,to));
    return FlatArrayOfNumbers.slice(from,to).indexOf(lookForNum) > -1;
  }

  render() {
    // const { counterFilledCells } = this.state;
    // console.log("render-buttonValue="+this.props.circleBeingDragged);
    // this.state.targ = this.props.circleBeingDragged;
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    }

  return (
      <View style={{ flexDirection: "column"}}> 
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[panStyle, styles.circle]}
        >
          <ButtonRound
             buttonTitle = {this.props.circleBeingDragged}
             buttonValue = {this.props.circleBeingDragged}
             borderButtonColor = "blue"
             buttonFontSize={30}
             buttonSize={50}
          />
        </Animated.View>
  
        <View style={{ left: 2, marginLeft: 1, marginTop: 0, backgroundColor: "gold",
                       borderWidth: 1, paddingLeft: 20, paddingRight: 20, width: 50 }}>
           <Text  onClick={ () => { this.myHandleClick() } }  >
             C{this.state.circleBeingDragged} 
           </Text>
        </View>

        <View style={{ flexDirection: "row", top: 0 }}>

          {  this.props.isStatusButtonDisplayed &&  this.props.circleBeingDragged == 9 &&
          <View style={{ backgroundColor: "khaki", marginLeft: -130, marginTop: 8, 
                         top: 40, padding: 14, width: 128, borderWidth: 2,}}>
            <Text style = {{ color: "blue", fontSize: 20, fontWeight: "bold", }} 
                      onClick={ () => { this.myHandleStatus() } }  >
               Game Status Displayed
            </Text>
          </View>
          }  

          {  this.props.isTutorsButtonDisplayed &&  this.props.circleBeingDragged == 9 &&
          <View style={{ backgroundColor: "khaki", marginLeft: 10, marginTop: 8, 
                         top: 40, padding: 14, width: 128, borderWidth: 2,}}>
            <Text style = {{ color: "blue", fontSize: 20, fontWeight: "bold", 
                             justifyContent: "center"
                          }} 
                      onClick={ () => { this.myHandleTutor1()} }  >
               Step 1 Status Displayed
            </Text>
          </View>
          }  

          {  this.props.isTutorsButtonDisplayed &&  this.props.circleBeingDragged == 9 &&
          <View style={{ backgroundColor: "khaki", marginLeft: 10, marginTop: 8, 
                         top: 40, padding: 14, width: 128, borderWidth: 2,}}>
            <Text style = {{ color: "blue", fontSize: 20, fontWeight: "bold", 
                             justifyContent: "center"
                          }} 
                      onClick={ () => { this.myHandleTutor2() } }  >
               Step 2 Status Displayed
            </Text>
          </View>
          }  

          {  this.props.isTutorsButtonDisplayed &&  this.props.circleBeingDragged == 9 &&
          <View style={{ backgroundColor: "khaki", marginLeft: 10, marginTop: 8, 
                         top: 40, padding: 14, width: 128, borderWidth: 2,}}>
            <Text style = {{ color: "blue", fontSize: 20, fontWeight: "bold", 
                             justifyContent: "center"
                          }} 
                      onClick={ () => { this.myHandleTutor3() } }  >
               Step 3 Status Displayed
            </Text>
          </View>
          }  

        </View>

      </View>

    );
  }

};
    // Init value was: <span>{this.props.circleBeingDragged}</span> - Click return to Parent 
    // <Text  onClick={ () => { console.log("Text component clicked circle #"+this.state.circleBeingDragged); 
    //                          this.myHandleClick() } }  >

class ButtonRound extends React.Component {
  state = {
    counter: 0
  }

  render() {
    const { counter } = this.state

    const buttonSize = this.props.buttonSize;
    const fontSize = this.props.buttonFontSize;
    const borderWidth = 3;

    return (
      <SafeAreaView style = {{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        borderColor: this.props.borderButtonColor,
        width: buttonSize, 
        height: buttonSize,
        borderRadius: buttonSize,
        borderWidth: borderWidth,
      }}>
        <Text style = {{
          textAlign: 'center',
          backgroundColor: 'none',
          fontSize: fontSize - 2 * borderWidth,
          lineHeight: fontSize - (Platform.OS === 'ios' ? 2 * borderWidth : borderWidth),
        }}>
          {this.props.buttonTitle}
        </Text>
      </SafeAreaView>
    );
  }
}


let CIRCLE_RADIUS = 25;    // 18;
let styles = StyleSheet.create({
  circle: {
    margin: 1,   // 3,
    backgroundColor: "skyblue",
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
    // borderRadius: 0,  // for a square
 }
});

