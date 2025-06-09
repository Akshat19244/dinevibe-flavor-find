
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, TrendingUp, AlertCircle } from 'lucide-react';
import { waitingTimePredictor, WaitTimeData } from '@/lib/ai/waitingTimePredictor';

interface WaitTimePredictorProps {
  restaurantId: string;
  restaurantName: string;
  capacity: number;
  currentGuests: number;
  averageDiningTime: number;
}

const WaitTimePredictor: React.FC<WaitTimePredictorProps> = ({
  restaurantId,
  restaurantName,
  capacity,
  currentGuests,
  averageDiningTime
}) => {
  const [prediction, setPrediction] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const calculateWaitTime = () => {
      const currentHour = new Date().getHours();
      const dayOfWeek = new Date().getDay();
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
    const interval = setInterval(calculateWaitTime, 30000); // Update every 30 seconds

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

  const occupancyRate = (currentGuests / capacity) * 100;

  if (isLoading) {
    return (
      <Card className="animate-pulse">
        <CardContent className="p-6">
          <div className="h-20 bg-slate-200 rounded"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Clock className="h-5 w-5 text-blue-600" />
          {restaurantName} - Wait Time
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge className={`${getStatusColor(prediction.status)} text-white`}>
                {prediction.estimatedWaitMinutes === 0 ? 'Available Now' : `${prediction.estimatedWaitMinutes} min wait`}
              </Badge>
              <span className="text-sm text-slate-600">
                {Math.round(prediction.confidence * 100)}% confidence
              </span>
            </div>
            <p className="text-sm text-slate-700">{prediction.message}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">
              {prediction.estimatedWaitMinutes}
            </div>
            <div className="text-xs text-slate-500">minutes</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2 border-t">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-slate-500" />
            <div>
              <div className="text-sm font-medium">{currentGuests}/{capacity}</div>
              <div className="text-xs text-slate-500">Occupancy</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-slate-500" />
            <div>
              <div className="text-sm font-medium">{Math.round(occupancyRate)}%</div>
              <div className="text-xs text-slate-500">Full</div>
            </div>
          </div>
        </div>

        <div className="w-full bg-slate-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(occupancyRate, 100)}%` }}
          ></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WaitTimePredictor;
