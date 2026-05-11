// templates/bankOpening.js

import { defaultTemplateCSS } from "./defaultStyles.js";

export const bankOpeningTemplate = {
  id: "bank-opening-letter",

  name: "Bank Opening Letter",

  type: "HR",

  content: {
    css: defaultTemplateCSS,

    header: ``,

    body: `
      <section style="margin-top: 100px;">
      <h4 class="text-center my-4">Bank Account Opening Request Letter For Company Employees</h4>
      <p>
        To, <br />
        The Branch Manager, <br />
        {{BankName}}, <br />
        {{Branch Address}}, <br />
        {{Date}}. <br />
      </p>
      <p class="my-4">Subject: Account opening request letter for employees.</p>
      <p class="my-4">Respected Sir,</p>
      <p class="text-justify">
        You are requested that {{Employee}} Son of {{FatherName}}
        is an employee of this company. He is employed as a {{Designation}}. His monthly salary is approximately Rs {{BasicPay}},
      </p>
      <p class="text-justify my-4">
        He needs to open a new savings bank account in your bank for his salary.
        So, you are requested that open a bank account of the above-named
        employee on behalf of this company.
      </p>
      <p>Your co-operation will be highly appreciated</p>
      <p class="my-4">
        Best Regards, <br />
        {{name}}
      </p>
    </section>
    `,

    footer: ``,
  },

  variables: ["employeename", "designation", "basicsalary"],
  dateCreated: new Date(12 / 12 / 2022).toDateString(),
};
