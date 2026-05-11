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

.justify-space-between {
    justify-content: space-between;
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

.mt-4 {
    margin-top: 24px;
}

.my-4 {
    margin-top: 24px;
    margin-bottom: 24px;
}

.ma-0 {
    margin: 0 !important;
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

.privacy {
    border: 1px solid grey;
    padding: 20px;
    margin: 40px 20px 20px 20px;
    background-color: rgb(239, 239, 239);
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
`;
