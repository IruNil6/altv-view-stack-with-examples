import EmitClient from "../events/EmitClient";

class Logger {
  public static Debug(message: string, ...args: any[]): void {
    try {
      alt.emit(EmitClient.Debug, message, JSON.stringify(args));
    } catch (e) { }
  }

  public static Error(message: string, ...args: any[]): void {
    try {
      alt.emit(EmitClient.Error, message, JSON.stringify(args));
    } catch (e) { }
  }

  public static Info(message: string, ...args: any[]): void {
    try {
      alt.emit(EmitClient.Info, message, JSON.stringify(args));
    } catch (e) { }
  }
}

export default Logger;