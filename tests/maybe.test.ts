/// <reference types="jest" />
import * as m from "../src/index";

describe("Maybe test suite", () => {
  describe("maybeMap", () => {
    it("should return null if value is null", () => {
      expect(m.maybeMap(null, v => v * 36)).toBeNull();
    });

    it("should return null if value is undefined", () => {
      expect(m.maybeMap(undefined, v => v * 36)).toBeNull();
    });

    it("should map value", () => {
      expect(m.maybeMap(1, v => v << 10)).toBe(1024);
    });
  });

  describe("isMaybe", () => {
    it("should return true if value is null", () => {
      expect(m.isMaybe(null)).toBe(true);
    });

    it("should return true if value is undefined", () => {
      expect(m.isMaybe(undefined)).toBe(true);
    });

    it("should return false for all other values", () => {
      expect(m.isMaybe(1)).toBe(false);
      expect(m.isMaybe("")).toBe(false);
      expect(m.isMaybe([].length)).toBe(false);
      expect(m.isMaybe([])).toBe(false);
      expect(m.isMaybe({})).toBe(false);
      expect(m.isMaybe(Symbol(""))).toBe(false);
      expect(m.isMaybe(new Map())).toBe(false);
      expect(m.isMaybe(new Set())).toBe(false);
      expect(m.isMaybe(() => {})).toBe(false);
    });
  })

  describe("maybeFirst", () => {
    it("should return null if all values are null", () => {
      expect(m.maybeFirst([null, undefined], f => f)).toBe(null);
    });

    it("should return first non null value", () => {
      expect(m.maybeFirst([null, null, 1], x => x)).toBe(1);
    });
    
  });

  describe("maybeMapOrElse", () => {
    it("should return the fallback if value is nullable", () => {
      expect(m.maybeMapOrElse(null, (x) => x, () => 42)).toBe(42);
    });

    it("should return value", () => {
      expect(m.maybeMapOrElse(69, (x) => x, () => 42)).toBe(69);
    });

  });

  describe("maybeMapAll", () => {
    it("should return null if one of the values is nullable", () => {
      expect(m.maybeMapAll([null,1,2,3,4], arr => arr)).toBe(null);
    });

    it("should return all values", () => {
      expect(m.maybeMapAll([0,1,2,3,4], arr => arr)).toEqual([0, 1, 2, 3, 4]);
    });
  });

  describe("maybePipe", () => {
    it("should return null if one of the values in the pipe resolves to null", () => {
      const pipe = m.maybePipe(
        <any>{x: {y : 89}},
        val => val.x,
        x => x.y,
        z => z,
        _ => null
      );

      expect(pipe).toBe(null);
    });

    it("should resolve value with operators", () => {
      const pipe = m.maybePipe(
        <any>{x: {y : 69}},
        m.maybeOpMap(val => val.x),
        m.maybeOpFilter(val => val != 32),
        m.maybeOpMap(val => val.y)
      );

      expect(pipe).toBe(69);
    });

    it("should resolve value without operators", () => {
      const pipe = m.maybePipe(
        <any>{x: {y : 69}},
        val => val.x,
        val => val != 32 ? val : null,
        val => val.y
      );

      expect(pipe).toBe(69);
    });
  });
});
