
<template>
    <div>
        <!-- {{ story.story_id }} -->
        {{ story.story_title }}
        {{  story.author }}
        {{ story.created_at }}
        {{ story.story_url }}
    </div>
</template>

<script setup lang="ts">
    import { Story } from '../common';
    const props = defineProps<{ 
        story: Story
    }>();
</script>