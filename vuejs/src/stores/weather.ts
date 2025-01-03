import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export interface Weather {
  location: {
    name: string
    region: string
    country: string
    lat: number
    lon: number
    tz_id: string
    localtime_epoch: number
    localtime: string
  }
  current: {
    last_updated_epoch: number
    last_updated: string
    temp_c: number
    temp_f: number
    is_day: number
    condition: {
      text: string
      icon: string
      code: number
    }
    wind_mph: number
    wind_kph: number
    wind_degree: number
    wind_dir: string
    pressure_mb: number
    pressure_in: number
    precip_mm: number
    precip_in: number
    humidity: number
    cloud: number
    feelslike_c: number
    feelslike_f: number
    windchill_c: number
    windchill_f: number
    heatindex_c: number
    heatindex_f: number
    dewpoint_c: number
    dewpoint_f: number
    vis_km: number
    vis_miles: number
    uv: number
    gust_mph: number
    gust_kph: number
  }
}

export const useWeatherStore = defineStore('weather', () => {
  const weather = ref<Weather | null>(null)
  const loading = ref<boolean>(false);

  const fetch = async (city: string): Promise<void> => {
    if (city.length) {
      loading.value = true
      const response = await axios.get(`
        http://api.weatherapi.com/v1/current.json?key=5f7ce67421dd4f2087983131250301&q=${city}
      `)

      weather.value = response.data
      loading.value = false
    }
  }

  return { weather, fetch, loading }
})
