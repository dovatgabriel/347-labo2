<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useWeatherStore } from './stores/weather';
import WeatherData from './components/WeatherData.vue';

const weather = useWeatherStore();
const city = ref<string>('');
const cityFetched = ref<boolean>(false);

const widgetTitle = import.meta.env.VITE_WIDGET_TITLE;
const isProduction = import.meta.env.PROD;

const fetchWeatherForCity = (cityName: string): void => {
  city.value = cityName;
  weather.fetch(city.value);
  cityFetched.value = true;
};

const fetchUserCity = async (): Promise<void> => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        const data = await response.json();
        const cityName = data.address.city || data.address.town || data.address.village;

        if (cityName) {
          fetchWeatherForCity(cityName);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
};

const handleFetch = (): void => void weather.fetch(city.value);

onMounted(() => {
  if (isProduction) {
    void fetchUserCity();
  }
});
</script>

<template>
  <div v-if="isProduction && !city.length && !cityFetched" class="weather">
    <span style="font-size: 1em;">
      Récupération de votre position...
    </span>
  </div>
  <div class="weather" v-else>
    <h1>{{ widgetTitle }}</h1>
    <div class="search">
      <input v-model="city" placeholder="Entrez une ville" @keydown.enter="handleFetch" />
      <button @click="handleFetch">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="icon icon-tabler icons-tabler-outline icon-tabler-search"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
          <path d="M21 21l-6 -6" />
        </svg>
      </button>
    </div>
    <div v-if="weather.loading">chargement...</div>
    <WeatherData v-if="!weather.loading && weather.weather" :weather="weather.weather" />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

* {
  font-family: 'Montserrat', serif;
  margin: 0;
  padding: 0;
}

body {
  background-image: url(../assets/background.jpg);
  background-size: cover;
}

.weather {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #00000010;
  border-radius: 10px;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  width: max-content;
  margin: 15em auto 0 auto;
  padding: 0 3em 1em 3em;
  min-height: 200px;
  transition: all 100ms linear;
  color: white;
  border: solid 1px #ffffff30;

  h1 {
    font-weight: 500;
    margin-block: 1em;
  }

  .search {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    background-color: #ffffff;
    padding: 0 15px 0 0;
    border-radius: 10px;

    input {
      font-size: 1em;
      border: none;
      border-radius: 10px;
      padding: 10px 20px;
      background-color: transparent;

      &:focus {
        outline: none;
      }
    }

    button {
      font-size: 1em;
      background-color: transparent;
      border: none;
      cursor: pointer;
    }
  }
}
</style>
