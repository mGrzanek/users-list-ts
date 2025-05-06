const inquirer = require('inquirer');
const consola = require('consola');

enum Action {
    List = "list",
    Add = "add",
    Remove = "remove",
    Quit = "quit"
}

enum consoleOption {
    Success = "success",
    Error = "error",
    Info = "info"
}
  
type InquirerAnswers = {
    action: Action
}

interface User {
    name: string,
    age: number
}

class Message {
    constructor(public content: string){
    }

    public show(): void {
        console.log(this.content);
    }
    
    public capitalize():string {
        return this.content = this.content.charAt(0).toUpperCase() + this.content.substring(1).toLowerCase();
    }

    public toUpperCase():string {
        return this.content = this.content.toUpperCase();
    }

    public toLowerCase():string {
        return this.content = this.content.toLowerCase();
    }

    static showColorized(variant: consoleOption, text: string): void {
        if(variant === consoleOption.Success) consola.success(text);
        else if(variant === consoleOption.Info) consola.info(text);
        else consola.error(text);
    }
}

class UsersData {
    data: User[] = [];

    public showAll(): void {
        let dataInfo = null;
        Message.showColorized(consoleOption.Info, "Users data");
        if(this.data.length > 0) dataInfo = console.table(this.data);
        else console.log("No data...");
    }
    public add(userObj: User): void {
        if(typeof userObj.age === "number" && typeof userObj.name === "string"
            && userObj.age > 0 && userObj.name.length > 0){
                this.data.push(userObj);
                Message.showColorized(consoleOption.Success, "User has been successfully added!");
        } else Message.showColorized(consoleOption.Error, "Wrong data!");
    }
    public remove(userName: string): void {
        const userToRemove = this.data.find(user => user.name === userName);
        if(userToRemove) {
            const userToRemoveIndex = this.data.indexOf(userToRemove);
            this.data.splice(userToRemoveIndex, 1);
            Message.showColorized(consoleOption.Success, "User deleted!");
        } else Message.showColorized(consoleOption.Error, "User not found...");
    }
}

const users = new UsersData();
console.log("\n");
console.info("???? Welcome to the UsersApp!");
console.log("====================================");
Message.showColorized(consoleOption.Info, "Available actions");
console.log("\n");
console.log("list – show all users");
console.log("add – add new user to the list");
console.log("remove – remove user from the list");
console.log("quit – quit the app");
console.log("\n");

const startApp = () => {
    inquirer.prompt([{
      name: 'action',
      type: 'input',
      message: 'How can I help you?',
    }]).then(async (answers: InquirerAnswers) => {
      switch (answers.action) {
        case Action.List:
          users.showAll();
          break;
        case Action.Add:
          const user = await inquirer.prompt([{
            name: 'name',
            type: 'input',
            message: 'Enter name',
          }, {
            name: 'age',
            type: 'number',
            message: 'Enter age',
          }]);
          users.add(user);
          break;
        case Action.Remove:
          const name = await inquirer.prompt([{
            name: 'name',
            type: 'input',
            message: 'Enter name',
          }]);
          users.remove(name.name);
          break;
        case Action.Quit:
          Message.showColorized(consoleOption.Info, "Bye bye!");
          return;
        default:
            Message.showColorized(consoleOption.Error, "Command not found... Try again...");
      }
  
      startApp();
    });
}

startApp();