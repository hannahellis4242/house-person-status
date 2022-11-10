import Colour from "./Colour";

export default interface Status {
  colour?: Colour;
  message: string;
}

export const createStatus = (): Status => {
  return { message: "" };
};

export const updateStatus = (
  status: Status,
  fn: (status: Status) => Status
) => {
  return fn(status);
};
