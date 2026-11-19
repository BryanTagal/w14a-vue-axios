<template>
  <section class="joke-option">
    <button
      class="format-button"
      :class="{ active: active }"
      @click="$emit('select')"
    >
      Snake Joke
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
  name: 'TwoPartJoke',

  props: {
    joke: Object,
    active: Boolean
  },

  computed: {
    displayLines() {
      if (!this.joke) return [];

      if (this.joke.type === 'single') {
        return [this.joke.joke.replace(/\s/g, '_')];
      }

      return [
        this.joke.setup.replace(/\s/g, '_'),
        this.joke.delivery.replace(/\s/g, '_')
      ];
    }
  }
};
</script>