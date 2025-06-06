
// AI-powered waiting time prediction system
export interface WaitTimeData {
  restaurantId: string;
  currentSeatedGuests: number;
  totalCapacity: number;
  averageDiningTime: number; // in minutes
  currentHour: number;
  dayOfWeek: number;
  isWeekend: boolean;
  isPeakHour: boolean;
}

export interface WaitTimePrediction {
  estimatedWaitMinutes: number;
  confidence: number;
  status: 'available_now' | 'short_wait' | 'moderate_wait' | 'long_wait';
  message: string;
}

class WaitingTimePredictor {
  private peakHours = [12, 13, 19, 20, 21]; // 12-1pm, 7-9pm
  private weekendMultiplier = 1.3;
  private peakHourMultiplier = 1.5;

  predict(data: WaitTimeData): WaitTimePrediction {
    const {
      currentSeatedGuests,
      totalCapacity,
      averageDiningTime,
      currentHour,
      isWeekend,
    } = data;

    // Base calculation
    const occupancyRate = currentSeatedGuests / totalCapacity;
    const isPeakHour = this.peakHours.includes(currentHour);
    
    let baseWaitTime = 0;
    
    if (occupancyRate >= 0.95) {
      // Near full capacity
      baseWaitTime = averageDiningTime * 0.8;
    } else if (occupancyRate >= 0.8) {
      // High occupancy
      baseWaitTime = averageDiningTime * 0.5;
    } else if (occupancyRate >= 0.6) {
      // Moderate occupancy
      baseWaitTime = averageDiningTime * 0.2;
    } else {
      // Low occupancy - likely available now
      baseWaitTime = 0;
    }

    // Apply multipliers
    if (isWeekend) {
      baseWaitTime *= this.weekendMultiplier;
    }
    
    if (isPeakHour) {
      baseWaitTime *= this.peakHourMultiplier;
    }

    // Add randomness for realism (±15%)
    const variance = 0.15;
    const randomFactor = 1 + (Math.random() - 0.5) * variance;
    const estimatedWaitMinutes = Math.round(baseWaitTime * randomFactor);

    // Determine status and confidence
    const confidence = this.calculateConfidence(occupancyRate, isPeakHour);
    const { status, message } = this.getStatusAndMessage(estimatedWaitMinutes);

    return {
      estimatedWaitMinutes,
      confidence,
      status,
      message,
    };
  }

  private calculateConfidence(occupancyRate: number, isPeakHour: boolean): number {
    let confidence = 0.8; // Base confidence
    
    // Higher confidence with more data points
    if (occupancyRate > 0.3) confidence += 0.1;
    if (isPeakHour) confidence += 0.05;
    
    return Math.min(confidence, 0.95);
  }

  private getStatusAndMessage(waitMinutes: number): { status: WaitTimePrediction['status']; message: string } {
    if (waitMinutes <= 5) {
      return {
        status: 'available_now',
        message: 'Table available now! 🎉'
      };
    } else if (waitMinutes <= 15) {
      return {
        status: 'short_wait',
        message: `Short wait of ~${waitMinutes} minutes`
      };
    } else if (waitMinutes <= 30) {
      return {
        status: 'moderate_wait',
        message: `Moderate wait of ~${waitMinutes} minutes`
      };
    } else {
      return {
        status: 'long_wait',
        message: `Longer wait of ~${waitMinutes} minutes`
      };
    }
  }
}

export const waitingTimePredictor = new WaitingTimePredictor();
