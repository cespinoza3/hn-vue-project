
<template>
    <div>
        <!-- {{ story.story_id }} -->
        <v-card :title="story.story_title" :subtitle="dateString" >
            <a v-if="story.story_url" :href="story.story_url"><v-icon icon="mdi-link" /></a>
            <span v-else><v-icon icon="mdi-link-off" /></span>
        </v-card>
        {{ story.story_title }}
        {{  story.author }}
        {{ story.created_at }}
        {{ story.story_url }}
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue';
    import { Story } from '../common';
    const props = defineProps<{ 
        story: Story
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