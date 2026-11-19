<template>
  <section class="joke-option">
    <button
      class="format-button"
      :class="{ active: active }"
      @click="$emit('select')"
    >
      Loud Joke
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
  name: 'LoudJokeButton',

  props: {
    joke: Object,
    active: Boolean
  },

  computed: {
    displayLines() {
      if (!this.joke) return [];

      if (this.joke.type === 'single') {
        return [this.joke.joke.toUpperCase()];
      }

      return [
        this.joke.setup.toUpperCase(),
        this.joke.delivery.toUpperCase()
      ];
    }
  }
};
</script>