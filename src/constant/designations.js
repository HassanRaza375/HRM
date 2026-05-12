export const companyReportingLine = [
  // =========================
  // Executive Management
  // =========================
  {
    id: 1,
    name: "CEO",
    abbreviation: "Chief Executive Officer",
    reportsTo: null,
    level: 1,
    department: "Executive",
  },
  {
    id: 2,
    name: "COO",
    abbreviation: "Chief Operating Officer",
    reportsTo: 1,
    level: 2,
    department: "Operations",
  },
  {
    id: 3,
    name: "CTO",
    abbreviation: "Chief Technology Officer",
    reportsTo: 1,
    level: 2,
    department: "Technology",
  },
  {
    id: 4,
    name: "CFO",
    abbreviation: "Chief Financial Officer",
    reportsTo: 1,
    level: 2,
    department: "Finance",
  },
  {
    id: 5,
    name: "CMO",
    abbreviation: "Chief Marketing Officer",
    reportsTo: 1,
    level: 2,
    department: "Marketing",
  },
  {
    id: 6,
    name: "CHRO",
    abbreviation: "Chief Human Resources Officer",
    reportsTo: 1,
    level: 2,
    department: "Human Resources",
  },

  // =========================
  // Administration
  // =========================
  {
    id: 7,
    name: "Admin Manager",
    abbreviation: "Administration Manager",
    reportsTo: 2,
    level: 3,
    department: "Administration",
  },
  {
    id: 8,
    name: "Office Assistant",
    abbreviation: "Office Assistant",
    reportsTo: 7,
    level: 4,
    department: "Administration",
  },
  {
    id: 9,
    name: "Receptionist",
    abbreviation: "Front Desk Receptionist",
    reportsTo: 7,
    level: 4,
    department: "Administration",
  },

  // =========================
  // HR Department
  // =========================
  {
    id: 10,
    name: "HR Manager",
    abbreviation: "Human Resources Manager",
    reportsTo: 6,
    level: 3,
    department: "Human Resources",
  },
  {
    id: 11,
    name: "HR Executive",
    abbreviation: "Human Resources Executive",
    reportsTo: 10,
    level: 4,
    department: "Human Resources",
  },
  {
    id: 12,
    name: "Recruiter",
    abbreviation: "Technical Recruiter",
    reportsTo: 10,
    level: 4,
    department: "Human Resources",
  },

  // =========================
  // Technology Department
  // =========================
  {
    id: 13,
    name: "Engineering Manager",
    abbreviation: "Engineering Manager",
    reportsTo: 3,
    level: 3,
    department: "Technology",
  },
  {
    id: 14,
    name: "Technical Lead",
    abbreviation: "Tech Lead",
    reportsTo: 13,
    level: 4,
    department: "Technology",
  },
  {
    id: 15,
    name: "Senior Software Engineer",
    abbreviation: "Sr. SWE",
    reportsTo: 14,
    level: 5,
    department: "Technology",
  },
  {
    id: 16,
    name: "Software Engineer",
    abbreviation: "SWE",
    reportsTo: 15,
    level: 6,
    department: "Technology",
  },
  {
    id: 17,
    name: "Junior Developer",
    abbreviation: "Jr. Developer",
    reportsTo: 16,
    level: 7,
    department: "Technology",
  },
  {
    id: 18,
    name: "Frontend Developer",
    abbreviation: "Frontend Dev",
    reportsTo: 14,
    level: 5,
    department: "Technology",
  },
  {
    id: 19,
    name: "Backend Developer",
    abbreviation: "Backend Dev",
    reportsTo: 14,
    level: 5,
    department: "Technology",
  },
  {
    id: 20,
    name: "Mobile App Developer",
    abbreviation: "Mobile Dev",
    reportsTo: 14,
    level: 5,
    department: "Technology",
  },
  {
    id: 21,
    name: "QA Engineer",
    abbreviation: "Quality Assurance Engineer",
    reportsTo: 13,
    level: 5,
    department: "Technology",
  },
  {
    id: 22,
    name: "DevOps Engineer",
    abbreviation: "DevOps",
    reportsTo: 13,
    level: 5,
    department: "Technology",
  },
  {
    id: 23,
    name: "UI UX Designer",
    abbreviation: "UI/UX Designer",
    reportsTo: 13,
    level: 5,
    department: "Design",
  },

  // =========================
  // Product Department
  // =========================
  {
    id: 24,
    name: "Product Manager",
    abbreviation: "PM",
    reportsTo: 1,
    level: 3,
    department: "Product",
  },
  {
    id: 25,
    name: "Associate Product Manager",
    abbreviation: "APM",
    reportsTo: 24,
    level: 4,
    department: "Product",
  },
  {
    id: 26,
    name: "Business Analyst",
    abbreviation: "BA",
    reportsTo: 24,
    level: 4,
    department: "Product",
  },

  // =========================
  // Sales Department
  // =========================
  {
    id: 27,
    name: "Sales Manager",
    abbreviation: "Sales Manager",
    reportsTo: 2,
    level: 3,
    department: "Sales",
  },
  {
    id: 28,
    name: "Sales Executive",
    abbreviation: "Sales Exec",
    reportsTo: 27,
    level: 4,
    department: "Sales",
  },
  {
    id: 29,
    name: "Business Development Executive",
    abbreviation: "BDE",
    reportsTo: 27,
    level: 4,
    department: "Sales",
  },
  {
    id: 30,
    name: "Customer Support Representative",
    abbreviation: "CSR",
    reportsTo: 27,
    level: 5,
    department: "Support",
  },

  // =========================
  // Marketing Department
  // =========================
  {
    id: 31,
    name: "Marketing Manager",
    abbreviation: "Marketing Manager",
    reportsTo: 5,
    level: 3,
    department: "Marketing",
  },
  {
    id: 32,
    name: "Digital Marketing Specialist",
    abbreviation: "Digital Marketer",
    reportsTo: 31,
    level: 4,
    department: "Marketing",
  },
  {
    id: 33,
    name: "SEO Specialist",
    abbreviation: "SEO",
    reportsTo: 31,
    level: 4,
    department: "Marketing",
  },
  {
    id: 34,
    name: "Social Media Manager",
    abbreviation: "SMM",
    reportsTo: 31,
    level: 4,
    department: "Marketing",
  },
  {
    id: 35,
    name: "Content Writer",
    abbreviation: "Content Writer",
    reportsTo: 31,
    level: 5,
    department: "Marketing",
  },

  // =========================
  // Finance Department
  // =========================
  {
    id: 36,
    name: "Finance Manager",
    abbreviation: "Finance Manager",
    reportsTo: 4,
    level: 3,
    department: "Finance",
  },
  {
    id: 37,
    name: "Accountant",
    abbreviation: "Accountant",
    reportsTo: 36,
    level: 4,
    department: "Finance",
  },
  {
    id: 38,
    name: "Billing Executive",
    abbreviation: "Billing Exec",
    reportsTo: 36,
    level: 4,
    department: "Finance",
  },

  // =========================
  // Operations Department
  // =========================
  {
    id: 39,
    name: "Operations Manager",
    abbreviation: "Operations Manager",
    reportsTo: 2,
    level: 3,
    department: "Operations",
  },
  {
    id: 40,
    name: "Project Coordinator",
    abbreviation: "Project Coordinator",
    reportsTo: 39,
    level: 4,
    department: "Operations",
  },
  {
    id: 41,
    name: "Data Entry Operator",
    abbreviation: "Data Entry",
    reportsTo: 39,
    level: 5,
    department: "Operations",
  },

  // =========================
  // Security & Maintenance
  // =========================
  {
    id: 42,
    name: "Security Guard",
    abbreviation: "Security",
    reportsTo: 7,
    level: 5,
    department: "Security",
  },
  {
    id: 43,
    name: "Office Boy",
    abbreviation: "Office Assistant",
    reportsTo: 7,
    level: 5,
    department: "Administration",
  },
  {
    id: 44,
    name: "Cleaner",
    abbreviation: "Office Cleaner",
    reportsTo: 7,
    level: 5,
    department: "Maintenance",
  },
  {
    id: 45,
    name: "Sweeper",
    abbreviation: "Cleaning Staff",
    reportsTo: 44,
    level: 6,
    department: "Maintenance",
  },
];
