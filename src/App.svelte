<script>
  import { emptyTodo, makeTodo, markAsDone } from './todo.js';
  import { add, findMatching, update } from './todoList.js';

  let formValues = emptyTodo();
  let filter = '';
  let todos = findMatching(filter);

  const handleAdd = e => {
    e.preventDefault();
    try {
      add(makeTodo(formValues));
      formValues = emptyTodo();
      updateTodos();
    } catch (e) {
      alert(e.message);
    }
  };

  const updateTodos = () => {
    todos = findMatching(filter);
  };

</script>

<style>
  p {
    max-width: 90ch;
    margin: 0 auto;
    font-size: 1.4em;
    font-family: sans-serif;
  }
</style>

<form on:submit={handleAdd}>
  <input bind:value={formValues.title} id="title" placeholder="Title" />
  <input bind:value={formValues.dueDate} type="date" id="date" placeholder="Due date" />
  <input type="submit" value="Add" />
</form>

<input bind:value={filter} on:change={updateTodos} id="filter" placeholder="Filter..." />

<table>
  {#each todos as todo}
  <tr>
    <td>
      {#if todo.completedAt}
      <p><s>{todo.title}</s></p>
      {:else}
      <p>{todo.title}</p>
      {/if}
    </td>
    <td><p>{todo.dueDate ? todo.dueDate : ''}<p></td>
    <td><input type="button" on:click={() => {
      update(markAsDone(todo));
      updateTodos();
      }}

      value="Mark as done" /></td>
  </tr>
  {/each}
</table>
