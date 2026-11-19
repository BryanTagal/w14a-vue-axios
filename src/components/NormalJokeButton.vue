<template>
  <section class="joke-option">
    <button
      class="format-button"
      :class="{ active: active }"
      @click="$emit('select')"
    >
      Normal Joke
    </button>

    <div v-if="active && joke" class="joke-output">
      <p v-for="(line, index) in displayLines" :key="index">
        {{ line }}
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'NormalJokeButton',

  props: {
    joke: Object,
    active: Boolean
  },

  computed: {
    displayLines() {
      if (!this.joke) return [];

      if (this.joke.type === 'single') {
        return [this.joke.joke];
      }

      return [this.joke.setup, this.joke.delivery];
    }
  }
};
</script>