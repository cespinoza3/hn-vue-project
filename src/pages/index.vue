<template>
  <v-container class="fill-height">
    <v-responsive class="align-start fill-height mx-auto">
      <h1>Hacker News</h1>
      <v-switch label="Show stories without url" v-model="showWoUrl"></v-switch>
      <v-skeleton-loader v-if="loading" type="list-item-three-line"></v-skeleton-loader>
      <div v-else v-for="story in stories" :key="story">
        <Story v-if="!!story.story_url || showWoUrl" :story="story" @show-detail="showDetailCb" />

      </div>
      <StoryDetail v-model="dialog" />
    </v-responsive>
  </v-container>
</template>

<script lang="ts" setup>
  import { DStory } from '../common';
  import { ref, watchEffect } from 'vue';
  const URL = 'https://hn.algolia.com/api/v1/search_by_date?query=coding';
  const stories = ref([]);
  const loading = ref(true);
  const showWoUrl = ref(false);
  const dialog = ref({ visible: false, data: null });

  async function updateStories () {
    // TODO: add popup when fetch fails
    loading.value = true;
    const res = await fetch(URL);
    const resJson = await res.json();
    stories.value = resJson.hits;
    loading.value = false;

  }
  // TODO: add spinner while results load
  updateStories();

  function showDetailCb(story: DStory) {
    dialog.value.data = story;
    dialog.value.visible = true;
  }
</script>
