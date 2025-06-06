
// Smart recommendation engine for restaurants and events
export interface UserPreferences {
  cuisinePreferences: string[];
  budgetRange: { min: number; max: number };
  locationPreferences: string[];
  diningStyle: 'casual' | 'fine_dining' | 'family' | 'romantic' | 'business';
  previousBookings: string[];
  dietaryRestrictions: string[];
  averagePartySize: number;
}

export interface RecommendationScore {
  restaurantId: string;
  score: number;
  reasons: string[];
  waitTime?: number;
  specialOffers?: string[];
}

export interface SmartRecommendation {
  restaurant: {
    id: string;
    name: string;
    cuisine: string;
    priceRange: string;
    rating: number;
    location: string;
    image: string;
  };
  score: number;
  reasons: string[];
  aiInsight: string;
  waitTime?: number;
  specialOffers?: string[];
}

class SmartRecommendationEngine {
  private cuisineWeights = {
    exact_match: 1.0,
    similar_cuisine: 0.7,
    fusion: 0.5,
    different: 0.2
  };

  private locationWeights = {
    same_area: 1.0,
    nearby: 0.8,
    same_city: 0.6,
    different_city: 0.3
  };

  generateRecommendations(
    userPreferences: UserPreferences,
    availableRestaurants: any[],
    context: {
      currentTime: Date;
      isSpecialOccasion?: boolean;
      groupSize: number;
    }
  ): SmartRecommendation[] {
    const scoredRecommendations = availableRestaurants.map(restaurant => {
      const score = this.calculateRecommendationScore(restaurant, userPreferences, context);
      return {
        restaurant: {
          id: restaurant.id,
          name: restaurant.name,
          cuisine: restaurant.cuisine,
          priceRange: restaurant.price_range || 'moderate',
          rating: restaurant.rating || 4.2,
          location: restaurant.location,
          image: restaurant.images?.[0] || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4'
        },
        ...score
      };
    });

    // Sort by score and return top recommendations
    return scoredRecommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  }

  private calculateRecommendationScore(
    restaurant: any,
    preferences: UserPreferences,
    context: any
  ): Omit<SmartRecommendation, 'restaurant'> {
    let score = 0;
    const reasons: string[] = [];
    let aiInsight = '';

    // Cuisine matching
    const cuisineScore = this.calculateCuisineScore(restaurant.cuisine, preferences.cuisinePreferences);
    score += cuisineScore * 0.3;
    if (cuisineScore > 0.8) {
      reasons.push('Matches your favorite cuisine');
    }

    // Budget matching
    const budgetScore = this.calculateBudgetScore(restaurant, preferences.budgetRange);
    score += budgetScore * 0.25;
    if (budgetScore > 0.8) {
      reasons.push('Perfect for your budget');
    }

    // Location proximity
    const locationScore = this.calculateLocationScore(restaurant.location, preferences.locationPreferences);
    score += locationScore * 0.2;
    if (locationScore > 0.8) {
      reasons.push('Conveniently located');
    }

    // Dining style match
    const styleScore = this.calculateStyleScore(restaurant, preferences.diningStyle);
    score += styleScore * 0.15;
    if (styleScore > 0.8) {
      reasons.push('Perfect ambiance for your style');
    }

    // Special occasion bonus
    if (context.isSpecialOccasion && restaurant.offers_decoration) {
      score += 0.1;
      reasons.push('Great for special occasions');
    }

    // Group size accommodation
    if (restaurant.seating_capacity >= context.groupSize) {
      score += 0.05;
      reasons.push('Can accommodate your group size');
    }

    // Previous booking penalty (encourage variety)
    if (preferences.previousBookings.includes(restaurant.id)) {
      score *= 0.8;
    } else {
      reasons.push('New experience for you');
    }

    // Generate AI insight
    aiInsight = this.generateAIInsight(restaurant, preferences, score);

    // Mock wait time and special offers
    const waitTime = Math.floor(Math.random() * 30);
    const specialOffers = this.generateSpecialOffers(restaurant);

    return {
      score: Math.min(score, 1.0),
      reasons,
      aiInsight,
      waitTime,
      specialOffers
    };
  }

  private calculateCuisineScore(restaurantCuisine: string, userPreferences: string[]): number {
    if (!userPreferences.length) return 0.5; // Neutral if no preferences
    
    if (userPreferences.includes(restaurantCuisine.toLowerCase())) {
      return this.cuisineWeights.exact_match;
    }
    
    // Check for similar cuisines
    const similarCuisines = {
      'italian': ['mediterranean', 'european'],
      'chinese': ['asian', 'thai', 'japanese'],
      'indian': ['asian', 'thai'],
      'mexican': ['latin', 'spanish'],
      'thai': ['asian', 'vietnamese', 'chinese'],
      'japanese': ['asian', 'korean']
    };
    
    const restaurantLower = restaurantCuisine.toLowerCase();
    for (const preferred of userPreferences) {
      if (similarCuisines[preferred]?.includes(restaurantLower) || 
          similarCuisines[restaurantLower]?.includes(preferred)) {
        return this.cuisineWeights.similar_cuisine;
      }
    }
    
    return this.cuisineWeights.different;
  }

  private calculateBudgetScore(restaurant: any, budgetRange: { min: number; max: number }): number {
    const priceRanges = {
      'budget': { min: 0, max: 500 },
      'moderate': { min: 500, max: 1500 },
      'premium': { min: 1500, max: 3000 },
      'luxury': { min: 3000, max: 10000 }
    };
    
    const restaurantRange = priceRanges[restaurant.price_range] || priceRanges.moderate;
    
    // Check overlap between user budget and restaurant range
    const overlapStart = Math.max(budgetRange.min, restaurantRange.min);
    const overlapEnd = Math.min(budgetRange.max, restaurantRange.max);
    
    if (overlapStart <= overlapEnd) {
      const overlapSize = overlapEnd - overlapStart;
      const userRangeSize = budgetRange.max - budgetRange.min;
      return Math.min(overlapSize / userRangeSize, 1.0);
    }
    
    return 0.2; // Some score even if no overlap
  }

  private calculateLocationScore(restaurantLocation: string, userPreferences: string[]): number {
    if (!userPreferences.length) return 0.5;
    
    for (const preferred of userPreferences) {
      if (restaurantLocation.toLowerCase().includes(preferred.toLowerCase())) {
        return this.locationWeights.same_area;
      }
    }
    
    return this.locationWeights.different_city;
  }

  private calculateStyleScore(restaurant: any, diningStyle: string): number {
    const styleMatches = {
      'casual': ['family', 'cafe', 'casual'],
      'fine_dining': ['fine', 'premium', 'upscale'],
      'family': ['family', 'casual', 'kid'],
      'romantic': ['romantic', 'intimate', 'fine'],
      'business': ['business', 'formal', 'quiet']
    };
    
    const keywords = styleMatches[diningStyle] || [];
    const description = (restaurant.description || '').toLowerCase();
    
    for (const keyword of keywords) {
      if (description.includes(keyword)) {
        return 0.9;
      }
    }
    
    return 0.5; // Neutral if no clear match
  }

  private generateAIInsight(restaurant: any, preferences: UserPreferences, score: number): string {
    if (score > 0.8) {
      return `🎯 Perfect match! This restaurant aligns excellently with your preferences and dining style.`;
    } else if (score > 0.6) {
      return `✨ Great choice! This place offers a good balance of your preferred cuisine and budget.`;
    } else if (score > 0.4) {
      return `🌟 Worth trying! While different from your usual choices, it offers a unique experience.`;
    } else {
      return `🤔 Something different! This could be an interesting change from your usual preferences.`;
    }
  }

  private generateSpecialOffers(restaurant: any): string[] {
    const offers = [
      '20% off on weekday bookings',
      'Complimentary dessert for groups of 4+',
      'Happy hour drinks until 7 PM',
      'Free appetizer with main course',
      'Early bird discount before 6 PM'
    ];
    
    // Randomly select 1-2 offers
    const numOffers = Math.floor(Math.random() * 2) + 1;
    return offers.slice(0, numOffers);
  }
}

export const smartRecommendationEngine = new SmartRecommendationEngine();
