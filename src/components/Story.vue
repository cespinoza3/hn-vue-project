
<template>
    <div>
        <!-- {{ story.story_id }} -->
        <v-container  class="{  }" >
            <v-row no-gutters>
                <v-col cols="12" md="8" order="1" class="text-subtitle-1 text-sm-h6">
                    <span :class="{ 'font-italic': !story.story_title }">{{ story.story_title ? story.story_title : "Untitled" }}</span>
                </v-col>
                <v-col cols="12" md="1" order="4">
                    <a v-if="story.story_url" :href="story.story_url"><span class="d-inline d-md-none">link</span><v-icon icon="mdi-link" /></a>
                    <span class="text-decoration-underline" v-else><span class="d-inline d-md-none">no link</span><v-icon icon="mdi-link-off" /></span>
                </v-col>
                <v-col cols="12" sm="6" md="3" order="12" order-md="8"  class="font-italic">{{ dateString }}</v-col>
                <v-col cols="12" sm="6" md="12" order="8" order-md="12" class="text-subtitle-2">by {{ story.author }}</v-col>
                <v-col cols="12" order="last">
                    <v-btn @click="$emit('showDetail', story)">More...</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue';
    import { DStory } from '../common';
    const props = defineProps<{ 
        story: DStory
    }>();
    const emit = defineEmits<{
        (e: 'showDetail', _story: DStory): void
    }>();

    const dateString = computed(() => {
        const d = new Date(props.story.created_at);
        return d.toLocaleDateString("en-US" /* should not be hardcoded */, {
            weekday: "short",
            year: "numeric",
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "numeric"
        });
    });
</script>