/* Indian Language Type Pad -  http://www.monusoft.com
Copyright (c) Monusoft

Permission is hereby granted to any person obtaining a copy of this software and associated
the rights to use, copy, modify, merge copies of the Software for personal non-commercial use only and
to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions
of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.
*/
var Vowel = new Array(123);
var VowelCombination = new Array(6);
var Consonant = new Array(123);
var ConsonantCombination = new Array(19);
var Symbol = new Array(60);
var VIRAM = 1;
var VRU = 2;
var RU = 3;
var language = 'Kannada';

Symbol[32] = '\u0020'; // space
Symbol[58] = '\u0c83'; // visarg
// Symbol[48] = "\u0ce6"; //0
// Symbol[49] = "\u0ce7"; //1
// Symbol[50] = "\u0ce8"; //2
// Symbol[51] = "\u0ce9"; //3
// Symbol[52] = "\u0cea"; //4
// Symbol[53] = "\u0ceb"; //5
// Symbol[54] = "\u0cec"; //6
// Symbol[55] = "\u0ced"; //7
// Symbol[56] = "\u0cee"; //8
// Symbol[57] = "\u0cef"; //9

Symbol[48] = '0'; //0
Symbol[49] = '1'; //1
Symbol[50] = '2'; //2
Symbol[51] = '3'; //3
Symbol[52] = '4'; //4
Symbol[53] = '5'; //5
Symbol[54] = '6'; //6
Symbol[55] = '7'; //7
Symbol[56] = '8'; //8
Symbol[57] = '9'; //9

Vowel[97] = '\u0c85'; //a
Vowel[65] = '\u0c86'; //A
Vowel[105] = '\u0c87'; //i
Vowel[73] = '\u0c88'; //I
Vowel[117] = '\u0c89'; //u
Vowel[85] = '\u0c8a'; //U
Vowel[82] = '\u0c8b'; // R
Vowel[69] = '\u0c8e'; // E
Vowel[101] = '\u0c8f'; //e
Vowel[79] = '\u0c92'; //O
Vowel[111] = '\u0c93'; // o

VowelCombination[0] = new Array(3);
VowelCombination[0][0] = 97; //a
VowelCombination[0][1] = 97; //a
VowelCombination[0][2] = '\u0c86'; //aa

VowelCombination[1] = new Array(3);
VowelCombination[1][0] = 101; //e
VowelCombination[1][1] = 101; //e
VowelCombination[1][2] = '\u0c88'; //ee

VowelCombination[2] = new Array(3);
VowelCombination[2][0] = 111; //o
VowelCombination[2][1] = 111; //o
VowelCombination[2][2] = '\u0c8a'; //oo

VowelCombination[3] = new Array(3);
VowelCombination[3][0] = 82; //R
VowelCombination[3][1] = 85; //U
VowelCombination[3][2] = '\u0c8b';

VowelCombination[4] = new Array(3);
VowelCombination[4][0] = 97; //a
VowelCombination[4][1] = 105; //i
VowelCombination[4][2] = '\u0c90'; //ai

VowelCombination[5] = new Array(3);
VowelCombination[5][0] = 97; //a
VowelCombination[5][1] = 117; //u
VowelCombination[5][2] = '\u0c94'; //au

//Consonant[94] = "\u0c81"; // NO chandrabindu in kannada
Consonant[77] = '\u0c82'; // M
Consonant[107] = '\u0c95'; //k
Consonant[103] = '\u0c97'; //g
Consonant[106] = '\u0c9c'; //j
Consonant[122] = '\u0c9d'; //z
Consonant[84] = '\u0c9f'; //T
Consonant[68] = '\u0ca1'; //D
Consonant[78] = '\u0ca3'; //N
Consonant[116] = '\u0ca4'; //t
Consonant[100] = '\u0ca6'; //d
Consonant[110] = '\u0ca8'; //n
Consonant[112] = '\u0caa'; //p
Consonant[102] = '\u0cab'; //f
Consonant[98] = '\u0cac'; //b
Consonant[109] = '\u0cae'; //m
Consonant[121] = '\u0caf'; //y
Consonant[114] = '\u0cb0'; //r
Consonant[108] = '\u0cb2'; //l
Consonant[76] = '\u0cb3'; //L
Consonant[118] = '\u0cb5'; //v
Consonant[119] = '\u0cb5'; //w
Consonant[115] = '\u0cb8'; //s
Consonant[120] = '\u0c95\u0ccd\u0cb7'; //kSh
Consonant[104] = '\u0cb9'; //h
Consonant[97] = ''; // just empty string
Consonant[VIRAM] = '\u0ccd'; // half letter
Consonant[65] = '\u0cbe'; //A
Consonant[105] = '\u0cbf'; //i
Consonant[73] = '\u0cc0'; //I
Consonant[117] = '\u0cc1'; //u
Consonant[85] = '\u0cc2'; //U
Consonant[VRU] = '\u0cc3'; // VRU
Consonant[69] = '\u0cc6'; //E
Consonant[101] = '\u0cc7'; //e
Consonant[79] = '\u0cca'; //O
Consonant[111] = '\u0ccb'; //o

ConsonantCombination[0] = new Array(3);
ConsonantCombination[0][0] = 107; //k
ConsonantCombination[0][1] = 104; //h
ConsonantCombination[0][2] = '\u0c96'; // kh

ConsonantCombination[1] = new Array(3);
ConsonantCombination[1][0] = 103; //g
ConsonantCombination[1][1] = 104; //h
ConsonantCombination[1][2] = '\u0c98'; //gh

ConsonantCombination[2] = new Array(3);
ConsonantCombination[2][0] = 99; //c
ConsonantCombination[2][1] = 104; //h
ConsonantCombination[2][2] = '\u0c9a'; //ch

ConsonantCombination[3] = new Array(3);
ConsonantCombination[3][0] = 67; //C
ConsonantCombination[3][1] = 104; //h
ConsonantCombination[3][2] = '\u0c9b'; //Ch

ConsonantCombination[4] = new Array(3);
ConsonantCombination[4][0] = 84; //T
ConsonantCombination[4][1] = 104; //h
ConsonantCombination[4][2] = '\u0ca0'; //Th

ConsonantCombination[5] = new Array(3);
ConsonantCombination[5][0] = 68; //D
ConsonantCombination[5][1] = 104; //h
ConsonantCombination[5][2] = '\u0ca2'; //Dh

ConsonantCombination[6] = new Array(3);
ConsonantCombination[6][0] = 116; //t
ConsonantCombination[6][1] = 104; //h
ConsonantCombination[6][2] = '\u0ca5'; //th

ConsonantCombination[7] = new Array(3);
ConsonantCombination[7][0] = 100; //d
ConsonantCombination[7][1] = 104; //dh
ConsonantCombination[7][2] = '\u0ca7'; //dh

ConsonantCombination[8] = new Array(3);
ConsonantCombination[8][0] = 112; //p
ConsonantCombination[8][1] = 104; //ph
ConsonantCombination[8][2] = '\u0cab'; //ph

ConsonantCombination[9] = new Array(3);
ConsonantCombination[9][0] = 98; //b
ConsonantCombination[9][1] = 104; //h
ConsonantCombination[9][2] = '\u0cad'; //bh

ConsonantCombination[10] = new Array(3);
ConsonantCombination[10][0] = 115; //s
ConsonantCombination[10][1] = 104; //h
ConsonantCombination[10][2] = '\u0cb6'; //sh

ConsonantCombination[11] = new Array(3);
ConsonantCombination[11][0] = 83; //S
ConsonantCombination[11][1] = 104; //h
ConsonantCombination[11][2] = '\u0cb7'; //Sh

ConsonantCombination[12] = new Array(3);
ConsonantCombination[12][0] = 74; //J
ConsonantCombination[12][1] = 104; //h
ConsonantCombination[12][2] = '\u0c9c\u0ccd\u0c9e'; // Jh

ConsonantCombination[13] = new Array(3);
ConsonantCombination[13][0] = 97; //a
ConsonantCombination[13][1] = 97; //a
ConsonantCombination[13][2] = '\u0cbe'; //aa

ConsonantCombination[14] = new Array(3);
ConsonantCombination[14][0] = 101; //e
ConsonantCombination[14][1] = 101; //e
ConsonantCombination[14][2] = '\u0cc0'; //ee

ConsonantCombination[15] = new Array(3);
ConsonantCombination[15][0] = 111; //o
ConsonantCombination[15][1] = 111; //o
ConsonantCombination[15][2] = '\u0cc2'; //oo

ConsonantCombination[16] = new Array(3);
ConsonantCombination[16][0] = 97; //a
ConsonantCombination[16][1] = 105; //i
ConsonantCombination[16][2] = '\u0cc8'; //ai

ConsonantCombination[17] = new Array(3);
ConsonantCombination[17][0] = 97; //a
ConsonantCombination[17][1] = 117; //u
ConsonantCombination[17][2] = '\u0ccc'; //au

ConsonantCombination[18] = new Array(3);
ConsonantCombination[18][0] = 78; // N
ConsonantCombination[18][1] = 71; // G
ConsonantCombination[18][2] = '\u0c99'; //NG

ConsonantCombination[19] = new Array(3);
ConsonantCombination[19][0] = 78; // N
ConsonantCombination[19][1] = 89; // Y
ConsonantCombination[19][2] = '\u0c9e'; //NY
