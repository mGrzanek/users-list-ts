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

const startApp = () => {
  inquirer.prompt([{
    name: 'action',
    type: 'input',
    message: 'How can I help you?',
  }]).then(async (answers: { action: 'list' | 'add' | 'remove' | 'quit' }) => {
    console.log("Chosen action: " + answers.action);
    startApp();
    if (answers.action === "quit")
      return;
  });
}

startApp();