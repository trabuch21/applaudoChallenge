import { clickElement, findByResourceId } from "../utils/helpers.js";

class BottomBarScreen {
  get tasksSection() {
    return findByResourceId(
      "todolist.scheduleplanner.dailyplanner.todo.reminders:id/tasks_layout"
    );
  }

  get mineSection() {
    return findByResourceId(
      "todolist.scheduleplanner.dailyplanner.todo.reminders:id/mine_layout"
    );
  }

  async goToTasks() {
    await clickElement(await this.tasksSection);
  }

  async goToMineSection() {
    await clickElement(await this.mineSection);
  }
}

export default new BottomBarScreen();
