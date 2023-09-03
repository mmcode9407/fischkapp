﻿import App from "../App";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getFlashCards, postNewFlashCard } from "../api/API";
import { IFlashCard } from "../types/types";

jest.mock("../api/API");

const mockedGetCardsRequest = getFlashCards as jest.Mock;
const mockedPostCardsRequest = postNewFlashCard as jest.Mock;

describe("add flashcard", () => {
  it("should add new flashcard when the front and back values are given ", async () => {
    const cards: IFlashCard[] = [];
    mockedGetCardsRequest.mockResolvedValue(cards);

    const data: { flashcard: IFlashCard } = {
      flashcard: { front: "Front text", back: "Back text", _id: "fsase23jk" },
    };
    mockedPostCardsRequest.mockResolvedValue(data);

    render(<App />);

    const addBtn = screen.getByLabelText("addBtn");
    await userEvent.click(addBtn);

    const nextBtn = await waitFor(() => screen.getByText(/next/i));
    const frontTextarea = await waitFor(() => screen.getByRole("textbox"));
    await userEvent.type(frontTextarea, "Front text");
    await userEvent.click(nextBtn);

    const saveBtn = await waitFor(() => screen.getByText(/save/i));
    const backTextarea = await waitFor(() => screen.getByRole("textbox"));
    await userEvent.type(backTextarea, "Back text");
    await userEvent.click(saveBtn);

    await waitFor(() => {
      expect(screen.getByText("Front text")).toBeInTheDocument();
    });
  });

  it("should not add new flashcard when the front value is missing", async () => {
    const cards: IFlashCard[] = [];
    mockedGetCardsRequest.mockResolvedValue(cards);

    render(<App />);

    const addBtn = screen.getByLabelText("addBtn");
    await userEvent.click(addBtn);

    const nextBtn = await waitFor(() => screen.getByText(/next/i));

    await userEvent.click(nextBtn);

    const errorText = await waitFor(() =>
      screen.getByText("Front text is required"),
    );

    expect(errorText).toBeInTheDocument();
  });

  it("should not add new flashcard when the back value is missing", async () => {
    const cards: IFlashCard[] = [];
    mockedGetCardsRequest.mockResolvedValue(cards);

    render(<App />);

    const addBtn = screen.getByLabelText("addBtn");
    await userEvent.click(addBtn);

    const nextBtn = await waitFor(() => screen.getByText(/next/i));
    const frontTextarea = await waitFor(() => screen.getByRole("textbox"));

    await userEvent.type(frontTextarea, "Front text");
    await userEvent.click(nextBtn);

    const saveBtn = await waitFor(() => screen.getByText(/save/i));

    await userEvent.click(saveBtn);

    const errorText = await waitFor(() =>
      screen.getByText("Back text is required"),
    );

    expect(errorText).toBeInTheDocument();
  });
});
