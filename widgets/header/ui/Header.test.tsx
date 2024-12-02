import { describe, expect, test } from "vitest";

import { render, screen } from "@/shared/lib/test";

import { Header } from "./Header";

describe("basic header component testing suite", () => {
  test("header's buttons should be shown", () => {
    render(<Header />);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(3);
  });
});
