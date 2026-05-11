// templates/experienceLetter.js

import { defaultTemplateCSS } from "./defaultStyles.js";

export const experienceLetterTemplate = {
  id: "experience-letter",

  name: "Experience Letter",

  type: "HR",

  content: {
    css: defaultTemplateCSS,

    header: ``,

    body: `
      <section style="margin-top: 100px;">
        <h3>Experience Letter</h3>
        <p>
          This is to certify that
          <strong>{{name}}</strong>
          works with us as
          <strong>{{designation}}</strong>.
        </p>
      </section>
    `,

    footer: ``,
  },

  variables: ["name", "designation", "currentsalary"],
  dateCreated: new Date(12 / 12 / 2022).toDateString(),
};
