import { emptyTodo, markAsDone } from "../src/todo.js";
import { beforeEach, describe, expect, it } from "concise-test";

describe("todo", () => {
  it("sets completedAt when calling markAsDone", () => {
    const todo = emptyTodo();

    expect(markAsDone(todo).completedAt).toBeDefined();
  });
});
