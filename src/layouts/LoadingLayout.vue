<template>
    <div class="fancy-border" style="background: rgb(43, 61, 147)">
        <v-container style="height: 100%;">
            <v-row class="fill-height align-content-center justify-center">
                <v-col class="text-body-large text-center text-white" cols="12" v-if="employeeStore.employees.length === 0">
                    Upload Excel File to Start Using SAT HRM
                </v-col>
                <v-col cols="6">
                    <v-progress-linear color="white" height="6" indeterminate rounded></v-progress-linear>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script setup>
import { useEmployeeStore } from "../stores/employeeStore";
const employeeStore = useEmployeeStore();
</script>
<style scoped>
.fancy-border {
    -o-border-image: linear-gradient(90deg,
            #fa6e50 14.28%,
            #a0d468 0,
            #a0d468 28.57%,
            #c0c6c8 0,
            #c0c6c8 42.85%,
            #7baab9 0,
            #7baab9 57.14%,
            #e3bd58 0,
            #e3bd58 71.42%,
            #4eb9e4 0,
            #4eb9e4 85.71%,
            #a58de8 0) 7;
    border-image: linear-gradient(90deg,
            #fa6e50 14.28%,
            #a0d468 0,
            #a0d468 28.57%,
            #c0c6c8 0,
            #c0c6c8 42.85%,
            #7baab9 0,
            #7baab9 57.14%,
            #e3bd58 0,
            #e3bd58 71.42%,
            #4eb9e4 0,
            #4eb9e4 85.71%,
            #a58de8 0) 7;
    border-top: 5px solid;
    height: 100vh;
}
</style>
