exports.twoPointer = (orderedArr, exerciseArr, key) => {
  const res = [];
  let pointerOne = 0;
  let pointerTwo = 0;

  console.log(orderedArr, exerciseArr, key);

  if (!orderedArr.length || !exerciseArr.length || !key) {
    return exerciseArr;
  }

  while (pointerOne < orderedArr.length) {
    const orderedName = orderedArr[pointerOne];
    const unorderedName = exerciseArr[pointerTwo][key];

    if (orderedName === unorderedName) {
      res.push(exerciseArr[pointerTwo]);

      pointerOne++;
      pointerTwo = 0;
    } else {
      pointerTwo++;
    }
  }

  return res;
};
