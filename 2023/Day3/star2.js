"use strict";

const fs = require("fs");
const readline = require("readline");
const path = require("node:path");
const filepath = path.resolve("input.txt");
const file = readline.createInterface({ input: fs.createReadStream(filepath) });

function findGearRatio(
  lineStart,
  lineEnd,
  line,
  priorLine = null,
  afterLine = null
) {
  let numCount = 0;
  let numsArr = [];
  if (!isNaN(line[lineStart])) {
    numCount += 1;
    numsArr.push([line, lineStart]);
  }
  if (!isNaN(line[lineEnd])) {
    numCount += 1;
    numsArr.push([line, lineEnd]);
  }
  if (priorLine !== null) {
    let check = true;
    for (let i = lineStart; i <= lineEnd; i++) {
      if (isNaN(priorLine[i])) {
        check = true;
        continue;
      }
      if (!isNaN(priorLine[i]) && check) {
        numCount += 1;
        check = false;
        numsArr.push([priorLine, i]);
      }
    }
  }
  if (afterLine !== null) {
    let check = true;
    for (let i = lineStart; i <= lineEnd; i++) {
      if (isNaN(afterLine[i])) {
        check = true;
        continue;
      }
      if (!isNaN(afterLine[i]) && check) {
        numCount += 1;
        check = false;
        numsArr.push([afterLine, i]);
      }
    }
  }
  if (numCount !== 2) {
    return 0;
  }
  return (
    extractNumber(numsArr[0][0], numsArr[0][1]) *
    extractNumber(numsArr[1][0], numsArr[1][1])
  );
}

/**
 * Starting from index, searches outwards until the full number in the string
 * is found. Returns the integer parsed from this number.
 * @param {string} line
 * @param {integer} index
 */
function extractNumber(line, index) {
  if (isNaN(line[index])) {
    console.log("Wrong index in extractNumber for: " + line);
    return -1;
  }
  let l = index - 1;
  let r = index + 1;
  while (l >= 0 && !isNaN(line[l])) {
    // Goes until l is unfavourable, so need to add 1
    l--;
  }
  while (r < line.length && !isNaN(line[r])) {
    // Goes until r is unfavourable, so need to subtract 1
    r++;
  }
  // console.log(
  //   `Original: ${line.substring(l + 1, r)}, Parsed: ${parseInt(
  //     line.substring(l + 1, r)
  //   )}`
  // );
  return parseInt(line.substring(l + 1, r));
}

/**
 *
 * @param {string} line
 * @param {string} priorLine
 * @param {string} afterLine
 * @returns {number}
 */
function calculateGearRatioSum(line, priorLine, afterLine) {
  let sum = 0;
  for (let i = 0; i < line.length; i++) {
    if (line[i] === "*") {
      const lineStart = i - 1 >= 0 ? i - 1 : i;
      const lineEnd = i + 1 < line.length ? i + 1 : i;
      sum += findGearRatio(lineStart, lineEnd, line, priorLine, afterLine);
    }
  }
  return sum;
}

function solveProblem() {
  let sum = 0;
  let lastLine;
  let processingLine;
  file
    .on("line", (line) => {
      if (lastLine === undefined) {
        lastLine = line;
        return;
      }
      if (processingLine === undefined) {
        processingLine = line;
        sum += calculateGearRatioSum(lastLine, null, processingLine);
        return;
      }
      sum += calculateGearRatioSum(processingLine, lastLine, line);
      lastLine = processingLine;
      processingLine = line;
    })
    .on("close", () => {
      sum += calculateGearRatioSum(processingLine, lastLine, null);
      console.log(sum);
    });
}

solveProblem();

function testSolution() {
  let arr = [
    "99..............458...689.556..3............197......582........720.........................515..352..286.........670.741.....895.626......98",
    "@12.910.743.........................13..........................*.............775...956........@.........*................971.-.............*",
    "....*......406.507.97..846..............968+.........253........730...574............#....308......*.....798..............*.......894........",
  ];
  let testSum = 0;
  testSum +=
    calculatePartNumberSum(arr[0], null, arr[1]) +
    calculatePartNumberSum(arr[1], arr[0], arr[2]) +
    calculatePartNumberSum(arr[2], arr[1], null);
  console.log(`Test output: ${testSum}`);
  console.log(
    `Expected output: ${
      910 + 968 + 720 + 730 + 956 + 515 + 286 + 798 + 971 + 895 + 98 + 99 + 12
    }`
  );
}
