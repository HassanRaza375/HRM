<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h1 class="my-0">Create Employee</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-tabs v-model="tab">
          <v-tab>Basic</v-tab>
          <v-tab>Salary</v-tab>
          <v-tab>Personal</v-tab>
          <v-tab>Contact</v-tab>
          <v-tab>Family</v-tab>
          <v-tab>Bank</v-tab>
        </v-tabs>
        <v-window v-model="tab">
          <!-- Basic -->
          <v-window-item :value="0">
            <h2>Basic</h2>
            <v-row class="mt-2">
              <v-col cols="12" md="4">
                <v-text-field v-model="form.employeeId" label="Employee ID" />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model="form.name" label="Name" />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model="form.designation" label="Designation" />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model="form.reportingLine" label="Reporting Line" />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model="form.doj" type="date" label="Date of Joining" />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model="form.dol" type="date" label="Date of Leaving" />
              </v-col>

              <v-col cols="12">
                <v-textarea v-model="form.reason" label="Reason (if left)" />
              </v-col>
            </v-row>
          </v-window-item>

          <!-- Salary -->
          <v-window-item :value="1">
            <h2>Salary</h2>
            <v-row class="mt-2">
              <v-col cols="12" md="4">
                <v-text-field v-model="form.salaryAtHiring" label="Salary at Hiring" />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model="form.probationSalary" label="After Probation" />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model="form.currentSalary" label="Current Salary" />
              </v-col>
            </v-row>
          </v-window-item>

          <!-- Personal -->
          <v-window-item :value="2">
            <h2>Personal</h2>
            <v-row class="mt-2">
              <v-col cols="12" md="4">
                <v-text-field v-model="form.cnic" label="CNIC" />
              </v-col>

              <v-col cols="12" md="4">
                <v-select v-model="form.maritalStatus" :items="['Single', 'Married']" label="Marital Status" />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model="form.religion" label="Religion" />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model="form.dob" type="date" label="DOB" />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model="form.age" label="Age" disabled />
              </v-col>
            </v-row>
          </v-window-item>

          <!-- Contact -->
          <v-window-item :value="3">
            <h2>Contact</h2>
            <v-row class="mt-2">
              <v-col cols="12" md="4">
                <v-text-field v-model="form.contactNumber" label="Contact Number" />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model="form.personalEmail" label="Personal Email" />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model="form.officialEmail" label="Official Email" />
              </v-col>

              <v-col cols="12" md="6">
                <v-textarea v-model="form.currentAddress" label="Current Address" />
              </v-col>

              <v-col cols="12" md="6">
                <v-textarea v-model="form.permanentAddress" label="Permanent Address" />
              </v-col>
            </v-row>
          </v-window-item>

          <!-- Family -->
          <v-window-item :value="4">
            <h2>Family</h2>
            <v-row class="mt-2">
              <v-col cols="12" md="4">
                <v-text-field v-model="form.fatherName" label="Father Name" />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model="form.emergencyName" label="Emergency Name" />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model="form.emergencyRelation" label="Emergency Relation" />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model="form.emergencyNumber" label="Emergency Number" />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model="form.dependentName" label="Dependent Name" />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model="form.dependentRelation" label="Dependent Relation" />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model="form.dependentNumber" label="Dependent Number" />
              </v-col>
            </v-row>
          </v-window-item>

          <!-- Bank -->
          <v-window-item :value="5">
            <h2>Bank</h2>
            <v-row class="mt-2">
              <v-col cols="12" md="4">
                <v-text-field v-model="form.bankName" label="Bank Name" />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model="form.accountTitle" label="Account Title" />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model="form.accountNumber" label="Account Number" />
              </v-col>
            </v-row>
          </v-window-item>
        </v-window>
      </v-col>
    </v-row>
    <v-row class="mt-4">
      <v-col cols="12" class="d-flex justify-end">
        <v-btn color="primary" @click="onSubmit">
          {{ route.query.id ? "Update Employee" : "Create Employee" }}
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>
<script setup>
import { useRoute } from "vue-router";
import { onMounted, ref, watch } from "vue";
const tab = ref(0);
const form = ref({
  employeeId: "",
  name: "",
  designation: "",
  reportingLine: "",
  doj: "",
  dol: "",
  reason: "",

  currentSalary: "",
  salaryAtHiring: "",
  probationSalary: "",

  cnic: "",
  maritalStatus: "",
  religion: "",
  dob: "",
  age: "",

  contactNumber: "",
  personalEmail: "",
  officialEmail: "",
  currentAddress: "",
  permanentAddress: "",

  fatherName: "",
  emergencyName: "",
  emergencyRelation: "",
  emergencyNumber: "",
  dependentName: "",
  dependentRelation: "",
  dependentNumber: "",

  bankName: "",
  accountTitle: "",
  accountNumber: "",
});

const route = useRoute();

// Age auto calculate
watch(() => form.value.dob, (dob) => {
  if (!dob) return;

  const birth = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  form.value.age = age;
});

// Submit
const onSubmit = () => {
  if (route.query.id) {
    console.log("UPDATE", form.value);
  } else {
    console.log("CREATE", form.value);
  }
};
onMounted(() => {
  if (route.query.id) {
    // simulate API
    const existingData = {
      name: "John Doe",
      designation: "Developer",
      contactNumber: "123456789",
    };

    form.value = { ...form.value, ...existingData };
  }
});
</script>