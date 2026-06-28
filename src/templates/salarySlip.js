// templates/salarySlip.js

import { defaultTemplateCSS } from "./defaultStyles.js";
import satLogo from "../assets/SatLogo.svg";
export const salarySlipTemplate = {
  id: "salary-slip",

  name: "Salary Slip",

  type: "HR",

  content: {
    css: defaultTemplateCSS,

    header: ``,

    body: `
      <section class="px-3">
        <div class="row justify-end">
            <small>
                <b>Print Date:</b>{{todaydate}}
            </small>
        </div>
        <div class="row justify-center">
            <img src="${satLogo}" width="150" height="40" loading="lazy" alt="logo" />
        </div>
        <div class="row justify-center mt-3 text-center">
            <p class="ma-0 bold" style="line-height: 18px;">Pay slip for the Month of December 2025
            </p>
        </div>

        <div class="mt-4">
            <table width="100%" class="salary--table">
                <thead>
                    <th bgcolor="#008080" class="text-white" colspan="100%">Personal Information
                    </th>
                </thead>
                <tbody>
                    <tr>
                        <td width="33.33%"><b>Employee No:</b>{{id}}</td>
                        <td width="33.33%"><b>Name:</b>{{name}}</td>
                        <td width="33.33%"><b>Designation:</b>{{designation}}</td>
                    </tr>
                    <tr>
                        <td width="33.33%"><b>Department:</b>{{department}}</td>
                        <td width="33.33%"><b>Section:</b>{{officelocation}}</td>
                        <td width="33.33%"><b>Account Details:</b>{{accountdetails}}</td>
                    </tr>
                    <tr>
                        <td width="33.33%"><b>Division:</b>{{region}}</td>
                        <td width="33.33%"><b>CNIC:</b>{{cnic}}</td>
                        <td width="33.33%"><b>D.O.J:</b>{{doj}}</td>
                    </tr>
                    <tr>
                        <td width="33.33%"><b>Days(Paid/Clndr):</b>{{currentmonthdays}}</td>
                        <td width="33.33%"><b>Grade:</b>{{grade}}</td>
                        <td width="33.33%"><b>Gross Salary:</b>{{currentsalary}}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="mt-4">
            <table width="100%" class="salary--table border-table">
                <thead>
                    <th bgcolor="#008080" class="text-white" colspan="100%">Salary Details
                    </th>
                </thead>
                <tbody>
                    <tr>
                        <td width="20%" align="center"><b>Earnings:</b></td>
                        <td width="12%" align="center"><b>Amount:</b></td>
                        <td width="20%" align="center"><b>Other Benefits:</b></td>
                        <td width="12%" align="center"><b>Amount:</b></td>
                        <td width="20%" align="center"><b>Deductions:</b></td>
                        <td width="12%" align="center"><b>Amount:</b></td>
                    </tr>

                    <tr>
                        <td width="20%" align="left"
                            style="border-right-color: transparent;border-bottom-color:transparent;"><b>Basic:</b></td>
                        <td width="12%" align="right" style="border-bottom-color:transparent;">{{basicsalary}}</td>
                        <td colspan="2" rowspan="4" valign="top"
                            style="padding:0;border-bottom-color:transparent;">
                            <table width="100%" style="border-collapse:collapse;">
                                {{otherBenefitsRows}}
                            </table>
                        </td>
                        <td width="20%" align="left"
                            style="border-right-color: transparent;border-bottom-color:transparent;"><b>EOBI:</b></td>
                        <td width="12%" align="right" style="border-bottom-color:transparent;">{{eobi}}</td>
                    </tr>

                    <tr>
                        <td width="20%" align="left"
                            style="border-right-color: transparent;border-bottom-color:transparent;"><b>House Rent:</b>
                        </td>
                        <td width="12%" align="right" style="border-bottom-color:transparent;">{{houserent}}</td>
                        <td style="border-right-color: transparent;border-bottom-color: transparent"><b>Provident
                                Fund:</b></td>
                        <td align="right" style="border-bottom-color: transparent;">{{providentfund}}</td>
                    </tr>

                    <tr>
                        <td width="20%" align="left"
                            style="border-right-color: transparent;border-bottom-color:transparent;"><b>Utilities:</b>
                        </td>
                        <td width="12%" align="right" style="border-bottom-color:transparent;">{{utility}}</td>
                        <td style="border-bottom-color:transparent;border-right-color: transparent;"></td>
                        <td style="border-bottom-color:transparent;"></td>
                    </tr>
                    <tr>
                        <td width="20%" align="left" style="border-right-color: transparent;"><b>Medical:</b></td>
                        <td width="12%" align="right">{{medical}}</td>
                        <td style="border-right-color: transparent;"></td>
                        <td></td>
                    </tr>

                    <tr>
                        <td width="20%" align="left"><b>Total:</b></td>
                        <td width="12%" align="right">{{earningsTotal}}</td>
                        <td width="20%" align="left"><b>Total</b></td>
                        <td width="12%" align="right">{{otherBenefitsTotal}}</td>
                        <td width="20%" align="left"><b>Total</b></td>
                        <td width="12%" align="right">{{deductionsTotal}}</td>
                    </tr>
                    <tr>
                        <td colspan="6" style="border-inline-color: transparent;height: 31px;"></td>
                    </tr>
                    <tr>
                        <td colspan="4">
                            <b>Amount in Words:</b>
                            <br>
                            <i>{{amountinwords}}</i>
                        </td>
                        <td>
                            <b>Net Payable</b>
                        </td>
                        <td align="right">
                            {{netpayable}}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="mt-4">
            <table width="100%" class="salary--table border-table">
                <thead>
                    <th bgcolor="#008080" class="text-white" colspan="100%">Provident Fund</th>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="2" align="center"><b>Loan Details</b></td>
                        <td colspan="2" align="center"><b>Loan Type:</b></td>
                        <td colspan="2" align="center"><b>PF Detail:</b></td>
                    </tr>
                    <tr>
                        <td width="20%" style="border-right-color: transparent;"><b>Last Withdrawal Date</b></td>
                        <td width="12%" align="right">12/12/25</td>
                        <td width="20%" style="border-right-color: transparent;"><b></b>Rem.Loan Balance</b></td>
                        <td width="12%" align="right">0</td>
                        <td width="20%" style="border-right-color: transparent;"><b>Employee PF Ded.</b></td>
                        <td width="12%" align="right">N/A</td>
                    </tr>
                    <tr>
                        <td width="20%" style="border-right-color: transparent;"><b>Loan Amount</b></td>
                        <td width="12%" align="right">0.00</td>
                        <td width="20%" style="border-right-color: transparent;"><b>Monthly Install.</b></td>
                        <td width="12%" align="right">0</td>
                        <td width="20%" style="border-right-color: transparent;"><b>Employer PF Con.</b></td>
                        <td width="12%" align="right">N/A</td>
                    </tr>
                    <tr>
                        <td style="border-right-color:transparent;"></td>
                        <td></td>
                        <td style="border-right-color:transparent;"></td>
                        <td></td>
                        <td width="20%" style="border-right-color: transparent;"><b>PF Profit</b></td>
                        <td width="12%" align="right">N/A</td>
                    </tr>
                    <tr>
                        <td colspan="4"></td>
                        <td><b>Total</b></td>
                        <td align="right">N/A</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="mt-4">
            <p class="ma-0"><b>Note:</b> Signature not required, this is a system-generated statement.
                For any queries, please contact the Human Resource Department
            </p>
        </div>
    </section>
    `,

    footer: ``,
  },

  variables: ["name", "designation", "currentsalary", "doj", "cnic", "accountdetails", "department", "officelocation", "region", "grade", "currentmonthdays", "id", "todaydate", "basicsalary", "houserent", "utility", "medical", "eobi", "providentfund", "otherBenefitsRows", "otherBenefitsTotal", "earningsTotal", "deductionsTotal", "netpayable", "amountinwords"],
  dateCreated: "4th Jan 2026",
};
