export const emptyTodo = () => ({ title: "", dueDate: null });

export const markAsDone = todo => ({
  ...todo,
  completedAt: Date.now()
});
