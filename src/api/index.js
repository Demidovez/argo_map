import data from "./fields.json";

export const API = {
  getFields() {
    return new Promise((resolve) => {
      // Simulation of Fetch API
      setTimeout(
        () =>
          resolve(
            data.map((field) => ({
              ...field,
              Location: JSON.parse(field.Location),
            }))
          ),
        500
      );
    });
  },
};
