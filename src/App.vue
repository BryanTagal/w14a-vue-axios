
<template>
  <div class="page-shell">
    <main class="app-card">

      <header class="header">
        <p class="eyebrow">W14A • VUE + AXIOS</p>
        <h1>😂 Joke Generator</h1>
        <p>Need a laugh? Generate a joke and make it your own!</p>
      </header>

      <section class="main-section">

        <button
          class="new-joke-button"
          @click="getRandomJoke"
          :disabled="loading"
        >
          {{ loading ? 'Loading...' : '🎲 Get a New Joke' }}
        </button>

        <p v-if="loading" class="loading-message">
          Getting your joke...
        </p>

        <p v-if="error" class="error-message" role="alert">
          {{ error }}
        </p>

        <div v-if="joke" class="joke-section">

          <p class="section-label">
            CHOOSE YOUR JOKE STYLE
          </p>

          <div class="format-grid">

            <NormalJokeButton
              :joke="joke"
              :active="displayMode === 'normal'"
              @select="displayMode = 'normal'"
            />

            <LoudJokeButton
              :joke="joke"
              :active="displayMode === 'loud'"
              @select="displayMode = 'loud'"
            />

            <TwoPartJoke
              :joke="joke"
              :active="displayMode === 'snake'"
              @select="displayMode = 'snake'"
            />

          </div>
        </div>

        <JokeSearch
          :loading="loading"
          @search="getJokeContaining"
        />

      </section>

      <footer>
        Powered by JokeAPI • Built with Vue 3 and Axios
      </footer>

    </main>
  </div>
</template>

<script>
import axios from 'axios';

import NormalJokeButton from './components/NormalJokeButton.vue';
import LoudJokeButton from './components/LoudJokeButton.vue';
import TwoPartJoke from './components/TwoPartJoke.vue';
import JokeSearch from './components/JokeSearch.vue';

const JOKE_API = 'https://v2.jokeapi.dev/joke/Any';

export default {
  name: 'App',

  components: {
    NormalJokeButton,
    LoudJokeButton,
    TwoPartJoke,
    JokeSearch
  },

  data() {
    return {
      joke: null,
      displayMode: 'normal',
      loading: false,
      error: ''
    };
  },

  created() {
    this.getRandomJoke();
  },

  methods: {
    async loadJoke(params = {}) {
      if (this.loading) return;

      this.loading = true;
      this.error = '';
      this.joke = null;

      try {
        const response = await axios.get(JOKE_API, {
          params: {
            blacklistFlags:
              'nsfw,religious,political,racist,sexist,explicit',
            ...params
          }
        });

        if (response.data.error) {
          throw new Error(
            response.data.message || 'No matching joke was found.'
          );
        }

        this.joke = response.data;

        // Every new joke starts in normal format.
        this.displayMode = 'normal';

      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          this.error = error.response.data.message;
        } else {
          this.error =
            error.message || 'Something went wrong. Please try again.';
        }

      } finally {
        this.loading = false;
      }
    },

    async getRandomJoke() {
      await this.loadJoke();
    },

    async getJokeContaining(searchText) {
      await this.loadJoke({
        contains: searchText
      });
    }
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background: #111827;
  color: #f9fafb;
}

button,
input {
  font: inherit;
}

.page-shell {
  min-height: 100vh;
  padding: 50px 20px;
  background: radial-gradient(
    circle at top,
    #27375a 0%,
    #111827 55%
  );
}

.app-card {
  max-width: 900px;
  margin: 0 auto;
  padding: 35px;
  border: 1px solid #374151;
  border-radius: 24px;
  background: #1f2937;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.header {
  text-align: center;
  margin-bottom: 35px;
}

.eyebrow,
.section-label {
  color: #60a5fa;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 2px;
}

.header h1 {
  margin: 12px 0;
  font-size: 42px;
}

.header p {
  color: #9ca3af;
}

.main-section {
  text-align: center;
}

.new-joke-button {
  padding: 15px 30px;
  border: none;
  border-radius: 12px;
  color: white;
  background: #2563eb;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
}

.new-joke-button:hover {
  background: #3b82f6;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.joke-section {
  margin-top: 35px;
}

.section-label {
  margin-bottom: 18px;
}

.format-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  text-align: left;
}

.joke-option {
  min-width: 0;
}

.format-button {
  width: 100%;
  padding: 14px 10px;
  border: 1px solid #4b5563;
  border-radius: 10px;
  color: #f9fafb;
  background: #374151;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
}

.format-button:hover {
  border-color: #60a5fa;
}

.format-button.active {
  background: #2563eb;
  border-color: #60a5fa;
}

.joke-output {
  min-height: 130px;
  margin-top: 15px;
  padding: 18px;
  border: 1px solid #374151;
  border-radius: 12px;
  background: #111827;
  overflow-wrap: anywhere;
  line-height: 1.7;
}

.joke-output p {
  margin: 5px 0 12px;
}

.search-panel {
  margin-top: 40px;
  padding: 25px;
  border: 1px solid #374151;
  border-radius: 15px;
  background: #111827;
}

.search-panel h2 {
  margin-top: 0;
}

.search-panel form {
  display: flex;
  gap: 10px;
}

.search-panel input {
  flex: 1;
  min-width: 0;
  padding: 14px;
  border: 1px solid #4b5563;
  border-radius: 9px;
  color: white;
  background: #1f2937;
}

.search-button {
  padding: 14px 20px;
  border: none;
  border-radius: 9px;
  color: white;
  background: #059669;
  font-weight: bold;
  cursor: pointer;
}

.search-help {
  color: #9ca3af;
  font-size: 13px;
}

.error-message {
  margin-top: 20px;
  color: #fca5a5;
}

.loading-message {
  color: #93c5fd;
}

footer {
  margin-top: 35px;
  color: #6b7280;
  text-align: center;
  font-size: 12px;
}

@media (max-width: 650px) {
  .app-card {
    padding: 22px;
  }

  .header h1 {
    font-size: 32px;
  }

  .format-grid {
    grid-template-columns: 1fr;
  }

  .search-panel form {
    flex-direction: column;
  }
}
</style>
