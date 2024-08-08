<template>
    <v-dialog v-model="model">

        <template v-slot:default="{ isActive }">
            <v-card title="Dialog">
            <v-card-text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                text="Close Dialog"
                @click="isActive.value = false"
                ></v-btn>
            </v-card-actions>
            </v-card>
        </template>
    </v-dialog>

</template>

<script setup lang="ts">
import { DStory } from '../common';
const model = defineModel<boolean>();
/*const props = defineProps<{
    story?: DStory,
    dialog: boolean
}>();
*/
</script>