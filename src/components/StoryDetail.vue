<template>
    <v-dialog v-model="model.visible">

        <template v-slot:default="{ isActive }">
            <v-card :title="fmtTitle">
            <v-card-text>
                <v-container style="fill-width">
                    <v-row no-gutters>
                        <v-col>
                            <a v-if="model.data && model.data.story_url" :href="model.data.story_url">link<v-icon icon="mdi-link" /></a>
                            <span class="text-decoration-underline" v-else>no link<v-icon icon="mdi-link-off" /></span>
                            <br />
                            by {{ model.data ? model.data.author : "" }}
                            <br />
                            <span class="font-italic">{{ dateString }}</span>
                        </v-col>
                        <v-col cols="12">
                            <template v-for="tag in model?.data?._tags" :key="tag">
                                <v-chip>{{ tag }}</v-chip>
                            </template>
                        </v-col>
                        <v-col cols="12" class="text-justify">
                            <br />
                            <!-- 
                                I could use raw html using the v-html directive on an element
                                but I don't trust the site? Someone could sneak a <script>
                                theoretically, although it's likely that Hacker News 
                                itself does some kind of cleaning, either way I'll just
                                have it show it as plain text despite that being ugly
                             -->
                            {{ model.data ? model.data.comment_text : "" }}
                        </v-col>
                    </v-row>
                </v-container>
                <!-- show that tags -->
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                text="Close"
                @click="isActive.value = false"
                ></v-btn>
            </v-card-actions>
            </v-card>
        </template>
    </v-dialog>

</template>

<script setup lang="ts">
    import { computed } from 'vue';
    import { DStory } from '../common';
    const model = defineModel<{ visible: boolean, data?: DStory }>();
    const fmtTitle = computed(() => {
        return model.value.data ? model.value.data.story_title : "";
    });
    const dateString = computed(() => {
        if (!model.value.data) return "";
        const d = new Date(model.value.data.created_at);
        return d.toLocaleDateString("en-US" /* should not be hardcoded */, {
            weekday: "long",
            year: "numeric",
            day: "numeric",
            month: "long",
            hour: "2-digit",
            minute: "numeric"
        });
    });
</script>