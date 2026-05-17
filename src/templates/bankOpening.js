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
        <div class="row justify-between">
            <table>
                <tbody>
                    <tr>
                        <td class="bold">To:</td>
                    </tr>
                    <tr>
                        <td>The Branch Manager</td>
                    </tr>
                    <tr>
                        <td>Bank Name</td>
                    </tr>
                </tbody>
            </table>

            <table>
                <tbody>
                    <tr>
                        <td class="bold" valign="top">Date:</td>
                        <td valign="top">4th Jan 2026</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="row justify-center mt-5">
            <h3 class="bold ma-0">Subject: <span class="text-underline ms-1">Request for Bank Account Opening for
                    Employee</span></h3>
        </div>
        <div class="mt-4">
            <h4 class="bold ma-0">Dear Sir/Madam,</h4>
        </div>
        <div class="mt-4">
            <P class="ma-0">This is to formally request you to kindly open a <b>Salary Account</b> in the name of our
                employee
                <b>{{name}}</b>, holding CNIC No. <b>{{cnic}}</b>, who is currently working with <b>SAT
                    JAPAN</b> as <b>{{designation}}</b>.
            </P>
        </div>
        <div class="mt-4">
            <P class="ma-0">The above-mentioned employee has been employed with our organization since <b>{{doj}}</b> and
                getting salary of <b>PKR {{currentsalary}}/-</b>. We request you to facilitate the opening of his salary account so
                that
                monthly salary and other benefits may be transferred through your esteemed bank.
            </P>
        </div>
        <div class="mt-4">
            <P class="ma-0">We confirm that the details provided by the employee are correct as per our company records.
                Kindly proceed with the necessary formalities. Should you require any further information,
                <br>
                please feel free to contact us.
                <br>
                <br>
                Thank you for your cooperation.
                <br>
                <br>
                Sincerely,
            </P>
        </div>
        <div class="mt-5">
            <table>
                <tbody>
                    <tr>
                        <td class="pb">Authorized Signatory:</td>
                    </tr>
                    <tr>
                        <th align="start" class="pb"><i>Amna Saleem</i></th>
                    </tr>
                    <tr>
                        <th align="start" class="pb">HR Manager</th>
                    </tr>
                    <tr>
                        <th align="start" style="color: #0070c0;">SAT JAPAN</th>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
    `,

    footer: ``,
  },

  variables: ["name", "designation", "currentsalary", "doj", "cnic"],
  dateCreated: "4th Jan 2026",
};
