import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

describe("初期表示に関するテスト", () => {
  it("タイトルにTodoリストと表示されていること", () => {
    render(<App />);
    expect(screen.getByText("Todoリスト")).toBeInTheDocument();
  });
  it("追加ボタンがあること", () => {
    render(<App />); 
    expect(screen.getByRole("button")).toBeTruthy();
  });
  it("追加ボタンの名前が「作成」であること", () => {
    render(<App />);
    expect(screen.getByRole("button")).toHaveTextContent("作成");
  });
  it("テキストボックスがあること", () => {
    render(<App />);
    expect(screen.getByRole("textbox")).toBeTruthy();
  });
  it("テキストボックスに「ここにタスクを入力」と薄く表示されていること", () => {
    render(<App />);
    expect(screen.getByPlaceholderText("ここにタスクを入力")).toBeTruthy();
  });
  it("テキストボックスの中身が空なこと", () => {
    render(<App />); 
    expect(screen.getByRole("textbox")).toHaveTextContent("");
  });
});

describe("タスク追加に関するテスト", () => {
  it("テキストボックスが空の時、タスクが追加されないこと", async() => {
    render(<App />);
    const submitButtonElement = screen.getByRole("button", { name: /作成/i});
    userEvent.click(submitButtonElement);
    expect(await screen.queryByText("タスク1")).not.toBeInTheDocument();
  });
  it("テキストボックスが入力されている時、タスク追加できること", async() => {
    render(<App />);
    const inputValueElement = screen.getByPlaceholderText("ここにタスクを入力");
    const submitButtonElement = screen.getByRole("button", { name: /作成/i});
    await userEvent.type(inputValueElement,"タスク1");
    await userEvent.click(submitButtonElement);
    expect(await screen.findByDisplayValue("タスク1")).toBeInTheDocument();
  });  
  it("タスクを追加したときテキストボックスがクリアされること", () => {
    render(<App />);
    const inputValueElement = screen.getByPlaceholderText("ここにタスクを入力");
    const submitButtonElement = screen.getByRole("button", { name: /作成/i});
    userEvent.type(inputValueElement,"タスク1");
    userEvent.click(submitButtonElement);
    expect(inputValueElement).toHaveValue("");
  });
});

describe("タスク削除に関するテスト", () => {
  it("削除ボタンを押したとき、タスクが削除されること", async() => {
    render(<App />);
    const inputValueElement = screen.getByPlaceholderText("ここにタスクを入力");
    const submitButtonElement = screen.getByRole("button", { name: /作成/i});
    await userEvent.type(inputValueElement,"タスク1");
    await userEvent.click(submitButtonElement);
    const deleteButtonElement = await screen.getByRole("button", { name: /消/i});
    await userEvent.click(deleteButtonElement);
    expect(await screen.queryByText("タスク1")).not.toBeInTheDocument();
  });
});