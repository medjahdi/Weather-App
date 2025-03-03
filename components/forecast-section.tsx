import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { format } from "date-fns"
import { CloudRain } from "lucide-react"

export default function ForecastSection({ forecastData }) {
  return (
    <div className="mt-8 animate-fadeIn">
      <h2 className="text-xl font-semibold mb-4 animate-slideUp">3-Day Forecast</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {forecastData.forecastday.map((day, index) => (
          <ForecastCard key={day.date} day={day} index={index} />
        ))}
      </div>
    </div>
  )
}

function ForecastCard({ day, index }) {
  const date = new Date(day.date)
  const formattedDate = format(date, "EEE, MMM d")

  return (
    <Card
      className="overflow-hidden transition-all duration-300 hover:shadow-md hover:translate-y-[-5px] bg-slate-800/50 border-slate-700 animate-scaleIn"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <CardContent className="p-4">
        <div className="text-center">
          <h3 className="font-medium animate-fadeIn" style={{ animationDelay: `${index * 0.1 + 0.1}s` }}>
            {formattedDate}
          </h3>

          <div className="my-3 flex justify-center animate-float" style={{ animationDelay: `${index * 0.1 + 0.2}s` }}>
            <Image
              src={`https:${day.day.condition.icon}`}
              alt={day.day.condition.text}
              width={64}
              height={64}
              className="h-16 w-16"
            />
          </div>

          <p
            className="text-sm text-muted-foreground mb-2 animate-fadeIn"
            style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
          >
            {day.day.condition.text}
          </p>

          <div
            className="flex justify-center gap-2 text-sm font-medium animate-slideUp"
            style={{ animationDelay: `${index * 0.1 + 0.4}s` }}
          >
            <span className="text-blue-400">{day.day.mintemp_c}°</span>
            <span>-</span>
            <span className="text-red-400">{day.day.maxtemp_c}°</span>
          </div>

          {day.day.daily_chance_of_rain > 0 && (
            <div
              className="flex items-center justify-center gap-1 mt-2 text-sm text-blue-400 animate-pulse-slow"
              style={{ animationDelay: `${index * 0.1 + 0.5}s` }}
            >
              <CloudRain className="h-3 w-3" />
              <span>{day.day.daily_chance_of_rain}%</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

