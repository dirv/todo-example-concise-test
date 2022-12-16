import { describe, beforeEach, it, expect, double, anObjectContaining } from "concise-test";

import { saveTodo } from "../src/api.js";

describe("api", () => {
  const todo = "todo text";

  beforeEach(() => {
    global.fetch = double(() => ({ ok: true }));
  });


  it("calls POST /todos with headers", () => {
    saveTodo(todo);
    expect(global.fetch).toBeCalledWith(
      "/todos",
      anObjectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      }
    ));
  });

  it("calls POST /todos with the todo body", () => {
    saveTodo(todo);
    expect(global.fetch).toBeCalledWith(
      "/todos",
      anObjectContaining({
        body: { todo }
      }
    ));
  });
});
