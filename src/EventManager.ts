import EmitWebView from "./constants/events/EmitWebView";
import Logger from "./constants/helpers/Logger";

class EventManager {
  private events: any;

  public constructor() {
    this.events = {};

    try {
      alt.on(EmitWebView.CEFTrigger, (en: string, args: string) => this.Trigger(en, args))
    } catch (e) { }
  }

  public AddHandler(eventName: string, handler: any): void {
    if (eventName in this.events) this.events[eventName].push(handler);
    else this.events[eventName] = [handler];
  }

  public RemoveHandler(eventName: string): void {
    if (eventName in this.events) {
      this.events[eventName] = null;
      delete this.events[eventName];
    }
  }

  public Trigger(eventName: string, args: string) {
    try {
      var handlers = this.events[eventName];
      handlers.forEach((handler: any) => handler(JSON.parse(args)));
    } catch (e) {
      Logger.Debug('WebView-Error:', e);
    }
  }
}

const eventManager = (window as any).EventManager || new EventManager();
(window as any).EventManager = eventManager;
export default eventManager;
