// templates/appointmentLetter.js

import { defaultTemplateCSS } from "./defaultStyles.js";

export const appointmentLetterTemplate = {
  id: "appointment-letter",

  name: "Appointment Letter",

  type: "HR",

  content: {
    css: defaultTemplateCSS,

    header: ``,

    body: `
      <section style="margin-top: 100px;">
        <h3>Appointment Letter</h3>
        <p>
          This is to certify that
          <strong>{{employeename}}</strong>
          works with us as
          <strong>{{designation}}</strong>.
        </p>
      </section>
    `,

    footer: ``,
  },

  variables: ["employeename", "designation", "basicsalary"],
  dateCreated: new Date(12 / 12 / 2022).toDateString(),
};
