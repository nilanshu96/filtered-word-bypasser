const small_A_CP = 97; const small_Z_CP = 122;
const capital_A_CP = 65; const capital_Z_CP = 90;
const mds_small_A_CP = 120146; //mds = Mathematical Double Struck
const mds_capital_A_CP = 120120;

const mdsExceptionMap = new Map();
mdsExceptionMap.set('C', 'ℂ');
mdsExceptionMap.set('H', 'ℍ');
mdsExceptionMap.set('N', 'ℕ');
mdsExceptionMap.set('P', 'ℙ');
mdsExceptionMap.set('Q', 'ℚ');
mdsExceptionMap.set('R', 'ℝ');
mdsExceptionMap.set('Z', 'ℤ');

const XfyString = function(str) {
    let strOut = "";
    for(const char of str) {
        strOut += XfyCharacter(char);
    }
    return strOut;
}

const XfyCharacter = function(char) {
    let outChar = char;

    const charCP = char.codePointAt(0);

    if(charCP >= small_A_CP && charCP <= small_Z_CP) {
        const diff = charCP - small_A_CP;
        outChar = String.fromCodePoint(mds_small_A_CP + diff);
    } else if(charCP >= capital_A_CP && charCP <= capital_Z_CP) {
        if(mdsExceptionMap.has(char)) {
            outChar = mdsExceptionMap.get(char);
        } else {
            const diff = charCP - capital_A_CP;
            outChar = String.fromCodePoint(mds_capital_A_CP + diff);
        }
    }

    return outChar;
}