<template>
  <v-container class="fill-height">
    <v-responsive class="align-start fill-height mx-auto">
      <h1>Hacker News</h1>
      <v-switch label="Show stories without url" v-model="showWoUrl"></v-switch>
      <v-btn-group class="align-center text-center">
        <v-btn @click="() => setPage(0)"><v-icon icon="mdi-skip-backward"></v-icon></v-btn>
        <v-btn @click="() => setPage(page - 1)"><v-icon icon="mdi-arrow-left-bold"></v-icon></v-btn>
        <span class="mx-12">{{ page + 1 }}</span>
        <v-btn @click="() => setPage(page + 1)"><v-icon icon="mdi-arrow-right-bold"></v-icon></v-btn>
      </v-btn-group>
      <template v-if="loading">
      <v-skeleton-loader type="list-item-three-line"></v-skeleton-loader>
      <v-skeleton-loader type="list-item-three-line"></v-skeleton-loader>
      <v-skeleton-loader type="list-item-three-line"></v-skeleton-loader>
      <v-skeleton-loader type="list-item-three-line"></v-skeleton-loader>
      </template>
      <div v-else v-for="story in stories" :key="story.objectID">
        <Story v-if="!!story.story_url || showWoUrl" :story="story" @show-detail="showDetailCb" />

      </div>
      <StoryDetail v-model="dialog" />
      <v-btn-group class="align-center text-center">
        <v-btn @click="() => setPage(0)"><v-icon icon="mdi-skip-backward"></v-icon></v-btn>
        <v-btn @click="() => setPage(page - 1)"><v-icon icon="mdi-arrow-left-bold"></v-icon></v-btn>
        <span class="mx-12">{{ page + 1 }}</span>
        <v-btn @click="() => setPage(page + 1)"><v-icon icon="mdi-arrow-right-bold"></v-icon></v-btn>
      </v-btn-group>
    </v-responsive>
  </v-container>
</template>

<script lang="ts" setup>
  import { DStory } from '../common';
  import { Ref, ref } from 'vue';
  const URL = 'https://hn.algolia.com/api/v1/search_by_date?query=coding&page=';
  const stories: Ref<DStory[]> = ref([]);
  const loading = ref(true);
  const showWoUrl = ref(false);
  const dialog: Ref<{ visible: boolean, data: DStory | null }> = ref({ visible: false, data: null });
  const page = ref(0);

  function setPage(n: number) {
    // should probably setup some kind of buffer
    // or delay to allow continue moving forward in page number
    if (loading.value) return; 
    if (n < 0) {
      return;
    }
    page.value = n;
    updateStories();

  }
  async function updateStories () {
    loading.value = true;
    const res = await fetch(URL + page.value);
    const resJson = await res.json();
    stories.value = resJson.hits;
    loading.value = false;

  }
  updateStories();

  function showDetailCb(story: DStory) {
    dialog.value.data = story;
    dialog.value.visible = true;
  }
</script>
