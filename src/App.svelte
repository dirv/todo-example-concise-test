<script>
  import { emptyTodo, markAsDone } from './todo.js';
  import { TodoRepository } from './todoList.js';

  let repository = new TodoRepository();
  let currentTodo = emptyTodo();
  let filter = '';
  let todos = repository.findAllMatching(filter);

  const handleAdd = e => {
    e.preventDefault();
    try {
      repository.add(currentTodo);
      currentTodo = emptyTodo();
      updateTodos();
    } catch (e) {
      alert(e.message);
    }
  };

  const updateTodos = () => {
    todos = repository.findAllMatching(filter);
  };

  const markAsDoneAndUpdate = todo => {
    repository.update(markAsDone(todo));
    updateTodos();
  };

</script>

<style>
  main {
    max-width: 70ch;
    margin: 0 auto;
    font-family: sans-serif;
  }

  table {
    border-spacing: 0;
    table-layout: fixed;
  }

  thead {
    background-color: #cde;
  }

  td {
    padding: 5px;
  }

  input {
    font-size: 1em;
    border: 1px solid #abc;
    margin: 0;
    padding: 5px;
    width: 100%;
    box-sizing: border-box;
  }

  input[type="submit"], input[type="button"] {
    padding: 5px;
    background-color: #345;
    color: white;
    border-radius: 2px;
    border: 0;
    box-shadow: none;
    width: 150px;
  }

  table {
    width: 100%;
  }

  td:nth-child(2), td:nth-child(3) {
    width: 150px;
  }

</style>

<main>

  <table>
    <thead>
      <tr>
          <td><input bind:value={currentTodo.title} id="title" placeholder="Title" /></td>
          <td><input bind:value={currentTodo.dueDate} type="date" id="date" /></td>
          <td><input type="submit" value="Add" on:click={handleAdd} /></td>
      </tr>
    </thead>
    <tr>
      <td colspan="3">
        <input bind:value={filter} on:change={updateTodos} id="filter" placeholder="Filter..." />
      </td>
    </tr>
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
      <td><input type="button" on:click={() => markAsDoneAndUpdate(todo)} value="Mark as done" /></td>
    </tr>
    {/each}
  </table>
</main>
