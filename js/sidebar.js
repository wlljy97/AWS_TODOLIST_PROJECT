const sidebarToggleButtonOnClickHandle = () => {
    const sidebar = document.querySelector(".sidebar");
    const sidebarToggleButton = document.querySelector(".sidebar-toggle-button");

    if(sidebar.classList.contains("isSidebarOpen")) {
        sidebar.classList.remove("isSidebarOpen");
        sidebarToggleButton.innerHTML = '<i class="fa-solid fa-angles-right"></i>'
    }else{
        sidebar.classList.add("isSidebarOpen");
        sidebarToggleButton.innerHTML = '<i class="fa-solid fa-angles-left"></i>'
    }
}

const sidebarMenuOnClickHandle = (target) => {
    switch(target.innerHTML) {
        case "Home":
            Routes.getInstance().routeState = "welcome";
            break;

        case "Todo List":
            Routes.getInstance().routeState = "todolist";
            break;

        case "Calendar":
            Routes.getInstance().routeState = "calendar";
            break;
    }

    Routes.getInstance().show();
    sidebarToggleButtonOnClickHandle();
}