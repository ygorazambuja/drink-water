import { ExtensionContext, window } from "vscode";
import { GenericTimer } from "./GenericTimer";

const MILISSECONDS = 1000;
const SECONDS = 60;

export class ErgonomicTimer implements GenericTimer {
  constructor(protected context: ExtensionContext) {
    this.initializeCounter();
    this.interval = null;
  }

  interval: NodeJS.Timeout | null;
  counter: number = 0;

  async initializeCounter() {
    const minuts = await this.context.globalState.get(
      "drink-water.ergonomic-minuts"
    );

    if (minuts) {
      this.counter = Number(minuts);
      return this.start();
    }

    return this.showCounterBox();
  }

  async showCounterBox() {
    const minuts = await window.showInputBox({
      title: "How many minutes do you want to be warned",
      placeHolder: "5",
      prompt: 'Type "0" to stop the counter',
    });

    this.context.globalState.update("drink-water.ergonomic-minuts", minuts);
    this.counter = Number(minuts);

    this.start();
  }

  start() {
    this.interval = setInterval(async () => {
      window.showErrorMessage(
        `Levante e vá dar uma volta! - será avisado novamente em ${this.counter} minuto(s)`
      );
    }, this.counter * MILISSECONDS * SECONDS);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.context.globalState.update("drink-water.ergonomic-minuts", 0);
    }
  }
}
