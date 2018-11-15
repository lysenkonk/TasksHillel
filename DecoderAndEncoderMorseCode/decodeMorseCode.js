let morsecode =[
    '.-', '-...', '-.-.', '-..', '.', '..-.', '--.', '....',
   '..', '.---', '-.-', '.-..', '--', '-.', '---', '.--.',
    '--.-', '.-.', '...', '-', '..-', '...-', '.--', '-..-',
    '-.--', '--..'
 ];
 let abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
function decodeMorse(morseCode)
{
    let arrResultDecoding = [];
    morseCode.split('   ').forEach(element => {
        arrResultDecoding.push(element.split(' ').reduce(function(resWord, currentChar)
        {
            return resWord + abc[morsecode.indexOf(currentChar)];
        }, ""));
    });
    return arrResultDecoding.join(' ');
}
let morseCode = ".... . -.--   .--- ..- -.. .";
console.log(decodeMorse(morseCode));
///----------------------------------------------------------------------------------
function encodeMorse(stringTest)
{
    let arrResultEncoding = [];
    stringTest.split(' ').forEach(element => {
        arrResultEncoding.push(element.split('').reduce(function(resWord, currentChar)
        {
            return resWord + morsecode[abc.indexOf(currentChar)] + " ";
        }, ""));
    });
    return arrResultEncoding.join('   ');
}
console.log(encodeMorse("HELLO EVERYBODY"));