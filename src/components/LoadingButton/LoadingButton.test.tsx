import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import LoadingButton from "./LoadingButton";

describe("Loading Button", () => {
  it("render component", () => {
    render(<LoadingButton>More</LoadingButton>);
    expect(screen.queryByText("More")).toBeDefined();
  });

  it("render component with loading state", () => {
    render(<LoadingButton isLoading={true}>More</LoadingButton>);

    expect(screen.queryByText("More")).toBeNull();

    expect(screen.queryByText("Loading...")).toBeInTheDocument();

    expect(screen.getByTestId("js-test-icon")).toBeInTheDocument();
  });

  it("render component with disabled state", () => {
    render(<LoadingButton disabled={true}>More</LoadingButton>);

    expect(screen.queryByRole("button")).toBeDisabled();
  });
});
