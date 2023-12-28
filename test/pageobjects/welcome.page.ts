import { findByResourceId } from '../utils/helpers.js';

class WelcomeScreen {
    get continueButton(){
        return findByResourceId("todolist.scheduleplanner.dailyplanner.todo.reminders:id/welcome_start");
    }

    get closeSpecialOffer(){
        return findByResourceId("todolist.scheduleplanner.dailyplanner.todo.reminders:id/toolbar_back");
    }

    get closeGiveUpSpecialOffer(){
        return findByResourceId("todolist.scheduleplanner.dailyplanner.todo.reminders:id/dialog_close");
    }

    get allowNotifications(){
        return findByResourceId("com.android.permissioncontroller:id/permission_allow_button")
    }

    async skipOnboarding(){
        await this.continueButton.click();
        await this.closeSpecialOffer.click();
        await this.closeGiveUpSpecialOffer.click();
    }
    
}

export default new WelcomeScreen();