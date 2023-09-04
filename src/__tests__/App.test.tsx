import App from "../App";
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

describe("edit flashcard", () => {
  it("should edit flashcard when the text value is given ", async () => {
    const cards: IFlashCard[] = [
      { front: "front1", back: "back1", _id: "123" },
    ];
    mockedGetCardsRequest.mockResolvedValue(cards);

    render(<App />);

    const editBtn = await waitFor(() => screen.getByLabelText("frontEditBtn"));
    await userEvent.click(editBtn);

    const frontTextarea = await waitFor(() => screen.getByRole("textbox"));
    await userEvent.clear(frontTextarea);
    await userEvent.type(frontTextarea, "front1 edited");

    const saveBtn = await waitFor(() => screen.getByText(/save/i));
    await userEvent.click(saveBtn);

    await waitFor(() => {
      expect(screen.getByText("front1 edited")).toBeInTheDocument();
    });
  });

  it("should not be possible to edit a flashcard when edited value is empty", async () => {
    const cards: IFlashCard[] = [
      { front: "front1", back: "back1", _id: "123" },
    ];
    mockedGetCardsRequest.mockResolvedValue(cards);

    render(<App />);

    const editBtn = await waitFor(() => screen.getByLabelText("frontEditBtn"));
    await userEvent.click(editBtn);

    const frontTextarea = await waitFor(() => screen.getByRole("textbox"));
    await userEvent.clear(frontTextarea);

    const saveBtn = await waitFor(() => screen.getByText(/save/i));
    await userEvent.click(saveBtn);

    const errorText = await waitFor(() =>
      screen.getByText("Front text is required!"),
    );

    expect(errorText).toBeInTheDocument();
  });

  it("should exit editing mode when clicking cancel button", async () => {
    const cards: IFlashCard[] = [
      { front: "front1", back: "back1", _id: "123" },
    ];
    mockedGetCardsRequest.mockResolvedValue(cards);

    render(<App />);

    const editBtn = await waitFor(() => screen.getByLabelText("frontEditBtn"));
    await userEvent.click(editBtn);

    const cancelBtn = await waitFor(() => screen.getByText(/cancel/i));
    await userEvent.click(cancelBtn);

    await waitFor(() => {
      expect(cancelBtn).not.toBeInTheDocument();
    });
  });
});

describe("get flashcard", () => {
  it("should get all flashcard", async () => {
    const cards: IFlashCard[] = [
      { front: "front", back: "back", _id: "jkasjd123" },
      { front: "front", back: "back", _id: "hjhuwd23j" },
    ];
    mockedGetCardsRequest.mockResolvedValue(cards);

    render(<App />);

    await waitFor(() => {
      expect(screen.getAllByText("front").length).toBe(2);
    });
  });
});

describe("delete flashcard", () => {
  it("should delete flashcard when clicking on Trash icon", async () => {
    const cards: IFlashCard[] = [{ front: "front", back: "back", _id: "123" }];
    mockedGetCardsRequest.mockResolvedValue(cards);

    render(<App />);

    const card = await waitFor(() => screen.getByText("front"));
    const editBtn = await waitFor(() => screen.getByLabelText("frontEditBtn"));
    await userEvent.click(editBtn);

    const deleteBtn = await waitFor(() =>
      screen.getByLabelText("frontDeleteBtn"),
    );
    await userEvent.click(deleteBtn);

    await waitFor(() => {
      expect(
        screen.getByText("Flashcard deleted successfully"),
      ).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(card).not.toBeInTheDocument();
    });
  });
});
