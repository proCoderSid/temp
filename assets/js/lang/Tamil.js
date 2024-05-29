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
var ConsonantCombination = new Array(14);
var Symbol = new Array(60);
var VIRAM = 1;
var VRU = 2;
var RU = 3;
var language = 'Tamil';

Symbol[32] = '\u0020'; // space
Symbol[58] = '\u0b83'; // visarg
// Symbol[48] = "\u0be6"; //0
// Symbol[49] = "\u0be7"; //1
// Symbol[50] = "\u0be8"; //2
// Symbol[51] = "\u0be9"; //3
// Symbol[52] = "\u0bea"; //4
// Symbol[53] = "\u0beb"; //5
// Symbol[54] = "\u0bec"; //6
// Symbol[55] = "\u0bed"; //7
// Symbol[56] = "\u0bee"; //8
// Symbol[57] = "\u0bef"; //9

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

Vowel[97] = '\u0b85'; //a
Vowel[65] = '\u0b86'; //A
Vowel[105] = '\u0b87'; //i
Vowel[73] = '\u0b88'; //I
Vowel[117] = '\u0b89'; //u
Vowel[85] = '\u0b8a'; //U
Vowel[82] = '\u0b8b'; // R
Vowel[69] = '\u0b8e'; // E
Vowel[101] = '\u0b8f'; //e
Vowel[79] = '\u0b92'; //O
Vowel[111] = '\u0b93'; // o

VowelCombination[0] = new Array(3);
VowelCombination[0][0] = 97; //a
VowelCombination[0][1] = 97; //a
VowelCombination[0][2] = '\u0b86'; //aa

VowelCombination[1] = new Array(3);
VowelCombination[1][0] = 101; //e
VowelCombination[1][1] = 101; //e
VowelCombination[1][2] = '\u0b88'; //ee

VowelCombination[2] = new Array(3);
VowelCombination[2][0] = 111; //o
VowelCombination[2][1] = 111; //o
VowelCombination[2][2] = '\u0b8a'; //oo

VowelCombination[3] = new Array(3);
VowelCombination[3][0] = 82; //R
VowelCombination[3][1] = 85; //U
VowelCombination[3][2] = '\u0b8b';

VowelCombination[4] = new Array(3);
VowelCombination[4][0] = 97; //a
VowelCombination[4][1] = 105; //i
VowelCombination[4][2] = '\u0b90'; //ai

VowelCombination[5] = new Array(3);
VowelCombination[5][0] = 97; //a
VowelCombination[5][1] = 117; //u
VowelCombination[5][2] = '\u0b94'; //au

// Consonant[94] = "\u0b81"; // NO chandrabindu in Tamil
Consonant[77] = '\u0b82'; // M
Consonant[107] = '\u0b95'; //k
//Consonant[103] = "\u0b97"; //g
Consonant[106] = '\u0b9c'; //j
Consonant[122] = '\u0b9d'; //z
Consonant[84] = '\u0b9f'; //T
//Consonant[68] = "\u0ba1"; //D
Consonant[78] = '\u0ba3'; //N
Consonant[116] = '\u0ba4'; //t
//Consonant[100] = "\u0ba6"; //d
Consonant[110] = '\u0ba8'; //n
Consonant[112] = '\u0baa'; //p
//Consonant[102] = "\u0bab"; //f
//Consonant[98] = "\u0bac"; //b
Consonant[109] = '\u0bae'; //m
Consonant[121] = '\u0baf'; //y
Consonant[114] = '\u0bb0'; //r
Consonant[108] = '\u0bb2'; //l
Consonant[76] = '\u0bb3'; //L
Consonant[118] = '\u0bb5'; //v
Consonant[119] = '\u0bb5'; //w
Consonant[115] = '\u0bb8'; //s
Consonant[120] = '\u0b95\u0bcd\u0bb7'; //kSh
Consonant[104] = '\u0bb9'; //h
Consonant[97] = ''; // just empty string
Consonant[VIRAM] = '\u0bcd'; // half letter
Consonant[65] = '\u0bbe'; //A
Consonant[105] = '\u0bbf'; //i
Consonant[73] = '\u0bc0'; //I
Consonant[117] = '\u0bc1'; //u
Consonant[85] = '\u0bc2'; //U
Consonant[VRU] = '\u0bc3'; // VRU
Consonant[69] = '\u0bc6'; //E
Consonant[101] = '\u0bc7'; //e
Consonant[79] = '\u0bca'; //O
Consonant[111] = '\u0bcb'; //o

ConsonantCombination[0] = new Array(3);
ConsonantCombination[0][0] = 99; //c
ConsonantCombination[0][1] = 104; //h
ConsonantCombination[0][2] = '\u0b9a'; //ch

ConsonantCombination[1] = new Array(3);
ConsonantCombination[1][0] = 78; //N
ConsonantCombination[1][1] = 78; //N
ConsonantCombination[1][2] = '\u0ba9'; //NN

ConsonantCombination[2] = new Array(3);
ConsonantCombination[2][0] = 115; //s
ConsonantCombination[2][1] = 104; //h
ConsonantCombination[2][2] = '\u0bb6'; //sh

ConsonantCombination[3] = new Array(3);
ConsonantCombination[3][0] = 83; //S
ConsonantCombination[3][1] = 104; //h
ConsonantCombination[3][2] = '\u0bb7'; //Sh

ConsonantCombination[4] = new Array(3);
ConsonantCombination[4][0] = 74; //J
ConsonantCombination[4][1] = 104; //h
ConsonantCombination[4][2] = '\u0b9c\u0bcd\u0b9e'; // Jh

ConsonantCombination[5] = new Array(3);
ConsonantCombination[5][0] = 97; //a
ConsonantCombination[5][1] = 97; //a
ConsonantCombination[5][2] = '\u0bbe'; //aa

ConsonantCombination[6] = new Array(3);
ConsonantCombination[6][0] = 101; //e
ConsonantCombination[6][1] = 101; //e
ConsonantCombination[6][2] = '\u0bc0'; //ee

ConsonantCombination[7] = new Array(3);
ConsonantCombination[7][0] = 111; //o
ConsonantCombination[7][1] = 111; //o
ConsonantCombination[7][2] = '\u0bc2'; //oo

ConsonantCombination[8] = new Array(3);
ConsonantCombination[8][0] = 97; //a
ConsonantCombination[8][1] = 105; //i
ConsonantCombination[8][2] = '\u0bc8'; //ai

ConsonantCombination[9] = new Array(3);
ConsonantCombination[9][0] = 97; //a
ConsonantCombination[9][1] = 117; //u
ConsonantCombination[9][2] = '\u0bcc'; //au

ConsonantCombination[10] = new Array(3);
ConsonantCombination[10][0] = 78; // N
ConsonantCombination[10][1] = 71; // G
ConsonantCombination[10][2] = '\u0b99'; //NG

ConsonantCombination[11] = new Array(3);
ConsonantCombination[11][0] = 78; // N
ConsonantCombination[11][1] = 89; // Y
ConsonantCombination[11][2] = '\u0b9e'; //NY

ConsonantCombination[12] = new Array(3);
ConsonantCombination[12][0] = 114; // r
ConsonantCombination[12][1] = 114; // r
ConsonantCombination[12][2] = '\u0bb1'; //RR

ConsonantCombination[13] = new Array(3);
ConsonantCombination[13][0] = 76; // L
ConsonantCombination[13][1] = 76; // L
ConsonantCombination[13][2] = '\u0bb4'; //LL
