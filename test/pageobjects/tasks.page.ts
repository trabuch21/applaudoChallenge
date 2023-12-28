import {
  clickElement,
  enterText,
  findByResourceId,
  findByText,
  findElementsByResourceId,
  getElementText,
  navigateBackMultipleTimes,
} from "../utils/helpers.js";

class Tasks {
  get taskListElementSelector() {
    return findByResourceId(
      "todolist.scheduleplanner.dailyplanner.todo.reminders:id/task_slideLinearLayout"
    );
  }
  get addTaskButton() {
    return findByResourceId(
      "todolist.scheduleplanner.dailyplanner.todo.reminders:id/iv_task_add"
    );
  }

  get addTemplateButton() {
    return findByResourceId(
      "todolist.scheduleplanner.dailyplanner.todo.reminders:id/task_tpl_add"
    );
  }

  get taskList() {
    return findElementsByResourceId(
      "todolist.scheduleplanner.dailyplanner.todo.reminders:id/task_text"
    );
  }

  get addTaskInput() {
    return findByResourceId(
      "todolist.scheduleplanner.dailyplanner.todo.reminders:id/task_create_input"
    );
  }

  get tagManagementButton() {
    return findByResourceId(
      "todolist.scheduleplanner.dailyplanner.todo.reminders:id/tag_management"
    );
  }

  get manageCategoriesButton() {
    return findByText("Manage Categories");
  }

  get addTaskTemplate() {
    return findByResourceId(
      "todolist.scheduleplanner.dailyplanner.todo.reminders:id/task_tpl"
    );
  }

  get confirmButton() {
    return findByResourceId(
      "todolist.scheduleplanner.dailyplanner.todo.reminders:id/task_create_btn"
    );
  }

  get addSubtaskByTemplateButton() {
    return findByResourceId(
      "todolist.scheduleplanner.dailyplanner.todo.reminders:id/task_create_category"
    );
  }

  get addCategoryButton() {
    return findByResourceId(
      "todolist.scheduleplanner.dailyplanner.todo.reminders:id/task_create_category"
    );
  }

  get firstNextOnboarding() {
    return findByResourceId(
      "todolist.scheduleplanner.dailyplanner.todo.reminders:id/guide_done1"
    );
  }

  get secondNextOnboarding() {
    return findByResourceId(
      "todolist.scheduleplanner.dailyplanner.todo.reminders:id/guide_done2"
    );
  }

  get thirdNextOnboarding() {
    return findByResourceId(
      "todolist.scheduleplanner.dailyplanner.todo.reminders:id/guide_done3"
    );
  }

  get noneTask() {
    return findByResourceId(
      "todolist.scheduleplanner.dailyplanner.todo.reminders:id/task_none"
    );
  }

  async navigateToAddTask() {
    await clickElement(await this.addTaskButton);
  }

  async navigateToManageCategories() {
    await clickElement(await this.tagManagementButton);
    await clickElement(await this.manageCategoriesButton);
  }

  async addTask(taskName: string) {
    await this.taskCreation(taskName, false);
  }

  async addTaskByTemplate(taskName: string) {
    await this.taskCreation(taskName, true);
  }

  async createTaskNormally(taskName: string) {
    await enterText(await this.addTaskInput, taskName);
    await clickElement(await this.confirmButton);
  }

  async createTaskUsingTemplate(taskName: string) {
    await clickElement(await this.addTaskTemplate);
    await findByText(taskName).click();
    await clickElement(await this.addTemplateButton);
  }

  async completeOnboarding() {
    await clickElement(await this.firstNextOnboarding);
    await clickElement(await this.secondNextOnboarding);
    await clickElement(await this.thirdNextOnboarding);
  }

  async taskCreation(taskName: string, useTemplate: boolean) {
    if (await this.noneTask.isDisplayed()) {
      await this.navigateToAddTask();

      if (useTemplate) {
        await this.createTaskUsingTemplate(taskName);
      } else {
        await this.createTaskNormally(taskName);
      }
      await navigateBackMultipleTimes(3);
    } else {
      await this.navigateToAddTask();

      if (useTemplate) {
        await this.createTaskUsingTemplate(taskName);
      } else {
        await this.createTaskNormally(taskName);
      }
    }
  }

  async waitUntilTasksAreVisible() {
    await driver.waitUntil(await this.taskListElementSelector.isDisplayed, {
      timeout: 10000,
      timeoutMsg: "No se encontro el elemento",
    });
    const taskList = await this.taskList;
    return taskList;
  }

  async selectTask(taskName: string) {
    const taskList = await this.waitUntilTasksAreVisible();

    for (const taskElement of taskList) {
      console.log(await getElementText(await taskElement));
      if ((await getElementText(await taskElement)) === taskName) {
        await clickElement(taskElement);
        break;
      }
    }
  }

  async validateTaskWasCreated(taskName: string) {
    const taskList = await this.waitUntilTasksAreVisible();

    let taskFound = false;
    for (const taskElement of taskList) {
      const text = await taskElement.getText();
      if (text === taskName) {
        taskFound = true;
        break;
      }
    }
  }
}

export default new Tasks();
