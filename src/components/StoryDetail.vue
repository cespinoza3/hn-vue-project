<template>
    <v-dialog v-model="model.visible">

        <template v-slot:default="{ isActive }">
            <v-card>
                <v-card-item>
                <v-card-title :class="{ 'font-italic': (model && model.data) && !model?.data.story_title }">
                    {{ fmtTitle }}
                </v-card-title>

                </v-card-item>
            <v-card-text>
                <v-container style="fill-width">
                    <v-row no-gutters>
                        <v-col>
                            by {{ (model && model.data) ? model.data.author : "" }}
                            <br />
                            <a v-if="(model && model.data) && model.data.story_url" :href="model.data.story_url">link<v-icon icon="mdi-link" /></a>
                            <span class="text-decoration-underline" v-else>no link<v-icon icon="mdi-link-off" /></span>
                            <br />
                            <span class="font-italic">{{ dateString }}</span>
                        </v-col>
                        <v-col cols="12">
                            <template v-for="tag in model?.data?._tags" :key="tag">
                                <v-chip class="me-1">{{ tag }}</v-chip>
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
                            {{ (model && model.data) ? model.data.comment_text : "" }}
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
    const model = defineModel<{ visible: boolean, data: DStory | null }>({ required: true });
    const fmtTitle = computed(() => {
        const t = model.value.data ? model.value.data.story_title : null;
        return t || "Untitled";
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