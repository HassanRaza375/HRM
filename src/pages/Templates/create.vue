<template>
    <v-row>
        <v-col cols="12">
            <v-card class="rounded-0">
                <v-card-item>
                    <div class="d-flex justify-space-between align-center flex-wrap gap-2">
                        <h1 class="my-0 text-headline-large font-weight-bold">{{ route.query.id ? 'Edit' : 'Create' }}
                            Template</h1>
                        <div class="d-flex align-items-center gap-2 justify-end flex-grow-1">
                            <v-btn class="rounded-0" @click="goBack" prepend-icon="mdi-arrow-left"
                                color="grey-lighten-1">Back</v-btn>
                            <v-btn class="rounded-0" color="primary" @click="onSubmit">
                                {{ route.query.id ? "Update Template" : "Create Template" }}
                            </v-btn>
                        </div>
                    </div>
                </v-card-item>
            </v-card>
        </v-col>
        <v-col cols="12">
            <v-row>
                <v-col cols="6" md="4" sm="6">
                    <v-text-field label="Template Name" variant="outlined" density="comfortable" hide-details />
                </v-col>
                <v-col cols="6" md="4" sm="6">
                    <v-autocomplete label="Template Type" variant="outlined" density="comfortable" hide-details
                        :items="['Bank Opening Letter', 'Experience Letter']"></v-autocomplete>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="12" md="6" sm="12">
            <v-card class="rounded-0">
                <v-card-item>
                    <v-textarea label="CSS" variant="outlined" density="comfortable" hide-details rows="4"></v-textarea>
                    <v-expansion-panels class="mb-2" variant="accordion">
                        <v-expansion-panel title="Header">
                            <v-expansion-panel-text class="p-0">
                                <v-textarea variant="outlined" density="comfortable" hide-details rows="4"></v-textarea>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels>
                    <!-- Body -->
                    <v-expansion-panels class="mb-2" variant="accordion">
                        <v-expansion-panel title="Body">
                            <v-expansion-panel-text class="p-0">
                                <v-textarea variant="outlined" density="comfortable" hide-details rows="3"></v-textarea>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels>
                    <!-- footer -->
                    <v-expansion-panels class="mb-2" variant="accordion">
                        <v-expansion-panel title="Footer">
                            <v-expansion-panel-text class="p-0">
                                <v-textarea variant="outlined" density="comfortable" hide-details rows="3"></v-textarea>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-card-item>
            </v-card>
        </v-col>
        <v-col cols="12" md="6" sm="12">
            <v-card class="rounded-0">
                <v-card-item>
                    <h3 class="my-0 text-headline-large font-weight-bold">
                        Preview
                    </h3>
                </v-card-item>
            </v-card>
        </v-col>
    </v-row>
</template>
<script setup>
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const goBack = () => {
    router.back();
}
</script>
<style scoped>
.v-expansion-panels .v-expansion-panel-text__wrapper {
    padding: 0px !important;
}
</style>