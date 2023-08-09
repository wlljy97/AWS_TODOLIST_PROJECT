const goToWriteOnClickHandle = () => {
    Routes.getInstance().routeState = "todolist";
    Routes.getInstance().show();
}

const goToHomeOnClickHandle = () => {
    Routes.getInstance().routeState = "welcome";
    Routes.getInstance().show();
}

const goToCalendarClickHandle = () => {
    Routes.getInstance().routeState = "calendar";
    Routes.getInstance().show();
}
