import { clickElement, enterText, findByResourceId, findElementsByResourceId } from "../utils/helpers.js";


class ManageCategories {
  get createCategoryButton() {
    return findByResourceId(
      "todolist.scheduleplanner.dailyplanner.todo.reminders:id/create_category_text"
    );
  }

  get categoryNameInput() {
    return findByResourceId(
      "todolist.scheduleplanner.dailyplanner.todo.reminders:id/dialog_input"
    );
  }

  get confirmButton() {
    return findByResourceId(
      "todolist.scheduleplanner.dailyplanner.todo.reminders:id/dialog_confirm"
    );
  }

  get categoryList() {
    return findElementsByResourceId(
      "todolist.scheduleplanner.dailyplanner.todo.reminders:id/text"
    );
  }

  get templateOnboardingList(){
    return findByResourceId("todolist.scheduleplanner.dailyplanner.todo.reminders:id/content_area")
  }

  async createCategory(categoryName: string) {
    await clickElement(await this.createCategoryButton);
    await enterText(await this.categoryNameInput, categoryName);
    await clickElement(await this.confirmButton);
  }

  async validateCategoryWasCreated(categoryName: string) {
    const categoryList = await this.categoryList;

    let categories = [];
    for (const taskElement of categoryList) {
      categories.push(await taskElement.getText());
    }

    expect(categories).toContain(categoryName);
  }
}

export default new ManageCategories();
