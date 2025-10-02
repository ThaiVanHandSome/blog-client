import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import LikeButton from "./LikeButton";
import userEvent from "@testing-library/user-event";
import { server } from "@/mocks/node";
import { http, HttpResponse } from "msw";
import { API_ENDPOINTS } from "@/constants/api";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

describe("Like Button", () => {
  it("render component", () => {
    render(
      <ReactQueryProvider>
        <LikeButton blogId="test" initialLikes={1} isLiked={false} />
      </ReactQueryProvider>
    );

    expect(screen.queryByText("1")).toBeInTheDocument();
  });

  it("update likes when like", async () => {
    render(
      <ReactQueryProvider>
        <LikeButton blogId="test" initialLikes={2} isLiked={false} />
      </ReactQueryProvider>
    );

    expect(screen.queryByRole("button")).toHaveTextContent("2");
    expect(screen.queryByRole("button")).toHaveAttribute(
      "aria-pressed",
      "false"
    );

    const user = userEvent.setup();

    await user.click(screen.queryByRole("button"));

    await waitFor(() => {
      expect(screen.queryByRole("button")).toHaveTextContent("3");
      expect(screen.queryByRole("button")).toHaveAttribute(
        "aria-pressed",
        "true"
      );
    });
  });

  it("not update when API error", async () => {
    server.use(
      http.post(`${API_ENDPOINTS.BLOG.TOGGLE_LIKE(":id")}`, () => {
        return new HttpResponse(null, {
          status: 400
        });
      })
    );

    render(
      <ReactQueryProvider>
        <LikeButton blogId="test" initialLikes={2} isLiked={false} />
      </ReactQueryProvider>
    );

    expect(screen.queryByRole("button")).toHaveTextContent("2");
    expect(screen.queryByRole("button")).toHaveAttribute(
      "aria-pressed",
      "false"
    );

    const user = userEvent.setup();

    await user.click(screen.queryByRole("button"));

    await new Promise(r => setTimeout(r, 1000));
    await waitFor(() => {
      expect(screen.queryByRole("button")).toHaveTextContent("2");
      expect(screen.queryByRole("button")).toHaveAttribute(
        "aria-pressed",
        "false"
      );
    });
  });
});
