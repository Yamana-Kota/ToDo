import React, { useState } from "react";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  
  type Todo = {
    inputValue: string;
    id: number;
  };

  //テキストの入力を反映させる関数
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   e.preventDefault();
  //   setInputText(e.target.value);
  // };

  //「作成」ボタンを押した時の処理の関数
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //テキストが空欄であればTodoとして追加しない
    if (inputText == "") {
      return;
    }
    
    //新しいTodoの型・変数を定義
    const newTodo: Todo = {
      inputValue: inputText,
      id: todos.length,
    };

    setTodos([newTodo,...todos]); //新しいtodoを表示して既存のtodosをその下に表示
    setInputText("");
  };

  //削除
  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };
  
  return (
    <div className="App">
      <div>
        <h2>Todoリスト</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            onChange={(e) => setInputText(e.target.value)} //(e)=>handleChange(e)
            className="inputText"
            value = {inputText}
            placeholder = "ここにタスクを入力"
          />
          <button type="submit" className="submitButton">作成</button>
        </form>
        {/* タスク追加後 */}
        <ul className="todoList">
          {todos.map((todo) => (
            <li key={todo.id}>
              {/* <h2>{todo.id}</h2> */}
              <input
                type="text"
                value={todo.inputValue}
              />
              <button onClick={() => handleDelete(todo.id)}>消</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
