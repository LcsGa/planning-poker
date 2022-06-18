const { createGlobPatternsForDependencies } = require("@nrwl/angular/tailwind");
const { join } = require("path");

const templateCol = (repeat) => `repeat(${repeat}, minmax(40px, 120px))`;

module.exports = {
  content: [join(__dirname, "src/**/!(*.stories|*.spec).{ts,html}"), ...createGlobPatternsForDependencies(__dirname)],
  theme: {
    extend: {
      gridTemplateColumns: {
        "fit-4": templateCol(4),
        "fit-5": templateCol(5),
        "fit-6": templateCol(6),
      },
    },
  },
  plugins: [],
};
