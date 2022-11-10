import Person, { createPerson } from "./Person";
import Status, { createStatus } from "./Status";

export default interface User {
  person: Person;
  status: Status;
}

export const createUser = (name: string): User => {
  return {
    person: (() => {
      const person = createPerson();
      person.name = name;
      return person;
    })(),
    status: createStatus(),
  };
};
