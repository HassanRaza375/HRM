<template>
  <v-row>
    <v-col cols="12" lg="4" md="6" sm="6" v-for="item in data" :key="item.title">
      <v-card class="menu" hover>
        <v-card-text>
          <div class="d-flex align-center gap-2">
            <img class="img-fluid" height="38" width="47" :src="item.image" />
            <div>
              <h2 class="font-weight-regular">{{ item.title }}</h2>
              <p class="font-weight-bold">{{ item.subtitle }}</p>
            </div>
          </div>
        </v-card-text>
      </v-card>
      <p class="my-0 py-2 d-flex align-center flex-wrap">
        <span v-for="link in item.links" :key="link.title" class="cursor-pointer nowrap text-body-medium">
          <router-link :to="link.url" style="color: rgb(74, 87, 141)">{{
            link.title
          }}</router-link>
          <span class="mx-2 text-decoration-none">{{
            item.links.length > 1 ? "|" : ""
          }}</span>
        </span>
      </p>
    </v-col>
  </v-row>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
let data = ref([
  {
    title: "Employee",
    subtitle: "Management",
    image: "https://teamsuite.pk/zimages/icn_EmpAdmin.png",
    links: [
      {
        title: "Employee",
        url: "/employees/",
      },
      {
        title: "Add Employee",
        url: "/employees/create",
      },
      {
        title: "Bulk Upload Employees",
        url: "/employees/bulk-upload",
      },
      {
        title: "Generate Docs",
        url: "/employees/generate-docs",
      },
    ],
  },
  {
    title: "Leaves",
    subtitle: "Management",
    image: "https://teamsuite.pk/zimages/icn_LeaveManage.png",
    links: [
      {
        title: "Employees Leaves",
        url: "/employees/employees-leaves",
      },
    ],
  },
  {
    title: "Performance",
    subtitle: "Appraisal",
    image: "https://teamsuite.pk/zimages/icn_PerformanceApp.png",
    links: [
      {
        title: "Employees Performance",
        url: "/employees/employees-performance",
      },
      {
        title: "KPIs",
        url: "/employees/kpis",
      },
    ],
  },
  {
    title: "Communication",
    subtitle: "Tools",
    image: "https://teamsuite.pk/zimages/icn_CommTools.png",
    links: [
      {
        title: "Templates",
        url: "/templates/",
      },
      {
        title: "Add Template",
        url: "/templates/create",
      },
    ],
  },
]);
const gotoLink = (url) => {
  router.push(url);
};
</script>
<style scoped>
.menu h2 {
  font-size: 25px;
  margin: 0px;
  text-transform: uppercase;
}

.menu p {
  font-size: 25px;
  text-transform: uppercase;
  margin: 0px;
}
</style>
