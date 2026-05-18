export const defaultTemplateCSS = `
        :root {
            --header-height: 250px;
            --footer-height: 75px;
            --white: #ffffff;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
            font-family: sans-serif, Arial, Helvetica, sans-serif;
            line-height: 24px;
        }


        header {
            height: var(--header-height);
            width: 100%;
            background-color: #fff;
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
        }

        footer {
            height: var(--footer-height);
            width: 100%;
            padding: 0 30px;
        }

        .inherit-height {
            height: inherit;
        }

        .row {
            display: flex;
            flex-wrap: wrap;
        }

        .justify-between {
            justify-content: space-between;
        }

        .justify-center {
            justify-content: center;
        }

        .justify-end {
            justify-content: end;
        }

        .col {
            padding: 10px;
        }

        .sefl-center {
            align-self: center;
        }

        .company {
            margin: 20px;
            margin-top: 50px;
            padding: 2px;
            line-height: 2.5;
            font-style: italic;
            color: #3498db;
            border-top: 5px solid #3498db;
            border-bottom: 5px solid #3498db;
        }

        .page-1 {
            text-align: center;
            padding-top: 210px;
        }

        .mt-1 {
            margin-top: 4px;
        }

        .mt-2 {
            margin-top: 8px;
        }

        .mt-3 {
            margin-top: 16px;
        }

        .mt-4 {
            margin-top: 24px;
        }

        .mt-5 {
            margin-top: 32px;
        }

        .my-4 {
            margin-top: 24px;
            margin-bottom: 24px;
        }

        .ms-1 {
            margin-left: 4px;
        }

        .ms-2 {
            margin-left: 8px;
        }

        .ma-0 {
            margin: 0 !important;
        }

        .pb {
            padding-bottom: 2px;
        }

        .pb-1 {
            padding-bottom: 4px;
        }

        .pa-1 {
            padding: 4px;
        }

        .pa-2 {
            padding: 8px;
        }

        .ps-0 {
            padding-left: 0;
        }

        .px-3 {
            padding-inline: 16px;
        }

        .page {
            page-break-after: always;
        }

        .width-100 {
            width: 100%;
        }

        section {
            padding: 0 48px;
        }

        .text-justify {
            text-align: justify;
        }

        .text-center {
            text-align: center;
        }

        .text-right {
            text-align: right;
        }

        .text-underline {
            text-decoration: underline;
        }

        .text-white {
            color: #ffffff;
        }

        .bg-white {
            background-color: #ffffff;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p,
        ul {
            margin-bottom: .5em;
        }

        li {
            margin-left: 25px;
        }

        .bold {
            font-weight: bold;
        }

        .light {
            font-weight: normal;
        }

        .privacy {
            border: 1px solid grey;
            padding: 20px;
            margin: 40px 20px 20px 20px;
            background-color: rgb(239, 239, 239);
        }

        table {
            border-collapse: collapse;
        }

        /* border */
        border-0 {
            border: 0;
        }

        border-r-0 {
            border-right: 0;
        }

        border-l-0 {
            border-left: 0;
        }

        border-t-0 {
            border-top: 0;
        }

        border-b-0 {
            border-bottom: 0;
        }

        @page {
            size: A4;
            margin: 5mm;
        }

        @media print {
            header {
                position: fixed;
                top: 0;
            }

            footer {
                position: fixed;
                bottom: 0;
            }

            .header-space {
                height: var(--header-height);
            }

            .footer-space {
                height: var(--footer-height);
            }
        }

        /* custom */
        .salary--table {
            border: 1px solid #000;
        }

        .salary--table tr th,
        .salary--table tr td {
            padding: 3px;
            font-size: 14px;
        }

        .border-table tr th,
        .border-table tr td {
            border: 1px solid #000;
        }
`;
