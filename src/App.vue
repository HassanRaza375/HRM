<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-card height="200">
              <v-toolbar
                class="text-white"
                image="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
              >
                <v-btn icon="mdi-menu"></v-btn>

                <v-toolbar-title text="Toolbar"></v-toolbar-title>

                <v-btn icon="mdi-export"></v-btn>
              </v-toolbar>
              <v-btn color="primary">Hello Vuetify!</v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>