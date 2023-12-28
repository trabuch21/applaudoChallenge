import {
  clickElement,
  enterText,
  findByResourceId,
  findByText,
  findByXpath,
  findElementsByResourceId,
  getNextDayFormatted,
} from "../utils/helpers.js";
import tasksPage from "./tasks.page.js";

class EditTasksPage {
  get categoryDropdown() {
    return findByResourceId(
      "todolist.scheduleplanner.dailyplanner.todo.reminders:id/task_detail_category_layout"
    );
  }

  get dueDateButton() {
    return findByResourceId(
      "todolist.scheduleplanner.dailyplanner.todo.reminders:id/detail_due_date_layout"
    );
  }

  get tomorrowDateButton() {
    return findByResourceId(
      "todolist.scheduleplanner.dailyplanner.todo.reminders:id/calendar_tomorrow"
    );
  }

  get confirmButton() {
    return findByResourceId(
      "todolist.scheduleplanner.dailyplanner.todo.reminders:id/tv_confirm"
    );
  }

  get dueDateText() {
    return findByResourceId(
      "todolist.scheduleplanner.dailyplanner.todo.reminders:id/detail_due_date_text"
    );
  }

  get addSubTaskButton() {
    return findByResourceId(
      "todolist.scheduleplanner.dailyplanner.todo.reminders:id/add_sub_task_layout"
    );
  }

  get addSubTaskInput() {
    return findElementsByResourceId(
      "todolist.scheduleplanner.dailyplanner.todo.reminders:id/sub_task_create_input"
    );
  }

  get taskDetailsButton() {
    return findByResourceId(
      "todolist.scheduleplanner.dailyplanner.todo.reminders:id/task_detail_more"
    );
  }

  get deleteTaskButton() {
    return findByResourceId(
      "todolist.scheduleplanner.dailyplanner.todo.reminders:id/detail_delete"
    );
  }

  get addNoteButton(){
    return findByResourceId(
      "todolist.scheduleplanner.dailyplanner.todo.reminders:id/detail_notes_layout"
    );
  }

  get addNoteInput(){
    return findByResourceId(
      "todolist.scheduleplanner.dailyplanner.todo.reminders:id/et_input"
    );
  }

  get confirmDeleteButton() {
    return findByResourceId(
      "todolist.scheduleplanner.dailyplanner.todo.reminders:id/dialog_confirm"
    );
  }

  get taskNotes() {
    return findByResourceId(
      "todolist.scheduleplanner.dailyplanner.todo.reminders:id/detail_notes_text"
    );
  }

  async selectCategory(categoryName: string) {
    return findByText(categoryName).click();
  }

  async selectDueDate() {
    await clickElement(await this.dueDateButton);
    await clickElement(await this.tomorrowDateButton);
    await clickElement(await this.confirmButton);
  }

  async validateDate() {
    const dueDate = await this.dueDateText.getText();
    const tomorrowDate = getNextDayFormatted();

    expect(dueDate).toEqual(tomorrowDate);
  }

  async addSubTask(subTaskName: string) {
    await clickElement(await this.addSubTaskButton);
    const subTasks = await this.addSubTaskInput.length;
    await this.addSubTaskInput[subTasks - 1].setValue(subTaskName);
  }

  async deleteTask(taskName:string) {
    await tasksPage.selectTask(taskName);
    await clickElement(await this.taskDetailsButton);
    await clickElement(await this.deleteTaskButton);
    await clickElement(await this.confirmDeleteButton);
  }

  async markTaskAsDone() {
    await this.taskDetailsButton.click();
    await findByResourceId(
      "todolist.scheduleplanner.dailyplanner.todo.reminders:id/detail_done"
    ).click();

    (await driver.$("/hierarchy/android.widget.Toast[1]")).isDisplayed
    await driver.back();
  }

  async validateTaskWasDeleted(taskName: string) {
    const taskList = await tasksPage.taskList;

    let taskTexts = [];
    for (const taskElement of taskList) {
      taskTexts.push(await taskElement.getText());
    }

    expect(taskTexts).not.toContain(taskName);

    
  }

  async addNotes(notes: string) {
    await clickElement(await this.addNoteButton);
    await enterText(await this.addNoteInput, notes);
    await driver.hideKeyboard();
    await driver.back();
  }
}

export default new EditTasksPage();
