"use strict";

const fs = require("fs");
const readline = require("readline");
const path = require("node:path");
const filepath = path.resolve("input.txt");
const file = readline.createInterface({ input: fs.createReadStream(filepath) });

function isInclusionSymbol(char) {
  return char !== "." && isNaN(char);
}

function findPartNumber(
  num,
  subLine,
  subPriorLine = null,
  subAfterLine = null
) {
  if (
    isInclusionSymbol(subLine[0]) ||
    isInclusionSymbol(subLine[subLine.length - 1])
  ) {
    return num;
  }
  if (subPriorLine !== null) {
    for (let i = 0; i < subPriorLine.length; i++) {
      if (isInclusionSymbol(subPriorLine[i])) {
        return num;
      }
    }
  }
  if (subAfterLine !== null) {
    for (let i = 0; i < subAfterLine.length; i++) {
      if (isInclusionSymbol(subAfterLine[i])) {
        return num;
      }
    }
  }
  return 0;
}

/**
 *
 * @param {string} line
 * @param {string} priorLine
 * @param {string} afterLine
 * @returns {number}
 */
function calculatePartNumberSum(line, priorLine, afterLine) {
  let sum = 0;
  let numStart;
  for (let i = 0; i < line.length; i++) {
    if (numStart === undefined && !isNaN(line[i])) {
      numStart = i;
    }
    // Check if i is no longer a number or reached end of string
    if ((isNaN(line[i]) || i === line.length - 1) && numStart !== undefined) {
      const lineStart = numStart - 1 >= 0 ? numStart - 1 : numStart;
      const num = parseInt(line.substring(numStart, i + 1));
      // console.log(
      //   `${num}, ${i}/${line.length}, numStart: ${numStart}, lineStart: ${lineStart}`
      // );
      const subLine = line.substring(lineStart, i + 1);
      const subPriorLine =
        priorLine === null ? null : priorLine.substring(lineStart, i + 1);
      const subAfterLine =
        afterLine === null ? null : afterLine.substring(lineStart, i + 1);
      sum += findPartNumber(num, subLine, subPriorLine, subAfterLine);
      numStart = undefined;
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
        sum += calculatePartNumberSum(lastLine, null, processingLine);
        return;
      }
      sum += calculatePartNumberSum(processingLine, lastLine, line);
      lastLine = processingLine;
      processingLine = line;
    })
    .on("close", () => {
      sum += calculatePartNumberSum(processingLine, lastLine, null);
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
testSolution();
