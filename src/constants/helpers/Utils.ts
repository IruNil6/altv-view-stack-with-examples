class Utils {

  public static RegexMatch(matchString: string, regex: RegExp): boolean {
    return regex.test(matchString);
  }

  public static ShowInputError(id: string, message: string): void {
    const errorField = document.getElementById(id.replace('id', 'error')) as HTMLElement;
    errorField.innerHTML = message;
  }
}

export default Utils;