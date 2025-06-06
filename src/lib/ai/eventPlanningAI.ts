
// AI-powered event planning assistant
export interface EventRequirements {
  eventType: 'wedding' | 'birthday' | 'anniversary' | 'corporate' | 'graduation' | 'baby_shower' | 'reception';
  budget: number;
  guestCount: number;
  preferredColors: string[];
  style: 'royal' | 'floral' | 'bollywood' | 'minimal' | 'vintage' | 'modern';
  venueType: 'indoor' | 'outdoor' | 'garden' | 'banquet_hall';
  duration: number; // in hours
  specialRequests?: string;
}

export interface EventPlan {
  id: string;
  theme: EventTheme;
  decoration: DecorationPlan;
  catering: CateringPlan;
  services: ServicePlan[];
  timeline: EventTimeline[];
  totalCost: number;
  savings: number;
  confidence: number;
}

export interface EventTheme {
  name: string;
  description: string;
  colorPalette: string[];
  mood: string;
  style: string;
}

export interface DecorationPlan {
  lighting: string[];
  flowers: string[];
  seating: string;
  backdrop: string;
  centerpieces: string[];
  estimatedCost: number;
}

export interface CateringPlan {
  menuType: string;
  courses: string[];
  specialDietary: string[];
  beverages: string[];
  estimatedCostPerPerson: number;
}

export interface ServicePlan {
  type: 'photography' | 'videography' | 'music' | 'transportation' | 'coordination';
  provider: string;
  description: string;
  cost: number;
  recommended: boolean;
}

export interface EventTimeline {
  time: string;
  activity: string;
  duration: number;
  responsible: string;
}

class EventPlanningAI {
  private themeDatabase = {
    royal: {
      name: 'Royal Elegance',
      description: 'Luxurious and grand with golden accents',
      colorPalette: ['#FFD700', '#8B0000', '#FFFFFF', '#000000'],
      mood: 'Luxurious and Grand',
      style: 'Traditional with modern touches'
    },
    floral: {
      name: 'Garden Paradise',
      description: 'Fresh and natural with abundant flowers',
      colorPalette: ['#FF69B4', '#98FB98', '#FFFFFF', '#F0E68C'],
      mood: 'Fresh and Natural',
      style: 'Organic and flowing'
    },
    bollywood: {
      name: 'Bollywood Glamour',
      description: 'Vibrant and colorful with dramatic elements',
      colorPalette: ['#FF4500', '#FFD700', '#FF1493', '#00CED1'],
      mood: 'Vibrant and Energetic',
      style: 'Bold and dramatic'
    },
    minimal: {
      name: 'Modern Minimal',
      description: 'Clean lines and sophisticated simplicity',
      colorPalette: ['#FFFFFF', '#F5F5F5', '#C0C0C0', '#000000'],
      mood: 'Clean and Sophisticated',
      style: 'Contemporary minimalism'
    },
    vintage: {
      name: 'Vintage Charm',
      description: 'Nostalgic elegance with classic touches',
      colorPalette: ['#DEB887', '#F4A460', '#FFFFFF', '#8B4513'],
      mood: 'Nostalgic and Elegant',
      style: 'Classic with vintage elements'
    },
    modern: {
      name: 'Contemporary Chic',
      description: 'Sleek and trendy with bold accents',
      colorPalette: ['#36454F', '#FFFFFF', '#FF6B35', '#F7DC6F'],
      mood: 'Sleek and Trendy',
      style: 'Ultra-modern design'
    }
  };

  generateEventPlan(requirements: EventRequirements): EventPlan {
    const theme = this.selectTheme(requirements);
    const decoration = this.planDecoration(requirements, theme);
    const catering = this.planCatering(requirements);
    const services = this.recommendServices(requirements);
    const timeline = this.createTimeline(requirements);
    
    const totalCost = this.calculateTotalCost(decoration, catering, services);
    const savings = this.calculateSavings(totalCost, requirements.budget);
    const confidence = this.calculatePlanConfidence(requirements);

    return {
      id: `plan_${Date.now()}`,
      theme,
      decoration,
      catering,
      services,
      timeline,
      totalCost,
      savings,
      confidence
    };
  }

  private selectTheme(requirements: EventRequirements): EventTheme {
    return this.themeDatabase[requirements.style];
  }

  private planDecoration(requirements: EventRequirements, theme: EventTheme): DecorationPlan {
    const baseDecoration = {
      lighting: ['Ambient LED strips', 'Warm spotlights', 'String lights'],
      flowers: ['Seasonal blooms', 'Center arrangements', 'Entrance decor'],
      seating: 'Round tables with elegant covers',
      backdrop: 'Themed photo backdrop',
      centerpieces: ['Floral arrangements', 'Candle displays'],
      estimatedCost: 0
    };

    // Customize based on style and budget
    if (requirements.style === 'royal') {
      baseDecoration.lighting.push('Crystal chandeliers');
      baseDecoration.flowers.push('Premium roses and lilies');
    } else if (requirements.style === 'minimal') {
      baseDecoration.lighting = ['Clean LED panels', 'Accent lighting'];
      baseDecoration.flowers = ['Simple white arrangements'];
    }

    baseDecoration.estimatedCost = Math.round(requirements.budget * 0.3); // 30% for decoration

    return baseDecoration;
  }

  private planCatering(requirements: EventRequirements): CateringPlan {
    const baseCostPerPerson = requirements.budget / requirements.guestCount * 0.5; // 50% for catering

    return {
      menuType: requirements.eventType === 'corporate' ? 'Business lunch' : 'Multi-cuisine buffet',
      courses: ['Welcome drinks', 'Appetizers', 'Main course', 'Desserts'],
      specialDietary: ['Vegetarian options', 'Vegan choices', 'Gluten-free items'],
      beverages: ['Fresh juices', 'Soft drinks', 'Tea/Coffee', 'Mocktails'],
      estimatedCostPerPerson: Math.round(baseCostPerPerson)
    };
  }

  private recommendServices(requirements: EventRequirements): ServicePlan[] {
    const services: ServicePlan[] = [
      {
        type: 'photography',
        provider: 'DineVibe Pro Photographers',
        description: 'Professional event photography with instant digital gallery',
        cost: Math.round(requirements.budget * 0.1),
        recommended: true
      },
      {
        type: 'coordination',
        provider: 'DineVibe Event Coordinators',
        description: 'Full-service event management and coordination',
        cost: Math.round(requirements.budget * 0.08),
        recommended: true
      }
    ];

    if (requirements.guestCount > 50) {
      services.push({
        type: 'music',
        provider: 'DineVibe Entertainment',
        description: 'Professional DJ and sound system',
        cost: Math.round(requirements.budget * 0.06),
        recommended: true
      });
    }

    return services;
  }

  private createTimeline(requirements: EventRequirements): EventTimeline[] {
    const timeline: EventTimeline[] = [
      { time: '2 hours before', activity: 'Decoration setup begins', duration: 120, responsible: 'Decoration team' },
      { time: '1 hour before', activity: 'Final setup and checks', duration: 60, responsible: 'Event coordinator' },
      { time: 'Event start', activity: 'Guest arrival and welcome', duration: 30, responsible: 'Host team' },
      { time: '+30 minutes', activity: 'Main event begins', duration: requirements.duration * 60 - 60, responsible: 'Event coordinator' },
      { time: 'Event end', activity: 'Cleanup and breakdown', duration: 60, responsible: 'Service team' }
    ];

    return timeline;
  }

  private calculateTotalCost(decoration: DecorationPlan, catering: CateringPlan, services: ServicePlan[]): number {
    const decorationCost = decoration.estimatedCost;
    const cateringCost = catering.estimatedCostPerPerson * 50; // Assuming 50 guests for demo
    const servicesCost = services.reduce((total, service) => total + service.cost, 0);
    
    return decorationCost + cateringCost + servicesCost;
  }

  private calculateSavings(totalCost: number, budget: number): number {
    return Math.max(0, budget - totalCost);
  }

  private calculatePlanConfidence(requirements: EventRequirements): number {
    let confidence = 0.8; // Base confidence
    
    if (requirements.budget > 50000) confidence += 0.1; // Higher budget = more options
    if (requirements.guestCount < 100) confidence += 0.05; // Easier to manage smaller events
    if (requirements.specialRequests && requirements.specialRequests.length > 0) confidence -= 0.05; // Special requests add complexity
    
    return Math.min(confidence, 0.95);
  }
}

export const eventPlanningAI = new EventPlanningAI();
