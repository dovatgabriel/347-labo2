<script setup lang="ts">
import type { Weather } from '../stores/weather'

const props = defineProps<{
  weather: Weather
}>()
</script>

<template>
  <div class="weather-data">
    <div class="weather-data__location">
      <img class="condition" :src="'https:' + props.weather.current.condition.icon" />
      <span class="name">{{ props.weather.location.name }}</span>
      <span class="country">{{ props.weather.location.country }}</span>
    </div>
    <div class="weather-data__current">
      <span class="temperature">{{ props.weather.current.temp_c }}°C</span>
      <span class="humidity">Humidité {{ props.weather.current.humidity }}%</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.weather-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  gap: 20px;

  &__location {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1px;

    .name {
      font-size: 2rem;
    }

    .country {
      font-size: 1rem;
    }
  }

  .condition {
    width: 100px;
    height: 100px;
  }

  &__current {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1px;

    .temperature {
      font-size: 3rem;
      font-weight: 600;
    }

    .humidity {
      font-size: 1rem;
    }
  }
}

</style>
