/*
 * @Author: yangskun
 * @Date: 2021-03-19 19:13:39
 * @LastEditors: yangskun
 * @LastEditTime: 2021-03-19 19:14:03
 * @Description: file content
 */
function wildcard(source, pattern) {
    let starCount = 0;
    for (let i = 0; i < pattern.length; i++) {
        if (pattern[i] === '*') {
            starCount++;
        }
    }

    if (starCount === 0) {
        for (let i = 0; i < pattern.length; i++) {
            if (pattern[i] !== source[i] && pattern[i] !== '?') {
                return false;
            }
        }

        return true;
    }

    let i = 0,
        laseIndex = 0;

    for (i = 0; pattern[i] !== '*'; i++) {
        if (pattern[i] !== source[i] && pattern[i] !== '?') {
            return false;
        }
    }

    laseIndex = i;

    for (let p = 0; p < starCount - 1; p++) {
        i++;
        let subPattern = '';
        while (pattern[i] !== '*') {
            subPattern += pattern[i];
            i++;
        }

        let reg = new RegExp(subPattern.replace(/\?/g, '[\\s\\S]'), 'g');
        reg.lastIndex = laseIndex;

        if (!reg.exec(source)) {
            return false;
        }

        laseIndex = reg.lastIndex;
    }
    for (let j = 0; j <= pattern[pattern.length - j] !== '*'; j++) {
        if (
            pattern[pattern.length - j] !== source[source.length - j] &&
            pattern[pattern.length - j] !== '?'
        ) {
            return false;
        }
    }

    return true;
}

console.log(wildcard('abcdojrf', 'abcd*j*k?rf'));
