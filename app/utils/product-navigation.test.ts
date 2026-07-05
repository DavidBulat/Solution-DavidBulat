import { describe, expect, it } from "vitest";

import {
  getProductReturnTo,
  getReturnToFromState,
} from "./product-navigation";

describe("product navigation helpers", () => {
  it("builds a return URL from pathname and search", () => {
    expect(getProductReturnTo("/", "?q=phone&page=2")).toBe("/?q=phone&page=2");
  });

  it("reads returnTo from router state", () => {
    expect(getReturnToFromState({ returnTo: "/?category=phones" })).toBe(
      "/?category=phones"
    );
  });

  it("falls back to home when state is missing", () => {
    expect(getReturnToFromState(undefined)).toBe("/");
    expect(getReturnToFromState({})).toBe("/");
  });
});
