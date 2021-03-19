/*
 * @Author: yangskun
 * @Date: 2021-03-18 19:09:34
 * @LastEditors: yangskun
 * @LastEditTime: 2021-03-18 19:39:41
 * @Description: KMP字符串模式匹配算法
 */

/**
 * @description: kmp算法
 * @param {*} source 原串
 * @param {*} pattern 模式串
 * @return {*}
 */
function kmp(source, pattern) {
    let table = new Array(pattern.length).fill(0);
    // 计算table
    {
        let i = 1,
            j = 0;
        while (i < pattern.length) {
            if (pattern[i] === pattern[j]) {
                ++j, ++i;
                table[i] = j;
            } else {
                if (j > 0) {
                    j = table[j];
                } else {
                    ++i;
                }
            }
        }
    }
    // 匹配
    {
        let i = 0,
            j = 0;
        while (i < source.length) {
            if (pattern[j] === source[i]) {
                ++i, ++j;
            } else {
                if (j > 0) {
                    j = table[j];
                } else {
                    ++i;
                }
            }
            if (j === pattern.length) {
                return true;
            }
        }
        return false;
    }
}

// console.log(kmp('Hello', 'll')); // true
// console.log(kmp('abcdabce', 'abce')); // true
console.log(kmp('abcdabcdabcex', 'abcdabce')); // true
