import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlarmClock, Pause, Play, RotateCcw, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

interface TimerProps {
  isBreak: boolean;
  onTimerComplete: () => void;
  onCancel: () => void;
  activeTask?: string;
}

export function Timer({ isBreak, onTimerComplete, onCancel, activeTask }: TimerProps) {
  const [minutes, setMinutes] = useState(isBreak ? 5 : 25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<"25" | "50" | "custom">(
    "25"
  );
  const [customMinutes, setCustomMinutes] = useState("25");
  const { toast } = useToast();

  useEffect(() => {
    if (isBreak) {
      setMinutes(5);
      setSeconds(0);
      setIsRunning(true);
    }
  }, [isBreak]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isRunning) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            setIsRunning(false);
            
            // Play sound effect when timer completes
            const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3");
            audio.play();
            
            toast({
              title: isBreak ? "Break time over!" : "Work session completed!",
              description: isBreak
                ? "Time to get back to work!"
                : "Take a short 5-minute break!",
            });
            
            onTimerComplete();
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, minutes, seconds, isBreak, onTimerComplete, toast]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    if (selectedPreset === "25") {
      setMinutes(25);
    } else if (selectedPreset === "50") {
      setMinutes(50);
    } else {
      setMinutes(parseInt(customMinutes) || 25);
    }
    setSeconds(0);
    setIsRunning(false);
  };

  const selectPreset = (preset: "25" | "50" | "custom") => {
    setSelectedPreset(preset);
    if (preset === "25") {
      setMinutes(25);
      setCustomMinutes("25");
    } else if (preset === "50") {
      setMinutes(50);
      setCustomMinutes("50");
    }
    setSeconds(0);
    setIsRunning(false);
  };

  const handleCustomMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomMinutes(value);
    if (selectedPreset === "custom" && !isRunning) {
      setMinutes(parseInt(value) || 0);
    }
  };

  const applyCustomTime = () => {
    const mins = parseInt(customMinutes) || 25;
    setMinutes(mins);
    setSeconds(0);
  };

  // Calculate progress percentage
  const totalSeconds = isBreak ? 5 * 60 : (selectedPreset === "25" ? 25 : selectedPreset === "50" ? 50 : parseInt(customMinutes) || 25) * 60;
  const remainingSeconds = minutes * 60 + seconds;
  const progressPercentage = ((totalSeconds - remainingSeconds) / totalSeconds) * 100;

  return (
    <div className="kawaii-card mt-8 max-w-md mx-auto text-center bg-pixel-lightBlue">
      {isBreak ? (
        <div className="bg-pixel-blue text-white py-2 px-4 inline-flex items-center mb-4 pixel-border">
          <Clock className="mr-2" size={18} />
          <span className="font-pixel text-xs">BREAK TIME</span>
        </div>
      ) : activeTask ? (
        <div className="bg-pixel-darkBlue text-white py-2 px-4 inline-flex items-center mb-4 pixel-border">
          <AlarmClock className="mr-2" size={18} />
          <span className="font-pixel text-xs">WORKING: {activeTask}</span>
        </div>
      ) : (
        <div className="bg-pixel-blue text-white py-2 px-4 inline-flex items-center mb-4 pixel-border">
          <AlarmClock className="mr-2" size={18} />
          <span className="font-pixel text-xs">TIMER</span>
        </div>
      )}
      
      <div className="font-pixel text-6xl mb-6 text-pixel-dark tracking-widest">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </div>
      
      <Progress value={progressPercentage} className="h-4 mb-6 bg-white border-2 border-black" />

      {!isBreak && (
        <div className="flex justify-center space-x-2 mb-6">
          <Button
            className={`${
              selectedPreset === "25"
                ? "bg-pixel-blue text-white"
                : "bg-white text-pixel-dark"
            } kawaii-button font-pixel text-xs`}
            onClick={() => selectPreset("25")}
          >
            25 min
          </Button>
          <Button
            className={`${
              selectedPreset === "50"
                ? "bg-pixel-blue text-white"
                : "bg-white text-pixel-dark"
            } kawaii-button font-pixel text-xs`}
            onClick={() => selectPreset("50")}
          >
            50 min
          </Button>
          <Button
            className={`${
              selectedPreset === "custom"
                ? "bg-pixel-blue text-white"
                : "bg-white text-pixel-dark"
            } kawaii-button font-pixel text-xs`}
            onClick={() => selectPreset("custom")}
          >
            Custom
          </Button>
        </div>
      )}

      {!isBreak && selectedPreset === "custom" && (
        <div className="flex items-center space-x-2 mb-6">
          <Input
            type="number"
            value={customMinutes}
            onChange={handleCustomMinutesChange}
            min="1"
            className="w-20 text-center font-pixel pixel-border bg-white"
          />
          <span className="font-pixel text-xs">minutes</span>
          <Button
            className="bg-pixel-blue text-white kawaii-button font-pixel text-xs"
            onClick={applyCustomTime}
          >
            Set
          </Button>
        </div>
      )}

      <div className="flex justify-center space-x-3">
        <Button
          className="bg-pixel-blue text-white kawaii-button font-pixel text-xs"
          onClick={toggleTimer}
        >
          {isRunning ? (
            <>
              <Pause className="mr-1" size={16} /> Pause
            </>
          ) : (
            <>
              <Play className="mr-1" size={16} /> Start
            </>
          )}
        </Button>
        <Button
          className="bg-white text-pixel-dark kawaii-button font-pixel text-xs"
          onClick={resetTimer}
        >
          <RotateCcw className="mr-1" size={16} /> Reset
        </Button>
        {!isBreak && (
          <Button
            className="bg-white text-pixel-dark kawaii-button font-pixel text-xs"
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
}
