export default class DateTimeConverter {
  public GetDateTime(fileTime: number): Date {
    const dateTime = (fileTime - 116444736e9) / 10000;
    return new Date(dateTime);
  }

  public GetFileTime(dateTime: Date): number {
    const fileTime = dateTime.getTime() * 10000 + 116444736e9;
    return fileTime;
  }

  public timeZone: Number = new Date().getTimezoneOffset() / -60;
  public FILE_TIME_DAY: Number = 864e9;
}
