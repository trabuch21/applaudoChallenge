import { findByResourceId } from "../utils/helpers.js";

class MinePage {

    get completedTasks() {
        return findByResourceId("todolist.scheduleplanner.dailyplanner.todo.reminders:id/finished_tasks_number")
    }

    get pendingTasks() {
        return findByResourceId("todolist.scheduleplanner.dailyplanner.todo.reminders:id/pending_tasks_number");
    }



}

export default new MinePage();