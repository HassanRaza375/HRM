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
        <div class="row justify-center">
            <h2 class="bold ma-0">Appointment Letter</h2>
        </div>
        <div class="row justify-between mt-4">
            <table>
                <tbody>
                    <tr>
                        <td class="bold">To:</td>
                    </tr>
                    <tr>
                        <th align="start">Mr.{{name}}</th>
                    </tr>
                    <tr>
                        <th align="start">S/O {{fathername}}</th>
                    </tr>
                    <tr>
                        <th align="start">CNIC {{cnic}}</th>
                    </tr>
                </tbody>
            </table>

            <table>
                <tbody>
                    <tr>
                        <td class="bold" valign="top">Date:</td>
                        <td valign="top">September 18, 2025</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="mt-4">
            <h4 class="bold ma-0">Dear Mr. {{name}},</h4>
        </div>

        <div class="mt-4">
            <P class="ma-0">We are pleased to confirm your appointment as a {{designation}} at <b>SAT Japan</b>,
                effective
                <b>{{doj}}</b>.
                We take this opportunity to congratulate you on your selection and welcome you to
                our team.
            </P>
        </div>

        <div class="mt-4">
            <P class="ma-0">You are expected to demonstrate professionalism, dedication, and a commitment to excellence
                in your role. Regular attendance, punctuality, adherence to company policies, and active contribution to
                team objectives will be key to your continued success and growth within the organization.
            </P>
        </div>

        <div class="mt-4">
            <P class="ma-0">Your basic salary will be <b>PKR {{currentsalary}} per month</b>. You will be eligible for a
                performance-based
                increment upon successful completion of one year of service.
            </P>
        </div>

        <div class="mt-4">
            <P class="ma-0">Your working hours will be <b>10:00 AM to 7:00 PM (Monday to Friday)</b>.
            </P>
        </div>

        <div class="mt-4">
            <P class="ma-0">As per company policy:</P>
            <P class="ma-0">- You are entitled to get 8 casual and 8 sick leaves after successful completion of
                Probation Period.</P>
            <P class="ma-0">- You will receive a performance review after completing the three-month probation period to
                successfully appointed as permanent employee.</P>
            <P class="ma-0">- In the event of resignation, you must provide a written 30-day notice. Failure to do so
                may result in necessary action as per company policy.</P>
            <P class="ma-0">- SAT Japan reserves the right to terminate employment at any time due to misconduct,
                unsatisfactory performance, violation of company rules, or any other justifiable reason.</P>
        </div>

        <div class="mt-4">
            <P class="ma-0">Your salary will be disbursed by the <b>5th of each month</b>.
            </P>
        </div>

        <div class="mt-4">
            <P class="ma-0">We are confident that your skills and efforts will contribute significantly to the success
                of SAT Japan. We wish you a rewarding and prosperous career with us.
            </P>
        </div>

        <div class="mt-4">
            <p class="ma-0">Warm regards</p>
        </div>

        <div class="mt-4 text-center">
            <i class="bold">Acknowledged and accepted by</i>
        </div>

        <div class="mt-4">
            <div class="row justify-between">
                <table>
                    <tbody>
                        <tr>
                            <th align="start" class="pb"><i>Amna Saleem</i></th>
                        </tr>
                        <tr>
                            <th align="start" class="pb">HR Manager</th>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                        <tr>
                            <th align="start" class="pb"><i>{{name}}</i></th>
                        </tr>
                        <tr>
                            <th align="start" class="pb">{{designation}}</th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
    `,

    footer: ``,
  },

  variables: ["name", "designation", "currentsalary", "doj", "cnic", "fathername"],
  dateCreated: "4th Jan 2026",
};
