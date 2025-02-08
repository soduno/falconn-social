export default class DateTime {
  static format(date: string) {
    const parsedDate = new Date(date);
    return parsedDate.toISOString().split("T")[0];
  }

  static humanize(date: string) {
    const parsedDate = new Date(date);


  }
}