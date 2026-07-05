import { describe, expect, it } from "vitest";

import {
  buildProductSearchParams,
  formatCategoryLabel,
  getPageRange,
  getTotalPages,
  getVisiblePages,
  hasActiveProductFilters,
  parseProductSearchParams,
  truncateDescription,
} from "./products";

describe("parseProductSearchParams", () => {
  it("returns defaults for an empty query string", () => {
    expect(parseProductSearchParams(new URLSearchParams())).toEqual({
      q: "",
      category: "",
      minPrice: null,
      maxPrice: null,
      page: 1,
      limit: 12,
      view: "cards",
      scroll: "pages",
    });
  });

  it("parses filters and pagination from the URL", () => {
    const params = new URLSearchParams(
      "q=phone&category=smartphones&minPrice=100&maxPrice=500&page=2&limit=24&view=table&scroll=infinite"
    );

    expect(parseProductSearchParams(params)).toEqual({
      q: "phone",
      category: "smartphones",
      minPrice: 100,
      maxPrice: 500,
      page: 2,
      limit: 24,
      view: "table",
      scroll: "infinite",
    });
  });
});

describe("buildProductSearchParams", () => {
  it("omits default values from the generated query string", () => {
    const params = buildProductSearchParams(new URLSearchParams(), {
      q: "phone",
      category: "smartphones",
      page: 2,
      limit: 24,
      view: "table",
      scroll: "infinite",
    });

    expect(params.toString()).toBe(
      "q=phone&category=smartphones&page=2&limit=24&view=table&scroll=infinite"
    );
  });

  it("resets page when filters change", () => {
    const current = new URLSearchParams("q=old&page=3");
    const params = buildProductSearchParams(current, { q: "new", page: 1 });

    expect(params.get("q")).toBe("new");
    expect(params.has("page")).toBe(false);
  });
});

describe("hasActiveProductFilters", () => {
  it("detects active filters", () => {
    expect(
      hasActiveProductFilters({
        q: "",
        category: "",
        minPrice: null,
        maxPrice: null,
      })
    ).toBe(false);

    expect(
      hasActiveProductFilters({
        q: "phone",
        category: "",
        minPrice: null,
        maxPrice: null,
      })
    ).toBe(true);
  });
});

describe("truncateDescription", () => {
  it("leaves short descriptions unchanged", () => {
    expect(truncateDescription("Short description")).toBe("Short description");
  });

  it("truncates long descriptions to 100 characters", () => {
    const description = "a".repeat(120);
    const result = truncateDescription(description);

    expect(result.length).toBeLessThanOrEqual(101);
    expect(result.endsWith("…")).toBe(true);
  });
});

describe("formatCategoryLabel", () => {
  it("formats category slugs for display", () => {
    expect(formatCategoryLabel("home-decoration")).toBe("Home Decoration");
  });
});

describe("pagination helpers", () => {
  it("calculates total pages", () => {
    expect(getTotalPages(25, 12)).toBe(3);
    expect(getTotalPages(0, 12)).toBe(1);
  });

  it("calculates page range", () => {
    expect(getPageRange(2, 12, 25)).toEqual({ start: 13, end: 24 });
    expect(getPageRange(1, 12, 0)).toEqual({ start: 0, end: 0 });
  });

  it("returns visible page numbers with ellipsis gaps", () => {
    expect(getVisiblePages(5, 10)).toEqual([1, 4, 5, 6, 10]);
  });
});
