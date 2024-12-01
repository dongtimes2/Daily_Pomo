import { beforeEach } from "node:test";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, describe, test, vi } from "vitest";

import { Button } from "./Button";

describe("basic button component testing suite", () => {
  test("button's children will be displayed", () => {
    render(<Button>Test text</Button>);
    expect(screen.getByText("Test text")).toBeInTheDocument();
  });

  test("event will be triggered when the button is pressed", () => {
    const mockOnClick = vi.fn();
    render(<Button onClick={mockOnClick}></Button>);
    const button = screen.getByRole("button");
    button.click();
    expect(mockOnClick).toBeCalledTimes(1);
  });

  test("button should be disabled when the tag is activated", () => {
    const mockOnClick = vi.fn();
    render(<Button disabled>Test text</Button>);
    const button = screen.getByRole("button");
    userEvent.click(button);
    expect(mockOnClick).not.toBeCalled();
  });
});

describe("async function testing suite", () => {
  beforeEach(() => {
    vi.useRealTimers();
  });

  test("when the async function is triggered, a spinner in the button should be shown", async () => {
    const mockOnClick = vi.fn().mockImplementation(async () => {
      return new Promise((res) => setTimeout(res, 1000));
    });
    render(<Button onClick={mockOnClick}></Button>);
    const button = screen.getByRole("button");
    await userEvent.click(button);
    const spinner = await screen.findByTestId("button-spinner");
    expect(spinner).toBeInTheDocument();
  });

  test("when the async function is resolved, a spinner will disappear", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const mockOnClick = vi.fn().mockImplementation(async () => {
      return new Promise((res) => setTimeout(res, 1000));
    });
    render(<Button onClick={mockOnClick}></Button>);
    const button = screen.getByRole("button");
    await userEvent.click(button);
    await vi.runAllTimersAsync();
    expect(screen.queryByTestId("button-spinner")).not.toBeInTheDocument();
  });
});
