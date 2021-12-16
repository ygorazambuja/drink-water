import * as vscode from "vscode";
import { GenericTimer } from "./GenericTimer";

const MILISSECONDS = 1000;
const SECONDS = 60;

export class WaterTimer implements GenericTimer {
  constructor(protected context: vscode.ExtensionContext) {
    this.initializeCounter();
    this.interval = null;
  }

  interval: NodeJS.Timeout | null;
  counter: number = 0;

  async initializeCounter() {
    const minuts = await this.context.globalState.get("drink-water.minuts");

    if (minuts) {
      this.counter = Number(minuts);
      return this.start();
    }

    return this.showCounterBox();
  }

  async showCounterBox() {
    const minuts = await vscode.window.showInputBox({
      title: "How many minutes do you want to be warned",
      placeHolder: "5",
    });

    this.context.globalState.update("drink-water.minuts", minuts);
    this.counter = Number(minuts);

    this.start();
  }

  start() {
    this.interval = setInterval(async () => {
      vscode.window.showErrorMessage(
        `Beba Água Imediatamente! - será avisado novamente em ${this.counter} minutos`
      );
    }, this.counter * MILISSECONDS * SECONDS);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.context.globalState.update("drink-water.minuts", 0);
    }
  }
}
