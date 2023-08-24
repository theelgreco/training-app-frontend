const { twoPointer } = require("../utils/utils");

describe("test suite for utils", () => {
  test("returns an array", () => {
    const inputOne = ["1", "2", "3", "4"];
    const inputTwo = [
      { exerciseName: "2" },
      { exerciseName: "1" },
      { exerciseName: "4" },
      { exerciseName: "3" },
    ];
    const key = "exerciseName";
    const actual = twoPointer(inputOne, inputTwo, key);

    expect(Array.isArray(actual)).toBe(true);
  });
  test("returned array is same length as before", () => {
    const inputOne = ["1", "2", "3", "4"];
    const inputTwo = [
      { exerciseName: "2" },
      { exerciseName: "1" },
      { exerciseName: "4" },
      { exerciseName: "3" },
    ];
    const key = "exerciseName";
    const actual = twoPointer(inputOne, inputTwo, key);
    const expected = inputTwo.length;
    expect(actual.length).toBe(expected);
  });
  test("original array is not mutated", () => {
    const inputOne = ["1", "2", "3", "4"];
    const inputTwo = [
      { exerciseName: "2" },
      { exerciseName: "1" },
      { exerciseName: "4" },
      { exerciseName: "3" },
    ];
    const key = "exerciseName";
    const actual = twoPointer(inputOne, inputTwo, key);
    expect(actual[0]).not.toBe(inputTwo[0]);
  });
  test("returned array is in correct order", () => {
    const inputOne = ["1", "2", "3", "4"];
    const inputTwo = [
      { exerciseName: "2" },
      { exerciseName: "1" },
      { exerciseName: "4" },
      { exerciseName: "3" },
    ];
    const key = "exerciseName";
    const actual = twoPointer(inputOne, inputTwo, key);
    const expected = [
      { exerciseName: "1" },
      { exerciseName: "2" },
      { exerciseName: "3" },
      { exerciseName: "4" },
    ];
    expect(actual).toEqual(expected);
  });
});
