
import React, {useState, useEffect} from  "react";

import { SafeAreaView, StyleSheet, View, TouchableOpacity, Image,  } from "react-native";

import Svg,{ Circle, Ellipse, G, LinearGradient, RadialGradient, Line, Path, Polygon,
  Polyline, Rect, Symbol, Text, Use, Defs, Stop } from 'react-native-svg';


const SvgPlot = (props) => {

  /******************************/
  /*  Function state variables  */
  /******************************/

  const [valueA,           setValueA           ] = useState('');
  const [valueB,           setValueB           ] = useState('');
  const [valueC,           setValueC           ] = useState('');
  const [valueR1x,         setValueR1x         ] = useState('');
  const [valueR2x,         setValueR2x         ] = useState('');
  const [valueHH,          setValueHH          ] = useState('');
  const [valueKK,          setValueKK          ] = useState('');
  const [valueYaxis,       setValueYaxis       ] = useState('');
  const [valueSx1,         setValueSx1         ] = useState(0); 
  const [valueSx4,         setValueSx4         ] = useState(0); 
  const [valueS1Width,     setValueS1Width     ] = useState(0); 
  const [valueS4Width,     setValueS4Width     ] = useState(0); 

  const stepsDone   = props.stepsDone  ;
  const stepsRender = props.stepsRender;

  const lastPlotNumber = 9;

  // button = Click to return to Parent some results from this Child.
  function  onChildClick () {
    // Place All results into an array
    props.mutateSVGValues( [valueA, valueB, valueC, valueR1x, valueR2x, valueHH, valueKK,
                            valueYaxis, valueSx1, valueSx4, valueS1Width, valueS4Width,
                            lastPlotNumber
                         ] );
  }

useEffect(() => {
  setValueA(AA);
  setValueB(BB);
  setValueC(CC);
  setValueR1x(rr1);
  setValueR2x(rr2);
  setValueHH(hh);
  setValueKK(kk);
  setValueYaxis(yAxis);
  setValueSx1(Sx1);
  setValueSx4(Sx4);
  setValueS1Width(S1Width);
  setValueS4Width(S4Width);
  }, [AA, BB, CC, yAxis]);

const AA = props.AA;
const BB = props.BB;
const CC = props.CC;
const hh = props.hh;
const kk = props.kk;
const yAxis = props.yAxis;

const rr1 = props.rr1;
const rr2 = props.rr2;

const signA = ( AA > 0 ) ? 1 : -1

/**********************************************/
/*                                            */
/*   A,B,C,r1,r2 are for the Fixed display    */
/*   All plots are done with these variables  */
/*   Only data for the labels comes in thru   */
/*   the props, e.g. hh,kk, and yAxis which   */
/*   is calculated outside this component.    */
/*                                            */
/**********************************************/

let A,B,C,r1,r2;

if ( rr1 != rr2 ) {
  // Fixed display for r1 != r2
  // for yAxCode != 0
  A =   1*signA;
  B = -18*signA;
  C =  45*signA;
  r1 =  3;
  r2 = 15;
} else {
  // Fixed display for r1 == r2
  // for yAxCode == 0
  A =   1*signA;
  B = -18*signA;
  C =  81*signA;
  r1 =  9;
  r2 =  9;
}

let yAxCode =   ( r1 == r2 ) ? 0
              : ((r1 <= yAxis) && (yAxis <= r2) )  ? `2 ` : ( yAxis < r1 ) ? `1` : `3`

//                                              r1        r2
//  yAxCode == 0                                      0             i.e.  r1 == r2
//  yAxCode == 1                      |          o         o 
//  yAxCode == 2                                 o    |    o 
//  yAxCode == 3                                 o         o        |
//  | is the position of yAxis

let Sx1, Sy1, S1Width, S1Height;   // used for defining vBox1 for Vup (signA = -1) parabolas
let Sx4, Sy4, S4Width, S4Height;   // used for defining vBox1 for Vdown (signA = 1) parabolas

let f = (x:any, A:any, B:any, C:any) => {
  return parseInt(A*x*x) + parseInt(B*x) + parseInt(C);
}

// derivative of f
const fP = (x,A,B) => {
  return (parseInt(2*A*x) + parseInt(B));
}

let del;
if ( r2 != r1 ) {
  // del = (r2-r1);
  del = (r2-r1)*1;
} else {
  del = 6;
}

// Vertex (h,k) for fixd plots  

const h = -B/(2*A);
const k = f(h, A, B, C)

const pF = (num) => { 
  return parseFloat(num)
}

const pFP = (num) => { 
  return parseFloat(num).toPrecision(4)
}

const yyAxis =   ((rr1 == rr2) && rr1>0) ? yAxis 
               : ((rr1 == rr2) && rr1<0) ?  2*r1 
               : ((rr1 == rr2) && rr1 == 0) ? r1 
               : yAxis

const r1Line = `r1 = [${pFP(rr1)},${pFP(0.00)}]`;
const r2Line = `r2 = [${pFP(rr2)},${pFP(0.00)}]`;
const v3Line = `V = [${pFP(hh)},${pFP(kk)}]`;


/* TEST CASES: See file QuadraticTestCases for more test cases

   [  AA,  BB,  CC,    rr1,    rr2,   hh,   kk ]

   [  -1,  20, -99,      9,     11,   10,    1 ]  CASE1 yAxis on LEFT
   [  -1,   4,  -3,      1       3     2,    1 ]  CASE1 yAxis on LEFT
   [  -1,   2,  99,     -9      11     1,  100 ]  CASE2 yAxis in MIDDLE
   [  -1, -20, -99,    -11,     -9,  -10,    1 ]  CASE3 yAxis on RIGHT
   [  -1, -20,   0,    -20,      0,  -10,  100 ]  changes ...

   [   1, -20,  99,      9,     11,   10,   -1 ]  case1 yAxis on LEFT
   [   1,  -2, -99,     -9      11     1, -100 ]  case2 yAxis in MIDDLE
   [   1,  20,  99,    -11,     -9,  -10,   -1 ]  case3 yAxis on RIGHT

   [  -1,  18, -81,      9,      9,    9,    0 ]
   [   1, -18,  81,      9,      9,    9,    0 ]

*/

// constants for displays:

const dx2 = 10, dx3 = 15, dy2 = 10;

// Vup                             signA = -1   k > 0
//                                                              
//                   [Mx1,My1] o                     o [Mx2,My2] 
//                              \                   /
//     S1 = [Sx1,Sy1]            \                 /                       
//                   ╭───────────────────────────────────────────╮
//                   │             \             /               │      r1 = [r1,0]   
//     y = 0 axis    │  ─────────── o ───────── o ─────────────  │      r2 = [r2,0]
//                   │               r1       r2                 │       V = [h,k]       
//                   │             [r1,0]   [r2,0]               │
//                   │                  \   /                    │      S1 = [Sx1,Sy1]
//                   │                    o                      │      (top-left corner)
//                   │                      V [h,k]              │      
//                   │                                           │
//                   ╰───────────────────────────────────────────╯

// Vdown
//         
//     S4 = [Sx4,Sy4]             signA = 1   k < 0                                       
//                   ╭───────────────────────────────────────────╮
//                   │                                           │      top-left 
//                   │                      V [h,k]              │      Screen corner:
//                   │                     o                     │      
//                   │                   /   \                   │      S4 = [Sx4,Sy4]
//                   │             [r1,0]    [r2,0]              │
//                   │               r1        r2                │       V = [h,k]   
//     y = 0 axis    │  ─────────── o ────────── o ────────────  │      r2 = [r2,0]
//                   │             /              \              │      r1 = [r1,0]   
//                   ╰───────────────────────────────────────────╯
//                               /                  \
//                    [Mx1,My1] o                    o [Mx2,My2]   
//                                                                 

let TOT_len, ADJ_TOT_len;
let r2X, r3X;
let r2Y, r3Y;
let radCircle, r5X, r5Y, VR1R2Note;
let fszLine;
let r1X, r1Y, posR1X=``;           // used to position labels inside vBox1
let fszShadedCircle, fszPointLabel;
let dxr1, dyr1, dxr2, dyr2, dxv3, dyv3;

let strokeVal; 

/************************************************/
/*                                              */
/*   There are 4 cases depending on position    */
/*   of yAxis relative to r1 and r2:            */
/*                                              */
/************************************************/

/*************************************************************************/
/*                                                                       */
/*                                              r1        r2             */
/*  yAxCode == 0   for r1 == r2                       0                  */
/*  yAxCode == 1                      |          o         o             */
/*  yAxCode == 2                                 o    |    o             */
/*  yAxCode == 3                                 o         o        |    */
/*  | is the position of yAxis                                           */
/*                                                                       */
/*************************************************************************/


/******************/
/*                */
/*  yAxCode == 0  */
/*                */
/******************/

if (yAxCode == 0) {
  if ( signA == -1 ) {
    radCircle  = 0.2;
    VR1R2Note = `V, r1 and r2 are coincident.` 
    r5X = 1.45*r1;
    r1X = 2.30*r1;
    r2X = 2.25*r1;
    r3X = 2.20*r1;
    fszShadedCircle = "2.85"
    fszLine = `1.4`
    fszPointLabel = "2"; 
    posR1X = `A=-1 r1 == r2 == h`
    Sx1 = r1 - dx2;
    Sy1 = -dy2;
    S1Width = 2*dx3;
    S1Height = 10;
    strokeVal =  `0.20`
    radCircle = 0.2;  
    r5Y = "8";
    r1Y = "-14";
    r2Y = "-12";
    r3Y = "-10";
    dxr1 = "-1.5";
    dyr1 = "2.5";
    dxr2 = "1.75";
    dyr2 = "2.5";
    dxv3 = "0.00"; 
    dyv3 = "-1.25";
  } 

  if ( signA ==  1 ) {
    VR1R2Note = `V, r1 and r2 are coincident.` 
    r5X = 1.45*r1;
    r1X = 2.15*r1;
    r2X = 2.20*r1;
    r3X = 2.25*r1;
    fszLine = `1.2`
    Sx4 = r1 - 10;
    Sy4 = -5;
    S4Width = 3.5*r1;
    S4Height = 15;
    radCircle = 0.2;             
    r5Y = "-6";
    r1Y = "4.0"; 
    r2Y = "6.0";
    r3Y = "8.0";
    fszShadedCircle = "2.85"
    fszLine = `1.4`
    fszPointLabel = "2"; 
    strokeVal =  `0.20`
    dxr1 = "-1.75";
    dyr1 = "1.3";
    dxr2 = "1.75";
    dyr2 = "1.3";
    dxv3 = "0.00"; 
    dyv3 = "-1.05";
  }
}  

/******************/
/*                */
/*  yAxCode == 1  */
/*                */
/******************/

if (yAxCode == 1) {
  if ( signA == -1 ) {
    let kk1=0;  
    TOT_len = r2 - yAxis;  ADJ_TOT_len = TOT_len/(1.0*del)
    Sx1 = r1-TOT_len;  S1Width = TOT_len + 5*ADJ_TOT_len;
    Sy1 = -k/2; S1Height = 2*k; 
    strokeVal =   (TOT_len > 5000) ? `3em` 
                : (TOT_len > 1000) ? `9.0` 
                : (TOT_len >  500) ? `5.0` : `0.6`; 
    fszLine = (TOT_len > 5000) ? `20em` :(TOT_len > 1000) ? `4em` : (TOT_len >  500) ? `2.5em` : "4"
    radCircle = (TOT_len > 5000) ? `30.0` : (TOT_len > 1000) ? `9.0` : (TOT_len >  500) ? `4` :  `0.3`;
    fszPointLabel =  (TOT_len > 5000) ? `16em` : (TOT_len > 1000) ? `4em` :  (TOT_len >  500) ? `2em` : `4`
    fszShadedCircle = "8"
    r1X = r1 - 5.0*ADJ_TOT_len;
    r2X = r1 - 4.5*ADJ_TOT_len;
    r3X = r1 - 4.0*ADJ_TOT_len;
    kk1 = (TOT_len >  5000) ? `80` : (TOT_len >  1000) ? `20` : (TOT_len >  500) ? `10` : `1`;
    r1Y = 4*kk1*k/8;
    r2Y = 5*kk1*k/8;
    r3Y = 6*kk1*k/8;

    [dxr1,dyr1,dxr2,dyr2,dxv3,dyv3] =
       (TOT_len > 5000) ? ["-200.00","100.00","200.00","100.00","0.00",9*k]
     : (TOT_len > 1000) ? ["-53.50","63.50","53.50","63.50","0.00",2*k]
     : (TOT_len >  500) ? ["-23.50","33.50","23.50","33.50","0.00",k] 
                        : [ "-3.50", "5.50", "3.75", "5.50","0.00","4.25"]
  } 
  if ( signA ==  1 ) {
    let kk1=0;
    TOT_len = -yAxis + r1; 
    ADJ_TOT_len = TOT_len/(1.0*del)
    Sx4 = r1-TOT_len - 1*ADJ_TOT_len; S4Width = TOT_len + 6*ADJ_TOT_len;
    Sy4 = k*1.2; S4Height = -1.6*k; 
    strokeVal =   (TOT_len > 5000) ? `3em` 
                : (TOT_len > 1000) ? `9.0` 
                : (TOT_len >  500) ? `5.0` : `0.6`; 
    radCircle = (TOT_len > 5000) ? `30.0` : (TOT_len > 1000) ? `9.0` : (TOT_len >  500) ? `4` :  `0.3`;
    fszShadedCircle = "3"
    fszLine = (TOT_len > 5000) ? `20em` : (TOT_len > 1000) ? `4em` : (TOT_len >  500) ? `2.5em` : "4"
    radCircle = (TOT_len > 5000) ? `30.0` :  (TOT_len > 1000) ? `9.0` : (TOT_len >  500) ? `4` :  `0.3`;
    fszPointLabel =  (TOT_len > 5000) ? `16em` :  (TOT_len > 1000) ? `4em` :  (TOT_len >  500) ? `2em` : `4`
    r1X = r1 - 6*ADJ_TOT_len;
    r2X = r1 - 6*ADJ_TOT_len;
    r3X = r1 - 6*ADJ_TOT_len;
    kk1 = (TOT_len >  5000) ? `80` :  (TOT_len >  1000) ? `20` : (TOT_len >  500) ? `10` : `1`;
    r1Y = 2*kk1*k/4;
    r2Y = 3*kk1*k/8;
    r3Y = 2*kk1*k/8;

    [dxr1,dyr1,dxr2,dyr2,dxv3,dyv3] =
       (TOT_len > 5000) ? ["-200.00","100.00","200.00","100.00","0.00",9*k]
     : (TOT_len > 1000) ? ["-53.50","63.50","53.50","63.50","0.00",2*k]
     : (TOT_len >  500) ? ["-23.50","33.50","23.50","33.50","0.00",k] 
                        : [ "-3.50", "3.50", "3.50", "3.50","0.00","-2.25"]
  }
}  


/******************/
/*                */
/*  yAxCode == 2  */
/*                */
/******************/

if (yAxCode == 2) {
  if ( signA == -1 ) {
    TOT_len = r2 - r1; ADJ_TOT_len = TOT_len/(1.0*del)
    // Sx1 = r1-0.01*del; Sy1 = -k/2; S1Width = 1.2*del; S1Height = 2*k; 
    Sx1 = r1-2*ADJ_TOT_len; Sy1 = -k/2; S1Width = TOT_len + 2*ADJ_TOT_len; S1Height = 2*k; 
    strokeVal = `0.2`; 
    fszLine = "3"
    r1X = r1 - 16*ADJ_TOT_len;
    r2X = r1 - 15*ADJ_TOT_len;
    r3X = r1 - 14*ADJ_TOT_len;
    r1Y = 3*k/8;
    r2Y = 4*k/8;
    r3Y = 5*k/8;
    fszPointLabel = `2.5`;
    radCircle = `0.3`;
    fszShadedCircle = "3";
    [dxr1,dyr1,dxr2,dyr2,dxv3,dyv3] = [ "-3.50", "2.50", "3.75", "2.50","3.00","4.25"]

  }
  if ( signA ==  1 ) {
    TOT_len = r2 - r1; ADJ_TOT_len = TOT_len/(1.0*del)  
    Sx4 = r1-ADJ_TOT_len; Sy4 =  k*1.25; S4Width = + 2*ADJ_TOT_len; S4Height = -2.00*k;
    strokeVal = `0.2`; 
    fszLine = "2.5"
    radCircle = `0.3`;
    fszShadedCircle = "3"
    r1X = r1 - 10*ADJ_TOT_len;
    r2X = r1 - 12*ADJ_TOT_len;
    r3X = r1 - 12*ADJ_TOT_len;
    r1Y = 4*k/4;
    r2Y = 7*k/8;
    r3Y = 3*k/4;
    fszPointLabel = `2.5`;
    [dxr1,dyr1,dxr2,dyr2,dxv3,dyv3] = [ "-3.50", "3.50", "3.50", "3.50","3.00","-2.25"]
  }
}  


/******************/
/*                */
/*  yAxCode == 3  */
/*                */
/******************/

if (yAxCode == 3) {
  if ( signA == -1 ) {
    let kk1=0;  
    TOT_len = yAxis - r1; ADJ_TOT_len = TOT_len/(1.0*del)
    Sx1 = r1-ADJ_TOT_len;  S1Width = 1.0*del + TOT_len + ADJ_TOT_len;
    Sy1 = -k/2; S1Height = 2*k; 
    // was `0.2`; 
    strokeVal =   (TOT_len > 5000) ? `3em` 
                : (TOT_len > 1000) ? `9.0` 
                : (TOT_len >  500) ? `5.0` : `0.6`; 
    fszLine = (TOT_len > 5000) ? `20em` :(TOT_len > 1000) ? `4em` : (TOT_len >  500) ? `2.5em` : "4"
    radCircle = (TOT_len > 5000) ? `30.0` : (TOT_len > 1000) ? `9.0` : (TOT_len >  500) ? `4` :  `0.3`;
    fszPointLabel =  (TOT_len > 5000) ? `16em` : (TOT_len > 1000) ? `4em` :  (TOT_len >  500) ? `2em` : `4`
    fszShadedCircle = "8"
    r1X = r2 + 5.0*ADJ_TOT_len;
    r2X = r2 + 4.5*ADJ_TOT_len;
    r3X = r2 + 4.0*ADJ_TOT_len;
    kk1 = (TOT_len >  5000) ? `80` : (TOT_len >  1000) ? `20` : (TOT_len >  500) ? `10` : `1`;
    r1Y = 4*kk1*k/8;
    r2Y = 5*kk1*k/8;
    r3Y = 6*kk1*k/8;

    [dxr1,dyr1,dxr2,dyr2,dxv3,dyv3] =
       (TOT_len > 5000) ? ["-200.00","100.00","200.00","100.00","0.00",9*k]
     : (TOT_len > 1000) ? ["-53.50","63.50","53.50","63.50","0.00",2*k]
     : (TOT_len >  500) ? ["-23.50","33.50","23.50","33.50","0.00",k] 
                        : [ "-3.50", "5.50", "3.75", "5.50","0.00","4.25"]
  }
  if ( signA ==  1 ) {
    let kk1=0;  
    TOT_len = yAxis - r1; ADJ_TOT_len = TOT_len/(1.0*del)
    Sx4 = r1-ADJ_TOT_len; S4Width =  TOT_len + 2*ADJ_TOT_len;
    Sy4 = k*1.1; S4Height = -1.5*k;
    // was  `0.2`; 
    strokeVal =   (TOT_len > 5000) ? `3em` 
                : (TOT_len > 1000) ? `9.0` 
                : (TOT_len >  500) ? `5.0` : `0.6`; 
    radCircle = (TOT_len > 5000) ? `30.0` : (TOT_len > 1000) ? `9.0` : (TOT_len >  500) ? `4` :  `0.3`;
    fszShadedCircle = "3"
    fszLine = (TOT_len > 5000) ? `20em` : (TOT_len > 1000) ? `4em` : (TOT_len >  500) ? `2.5em` : "4"
    radCircle = (TOT_len > 5000) ? `30.0` :  (TOT_len > 1000) ? `9.0` : (TOT_len >  500) ? `4` :  `0.3`;
    fszPointLabel =  (TOT_len > 5000) ? `16em` :  (TOT_len > 1000) ? `4em` :  (TOT_len >  500) ? `2em` : `4`
    
    r1X = r2 + 5.5*ADJ_TOT_len;
    r2X = r2 + 5.7*ADJ_TOT_len;
    r3X = r2 + 5.9*ADJ_TOT_len;

    kk1 = (TOT_len >  5000) ? `80` :  (TOT_len >  1000) ? `20` : (TOT_len >  500) ? `10` : `1`;
    r1Y = 2*kk1*k/4;
    r2Y = 3*kk1*k/8;
    r3Y = 2*kk1*k/8;

    [dxr1,dyr1,dxr2,dyr2,dxv3,dyv3] =
       (TOT_len > 5000) ? ["-200.00","100.00","200.00","100.00","0.00",9*k]
     : (TOT_len > 1000) ? ["-53.50","63.50","53.50","63.50","0.00",2*k]
     : (TOT_len >  500) ? ["-23.50","33.50","23.50","33.50","0.00",k] 
                        : [ "-3.50", "3.50", "3.50", "3.50","0.00","-2.25"]
  }
}  


/************************************************************************************/
/*                                                                                  */
/*   (A) Prepare commands to Plot the fixed  parabola using the commands in path3   */
/*                                                                                  */
/************************************************************************************/

const C_x = (r1+r2)/2;
const Mx1 = r1 - del;  
const Mx2 = r2 + del
const My1 = f(Mx1,A,B,C);
const My2 = f(Mx2,A,B,C);
const C_y = f(Mx1,A,B,C)+fP(Mx1,A,B)*(Mx2-Mx1)/2;

// startPoint    𝑃1=(Mx1,𝑓(Mx1))
// controlPoint  CP=[C_x,C_y]
// endPoint      𝑃2=(Mx2,𝑓(Mx2))

const startPoint = [Mx1, My1];
const endPoint = [Mx2,f(Mx2,A,B,C)];

//      M   0, 0  H ${endPoint[0]+2*del} H ${startPoint[0]-3*del}  z
//      M   ${xLeftFixed},0 H ${xRightFixed}  z
//      M -100 0 H  ${pFP(S1Width)}  H  ${pFP(2*S4Width)} z

const path3 = (
  <path
    d={` 
        M   ${startPoint[0]}, ${startPoint[1]}   
        Q   ${C_x}, ${C_y} 
            ${Mx2}, ${My2}
        M   0, 0  H ${endPoint[0]+2*del} H ${startPoint[0]-3*del}  z
        M 0 0 H  ${pFP(Mx1)} H ${pFP(Mx2)}  H  ${pFP(2*yAxis)} z
        M   ${yyAxis}, ${0}  V  ${startPoint[1] - del} V ${C_y}  
      `}
      fill="none"
      stroke="hotpink"
      strokeWidth = {strokeVal}
  />
)

/************************************************/
/*                                              */
/*   (B) Set vBox1, using the syntax:           */
/*                                              */
/*       viewBox = "min-x min-y width height"   */
/*                                              */
/************************************************/

const vBox1 = (A < 0) ? `${pFP(Sx1)}, ${pFP(Sy1)},
                         ${pFP(S1Width)},  ${pFP(S1Height)}`
                      : `${pFP(Sx4)}, ${Sy4},
                         ${pFP(S4Width)},  ${S4Height}`

    return (
      <SafeAreaView> 
        {/*  description of path3 example */}

        {/* fontSize: 22, ? */}
        <View style={{ marginLeft: 6, display: "none", }} >
          <Text style={{color: "red"}}> The next few lines can be removed by changing the "flex" to "none" in the display attribute of the two View component.</Text>
          <Text>  r1 = {r1}, r2 = {r2}, r1X =  {pFP(r1X)} &nbsp; posR1X = {posR1X} &nbsp; yAxis = {pFP(yAxis)}  yAxCode == {yAxCode} &nbsp; TOT_len = {pFP(TOT_len)} &nbsp; ADJ_TOT_len = {pFP(ADJ_TOT_len)} </Text>
          <Text> Sx1 = {Sx1}, Sy1 = {Sy1}, S1Width = {pFP(S1Width)}, S1Height = {S1Height}, yAxis = {pFP(yAxis)} </Text>
          <Text> Sx4 = {Sx4}, Sy4 = {pFP(Sy4)}, S4Width = {pFP(S4Width)}, S4Height = {S4Height}, yyAxis = {pFP(yyAxis)} </Text>
          <Text>vBox1 = {vBox1} &nbsp; &nbsp; del = {del} &nbsp; k = {k} &nbsp; signA = {signA}</Text>
          <Text> fszLine = {fszLine}, strokeVal = {strokeVal}, radCircle = {pFP(radCircle)} &nbsp;  fszShadedCircle = {pFP(fszShadedCircle)} 
                 &nbsp; yAxis = {pFP(yAxis)} &nbsp; fszLine = {pFP(fszLine)}  &nbsp; fszPointLabel = {pFP(fszPointLabel)} </Text>
          <Text> r1X={pFP(r1X)} &nbsp; r1Y={r1Y}  &nbsp; r2Y={r2Y} &nbsp; r3Y={r3Y} &nbsp; </Text>
          <Text> dxr1={dxr1} &nbsp; dyr1={dyr1}  &nbsp;
                 dxr2={dxr2} &nbsp; dyr2={dyr2}  &nbsp;
                 dxv3={dxv3} &nbsp; dyv3={dyv3}  &nbsp; </Text>
          {/* 
             </View>
          */}
          <Text> del = {del}, Mx1 = {Mx1}, My1 = {My1},Mx2 = {Mx2},  My2 = {My2}, C_x = {C_x}, C_y = {C_y}   </Text>
          <Text>startPoint = [{startPoint[0]},{startPoint[1]}], endPoint = [{endPoint[0]},{endPoint[1]}], Vertex(h,k) = [{h},{k}]   </Text>

          <Text> vBox1={vBox1} &nbsp; </Text>
        </View>

        <View style={{ marginLeft: 6, backgroundColor: 'cyan', margin:30, width: 660,
                       padding: 10, marginTop: 30, borderColor: "blue", borderWidth: 2,
                       display: "none",
                    }}
        >
          <Text>M &nbsp; {startPoint[0]}, {startPoint[1]} &nbsp;( startPoint) </Text>
          <Text>&nbsp;&nbsp;&nbsp; &nbsp;{Mx2},  {My2} &nbsp; (endPoint) </Text>
        </View>
        {/* */}


        {/*  viewBox has no border props so we use this outer view with a border ! */}
        <View style={{ borderColor: "blue", borderWidth: 4, top: -80, width: 418, height: 400, 
                       marginLeft: (stepsRender == 1) ? 480 : -480, 
                       backgroundColor: (stepsRender == 1) ? `lightgreen` : `khaki`,
                       display: (stepsRender == 0 && stepsDone == 0) ? "none" : "flex",
                    }} >
        <svg viewBox={vBox1}
             style={{  maxHeight: 422, marginLeft: (stepsRender == 1) ? 8 : 8, 
                       backgroundColor: (stepsRender == 1) ? `lightgreen` : `khaki`,
                       marginTop:  0, left: 100, width: 400, height: 800,
                       stroke: "blue", strokeWidth: "18",  strokeOpacity: 1,
                   }}
        >
          {path3}
           
          {/* -- Mark points r1, r2, V and Origin[0,0] with shaded circle -- */}
          <g stroke="blue" strokeWidth=".1" fill="none">
            {/*** <circle cx="5" cy="5" r="4" stroke="black" stroke-width="3" fill="red" /> ***/}
            <circle id="r1" cx={r1} cy="0" r={radCircle} fontSize={fszShadedCircle} fill="blue"/>
            <circle id="r2" cx={r2} cy="0" r={radCircle} fontSize={fszShadedCircle} fill="blue"/>
            <circle id="V"  cx={h}  cy={k} r={radCircle} fontSize={fszShadedCircle} fill="blue"/>
            <circle id="Origin" cx={yyAxis} cy="0" r={radCircle} fontSize={fszShadedCircle} 
                    fill="blue"/>
          </g>
                                                 {/*  text-anchor = start | middle | end  */}
           <g fontFamily="Verdana, sans-serif" fill="blue" stroke="none" textAnchor="middle">
             <text x={r1X} y={r1Y} dx="0.0"  dy="0.0" fontSize={fszLine} >{r1Line}</text>
             <text x={r2X} y={r2Y} dx="0.0"  dy="0.0" fontSize={fszLine} >{r2Line}</text>
             <text x={r3X} y={r3Y} dx="0.0"  dy="0.0" fontSize={fszLine} >{v3Line}</text>
             <text x={r5X} y={r5Y} dx="0.0"  dy="0.0" fontSize={fszLine} >{VR1R2Note}</text>
           </g>  


          {/* -- Label the points --*/}
          <g fontFamily="Verdana, sans-serif" fill="blue" stroke="none" textAnchor="middle">
            <text x={r1}  y="0" dx={dxr1} dy={dyr1}  fontSize={fszPointLabel} >r1</text>
            <text x={r2}  y="0" dx={dxr2} dy={dyr2}  fontSize={fszPointLabel} >r2</text>
            <text x={C_x} y={k} dx={dxv3} dy={dyv3}  fontSize={fszPointLabel} >V</text>
          </g>
          {/* */}
 
        </svg>

        { onChildClick() }

        </View>

      </SafeAreaView>   
    );

}

export default SvgPlot ;    

