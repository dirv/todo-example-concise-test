import { emptyTodo } from "../src/todo.js";
import { TodoRepository } from "../src/todoRepository.js";
import { beforeEach, describe, expect, it } from "concise-test";

describe("TodoRepository", () => {
  const newTodo = { ...emptyTodo(), title: "test" };
  let repository;

  beforeEach(() => {
    repository = new TodoRepository();
  });

  describe("add", () => {
    it("throws an exception when adding a todo without a title", () => {
      expect(() => repository.add(emptyTodo()))
        .toThrow(new Error("title cannot be blank"))
    });

    it("throws errors when adding a repeated todo", () => {
      repository.add(newTodo);
      const repeatedTodo = { ...newTodo };
      expect(() => repository.add(repeatedTodo))
        .toThrow(new Error("todo already exists"));
    });
  });

  describe("findAllMatching", () => {
    beforeEach(() => {
      repository.add(newTodo);
    });

    it("finds an added todo", () => {
      expect(repository.findAllMatching('')).toHaveLength(1);
    });

    it("filters out todos that do not match filter", () => {
      expect(repository.findAllMatching('some other test')).toHaveLength(0);
    });
  });
});
