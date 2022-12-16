import { emptyTodo, markAsDone } from "../src/todo.js";
import { TodoRepository } from "../src/todoRepository.js";
import { beforeEach, describe, it } from "concise-test";

describe("todo", () => {
  it("sets completedAt when calling markAsDone", () => {
    const todo = emptyTodo();

    if(!markAsDone(todo).completedAt)
      throw new Error("completedAt not set when calling markAsDone");
  });
});

describe("TodoRepository", () => {
  const newTodo = { ...emptyTodo(), title: "test" };
  let repository;

  beforeEach(() => {
    repository = new TodoRepository();
  });

  describe("add", () => {
    it("throws an exception when adding a todo without a title", () => {
      try {
        repository.add(emptyTodo());
        throw new Error("no error thrown when adding an empty todo");
      } catch (e) {
        if (e.message !== "title cannot be blank")
          throw new Error("wrong message in guard clause when adding an empty todo");
      }
    });

    it("throws errors when adding a repeated todo", () => {
      throw new Error('blah blah');

      repository.add(newTodo);
      const repeatedTodo = { ...newTodo };
      try {
        repository.add(repeatedTodo);
        throw new Error("no error thrown when adding a repeated todo");
      } catch (e) {
        if (e.message !== "todo already exists")
          throw new Error("wrong message in guard clause when adding an existing todo");
      }
    });
  });

  describe("findAllMatching", () => {
    beforeEach(() => {
      repository.add(newTodo);
    });

    it("finds an added todo", () => {
      if (repository.findAllMatching('').length !== 1)
        throw new Error("added todo was not returned");
    });

    it("filters out todos that do not match filter", () => {
      throw new Error('blah blah');
      if (repository.findAllMatching('some other test').length !== 0)
        throw new Error("filter was not applied when finding matches");
    });
  });
});
