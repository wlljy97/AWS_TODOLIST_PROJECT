window.onload = () => {
    TodoListService.getInstance().updateTodoList();


        let nowMonth = new Date();  // 현재 달을 페이지를 로드한 날의 달로 초기화
        let today = new Date();     // 페이지를 로드한 날짜를 저장
        today.setHours(0, 0, 0, 0);    // 비교 편의를 위해 today의 시간을 초기화

    // 전체,완료,미완료 Count
    updateTotalCount();
    updateCompletedCount();
    updateIncompleteCount();

    buildCalendar();
}