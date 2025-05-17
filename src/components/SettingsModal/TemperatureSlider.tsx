import { Sliders } from "lucide-react";

interface TemperatureSliderProps {
  temperature: number;
  onChange: (value: number) => void;
}

export default function TemperatureSlider({
  temperature,
  onChange,
}: TemperatureSliderProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Sliders size={16} className="text-purple-500" />
        <label className="text-sm font-medium">Temperature</label>
      </div>
      <div className="flex items-center gap-3">
        <input
          type="range"
          min={0}
          max={2}
          step={0.1}
          value={temperature}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full"
        />
        <span className="text-sm font-medium w-10 text-right">{temperature.toFixed(1)}</span>
      </div>
    </div>
  );
}
