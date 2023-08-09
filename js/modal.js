const openModal = () => {
    const modal = document.querySelector(".modal");
    modal.classList.remove("invisible");
    
}

const closeModal = () => {
    const modal = document.querySelector(".modal");
    modal.classList.add("invisible");
    modal.innerHTML = "";
}

const modifySubmitButtonOnClick = (id) => {
    const newTodoContent = document.querySelector(".modal-main .text-input").value;
    const todo = TodoListService.getInstance().getTodoById(id);
    if(todo.todoContent === newTodoContent || !newTodoContent) {
        return;
    }
    const todoObj = {
        ...todo,
        todoContent: newTodoContent
    }
    TodoListService.getInstance().setTodo(todoObj);
}

const handleEnterKeyPress = (event, id) => {
    if (event.key === "Enter") {
        modifySubmitButtonOnClick(id);
        closeModal();
    }
}



const modifyModal = (todo) => {
    const modal = document.querySelector(".modal");
    modal.innerHTML = `
            <div class="modal-container">
                <header class="modal-header">
                    <h1 class="modal-title">
                        Fix it again
                    </h1>
                </header>
                    <main class="modal-main">
                        <p class="modal-message">
                            modify
                        </p>
                    <input type="text" class="text-input w-f" placeholder="write..." value="${todo.todoContent}" onkeyup="handleEnterKeyPress(event, ${todo.id})">
                </main>
                <footer class="modal-footer">
                    <button class="btn" onclick="modifySubmitButtonOnClick(${todo.id}); closeModal();">Check</button>
                    <button class="btn" onclick="closeModal();">Close</button>
            </footer>
         </div>
    `;
    openModal();
}