import { useState } from 'react';
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export function TemperatureConverter() {
  const [fahrenheit, setFahrenheit] = useState<string>('');
  const [celsius, setCelsius] = useState<string>('');

  const convertToCelsius = () => {
    const f = parseFloat(fahrenheit);
    if (!isNaN(f)) {
      const c = ((f - 32) * 5) / 9;
      setCelsius(c.toFixed(2));
    }
  };

  return (
    <Card className="p-6 max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Temperature Converter</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Temperature in Fahrenheit
          </label>
          <Input
            type="number"
            value={fahrenheit}
            onChange={(e) => setFahrenheit(e.target.value)}
            placeholder="Enter temperature in °F"
          />
        </div>
        <Button onClick={convertToCelsius} className="w-full">
          Convert to Celsius
        </Button>
        {celsius && (
          <div className="mt-4 text-center">
            <p className="text-lg">
              {fahrenheit}°F = {celsius}°C
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}