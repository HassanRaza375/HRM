<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card class="rounded-0">
          <v-card-item>
            <div class="d-flex justify-space-between align-center">
              <h1 class="my-0 text-headline-large font-weight-bold">{{ route.query.id ? 'Edit' : 'Create' }} Employee</h1>
              <div class="d-flex align-items-center gap-2">
                <v-btn class="rounded-0" @click="goBack" prepend-icon="mdi-arrow-left" color="grey-lighten-1">Back</v-btn>
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
                <v-text-field v-model="form.employeeId" variant="outlined" density="compact" label="Employee ID"
                  :rules="[required]" />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model="form.name" variant="outlined" density="compact" label="Name"
                  :rules="[required]" />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model="form.designation" variant="outlined" density="compact" label="Designation"
                  :rules="[required]" />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model="form.reportingLine" variant="outlined" density="compact" label="Reporting Line"
                  :rules="[required]" />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model="form.doj" type="date" variant="outlined" density="compact"
                  label="Date of Joining" :rules="[required]" />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model="form.dol" type="date" variant="outlined" density="compact"
                  label="Date of Leaving" :rules="[required]" />
              </v-col>

              <v-col cols="12">
                <v-textarea v-model="form.reason" variant="outlined" density="compact" label="Reason (if left)"
                  :rules="[required]" />
              </v-col>
            </v-row>
          </v-window-item>

          <!-- Salary -->
          <v-window-item :value="1">
            <h2>Salary</h2>
            <v-row class="mt-2">
              <v-col cols="12" md="4">
                <v-text-field v-model="form.salaryAtHiring" variant="outlined" density="compact"
                  label="Salary at Hiring" :rules="[required]" />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model="form.probationSalary" variant="outlined" density="compact"
                  label="After Probation" :rules="[required]" />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model="form.currentSalary" variant="outlined" density="compact" label="Current Salary"
                  :rules="[required]" />
              </v-col>
            </v-row>
          </v-window-item>

          <!-- Personal -->
          <v-window-item :value="2">
            <h2>Personal</h2>
            <v-row class="mt-2">
              <v-col cols="12" md="4">
                <v-text-field v-model="form.cnic" variant="outlined" density="compact" label="CNIC"
                  :rules="[required]" />
              </v-col>

              <v-col cols="12" md="4">
                <v-select v-model="form.maritalStatus" :items="['Single', 'Married']" variant="outlined"
                  density="compact" label="Marital Status" :rules="[required]" />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model="form.religion" variant="outlined" density="compact" label="Religion"
                  :rules="[required]" />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model="form.dob" type="date" variant="outlined" density="compact" label="DOB"
                  :rules="[required]" />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model="form.age" variant="outlined" density="compact" label="Age" disabled
                  :rules="[required]" />
              </v-col>
            </v-row>
          </v-window-item>

          <!-- Contact -->
          <v-window-item :value="3">
            <h2>Contact</h2>
            <v-row class="mt-2">
              <v-col cols="12" md="4">
                <v-text-field v-model="form.contactNumber" variant="outlined" density="compact" label="Contact Number"
                  :rules="[required]" />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model="form.personalEmail" variant="outlined" density="compact" label="Personal Email"
                  :rules="[required]" />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model="form.officialEmail" variant="outlined" density="compact" label="Official Email"
                  :rules="[required]" />
              </v-col>

              <v-col cols="12" md="6">
                <v-textarea v-model="form.currentAddress" variant="outlined" density="compact" label="Current Address"
                  :rules="[required]" />
              </v-col>

              <v-col cols="12" md="6">
                <v-textarea v-model="form.permanentAddress" variant="outlined" density="compact"
                  label="Permanent Address" :rules="[required]" />
              </v-col>
            </v-row>
          </v-window-item>

          <!-- Family -->
          <v-window-item :value="4">
            <h2>Family</h2>
            <v-row class="mt-2">
              <v-col cols="12" md="4">
                <v-text-field v-model="form.fatherName" variant="outlined" density="compact" label="Father Name"
                  :rules="[required]" />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model="form.emergencyName" variant="outlined" density="compact" label="Emergency Name"
                  :rules="[required]" />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model="form.emergencyRelation" variant="outlined" density="compact"
                  label="Emergency Relation" :rules="[required]" />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model="form.emergencyNumber" variant="outlined" density="compact"
                  label="Emergency Number" :rules="[required]" />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model="form.dependentName" variant="outlined" density="compact" label="Dependent Name"
                  :rules="[required]" />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model="form.dependentRelation" variant="outlined" density="compact"
                  label="Dependent Relation" :rules="[required]" />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model="form.dependentNumber" variant="outlined" density="compact"
                  label="Dependent Number" :rules="[required]" />
              </v-col>
            </v-row>
          </v-window-item>

          <!-- Bank -->
          <v-window-item :value="5">
            <h2>Bank</h2>
            <v-row class="mt-2">
              <v-col cols="12" md="4">
                <v-text-field v-model="form.bankName" variant="outlined" density="compact" label="Bank Name"
                  :rules="[required]" />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model="form.accountTitle" variant="outlined" density="compact" label="Account Title"
                  :rules="[required]" />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field v-model="form.accountNumber" variant="outlined" density="compact" label="Account Number"
                  :rules="[required]" />
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
const router = useRouter();

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

const goBack = () => {
  router.back();
};

function required(v) {
  return !!v || 'Field is required'
}
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