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
var language = 'Gujarati';

Symbol[32] = '\u0020'; // space
Symbol[58] = '\u0a83'; // visarg
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

Vowel[97] = '\u0a85'; //a
Vowel[65] = '\u0a86'; //A
Vowel[105] = '\u0a87'; //i
Vowel[73] = '\u0a88'; //I
Vowel[117] = '\u0a89'; //u
Vowel[85] = '\u0a8a'; //U
Vowel[82] = '\u0a8b'; // R
Vowel[69] = '\u0a8d'; // E
Vowel[101] = '\u0a8f'; //e
Vowel[79] = '\u0a91'; //O
Vowel[111] = '\u0a93'; // o

VowelCombination[0] = new Array(3);
VowelCombination[0][0] = 97; //a
VowelCombination[0][1] = 97; //a
VowelCombination[0][2] = '\u0a86'; //aa

VowelCombination[1] = new Array(3);
VowelCombination[1][0] = 101; //e
VowelCombination[1][1] = 101; //e
VowelCombination[1][2] = '\u0a88'; //ee

VowelCombination[2] = new Array(3);
VowelCombination[2][0] = 111; //o
VowelCombination[2][1] = 111; //o
VowelCombination[2][2] = '\u0a8a'; //oo

VowelCombination[3] = new Array(3);
VowelCombination[3][0] = 82; //R
VowelCombination[3][1] = 85; //U
VowelCombination[3][2] = '\u0a8b';

VowelCombination[4] = new Array(3);
VowelCombination[4][0] = 97; //a
VowelCombination[4][1] = 105; //i
VowelCombination[4][2] = '\u0a90'; //ai

VowelCombination[5] = new Array(3);
VowelCombination[5][0] = 97; //a
VowelCombination[5][1] = 117; //u
VowelCombination[5][2] = '\u0a94'; //au

Consonant[94] = '\u0a81'; // chandrabindu
Consonant[77] = '\u0a82'; // M
Consonant[107] = '\u0a95'; //k
Consonant[103] = '\u0a97'; //g
Consonant[106] = '\u0a9c'; //j
Consonant[122] = '\u0a9d'; //z
Consonant[84] = '\u0a9f'; //T
Consonant[68] = '\u0aa1'; //D
Consonant[78] = '\u0aa3'; //N
Consonant[116] = '\u0aa4'; //t
Consonant[100] = '\u0aa6'; //d
Consonant[110] = '\u0aa8'; //n
Consonant[112] = '\u0aaa'; //p
Consonant[102] = '\u0aab'; //f
Consonant[98] = '\u0aac'; //b
Consonant[109] = '\u0aae'; //m
Consonant[121] = '\u0aaf'; //y
Consonant[114] = '\u0ab0'; //r
Consonant[108] = '\u0ab2'; //l
Consonant[76] = '\u0ab3'; //L
Consonant[118] = '\u0ab5'; //v
Consonant[119] = '\u0ab5'; //w
Consonant[115] = '\u0ab8'; //s
Consonant[120] = '\u0a95\u0acd\u0ab7'; //kSh
Consonant[104] = '\u0ab9'; //h
Consonant[97] = ''; // just empty string
Consonant[VIRAM] = '\u0acd'; // half letter
Consonant[65] = '\u0abe'; //A
Consonant[105] = '\u0abf'; //i
Consonant[73] = '\u0ac0'; //I
Consonant[117] = '\u0ac1'; //u
Consonant[85] = '\u0ac2'; //U
Consonant[VRU] = '\u0ac3'; // VRU
Consonant[69] = '\u0ac5'; //E
Consonant[101] = '\u0ac7'; //e
Consonant[79] = '\u0ac9'; //O
Consonant[111] = '\u0acb'; //o

ConsonantCombination[0] = new Array(3);
ConsonantCombination[0][0] = 107; //k
ConsonantCombination[0][1] = 104; //h
ConsonantCombination[0][2] = '\u0a96'; // kh

ConsonantCombination[1] = new Array(3);
ConsonantCombination[1][0] = 103; //g
ConsonantCombination[1][1] = 104; //h
ConsonantCombination[1][2] = '\u0a98'; //gh

ConsonantCombination[2] = new Array(3);
ConsonantCombination[2][0] = 99; //c
ConsonantCombination[2][1] = 104; //h
ConsonantCombination[2][2] = '\u0a9a'; //ch

ConsonantCombination[3] = new Array(3);
ConsonantCombination[3][0] = 67; //C
ConsonantCombination[3][1] = 104; //h
ConsonantCombination[3][2] = '\u0a9b'; //Ch

ConsonantCombination[4] = new Array(3);
ConsonantCombination[4][0] = 84; //T
ConsonantCombination[4][1] = 104; //h
ConsonantCombination[4][2] = '\u0aa0'; //Th

ConsonantCombination[5] = new Array(3);
ConsonantCombination[5][0] = 68; //D
ConsonantCombination[5][1] = 104; //h
ConsonantCombination[5][2] = '\u0aa2'; //Dh

ConsonantCombination[6] = new Array(3);
ConsonantCombination[6][0] = 116; //t
ConsonantCombination[6][1] = 104; //h
ConsonantCombination[6][2] = '\u0aa5'; //th

ConsonantCombination[7] = new Array(3);
ConsonantCombination[7][0] = 100; //d
ConsonantCombination[7][1] = 104; //dh
ConsonantCombination[7][2] = '\u0aa7'; //dh

ConsonantCombination[8] = new Array(3);
ConsonantCombination[8][0] = 112; //p
ConsonantCombination[8][1] = 104; //ph
ConsonantCombination[8][2] = '\u0aab'; //ph

ConsonantCombination[9] = new Array(3);
ConsonantCombination[9][0] = 98; //b
ConsonantCombination[9][1] = 104; //h
ConsonantCombination[9][2] = '\u0aad'; //bh

ConsonantCombination[10] = new Array(3);
ConsonantCombination[10][0] = 115; //s
ConsonantCombination[10][1] = 104; //h
ConsonantCombination[10][2] = '\u0ab6'; //sh

ConsonantCombination[11] = new Array(3);
ConsonantCombination[11][0] = 83; //S
ConsonantCombination[11][1] = 104; //h
ConsonantCombination[11][2] = '\u0ab7'; //Sh

ConsonantCombination[12] = new Array(3);
ConsonantCombination[12][0] = 74; //J
ConsonantCombination[12][1] = 104; //h
ConsonantCombination[12][2] = '\u0a9c\u0acd\u0a9e'; // Jh

ConsonantCombination[13] = new Array(3);
ConsonantCombination[13][0] = 97; //a
ConsonantCombination[13][1] = 97; //a
ConsonantCombination[13][2] = '\u0abe'; //aa

ConsonantCombination[14] = new Array(3);
ConsonantCombination[14][0] = 101; //e
ConsonantCombination[14][1] = 101; //e
ConsonantCombination[14][2] = '\u0ac0'; //ee

ConsonantCombination[15] = new Array(3);
ConsonantCombination[15][0] = 111; //o
ConsonantCombination[15][1] = 111; //o
ConsonantCombination[15][2] = '\u0ac2'; //oo

ConsonantCombination[16] = new Array(3);
ConsonantCombination[16][0] = 97; //a
ConsonantCombination[16][1] = 105; //i
ConsonantCombination[16][2] = '\u0ac8'; //ai

ConsonantCombination[17] = new Array(3);
ConsonantCombination[17][0] = 97; //a
ConsonantCombination[17][1] = 117; //u
ConsonantCombination[17][2] = '\u0acc'; //au

ConsonantCombination[18] = new Array(3);
ConsonantCombination[18][0] = 78; // N
ConsonantCombination[18][1] = 71; // G
ConsonantCombination[18][2] = '\u0a99'; //NG

ConsonantCombination[19] = new Array(3);
ConsonantCombination[19][0] = 78; // N
ConsonantCombination[19][1] = 89; // Y
ConsonantCombination[19][2] = '\u0a9e'; //NY
