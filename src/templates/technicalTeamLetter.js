// templates/technicalTeamLetter.js

import { defaultTemplateCSS } from "./defaultStyles.js";

export const technicalTeamLetterTemplate = {
  id: "technical-team-letter",

  name: "Technical Team Letter",

  type: "HR",

  content: {
    css: defaultTemplateCSS,

    header: ``,

    body: `
      <section style="margin-top: 100px;">
        <h3>Technical Team Letter</h3>
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
  dateCreated: "4th Jan 2026",
};
