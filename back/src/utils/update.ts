const update = <T>(x: T, fn: (x: T) => T) => fn(x);
export default update;
