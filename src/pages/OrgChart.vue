<template>
  <v-container>
    <v-card class="pa-4">
      <h2 class="mb-4">Company Organogram</h2>

      <v-treeview
        :items="employees"
        item-title="name"
        item-value="id"
        open-all
        activatable
      >
        <template v-slot:prepend="{ item }">
          <v-avatar color="primary" size="32">
            <span class="text-white">
              {{ item.name.charAt(0) }}
            </span>
          </v-avatar>
        </template>

        <template v-slot:title="{ item }">
          <div>
            <strong>{{ item.name }}</strong>
            <div class="text-caption text-grey">
              {{ item.position }}
            </div>
          </div>
        </template>
      </v-treeview>
    </v-card>
  </v-container>
</template>

<script setup>
const employees = [
  {
    id: 1,
    name: 'CEO - Ahmed Khan',
    position: 'Chief Executive Officer',
    children: [
      {
        id: 2,
        name: 'Sara Ali',
        position: 'HR Manager',
        children: [
          {
            id: 3,
            name: 'Usman',
            position: 'Recruiter',
          },
        ],
      },
      {
        id: 4,
        name: 'Bilal',
        position: 'IT Manager',
        children: [
          {
            id: 5,
            name: 'Hamza',
            position: 'Frontend Developer',
          },
          {
            id: 6,
            name: 'Ayesha',
            position: 'Backend Developer',
          },
        ],
      },
    ],
  },
]
</script>