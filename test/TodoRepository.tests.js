import { beforeEach, describe, expect, it, registerMock, double } from "concise-test";
import { emptyTodo } from "../src/todo.js";

registerMock(
  "./src/api.js", // NOTE: this needs to be relative to the cwd, see Exercise 1
  {
    saveTodo: double()
  }
);

const { TodoRepository } = await import("../src/todoRepository.js");
const { saveTodo } = await import("../src/api.js");

import * as examples from "./list.shared.tests.js";

describe("TodoRepository", { tags: [ "doesn't match" ] }, () => {
  const newTodo = { ...emptyTodo(), title: "test" };
  let repository;

  beforeEach(() => {
    repository = new TodoRepository();
  });

  it.behavesLike("a list", () => ({
    type: repository,
    entry: newTodo
  }));

  describe("add", () => {
    it("throws an exception when adding a todo without a title", { tags: ["todo", "asnot"] }, () => {
      expect(() => repository.add(emptyTodo()))
        .toThrow(new Error("title cannot be blank"))
    });

    it("throws errors when adding a repeated todo", () => {
      repository.add(newTodo);
      const repeatedTodo = { ...newTodo };
      expect(() => repository.add(repeatedTodo))
        .toThrow(new Error("todo already exists"));
    });

    it.only("calls saveTodo with the correct arguments", () => {
      repository.add(newTodo);
      expect(saveTodo).toBeCalledWith(newTodo);
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
