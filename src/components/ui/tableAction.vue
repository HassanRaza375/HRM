<template>
    <v-menu>
        <template v-slot:activator="{ props }">
            <v-btn color="primary" v-bind="props" prepend-icon="mdi-file-table" class="rounded-0">Actions</v-btn>
        </template>
        <v-sheet>
            <v-btn v-for="(item, i) in props.items" :key="i" :value="i" :prepend-icon="item.icon"
                class="d-flex items-center justify-start rounded-0" block density="default" @click="emit('actionType', item.actionType)">
                {{ item.title }}
            </v-btn>
        </v-sheet>
    </v-menu>
</template>
<script setup>
const props = defineProps({
    items: {
        type: Array,
        default: () => []
    }
})
const emit = defineEmits(["actionType"])
</script>