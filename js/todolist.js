

const addTodoButtonOnClickHandle = () => {

    generateTodoObj();
}

const addTodoOnKeyUpHandle = (event, inputElement) => {
    if(event.keyCode === 13) {
        generateTodoObj();

        inputElement.value = '';

    }
}

// 전체,완료,미완료 Count
const updateTotalCount = () => {
    const totalCount = TodoListService.getInstance().todoList.length;
    const totalCountButton = document.querySelector(".btn-all");
    totalCountButton.value = `전체 : ${totalCount}`;
};

const updateCompletedCount = () => {
    const completedCount = TodoListService.getInstance().todoList.filter(todo => todo.compleStatus).length;
    const completedCountButton = document.querySelector(".btn-after");
    completedCountButton.value = `완료 : ${completedCount}`;
};

const updateIncompleteCount = () => {
    const incompleteCount = TodoListService.getInstance().todoList.filter(todo => !todo.compleStatus).length;
    const incompleteCountButton = document.querySelector(".btn-before");
    incompleteCountButton.value = `미완료 : ${incompleteCount}`;
};


const checkedOnChangeHandle = (target) => {
    TodoListService.getInstance().setCompleStatus(target.value, target.checked);
    updateCompletedCount();
    updateIncompleteCount();
}

const modifyTodoOnClickHandle = (target) => {
    openModal();
    modifyModal(TodoListService.getInstance().getTodoById(target.value));
}

const deleteTodoOnClickHandle = (target) => {
    
    TodoListService.getInstance().removeTodo(target.value);

    // 전체,완료,미완료 Count를 내려줌
    updateTotalCount();
    updateCompletedCount();
    updateIncompleteCount();
}



const generateTodoObj = () => {
    const todoContent = document.querySelector(".todolist-header-items .text-input").value;

    

    const todoObj = {
        id: 0,
        todoContent: todoContent,
        createDate: DateUtils.toStringByFormatting(new Date()),
        completStatus: false
    };
    

    TodoListService.getInstance().addTodo(todoObj);
}

class TodoListService {
    static #instance = null;

    static getInstance() {
        if(this.#instance === null){
            this.#instance = new TodoListService();
        }
        return this.#instance;
    }

    todoList = new Array();
    todoIndex = 1;

    constructor() {
        this.loadTodoList();
    }
    

    loadTodoList() {
        this.todoList = !!localStorage.getItem("todoList") ? JSON.parse(localStorage.getItem("todoList")) : new Array();
       
        this.todoIndex = !!this.todoList[this.todoList.length - 1]?.id ? this.todoList[this.todoList.length -1].id + 1 : 1;
        
       
    }

    saveLocalStorage() {
        localStorage.setItem("todoList", JSON.stringify(this.todoList));
    }

    getTodoById(id) {
       
        return this.todoList.filter(todo => todo.id === parseInt(id))[0];
    }

    addTodo(todoObj) {
        const todo = {
            ...todoObj,
            id: this.todoIndex
        }


        this.todoList.push(todo);

        this.saveLocalStorage();

        this.updateTodoList();

        // 전체,완료,미완료 Count를 올려줌
        updateTotalCount();
        updateCompletedCount();
        updateIncompleteCount();

        this.todoIndex++;
    }

    setCompleStatus(id, status) {
        this.todoList.forEach((todo, index) => {
            if(todo.id === parseInt(id)) {
                this.todoList[index].compleStatus = status;
            }
        });

        this.saveLocalStorage();
    }

    setTodo(todoObj) {
      for(let i = 0; i < this.todoList.length; i++) {
        if(this.todoList[i].id === todoObj.id) {
            this.todoList[i] = todoObj;
            break;
        }
      }
        this.saveLocalStorage();

        this.updateTodoList();
        
    }

    removeTodo(id) {
        this.todoList = this.todoList.filter(todo => {
            return todo.id !== parseInt(id);
        });

        this.saveLocalStorage();
        this.updateTodoList();
    }

    

    

    updateTodoList() {
       
        const todolistMainContainer = document.querySelector(".todolist-main-container");

        todolistMainContainer.innerHTML = this.todoList.map(todo => {
           
            return `
                <li class="todolist-items">
                    <div class="item-left">
                        <input type="checkbox" id="complet-chkbox${todo.id}" class="complet-chkboxs" ${todo.compleStatus ? "checked" : ""} value="${todo.id}" onchange="checkedOnChangeHandle(this);">
                        <label for="complet-chkbox${todo.id}"></label>
        
                    </div>
                    <div class="item-center">
                        <pre class="todolist-content">${todo.todoContent}</pre>
                    </div>
                    <div class="item-right">
                        <p class="todolist-date">${todo.createDate}</p>


                        <div class="todolist-item-buttons">
                            <button class="btn btn-edit" value="${todo.id}" onclick = "modifyTodoOnClickHandle(this);"><i class="fa-solid fa-wrench"></i></button>
                            <button class="btn btn-remove" value="${todo.id}" onclick = "deleteTodoOnClickHandle(this);"><i class="fa-solid fa-circle-minus"></i></button>
                        </div>
                    </div>
                 </li>
            `; 
            
        }).join("");
        
    }
   
}



