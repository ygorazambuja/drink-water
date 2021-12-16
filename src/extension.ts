import * as vscode from "vscode";
import { ErgonomicTimer } from "./timers/ErgonomicTimer";

import { WaterTimer } from "./timers/WaterTimer";

export async function activate(context: vscode.ExtensionContext) {
  const waterTimer = new WaterTimer(context);
  const ergonomicTimer = new ErgonomicTimer(context);

  const activateCounterDisposable = vscode.commands.registerCommand(
    "drink-water.initiateCounter",
    () => waterTimer.initializeCounter()
  );

  const resetCountDisposable = vscode.commands.registerCommand(
    "drink-water.resetCount",
    () => waterTimer.stop()
  );

  const activateErgonomicCounterDisposable = vscode.commands.registerCommand(
    "drink-water.ergonomic-initiateCounter",
    () => ergonomicTimer.initializeCounter()
  );
  const resetCountErgonomicCounterDisposable = vscode.commands.registerCommand(
    "drink-water.ergonomic-resetCount",
    () => ergonomicTimer.stop()
  );

  context.subscriptions.push(
    resetCountDisposable,
    activateCounterDisposable,
    activateErgonomicCounterDisposable,
    resetCountErgonomicCounterDisposable
  );
}

export function deactivate() {}
