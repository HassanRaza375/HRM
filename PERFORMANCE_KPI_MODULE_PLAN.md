# Performance & KPI module plan

## Current application assessment

The HRM is a Vue 3/Vuetify single-page application backed by Pinia. It has no server API or database: data is stored per browser in `localStorage` through `src/services/storageService.js`.

| Domain | Local-storage key | Primary identifier | Existing workflow |
| --- | --- | --- | --- |
| Employees | `employees` | `employeeid` | Create/edit individually or replace through Excel bulk upload |
| Leave balances | `leaves` | `employeeid` | Excel upload upserts a record; HR can edit/view/delete it |
| Assets | `assetTypes`, `assets`, `movements` | ID / `assettag` | Maintain types/assets and append assignment or return movements |
| Salary slips | nested under `employees[].salarySlips` | generated `SLIP-*` ID | Create, edit, and delete per employee |
| Templates | `templates` | template ID | Seeded in code and then editable locally |

The application gate sends a new browser with no employees to bulk upload. Employee records contain the information needed for performance relationships: `employeeid`, `name`, `designation`, `department`, `reportingline`, and employment dates. Authentication is only a local `isAuthenticated` flag.

## Product workflow

1. HR creates shared KPI definitions for a department, role, or the whole company, including target, unit, weight, and review frequency.
2. A manager or HR starts an employee review for a period and selects the employee. The system snapshots the employee’s name, department, and designation for historical reporting.
3. The reviewer records actual results and a score per KPI. Weighted scoring produces an overall percentage and performance rating.
4. The review is saved as a draft or marked completed. Completed reviews are available in the employee performance list for filtering and follow-up.
5. In a future server-backed phase, employee and manager roles should constrain who can create, submit, approve, or view each review.

## Delivered MVP scope

- **KPI library**: create, edit, retire/delete, search, and filter KPI definitions.
- **Employee performance**: create/edit reviews, select KPIs from the library, record results and scores, calculate weighted overall score and rating, filter the review register by employee/department/period/status.
- **Persistence**: new `kpis` and `performanceReviews` local-storage keys, implemented through the existing Employee Pinia store for consistent notifications and loading.

## Follow-on modules

| Phase | Module | Key capability |
| --- | --- | --- |
| 2 | Review cycles and assignments | Period templates, manager assignment, due dates, reminders |
| 2 | Approval and calibration | Self/manager inputs, HR calibration, sign-off and audit trail |
| 3 | Goals and development plans | Individual goals, check-ins, competencies, development actions |
| 3 | Reporting | Department distributions, KPI attainment trends, exportable review history |
| 4 | API, access control, and integrations | Shared database, RBAC, employee SSO, payroll/attendance links |

## Data and implementation notes

- KPIs are deliberately reusable definitions. A review copies KPI values into `performanceReviews[].items` so later KPI edits do not alter historical scores.
- IDs use the app’s current timestamp-prefix convention. This is sufficient for browser-local data but should move to server-generated UUIDs when an API is introduced.
- The current upload flow replaces the full employee collection; performance reviews retain employee snapshots so historic reviews remain readable even if an employee record is later removed.
