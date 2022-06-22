import moment from "moment";
export const general = {
  isEmpty(str) {
    return !str || str.length === 0;
  },
  publishedDateFix(value) {
    return value === "" ? null : moment(value).utc().toISOString();
  },
  slugify(str) {
    return str
      .toLowerCase()
      .trim()
      .replace(/ /g, "-")
      .replace(/[&\\#,+()$@_~%.'":*?<>{}]/g, "");
  },
};
