/********************************************************
 * TODO Class
 * This is a model for each item in our To-Do list
 **********************************************************/
export class Todo {
  constructor(
    public id: string,
    public name: string,
    public type: string,
    public description: string,
    public completed: boolean
  ) {}
}
