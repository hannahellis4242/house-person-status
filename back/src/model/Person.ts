import { v4 } from "uuid";
export default interface Person {
  id: number | string;
  name: string;
}

export const createPerson = (): Person => {
  return { id: v4(), name: "" };
};
