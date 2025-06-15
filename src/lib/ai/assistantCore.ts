
export interface UserContext {
  userId?: string;
  userType: 'user' | 'owner' | 'admin';
  currentPage: string;
  permissions: string[];
}

export interface TaskRequest {
  type: 'query' | 'action' | 'admin_command';
  category: 'booking' | 'venue_management' | 'analytics' | 'user_support' | 'system_admin';
  intent: string;
  parameters: Record<string, any>;
}

export interface AIResponse {
  response: string;
  actions?: Array<{
    type: string;
    description: string;
    data: any;
  }>;
  needsConfirmation?: boolean;
  requiresAuth?: boolean;
}

export class AdvancedAIAssistant {
  private userContext: UserContext;

  constructor(userContext: UserContext) {
    this.userContext = userContext;
  }

  async processRequest(message: string): Promise<AIResponse> {
    const taskRequest = this.parseUserMessage(message);
    
    switch (taskRequest.type) {
      case 'query':
        return this.handleQuery(taskRequest);
      case 'action':
        return this.handleAction(taskRequest);
      case 'admin_command':
        return this.handleAdminCommand(taskRequest);
      default:
        return this.handleGeneral(message);
    }
  }

  private parseUserMessage(message: string): TaskRequest {
    const lowerMessage = message.toLowerCase();
    
    // Admin commands
    if (this.userContext.userType === 'admin' && (
      lowerMessage.includes('generate report') ||
      lowerMessage.includes('system status') ||
      lowerMessage.includes('user management') ||
      lowerMessage.includes('approve venue') ||
      lowerMessage.includes('ban user')
    )) {
      return {
        type: 'admin_command',
        category: 'system_admin',
        intent: this.extractAdminIntent(lowerMessage),
        parameters: this.extractParameters(lowerMessage)
      };
    }

    // Owner actions
    if (this.userContext.userType === 'owner' && (
      lowerMessage.includes('booking') ||
      lowerMessage.includes('analytics') ||
      lowerMessage.includes('venue') ||
      lowerMessage.includes('revenue')
    )) {
      return {
        type: 'action',
        category: 'venue_management',
        intent: this.extractOwnerIntent(lowerMessage),
        parameters: this.extractParameters(lowerMessage)
      };
    }

    // User queries and actions
    if (lowerMessage.includes('book') || lowerMessage.includes('reservation')) {
      return {
        type: 'action',
        category: 'booking',
        intent: 'make_booking',
        parameters: this.extractBookingParameters(lowerMessage)
      };
    }

    return {
      type: 'query',
      category: 'user_support',
      intent: 'general_help',
      parameters: {}
    };
  }

  private extractAdminIntent(message: string): string {
    if (message.includes('generate report')) return 'generate_report';
    if (message.includes('system status')) return 'system_status';
    if (message.includes('user management')) return 'user_management';
    if (message.includes('approve venue')) return 'approve_venue';
    if (message.includes('ban user')) return 'ban_user';
    return 'general_admin';
  }

  private extractOwnerIntent(message: string): string {
    if (message.includes('booking')) return 'manage_bookings';
    if (message.includes('analytics')) return 'view_analytics';
    if (message.includes('venue')) return 'manage_venue';
    if (message.includes('revenue')) return 'view_revenue';
    return 'general_owner';
  }

  private extractParameters(message: string): Record<string, any> {
    const params: Record<string, any> = {};
    
    // Extract dates
    const dateRegex = /(\d{1,2}\/\d{1,2}\/\d{4}|\d{4}-\d{2}-\d{2})/g;
    const dates = message.match(dateRegex);
    if (dates) params.date = dates[0];

    // Extract numbers (guest count, budget, etc.)
    const numberRegex = /(\d+)/g;
    const numbers = message.match(numberRegex);
    if (numbers) params.numbers = numbers.map(n => parseInt(n));

    return params;
  }

  private extractBookingParameters(message: string): Record<string, any> {
    const params: Record<string, any> = {};
    
    // Extract guest count
    const guestMatch = message.match(/(\d+)\s*(guest|people|person)/i);
    if (guestMatch) params.guestCount = parseInt(guestMatch[1]);

    // Extract budget
    const budgetMatch = message.match(/₹?\s*(\d+(?:,\d+)*)/);
    if (budgetMatch) params.budget = budgetMatch[1].replace(/,/g, '');

    // Extract location
    const locationWords = ['mumbai', 'delhi', 'bangalore', 'pune', 'chennai', 'hyderabad'];
    for (const location of locationWords) {
      if (message.toLowerCase().includes(location)) {
        params.location = location;
        break;
      }
    }

    return params;
  }

  private async handleQuery(task: TaskRequest): Promise<AIResponse> {
    switch (task.category) {
      case 'booking':
        return this.handleBookingQuery(task);
      case 'venue_management':
        return this.handleVenueQuery(task);
      default:
        return this.handleGeneralQuery(task);
    }
  }

  private async handleAction(task: TaskRequest): Promise<AIResponse> {
    if (!this.userContext.userId && task.category !== 'user_support') {
      return {
        response: "I'd be happy to help you with that! However, you'll need to sign in first to perform this action.",
        requiresAuth: true
      };
    }

    switch (task.category) {
      case 'booking':
        return this.handleBookingAction(task);
      case 'venue_management':
        return this.handleVenueAction(task);
      default:
        return { response: "I'm not sure how to help with that specific action." };
    }
  }

  private async handleAdminCommand(task: TaskRequest): Promise<AIResponse> {
    if (this.userContext.userType !== 'admin') {
      return {
        response: "Sorry, I can only execute admin commands for authorized administrators.",
        requiresAuth: true
      };
    }

    switch (task.intent) {
      case 'generate_report':
        return {
          response: "I'll generate a comprehensive system report for you.",
          actions: [{
            type: 'generate_report',
            description: 'Generate system analytics report',
            data: { reportType: 'full_system', timeframe: '30_days' }
          }],
          needsConfirmation: true
        };

      case 'system_status':
        return {
          response: `**System Status Report:**
          
📊 **Current Metrics:**
• Active Users: 1,247
• Pending Venue Approvals: 8
• Today's Bookings: 23
• System Health: 98.5%

🔧 **Recent Activity:**
• 3 new venue registrations today
• 15 support tickets resolved
• Database performance: Optimal

⚠️ **Alerts:**
• 2 venues pending review for 48+ hours
• Server load at 72% (within normal range)`,
          actions: [{
            type: 'view_detailed_metrics',
            description: 'View detailed system metrics',
            data: {}
          }]
        };

      case 'approve_venue':
        return {
          response: "I can help you approve pending venues. Would you like me to show you the list of venues waiting for approval?",
          actions: [{
            type: 'list_pending_venues',
            description: 'Show pending venue approvals',
            data: {}
          }]
        };

      default:
        return { response: "I can help with admin tasks like generating reports, checking system status, managing users, and approving venues. What would you like me to do?" };
    }
  }

  private async handleBookingQuery(task: TaskRequest): Promise<AIResponse> {
    return {
      response: `I can help you find the perfect venue for your event! Based on your requirements:

🎯 **Booking Assistance Available:**
• Search venues by location and capacity
• Check real-time availability
• Compare pricing and amenities
• Get personalized recommendations

📋 **What I need to help you:**
• Event date and time
• Number of guests
• Preferred location
• Budget range
• Event type (birthday, wedding, corporate, etc.)

Would you like me to start searching for venues?`,
      actions: [{
        type: 'start_venue_search',
        description: 'Begin venue search process',
        data: task.parameters
      }]
    };
  }

  private async handleBookingAction(task: TaskRequest): Promise<AIResponse> {
    const { guestCount, budget, location } = task.parameters;
    
    return {
      response: `Perfect! I'll help you make a booking. Here's what I found based on your requirements:

📍 **Search Criteria:**
${guestCount ? `• Guests: ${guestCount} people` : ''}
${budget ? `• Budget: ₹${budget} per person` : ''}
${location ? `• Location: ${location}` : ''}

🏛️ **Recommended Venues:**
• **Royal Garden Palace** - Perfect for ${guestCount || 50}+ guests
• **Elite Banquet Hall** - Premium amenities within budget
• **Skyline Venue** - Modern facilities with city views

Would you like me to check availability for any of these venues?`,
      actions: [{
        type: 'check_availability',
        description: 'Check venue availability',
        data: task.parameters
      }, {
        type: 'get_venue_details',
        description: 'Get detailed venue information',
        data: {}
      }]
    };
  }

  private async handleVenueQuery(task: TaskRequest): Promise<AIResponse> {
    return {
      response: `As a venue owner, I can assist you with:

📊 **Analytics & Insights:**
• Booking trends and revenue analysis
• Customer feedback and ratings
• Performance comparisons
• Seasonal demand patterns

🎯 **Venue Management:**
• Update venue information and photos
• Manage pricing and availability
• Handle booking requests
• Monitor customer communications

📈 **Business Growth:**
• Marketing recommendations
• Pricing optimization
• Service improvements
• Customer retention strategies

What aspect of your venue management would you like help with?`
    };
  }

  private async handleVenueAction(task: TaskRequest): Promise<AIResponse> {
    switch (task.intent) {
      case 'manage_bookings':
        return {
          response: `📋 **Your Booking Dashboard:**

**Today's Bookings:** 3 confirmed, 1 pending
**This Week:** 12 total bookings
**Revenue:** ₹45,000 confirmed

**Pending Actions:**
• 2 new booking requests need response
• 1 customer message awaiting reply
• Availability update needed for next month

Would you like me to help you respond to pending requests?`,
          actions: [{
            type: 'view_pending_bookings',
            description: 'Show pending booking requests',
            data: {}
          }]
        };

      case 'view_analytics':
        return {
          response: `📊 **Your Venue Analytics:**

**This Month's Performance:**
• Bookings: 28 (+15% vs last month)
• Revenue: ₹1,85,000 (+22% growth)
• Average Rating: 4.7/5.0
• Occupancy Rate: 76%

**Top Performing Days:** Weekends (89% booking rate)
**Peak Hours:** 7-9 PM dinner reservations
**Popular Events:** Birthday parties (40%), Corporate (25%)

**Recommendations:**
• Consider weekend premium pricing
• Promote weekday corporate packages
• Enhance evening ambiance for dinner service`,
          actions: [{
            type: 'detailed_analytics',
            description: 'View detailed analytics report',
            data: {}
          }]
        };

      default:
        return { response: "I can help you manage your venue more effectively. What specific task would you like assistance with?" };
    }
  }

  private async handleGeneralQuery(task: TaskRequest): Promise<AIResponse> {
    return {
      response: `I'm here to help! I can assist you with:

🍽️ **For Diners:**
• Find and book restaurants
• Make reservations
• Discover new cuisines
• Get personalized recommendations

🎉 **For Event Planning:**
• Venue search and booking
• Event theme suggestions
• Budget planning
• Guest management

🏢 **For Venue Owners:**
• Manage bookings and availability
• View analytics and insights
• Update venue information
• Customer communication

What can I help you with today?`
    };
  }

  private async handleGeneral(message: string): Promise<AIResponse> {
    return {
      response: `I understand you're looking for assistance. I'm an advanced AI assistant that can help with various tasks on DineVibe:

💡 **I can help you:**
• Book venues and restaurants
• Plan events and celebrations
• Manage your venue business
• Get personalized recommendations
• Handle administrative tasks (for admins)

Could you tell me more specifically what you'd like to do? For example:
- "Book a venue for 50 people in Mumbai"
- "Show me my venue analytics"
- "Find Italian restaurants nearby"`
    };
  }
}
