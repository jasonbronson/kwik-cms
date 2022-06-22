import { general } from "./general";
var qs = require("qs");

export const query = {
  caseInsensitiveSearch(fieldName, fieldValue) {
    let condition = {};
    if (!general.isEmpty(fieldValue)) {
      condition[fieldName] = fieldValue;
    }

    return condition
      ? qs.stringify(condition, {
          encodeValuesOnly: true,
        })
      : "&";
  },
  equalSearch(fieldName, fieldValue) {
    let condition = {};
    if (!general.isEmpty(fieldValue)) {
      condition[fieldName] = fieldValue;
    }

    return condition
      ? qs.stringify(condition, {
          encodeValuesOnly: true,
        })
      : "&";
  },
};
