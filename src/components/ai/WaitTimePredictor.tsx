
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, TrendingUp } from 'lucide-react';
import { waitingTimePredictor, WaitTimeData, WaitTimePrediction } from '@/lib/ai/waitingTimePredictor';

interface WaitTimePredictorProps {
  restaurantId: string;
  restaurantName: string;
  capacity: number;
  currentGuests: number;
  averageDiningTime?: number;
}

const WaitTimePredictor: React.FC<WaitTimePredictorProps> = ({
  restaurantId,
  restaurantName,
  capacity,
  currentGuests,
  averageDiningTime = 60
}) => {
  const [prediction, setPrediction] = useState<WaitTimePrediction | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const calculateWaitTime = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const dayOfWeek = now.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

      const waitTimeData: WaitTimeData = {
        restaurantId,
        currentSeatedGuests: currentGuests,
        totalCapacity: capacity,
        averageDiningTime,
        currentHour,
        dayOfWeek,
        isWeekend,
        isPeakHour: [12, 13, 19, 20, 21].includes(currentHour)
      };

      const result = waitingTimePredictor.predict(waitTimeData);
      setPrediction(result);
      setIsLoading(false);
    };

    calculateWaitTime();
    
    // Update every 5 minutes
    const interval = setInterval(calculateWaitTime, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [restaurantId, currentGuests, capacity, averageDiningTime]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available_now': return 'bg-green-500';
      case 'short_wait': return 'bg-yellow-500';
      case 'moderate_wait': return 'bg-orange-500';
      case 'long_wait': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available_now': return 'Available Now';
      case 'short_wait': return 'Short Wait';
      case 'moderate_wait': return 'Moderate Wait';
      case 'long_wait': return 'Longer Wait';
      default: return 'Calculating...';
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Clock className="h-5 w-5" />
            Live Wait Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!prediction) return null;

  return (
    <Card className="w-full border-l-4 border-l-primary">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Live Wait Time
          </div>
          <Badge 
            className={`${getStatusColor(prediction.status)} text-white px-3 py-1`}
          >
            {getStatusText(prediction.status)}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-1">
            {prediction.estimatedWaitMinutes === 0 ? '0' : `~${prediction.estimatedWaitMinutes}`}
          </div>
          <div className="text-sm text-muted-foreground">
            {prediction.estimatedWaitMinutes === 0 ? 'minutes' : 'minutes wait'}
          </div>
          <p className="text-sm font-medium text-foreground mt-2">
            {prediction.message}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="text-sm font-medium">{currentGuests}/{capacity}</div>
              <div className="text-xs text-muted-foreground">Current occupancy</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="text-sm font-medium">{Math.round(prediction.confidence * 100)}%</div>
              <div className="text-xs text-muted-foreground">Accuracy</div>
            </div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground text-center pt-2 border-t">
          🤖 AI-powered prediction • Updates every 5 minutes
        </div>
      </CardContent>
    </Card>
  );
};

export default WaitTimePredictor;
