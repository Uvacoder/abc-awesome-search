// Start: Calculating Surrogate Pairs
 var High_Surrogate = function(Code_Point){ return Math.floor((Code_Point - 0x10000) / 0x400) + 0xD800 };
 var Low_Surrogate  = function(Code_Point){ return (Code_Point - 0x10000) % 0x400 + 0xDC00 };

 // Reverses The Conversion
 var Code_Point = function(High_Surrogate, Low_Surrogate){
	return (High_Surrogate - 0xD800) * 0x400 + Low_Surrogate - 0xDC00 + 0x10000
 };



 > var codepoint = 0x1F4A9;   								// 0x1F4A9 == 128169
 > High_Surrogate(codepoint).toString(16)
 "d83d"  													// 0xD83D == 55357
 > Low_Surrogate(codepoint).toString(16)
 "dca9"  													// 0xDCA9 == 56489

 > String.fromCharCode(  High_Surrogate(codepoint) , Low_Surrogate(codepoint) );
  "π©"
> String.fromCodePoint(128169)
  "π©"
 > '\ud83d\udca9'
  "π©"
// END




// START: Variable identifiers can effectively include whitespace!
// The **U+3164 HANGUL FILLER** character displays as an advancing whitespace character. The character is rendered as completely invisible (and non advancing, i.e. "zero width"), if not explicitly [supported in rendering](http://unicode.org/faq/unsup_char.html). That means the ugly character replacement (οΏ½) symbol should never be displayed.
> var α = 'foo';
undefined
> α
'foo'


> var γ€= alert;
undefined
> var foo = 'bar'
undefined
> if ( foo ===γ€`baz` ){} 	// alert
undefined


> var varγ€fooγ€\u{A60C}γ€Ο = 'bar';
undefined
> varγ€fooγ€κγ€Ο
'bar'

// END




// START: Modifiers
> 'a'
 "a"

> 'a\u{0308}'
 "aΜ"

> 'a\u{20DE}\u{0308}'
 "aβΜ"

> 'a\u{20DE}\u{0308}\u{20DD}'
 "aβΜβ"

// Modifying Invisible Characters
> '\u{200E}\u{200E}\u{200E}\u{200E}\u{200E}\u{200E}\u{200E}\u{200E}\u{200E}\u{200E}'
 "ββββββββββ"

> '\u{200E}\u{200E}\u{200E}\u{200E}\u{200E}\u{200E}\u{200E}\u{200E}\u{200E}\u{200E}'.length
 10
// END




// START
// In general, characters designated the [ID_START](https://codepoints.net/search?IDS=1) property may be used at the beggining of a variable name. Characters designated with the [ID_CONTINUE](https://codepoints.net/search?IDC=1) property may be used after the first character of a variable.

function rand(ΞΌ,Ο){ ... };

String.prototype.reverseβ΅ = function(){..};

Number.prototype.isTrueΙ = function(){..};

var WhatDoesThisDoΙΙΙΙ = 42
// END




// START: 
// Here are some really creative variable names from Mathias Bynes, https://mathiasbynens.be/notes/javascript-identifiers#examples

// How convenient!
var Ο = Math.PI;

// Sometimes, you just have to use the Bad Parts of JavaScript:
var ΰ² _ΰ²  = eval;

// Code, Y U NO WORK?!
var α_ΰ² ηΰ² _α = 42;

// How about a JavaScript library for functional programming?
var Ξ» = function() {};

// Obfuscate boring variable names for great justice
var \u006C\u006F\u006C\u0077\u0061\u0074 = 'heh';

// β¦or just make up random ones
var κ¬ΰ΅½ββ΄± = 'huh';

// While perfectly valid, this doesnβt work in most browsers:
var foo\u200Cbar = 42;

// This is *not* a bitwise left shift (`<<`):
var γ±γ± = 2;
// This is, though:
γ±γ± << γ±γ±; // 8

// Give yourself a discount:
var price_9ΜΆ9ΜΆ_89 = 'cheap';

// Fun with Roman numerals
var β£ = 4;
var β€ = 5;
β£ + β€; // 9

// Cthulhu was here
var HΝ«ΜΜΜΝ£ΜΜΝ―ΝΝΜ΅ΜΜ»Μ°Μ Μ¬ΝΝEΜ΄Μ·Μ¬ΝΜ±ΜΝΝΜΎΝ¦ΝΝΝΜΜΜ_Μ«Μ Μ±Μ©Μ­Μ€ΝΜΜΜΝ?Ν©ΜΝΜΎΝΝΓΜ³ΝΜ―Μ­Μ±Μ²Μ£Μ ΜΝΜOΜ΄Μ¦ΜΜ―ΜΉΜΌΝ­ΜΝ¨ΜΜΝΝ MΜΆΜΜ Μ­Μ­Μ€Μ»ΝΝΜΜΝ£Ν€ΜΝΝ EΜ’ΜΜ?ΜΉΝΜΜ³Μ£Ν£ΝͺΝΜTΜ‘Μ―Μ³Μ­ΜΜ ΝΝΜΜΜ½ΜΏΝ€ΜΏΜΜαΈ¦Μ±Μ±ΜΊΜ°Μ³ΜΉΜΜ°ΜΜΝͺΜΜ½ΝΜΝ  = 'Zalgo';
// END




/* Start
   If you want to rename all your HTML tags to what appears as nothing, the following script is just what your looking for.
   *Do note however that HTML does not support all unicode characters.*
*/

// U+1160 HANGUL JUNGSEONG FILLER
transformAllTags('α ');

// An actual HTML element node designed to look like a comment node, using the U+01C3 LATIN LETTER RETROFLEX CLICK 
//	<Η-- name="viewport" content="width=device-width"></Η-->
transformAllTags('Η--');

// or even <α β
transformAllTags('\u{1160}\u{20dd}');

// and for a bonus, all existing tag names will have each character ensquared. hβtβmβlβ
transformAllTags();


function transformAllTags (newName){
   // querySelectorAll doesn't actually return an array.
   Array.from(document.querySelectorAll('*'))
     .forEach(function(x){
         transformTag(x, newName);
   });
}

function wonky(str){
  return str.split('').join('\u{20de}') + '\u{20de}';
}

function transformTag(tagIdOrElem, tagType){
    var elem = (tagIdOrElem instanceof HTMLElement) ? tagIdOrElem : document.getElementById(tagIdOrElem);
    if(!elem || !(elem instanceof HTMLElement))return;
    var children = elem.childNodes;
    var parent = elem.parentNode;
    var newNode = document.createElement(tagType||wonky(elem.tagName));
    for(var a=0;a<elem.attributes.length;a++){
        newNode.setAttribute(elem.attributes[a].nodeName, elem.attributes[a].value);
    }
    for(var i= 0,clen=children.length;i<clen;i++){
        newNode.appendChild(children[0]); //0...always point to the first non-moved element
    }
    newNode.style.cssText = elem.style.cssText;
    parent.replaceChild(newNode,elem);
}
// END




// START: Here is what it does support:
function testBegin(str){
 try{
    eval(`document.createElement( '${str}' );`)
    return true;
 }
 catch(e){ return false; }
}

function testContinue(str){
 try{
    eval(`document.createElement( 'a${str}' );`)
    return true;
 }
 catch(e){ return false; }
}
// END




// START: And heres some basic results
// Test if dashes can start an HTML Tag
> testBegin('-')
< false

> testContinue('-')
< true

> testBegin('α -')	// Prepend dash with U+1160 HANGUL JUNGSEONG FILLER
< true
// END
