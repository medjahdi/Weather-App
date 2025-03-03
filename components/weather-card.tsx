import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Droplets, Wind, Thermometer } from "lucide-react"

export default function WeatherCard({ weatherData }) {
  const { location, current } = weatherData

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg bg-slate-800/50 border-slate-700 animate-scaleIn">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold tracking-tight animate-pulse-slow">{location.name}</h2>
              <p className="text-muted-foreground animate-fadeIn">
                {location.region}, {location.country}
              </p>
            </div>

            <div className="flex items-center mt-4">
              <div className="mr-4 animate-float">
                <Image
                  src={`https:${current.condition.icon}`}
                  alt={current.condition.text}
                  width={64}
                  height={64}
                  className="h-16 w-16"
                />
              </div>
              <div>
                <div className="text-4xl font-bold animate-pulse-slow">{current.temp_c}°C</div>
                <p className="text-muted-foreground animate-fadeIn">{current.condition.text}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 self-end">
            <div
              className="flex items-center gap-2 transition-all duration-300 hover:translate-x-1 animate-slideUp"
              style={{ animationDelay: "0.1s" }}
            >
              <Thermometer className="h-5 w-5 text-orange-500" />
              <span className="text-sm">Feels like {current.feelslike_c}°C</span>
            </div>
            <div
              className="flex items-center gap-2 transition-all duration-300 hover:translate-x-1 animate-slideUp"
              style={{ animationDelay: "0.2s" }}
            >
              <Droplets className="h-5 w-5 text-blue-500" />
              <span className="text-sm">Humidity: {current.humidity}%</span>
            </div>
            <div
              className="flex items-center gap-2 transition-all duration-300 hover:translate-x-1 animate-slideUp"
              style={{ animationDelay: "0.3s" }}
            >
              <Wind className="h-5 w-5 text-slate-500" />
              <span className="text-sm">Wind: {current.wind_kph} km/h</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

