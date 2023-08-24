exports.twoPointer = (orderedArr, exerciseArr, key) => {
  const res = [];
  let pointerOne = 0;
  let pointerTwo = 0;

  console.log(orderedArr, exerciseArr, key);

  const exerciseArrDeepCopy = JSON.parse(JSON.stringify(exerciseArr));

  while (pointerOne < orderedArr.length) {
    const orderedName = orderedArr[pointerOne];
    const unorderedName = exerciseArrDeepCopy[pointerTwo][key];

    if (orderedName === unorderedName) {
      res.push(exerciseArrDeepCopy[pointerTwo]);
      exerciseArrDeepCopy.splice(pointerTwo, 1);
      pointerOne++;
      pointerTwo = 0;
    } else {
      pointerTwo++;
    }
  }

  return res;
};
