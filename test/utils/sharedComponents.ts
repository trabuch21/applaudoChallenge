import { findByResourceId } from "./helpers.js";

class sharedComponents {

    get closeModal(){
        return findByResourceId("todolist.scheduleplanner.dailyplanner.todo.reminders:id/dialog_close")
    }

}

export default new sharedComponents();