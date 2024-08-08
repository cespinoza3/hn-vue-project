<template>
  <v-container class="fill-height">
    <v-responsive class="align-centerfill-height mx-auto">
      <h1>Hacker News</h1>
      <div id="toggleUrlLack"></div>
      <div v-for="story in stories" :key="story">
        <Story :story="story" />

      </div>
    </v-responsive>
  </v-container>
</template>

<script lang="ts" setup>
  import { ref, watchEffect } from 'vue';
  const URL = 'https://hn.algolia.com/api/v1/search_by_date?query=coding';
  const stories = ref([]);

  async function updateStories () {
    // TODO: add popup when fetch fails
    const res = await fetch(URL);
    const resJson = await res.json();
    stories.value = resJson.hits;

  }
  // TODO: add spinner while results load
  await updateStories();
</script>
