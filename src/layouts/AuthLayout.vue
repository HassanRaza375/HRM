<template>
  <v-app class="fancy-border" style="background: rgb(43, 61, 147)">
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.fancy-border {
  -o-border-image: linear-gradient(
      90deg,
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
      #a58de8 0
    )
    7;
  border-image: linear-gradient(
      90deg,
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
      #a58de8 0
    )
    7;
  border-top: 5px solid;
}
</style>
