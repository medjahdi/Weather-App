"use client"

import { useState } from "react"
import { Search, MapPin, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import WeatherCard from "@/components/weather-card"
import ForecastSection from "@/components/forecast-section"

export default function WeatherApp() {
  const [city, setCity] = useState("")
  const [weatherData, setWeatherData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [lastUpdated, setLastUpdated] = useState("")

  const API_KEY = "5a546c8088494c90be3174721250303"
  const API_URL = "https://api.weatherapi.com/v1/forecast.json"

  const fetchWeatherData = async (searchCity) => {
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch(`${API_URL}?key=${API_KEY}&q=${searchCity}&days=3&aqi=no&alerts=no`)

      if (!response.ok) {
        throw new Error("City not found or API error")
      }

      const data = await response.json()
      setWeatherData(data)
      setLastUpdated(new Date().toLocaleTimeString())
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.")
      setWeatherData(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (city.trim()) {
      fetchWeatherData(city)
    }
  }

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true)
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          fetchWeatherData(`${latitude},${longitude}`)
        },
        (err) => {
          setError("Unable to retrieve your location. Please search manually.")
          setIsLoading(false)
        },
      )
    } else {
      setError("Geolocation is not supported by your browser")
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8 animate-fadeIn">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-scaleIn">Weather App</h1>

          <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto animate-slideUp">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Enter city name..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="pr-10 transition-all duration-300 focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground animate-pulse-subtle" />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="animate-pulse-subtle transition-all duration-300 hover:scale-105"
            >
              Search
            </Button>
          </form>

          <Button
            variant="outline"
            className="mt-2 animate-pulse-subtle transition-all duration-300 hover:scale-105"
            onClick={handleUseMyLocation}
            disabled={isLoading}
          >
            <MapPin className="h-4 w-4 mr-2 animate-float" />
            Use My Location
          </Button>
        </header>

        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {error && (
          <div className="bg-red-900/30 border border-red-800 text-red-200 rounded-lg p-4 text-center animate-scaleIn">
            {error}
          </div>
        )}

        {weatherData && !isLoading && (
          <div className="space-y-8 animate-slideUp">
            <WeatherCard weatherData={weatherData} />
            <ForecastSection forecastData={weatherData.forecast} />
            <p className="text-center text-sm text-muted-foreground mt-6 animate-fadeIn">Last updated: {lastUpdated}</p>
          </div>
        )}

        <footer className="mt-12 text-center text-xs text-slate-500 animate-fadeIn">
          <p>
            © {new Date().getFullYear()} @medjahdi |{" "}
            <a
              href="https://medjahdi.github.io"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors hover:underline"
            >
              medjahdi.github.io
            </a>
          </p>
        </footer>
      </div>
    </main>
  )
}

