
export interface EventRequirements {
  eventType: 'wedding' | 'birthday' | 'anniversary' | 'corporate' | 'graduation' | 'baby_shower' | 'reception';
  budget: number;
  guestCount: number;
  preferredColors: string[];
  style: 'royal' | 'floral' | 'bollywood' | 'minimal' | 'vintage' | 'modern';
  venueType: 'banquet_hall' | 'garden' | 'indoor' | 'outdoor';
  duration: number;
  specialRequests?: string;
}

export interface EventPlan {
  theme: {
    name: string;
    description: string;
    colorPalette: string[];
  };
  decoration: {
    lighting: string[];
    flowers: string[];
    furniture: string[];
    estimatedCost: number;
  };
  catering: {
    menuType: string;
    courses: string[];
    beverages: string[];
    estimatedCostPerPerson: number;
  };
  totalCost: number;
  confidence: number;
}

class EventPlanningAI {
  private themes = {
    royal: {
      name: 'Royal Elegance',
      description: 'Luxurious and regal celebration with gold accents',
      colors: ['#FFD700', '#8B0000', '#FFFFFF', '#B8860B']
    },
    floral: {
      name: 'Garden Paradise',
      description: 'Natural beauty with fresh flowers and organic elements',
      colors: ['#FFB6C1', '#90EE90', '#FFFFFF', '#F0E68C']
    },
    bollywood: {
      name: 'Bollywood Glamour',
      description: 'Vibrant and colorful with traditional Indian elements',
      colors: ['#FF6347', '#FFD700', '#FF69B4', '#9370DB']
    },
    minimal: {
      name: 'Modern Minimal',
      description: 'Clean, contemporary design with subtle elegance',
      colors: ['#FFFFFF', '#F5F5F5', '#C0C0C0', '#000000']
    },
    vintage: {
      name: 'Vintage Charm',
      description: 'Classic and timeless with nostalgic elements',
      colors: ['#DEB887', '#F5DEB3', '#CD853F', '#8B4513']
    },
    modern: {
      name: 'Contemporary Chic',
      description: 'Sleek and stylish with modern touches',
      colors: ['#2F4F4F', '#FFFFFF', '#C0C0C0', '#4682B4']
    }
  };

  generateEventPlan(requirements: EventRequirements): EventPlan {
    const theme = this.themes[requirements.style];
    const budgetPerGuest = requirements.budget / requirements.guestCount;
    
    // Calculate decoration cost (30% of budget)
    const decorationBudget = requirements.budget * 0.3;
    
    // Calculate catering cost per person (50% of budget)
    const cateringBudget = requirements.budget * 0.5;
    const cateringPerPerson = cateringBudget / requirements.guestCount;
    
    const decoration = this.generateDecoration(requirements, decorationBudget);
    const catering = this.generateCatering(requirements, cateringPerPerson);
    
    return {
      theme: {
        name: theme.name,
        description: theme.description,
        colorPalette: theme.colors
      },
      decoration,
      catering,
      totalCost: requirements.budget,
      confidence: this.calculateConfidence(requirements)
    };
  }

  private generateDecoration(requirements: EventRequirements, budget: number) {
    const decorations = {
      lighting: this.getLightingOptions(requirements.style, requirements.venueType),
      flowers: this.getFloralOptions(requirements.style, requirements.eventType),
      furniture: this.getFurnitureOptions(requirements.style, requirements.guestCount),
      estimatedCost: budget
    };
    
    return decorations;
  }

  private generateCatering(requirements: EventRequirements, budgetPerPerson: number) {
    return {
      menuType: this.getMenuType(requirements.eventType, budgetPerPerson),
      courses: this.getCourses(requirements.eventType, budgetPerPerson),
      beverages: this.getBeverages(requirements.eventType),
      estimatedCostPerPerson: budgetPerPerson
    };
  }

  private getLightingOptions(style: string, venueType: string): string[] {
    const options = {
      royal: ['Crystal chandeliers', 'Golden string lights', 'Warm LED uplighting'],
      floral: ['Fairy lights', 'Garden lanterns', 'Natural daylight enhancement'],
      bollywood: ['Colorful LED strips', 'Disco balls', 'Vibrant spotlights'],
      minimal: ['Clean white lighting', 'Geometric light fixtures', 'Soft ambient lighting'],
      vintage: ['Edison bulb strings', 'Antique lanterns', 'Warm yellow lighting'],
      modern: ['LED panels', 'Smart lighting systems', 'Contemporary fixtures']
    };
    
    return options[style] || options.modern;
  }

  private getFloralOptions(style: string, eventType: string): string[] {
    const options = {
      royal: ['Red roses bouquets', 'Gold lily arrangements', 'White orchid centerpieces'],
      floral: ['Mixed seasonal flowers', 'Garden rose arrangements', 'Wildflower bouquets'],
      bollywood: ['Marigold garlands', 'Bright gerbera arrangements', 'Colorful mixed bouquets'],
      minimal: ['White lily arrangements', 'Green foliage displays', 'Single stem centerpieces'],
      vintage: ['Peonies and roses', 'Dried flower arrangements', 'Antique vase displays'],
      modern: ['Geometric arrangements', 'Sculptural displays', 'Contemporary art flowers']
    };
    
    return options[style] || options.modern;
  }

  private getFurnitureOptions(style: string, guestCount: number): string[] {
    const baseOptions = [
      `${Math.ceil(guestCount / 8)} round tables for 8`,
      `${guestCount} Chiavari chairs`,
      'Dance floor setup'
    ];
    
    const styleSpecific = {
      royal: ['Gold-trimmed furniture', 'Velvet seating', 'Ornate centerpiece stands'],
      floral: ['Natural wood tables', 'Garden-style seating', 'Rustic decorative elements'],
      bollywood: ['Colorful draping', 'Traditional mandap', 'Vibrant cushioned seating'],
      minimal: ['Clean-lined furniture', 'Modern seating', 'Geometric table arrangements'],
      vintage: ['Antique-style furniture', 'Classic wooden chairs', 'Vintage decorative pieces'],
      modern: ['Contemporary furniture', 'Sleek seating', 'Modern artistic elements']
    };
    
    return [...baseOptions, ...(styleSpecific[style] || styleSpecific.modern)];
  }

  private getMenuType(eventType: string, budgetPerPerson: number): string {
    if (budgetPerPerson > 2000) return 'Premium Multi-Cuisine Buffet';
    if (budgetPerPerson > 1000) return 'Deluxe Buffet';
    return 'Standard Buffet';
  }

  private getCourses(eventType: string, budgetPerPerson: number): string[] {
    const premium = [
      'Welcome drinks and appetizers',
      'Live chaat counter',
      'Multi-cuisine buffet (Indian, Chinese, Continental)',
      'Live cooking stations',
      'Premium dessert counter',
      'Ice cream station'
    ];
    
    const deluxe = [
      'Welcome drinks',
      'Starter selection',
      'Main course buffet',
      'Dessert counter',
      'Tea/coffee service'
    ];
    
    const standard = [
      'Welcome drinks',
      'Buffet lunch/dinner',
      'Basic desserts',
      'Tea/coffee'
    ];
    
    if (budgetPerPerson > 2000) return premium;
    if (budgetPerPerson > 1000) return deluxe;
    return standard;
  }

  private getBeverages(eventType: string): string[] {
    return [
      'Fresh juice varieties',
      'Soft drinks and mocktails',
      'Tea and coffee service',
      'Flavored lassi',
      'Fresh lime water'
    ];
  }

  private calculateConfidence(requirements: EventRequirements): number {
    let confidence = 0.8; // Base confidence
    
    // Higher confidence for more detailed requirements
    if (requirements.specialRequests) confidence += 0.05;
    if (requirements.budget > 50000) confidence += 0.05;
    if (requirements.guestCount > 20) confidence += 0.05;
    
    return Math.min(confidence, 0.95);
  }
}

export const eventPlanningAI = new EventPlanningAI();
