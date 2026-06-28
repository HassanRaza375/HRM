<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12">
                <v-card class="rounded-0">
                    <v-card-item>
                        <div class="d-flex justify-space-between align-center flex-wrap gap-2">
                            <h1 class="my-0 text-headline-large font-weight-bold">
                                {{ route.query.id ? "Edit" : "Create" }} Salary Slip
                            </h1>
                            <div class="d-flex align-items-center gap-2 justify-end flex-grow-1">
                                <v-btn class="rounded-0" @click="goBack" prepend-icon="mdi-arrow-left"
                                    color="grey-lighten-1">Back</v-btn>
                                <v-btn class="rounded-0" color="primary" @click="onSubmit">
                                    {{ route.query.id ? "Update Salary Slip" : "Create Salary Slip" }}
                                </v-btn>
                            </div>
                        </div>
                    </v-card-item>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-card class="rounded-0">
                    <v-card-item>
                        <v-row>
                            <v-col cols="12">
                                <h2 class="text-title-medium font-weight-bold mb-0">Employee Personal Information</h2>
                            </v-col>
                            <v-col cols="3">
                                <v-select label="Employee" :items="employees" v-model="form.employeeid"
                                    item-title="name" item-value="employeeid" hide-details variant="outlined"
                                    density="compact"></v-select>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field label="Employee Name" density="compact" v-model="form.name" hide-details
                                    variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field label="Designation" density="compact" v-model="form.designation"
                                    hide-details variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field label="Department" density="compact" v-model="form.department"
                                    hide-details variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field label="Section" density="compact" v-model="form.section" hide-details
                                    variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field label="Account Details" density="compact" v-model="form.accountdetails"
                                    hide-details variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field label="Division" density="compact" v-model="form.division" hide-details
                                    variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field label="CNIC" density="compact" v-model="form.cnic" hide-details
                                    variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field label="DOJ" density="compact" v-model="form.doj" hide-details
                                    variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field label="Days Paid" density="compact" v-model="form.daysPaid" hide-details
                                    variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field label="Grade" density="compact" v-model="form.grade" hide-details
                                    variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field label="Current Salary" density="compact" v-model="form.currentsalary"
                                    hide-details variant="outlined"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-item>
                </v-card>
            </v-col>
            <v-col cols="12">
                <v-card class="rounded-0">
                    <v-card-text>
                        <v-row>
                            <v-col cols="12">
                                <h2 class="text-title-medium font-weight-bold mb-0">Salary Details</h2>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field label="Basic Salary" density="compact" v-model="form.basicsalary"
                                    hide-details variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field label="Houese Rent" density="compact" v-model="form.houserent"
                                    hide-details variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field label="Utility" density="compact" v-model="form.utility" hide-details
                                    variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field label="Medical" density="compact" v-model="form.medical" hide-details
                                    variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field label="Fuel Allowance" density="compact" v-model="form.fuelallowance"
                                    hide-details variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field label="EOBI" density="compact" v-model="form.eobi" hide-details
                                    variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field label="Provident Fund" density="compact" v-model="form.providentfund"
                                    hide-details variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field label="Amount In Words" density="compact" v-model="form.amountinwords"
                                    hide-details variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field label="Net Payable" density="compact" v-model="form.netpayable"
                                    hide-details variant="outlined"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12">
                <v-card class="rounded-0">
                    <v-card-text>
                        <v-row>
                            <v-col cols="12" class="d-flex justify-space-between align-center">
                                <h2 class="text-title-medium font-weight-bold mb-0">Other Benefits</h2>
                                <v-btn size="small" color="primary" prepend-icon="mdi-plus" @click="addBenefit">
                                    Add Benefit
                                </v-btn>
                            </v-col>
                            <v-col cols="12" v-if="form.otherBenefits.length === 0">
                                <p class="text-medium-emphasis text-body-2">No other benefits added. Click "Add Benefit" to add one.</p>
                            </v-col>
                            <template v-for="(benefit, index) in form.otherBenefits" :key="index">
                                <v-col cols="5">
                                    <v-text-field label="Benefit Title" density="compact" v-model="benefit.title"
                                        hide-details variant="outlined" />
                                </v-col>
                                <v-col cols="5">
                                    <v-text-field label="Amount" density="compact" v-model="benefit.value"
                                        hide-details variant="outlined" type="number" />
                                </v-col>
                                <v-col cols="2" class="d-flex align-center">
                                    <v-btn icon="mdi-delete" variant="text" color="error" size="small"
                                        @click="removeBenefit(index)" />
                                </v-col>
                            </template>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12">
                <v-card class="rounded-0">
                    <v-card-text>
                        <v-row>
                            <v-col cols="12">
                                <h2 class="text-title-medium font-weight-bold mb-0">Provident Fund</h2>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field label="Last Withdrawal Date" density="compact"
                                    v-model="form.lastwithdrawaldate" hide-details variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field label="Loan Amount" density="compact" v-model="form.loanamount"
                                    hide-details variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field label="Remaining Loan Balance" density="compact"
                                    v-model="form.remainingloanbalance" hide-details variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field label="Monthly Installement" density="compact"
                                    v-model="form.monthlyallowance" hide-details variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field label="Employee Pf Deduction" density="compact"
                                    v-model="form.employeepfdeduction" hide-details variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field label="Employee Pf con" density="compact" v-model="form.employeepfcon"
                                    hide-details variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field label="PF Profit" density="compact" v-model="form.pfProfit" hide-details
                                    variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field label="PF Total" density="compact" v-model="form.pfTotal" hide-details
                                    variant="outlined"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup>
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted, watch } from "vue";
import { useEmployeeStore } from "../../../stores/employeeStore";

const router = useRouter();
const route = useRoute();
const employeeStore = useEmployeeStore();

const form = ref({
    employeeid: "",
    name: "",
    designation: "",
    department: "",
    section: "",
    accountdetails: "",
    division: "",
    cnic: "",
    doj: "",
    daysPaid: "",
    grade: "",
    currentsalary: "",
    // salary details
    basicsalary: "",
    houserent: "",
    utility: "",
    medical: "",
    fuelallowance: "",
    eobi: "",
    providentfund: "",
    amountinwords: "",
    netpayable: "",
    // provident fund
    lastwithdrawaldate: "",
    loanamount: "",
    remainingloanbalance: "",
    monthlyallowance: "",
    employeepfdeduction: "",
    employeepfcon: "",
    pfProfit: "",
    pfTotal: "",
    otherBenefits: [],
});

const employees = ref([]);

// Map employee object -> form fields
const populateFromEmployee = (employeeid) => {
    const emp = employeeStore.getEmployeeById(employeeid);
    if (!emp) return;

    form.value.employeeid = emp.employeeid;
    form.value.name = emp.name || "";
    form.value.designation = emp.designation || "";
    form.value.department = emp.department || "";
    form.value.cnic = emp.cnic || "";
    form.value.doj = emp.doj || "";
    form.value.currentsalary = emp.currentsalary || "";
    form.value.accountdetails =
        emp.bankname && emp.accountnumber
            ? `${emp.bankname} - ${emp.accountnumber}`
            : "";
};

// Fill fields whenever a new employee is picked (skip while editing)
watch(
    () => form.value.employeeid,
    (newId) => {
        if (newId && !route.query.id) {
            populateFromEmployee(newId);
        }
    }
);

const addBenefit = () => {
    form.value.otherBenefits.push({ title: "", value: "" });
};

const removeBenefit = (index) => {
    form.value.otherBenefits.splice(index, 1);
};

const goBack = () => router.back();

const onSubmit = () => {
    if (route.query.id) {
        employeeStore.updateSalarySlip(form.value);
    } else {
        employeeStore.addSalarySlip(form.value);
    }
    employeeStore.callNotification({
        text: `Salary Slip ${route.query.id ? "updated" : "created"} successfully!`,
    });
    router.push("/employees/salary-slip");
};

onMounted(() => {
    employees.value = employeeStore.employees;

    // Edit mode: route.query.id is the SLIP id, route.query.employeeid the employee
    if (route.query.id) {
        const slip = employeeStore.getSalarySlipById(
            route.query.employeeid,
            route.query.id
        );
        if (slip) {
            form.value = { ...slip };
            if (!Array.isArray(form.value.otherBenefits)) {
                form.value.otherBenefits = [];
            }
        }
    }
});
</script>
<style scoped></style>