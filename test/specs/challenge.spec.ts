import { faker } from '@faker-js/faker';
import editTasksPage from "../pageobjects/updateTask.page.js";
import manageCategoriesPage from "../pageobjects/manageCategories.page.js";
import tasksPage from "../pageobjects/tasks.page.js";
import WelcomeScreen from "../pageobjects/welcome.page.js";
import bottomBarPage from "../pageobjects/bottomBar.page.js";
import minePage from "../pageobjects/mine.page.js";
import { clickElement, navigateBackMultipleTimes, validateElementText } from '../utils/helpers.js';
import sharedComponents from '../utils/sharedComponents.js';

describe("first", () => {
  beforeEach(async () => {
    await WelcomeScreen.skipOnboarding();
  });

  it("Add a new Task", async () => {
    const taskName = faker.word.verb();
    await tasksPage.taskCreation(taskName, false);
    await tasksPage.validateTaskWasCreated(taskName);
  });

  it("Add new category", async () => {
    const categoryName = faker.word.noun()
    await tasksPage.navigateToManageCategories()
    await manageCategoriesPage.createCategory(categoryName);
    await manageCategoriesPage.validateCategoryWasCreated(categoryName);
  });

  it("Add a task with multiple options", async () => {
    const categoryName = faker.word.noun();
    const taskName = faker.word.verb();
    await tasksPage.navigateToManageCategories()
    await manageCategoriesPage.createCategory(categoryName);

    await navigateBackMultipleTimes(1);

    (await sharedComponents.closeModal).click();

    await tasksPage.taskCreation(taskName, false);

    await tasksPage.selectTask(taskName);

    await clickElement(await editTasksPage.categoryDropdown);
    
    await editTasksPage.selectCategory(categoryName);

    await editTasksPage.selectDueDate();

    await editTasksPage.addSubTask(faker.lorem.sentence(3));

    await editTasksPage.addSubTask(faker.lorem.sentence(3));
  });

  it("Add a task using one of the free templates", async () => {
    const taskName = "Drink water, keep healthy";
    await tasksPage.taskCreation(taskName, true);
    await tasksPage.validateTaskWasCreated(taskName);
  });

  it("Delete test", async () => {
    const taskName = faker.word.verb();
    const templateTask = "Drink water, keep healthy";
    
    await tasksPage.taskCreation(templateTask, true);
    await tasksPage.validateTaskWasCreated(templateTask);

    await tasksPage.taskCreation(taskName, false);
    await tasksPage.validateTaskWasCreated(taskName);

    await editTasksPage.deleteTask(taskName);

    await editTasksPage.validateTaskWasDeleted(taskName);
  });

  it("Update one of the tasks you added", async () => {
    const taskName = faker.word.verb()
    await tasksPage.addTask(taskName);

    await tasksPage.selectTask(taskName);
    const taskNotes = faker.word.noun()
    await editTasksPage.addNotes(taskNotes);

    await validateElementText(await editTasksPage.taskNotes, taskNotes);
  });

  it("Validate complete tasks", async () => {
    const taskName = faker.word.verb();
    await tasksPage.taskCreation("Drink water, keep healthy", true);
    await tasksPage.taskCreation(taskName, false);
    await bottomBarPage.goToMineSection();
    const completedTasks = Number((await minePage.completedTasks).getText());
    const pendingTasks = Number((await minePage.pendingTasks).getText());
    await bottomBarPage.goToTasks()

    await tasksPage.selectTask(taskName);
    await editTasksPage.markTaskAsDone();

    await bottomBarPage.goToMineSection();

    const updatedCompletedTasks = Number(
      (await minePage.completedTasks).getText()
    );
    const updatedPendingTasks = Number((await minePage.pendingTasks).getText());

    await expect(updatedCompletedTasks).toBe(completedTasks - 1);
    await expect(updatedPendingTasks).toBe(pendingTasks + 1);
  });

  afterEach(async () => {
    await driver.reloadSession();
  })
});
