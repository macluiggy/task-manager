import { API_ENVIRONMENT, globalDecorate } from "./config/config.constant";

const freezeObject = (...obj: any[]) => {
  return Object.freeze(Object.assign({}, ...obj));
};

freezeObject(globalDecorate, API_ENVIRONMENT);

export default {
  globalDecorate,
};
