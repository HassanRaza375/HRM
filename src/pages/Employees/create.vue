<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card class="rounded-0">
          <v-card-item>
            <div
              class="d-flex justify-space-between align-center flex-wrap gap-2"
            >
              <h1 class="my-0 text-headline-large font-weight-bold">
                {{ route.query.id ? "Edit" : "Create" }} Employee
              </h1>
              <div
                class="d-flex align-items-center gap-2 justify-end flex-grow-1"
              >
                <v-btn
                  class="rounded-0"
                  @click="goBack"
                  prepend-icon="mdi-arrow-left"
                  color="grey-lighten-1"
                  >Back</v-btn
                >
                <v-btn class="rounded-0" color="primary" @click="onSubmit">
                  {{ route.query.id ? "Update Employee" : "Create Employee" }}
                </v-btn>
              </div>
            </div>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-tabs v-model="tab" color="#2a9fe8">
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
                <v-text-field
                  v-model="form.employeeid"
                  variant="outlined"
                  density="compact"
                  label="Employee ID"
                  :rules="[required]"
                />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="form.name"
                  variant="outlined"
                  density="compact"
                  label="Name"
                  :rules="[required]"
                />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="form.designation"
                  variant="outlined"
                  density="compact"
                  label="Designation"
                  :rules="[required]"
                />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="form.reportingline"
                  variant="outlined"
                  density="compact"
                  label="Reporting Line"
                  :rules="[required]"
                />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="form.doj"
                  type="date"
                  variant="outlined"
                  density="compact"
                  label="Date of Joining"
                  :rules="[required]"
                />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="form.dol"
                  type="date"
                  variant="outlined"
                  density="compact"
                  label="Date of Leaving"
                  :rules="[required]"
                />
              </v-col>

              <v-col cols="12">
                <v-textarea
                  v-model="form.reason"
                  variant="outlined"
                  density="compact"
                  label="Reason (if left)"
                  :rules="[required]"
                />
              </v-col>
            </v-row>
          </v-window-item>

          <!-- Salary -->
          <v-window-item :value="1">
            <h2>Salary</h2>
            <v-row class="mt-2">
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="form.salaryathiring"
                  variant="outlined"
                  density="compact"
                  label="Salary at Hiring"
                  :rules="[required]"
                />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="form.probationsalary"
                  variant="outlined"
                  density="compact"
                  label="After Probation"
                  :rules="[required]"
                />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="form.currentsalary"
                  variant="outlined"
                  density="compact"
                  label="Current Salary"
                  :rules="[required]"
                />
              </v-col>
            </v-row>
          </v-window-item>

          <!-- Personal -->
          <v-window-item :value="2">
            <h2>Personal</h2>
            <v-row class="mt-2">
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="form.cnic"
                  variant="outlined"
                  density="compact"
                  label="CNIC"
                  :rules="[required]"
                />
              </v-col>

              <v-col cols="12" md="4">
                <v-select
                  v-model="form.maritalstatus"
                  :items="['Single', 'Married']"
                  variant="outlined"
                  density="compact"
                  label="Marital Status"
                  :rules="[required]"
                />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="form.religion"
                  variant="outlined"
                  density="compact"
                  label="Religion"
                  :rules="[required]"
                />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="form.dob"
                  type="date"
                  variant="outlined"
                  density="compact"
                  label="DOB"
                  :rules="[required]"
                />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="form.age"
                  variant="outlined"
                  density="compact"
                  label="Age"
                  disabled
                  :rules="[required]"
                />
              </v-col>
            </v-row>
          </v-window-item>

          <!-- Contact -->
          <v-window-item :value="3">
            <h2>Contact</h2>
            <v-row class="mt-2">
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="form.contactnumber"
                  variant="outlined"
                  density="compact"
                  label="Contact Number"
                  :rules="[required]"
                />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="form.personalemail"
                  variant="outlined"
                  density="compact"
                  label="Personal Email"
                  :rules="[required]"
                />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="form.officialemail"
                  variant="outlined"
                  density="compact"
                  label="Official Email"
                  :rules="[required]"
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-textarea
                  v-model="form.currentaddress"
                  variant="outlined"
                  density="compact"
                  label="Current Address"
                  :rules="[required]"
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-textarea
                  v-model="form.permanentaddress"
                  variant="outlined"
                  density="compact"
                  label="Permanent Address"
                  :rules="[required]"
                />
              </v-col>
            </v-row>
          </v-window-item>

          <!-- Family -->
          <v-window-item :value="4">
            <h2>Family</h2>
            <v-row class="mt-2">
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="form.fathername"
                  variant="outlined"
                  density="compact"
                  label="Father Name"
                  :rules="[required]"
                />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="form.emergencyname"
                  variant="outlined"
                  density="compact"
                  label="Emergency Name"
                  :rules="[required]"
                />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="form.emergencyrelation"
                  variant="outlined"
                  density="compact"
                  label="Emergency Relation"
                  :rules="[required]"
                />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="form.emergencynumber"
                  variant="outlined"
                  density="compact"
                  label="Emergency Number"
                  :rules="[required]"
                />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="form.dependentname"
                  variant="outlined"
                  density="compact"
                  label="Dependent Name"
                  :rules="[required]"
                />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="form.dependentrelation"
                  variant="outlined"
                  density="compact"
                  label="Dependent Relation"
                  :rules="[required]"
                />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="form.dependentnumber"
                  variant="outlined"
                  density="compact"
                  label="Dependent Number"
                  :rules="[required]"
                />
              </v-col>
            </v-row>
          </v-window-item>

          <!-- Bank -->
          <v-window-item :value="5">
            <h2>Bank</h2>
            <v-row class="mt-2">
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="form.bankname"
                  variant="outlined"
                  density="compact"
                  label="Bank Name"
                  :rules="[required]"
                />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="form.accounttitle"
                  variant="outlined"
                  density="compact"
                  label="Account Title"
                  :rules="[required]"
                />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="form.accountnumber"
                  variant="outlined"
                  density="compact"
                  label="Account Number"
                  :rules="[required]"
                />
              </v-col>
            </v-row>
          </v-window-item>
        </v-window>
      </v-col>
    </v-row>
  </div>
</template>
<script setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref, watch } from "vue";
import { useEmployeeStore } from "../../stores/employeeStore";
const tab = ref(0);
const employees = ref([]);
const employeeStore = useEmployeeStore();

const form = ref({
  employeeid: "",
  name: "",
  designation: "",
  reportingline: "",
  doj: "",
  dol: "",
  reason: "",

  currentsalary: "",
  salaryathiring: "",
  probationsalary: "",

  cnic: "",
  maritalstatus: "",
  religion: "",
  dob: "",
  age: "",

  contactnumber: "",
  personalemail: "",
  officialemail: "",
  currentaddress: "",
  permanentaddress: "",

  fathername: "",
  emergencyname: "",
  emergencyrelation: "",
  emergencynumber: "",
  dependentname: "",
  dependentrelation: "",
  dependentnumber: "",

  bankname: "",
  accounttitle: "",
  accountnumber: "",
});

const route = useRoute();
const router = useRouter();

// Age auto calculate
watch(
  () => form.value.dob,
  (dob) => {
    if (!dob) return;

    const birth = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    form.value.age = age;
  },
);

// Submit
const onSubmit = () => {
  try {
    if (route.query.id) {
      const employee = employeeStore.getEmployeeById(route.query.id);
      if (employee) {
        employeeStore.updateEmployee({ id: route.query.id, ...form.value });
      }
    } else {
      employeeStore.addEmployee(form.value);
    }
    employeeStore.callNotification({
      text: "Employee added successfully",
    });
    router.push("/employees");
  } catch (error) {
    employeeStore.callNotification({
      text: `${error}`,
      color: "error",
    });
  }
};

const goBack = () => {
  router.back();
};

function required(v) {
  return !!v || "Field is required";
}
const loadEdit = (id) => {
  form.value = employeeStore.getEmployeeById(id) || form.value;
};
onMounted(() => {
  if (route.query.id) {
    loadEdit(route.query.id);
  }
});
</script>
