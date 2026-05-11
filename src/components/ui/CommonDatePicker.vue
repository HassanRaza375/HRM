<template>
  <v-menu v-model="menu" :close-on-content-click="false" location="bottom">
    <!-- Input Field -->
    <template #activator="{ props }">
      <v-text-field
        v-bind="props"
        :model-value="formattedDate"
        :label="label"
        readonly
        :density="density"
        :variant="variant"
        :rules="rules"
        prepend-inner-icon="mdi-calendar"
      />
    </template>
    <!-- Date Picker -->
    <v-card>
      <v-date-picker
        v-model="selectedDate"
        control-variant="modal"
        width="100%"
        color="primary"
      />
      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="menu = false"> Cancel </v-btn>
        <v-btn color="primary" variant="text" @click="saveDate"> OK </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import dayjs from "dayjs";

const props = defineProps({
  modelValue: {
    type: [String, Date],
    default: null,
  },
  label: {
    type: String,
    default: "Select Date",
  },
  density: {
    type: String,
    default: "compact",
  },
  variant: {
    type: String,
    default: "outlined",
  },
  rules: {
    type: Array,
    default: () => [],
  },
  format: {
    type: String,
    default: "DD-MM-YYYY",
  },
});
// DD/MM/YYYY
// MM-DD-YYYY
// MMMM D, YYYY
// ddd, MMM D

const emit = defineEmits(["update:modelValue"]);

const menu = ref(false);
const selectedDate = ref(props.modelValue);

watch(
  () => props.modelValue,
  (val) => {
    selectedDate.value = val;
  },
);
const formattedDate = computed(() => {
  if (!props.modelValue) return "";

  return dayjs(props.modelValue).format(props.format);
});

const saveDate = () => {
  emit("update:modelValue", dayjs(selectedDate.value).format("YYYY-MM-DD"));
  menu.value = false;
};
</script>
