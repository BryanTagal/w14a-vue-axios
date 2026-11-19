<template>
  <section class="search-panel">
    <h2>Find a Joke</h2>

    <form @submit.prevent="submitSearch">
      <input
        v-model="searchText"
        type="text"
        placeholder="Enter a word to search for..."
      />

      <button
        type="submit"
        class="search-button"
        :disabled="loading || !hasSearchText"
      >
        Search Joke
      </button>
    </form>

    <p class="search-help">
      Find a joke containing your chosen word or phrase.
    </p>
  </section>
</template>

<script>
export default {
  name: 'JokeSearch',

  props: {
    loading: Boolean
  },

  data() {
    return {
      searchText: ''
    };
  },

  computed: {
    hasSearchText() {
      return this.searchText.trim().length > 0;
    }
  },

  methods: {
    submitSearch() {
      const search = this.searchText.trim();

      if (search) {
        this.$emit('search', search);
      }
    }
  }
};
</script>