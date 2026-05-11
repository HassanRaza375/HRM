// templates/NDAFormate.js

import { defaultTemplateCSS } from "./defaultStyles.js";

export const NDAFormateTemplate = {
  id: "NDA-formate",

  name: "NDA Formate",

  type: "HR",

  content: {
    css: defaultTemplateCSS,

    header: ``,

    body: `
      <section style="margin-top: 100px;">
        <h3>NDA Formate</h3>
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
