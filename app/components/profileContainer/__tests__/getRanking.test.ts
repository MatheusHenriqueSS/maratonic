import { inInterval, getRanking } from "../getRanking";

describe("inInterval function tests", () => {
  // Since the function is exclusive ([start, end)),
  // upper limit is end - 1
  test("upper limit + 1", () => {
    const isIn = inInterval([2, 50], 50);
    expect(isIn).toBe(false);
  });
  test("upper limit", () => {
    const isIn = inInterval([2, 50], 49);
    expect(isIn).toBe(true);
  });
  test("lower limit", () => {
    const isIn = inInterval([2, 50], 2);
    expect(isIn).toBe(true);
  });
  test("lower limit - 1", () => {
    const isIn = inInterval([2, 50], 1);
    expect(isIn).toBe(false);
  });
});

describe("getRanking function tests", () => {
  test("lower limit - 1", () => {
    const ranking = getRanking(0);
    expect(ranking).toBe("black");
  });

  test("lower limit", () => {
    const ranking = getRanking(1);
    expect(ranking).toBe("bronze");
  });

  test("first middle limit -1", () => {
    const ranking = getRanking(19);
    expect(ranking).toBe("bronze");
  });

  test("first middle limit", () => {
    const ranking = getRanking(20);
    expect(ranking).toBe("silver");
  });

  test("first middle limit + 1", () => {
    const ranking = getRanking(21);
    expect(ranking).toBe("silver");
  });

  test("second middle limit - 1", () => {
    const ranking = getRanking(49);
    expect(ranking).toBe("silver");
  });

  test("second middle limit", () => {
    const ranking = getRanking(50);
    expect(ranking).toBe("gold");
  });

  test("second middle limit + 1", () => {
    const ranking = getRanking(51);
    expect(ranking).toBe("gold");
  });

  test("third middle limit - 1", () => {
    const ranking = getRanking(99);
    expect(ranking).toBe("gold");
  });

  test("third middle limit", () => {
    const ranking = getRanking(100);
    expect(ranking).toBe("platinum");
  });

  test("third middle limit + 1", () => {
    const ranking = getRanking(101);
    expect(ranking).toBe("platinum");
  });

  test("fourth middle limit - 1", () => {
    const ranking = getRanking(199);
    expect(ranking).toBe("platinum");
  });

  test("fourth middle limit", () => {
    const ranking = getRanking(200);
    expect(ranking).toBe("diamond");
  });

  test("fourth middle limit + 1", () => {
    const ranking = getRanking(201);
    expect(ranking).toBe("diamond");
  });

  test("fifth middle limit - 1", () => {
    const ranking = getRanking(499);
    expect(ranking).toBe("diamond");
  });

  test("fifth middle limit", () => {
    const ranking = getRanking(500);
    expect(ranking).toBe("master");
  });

  test("fifth middle limit + 1", () => {
    const ranking = getRanking(501);
    expect(ranking).toBe("master");
  });

  // Since intervals are exclusive on the right,
  // the upper limit is 1000 - 1
  test("upper limit", () => {
    const ranking = getRanking(999);
    expect(ranking).toBe("master");
  });
  
  test("upper limit + 1", () => {
    const ranking = getRanking(1000);
    expect(ranking).toBe("grand master");
  })
});
