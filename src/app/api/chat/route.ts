import { NextRequest, NextResponse } from 'next/server';

// Response types
interface ChatResponse {
  response: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
  followUp?: string[];
  category?: string;
}

interface ErrorResponse {
  error: string;
  code?: string;
}

// Categories and decades
const VINTAGE_CATEGORIES = [
  'dresses', 'tops', 'blouses', 'skirts', 'pants', 'jeans',
  'jackets', 'coats', 'shoes', 'boots', 'accessories', 'jewelry',
  'hats', 'bags', 'purses'
];

const DECADES = [
  '50s', '60s', '70s', '80s', '90s',
  'fifties', 'sixties', 'seventies', 'eighties', 'nineties'
];

// Main handler
export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q');

  if (!query) {
    return NextResponse.json(
      { error: 'Invalid query parameter', code: 'INVALID_QUERY' } as ErrorResponse,
      { status: 400 }
    );
  }

  // Simulate typing delay
  const responseDelay = Math.floor(Math.random() * 800) + 700;
  await new Promise(resolve => setTimeout(resolve, responseDelay));

  try {
    // Controlled error simulation
    if (Math.random() < 0.05 || query.toLowerCase() === 'error') {
      throw new Error('Something went wrong with our system. Please try again.');
    }

    const response = generateResponse(query.toLowerCase());
    return NextResponse.json(response);
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Something went wrong',
        code: 'SERVER_ERROR'
      } as ErrorResponse,
      { status: 500 }
    );
  }
}

// ----------------- Logic Layer ------------------

function generateResponse(query: string): ChatResponse {
  const intent = detectIntent(query);
  const category = detectCategory(query);
  const decade = detectDecade(query);

  switch (intent) {
    case 'greeting':
      return respondToGreeting();
    case 'identity':
      return respondToIdentity();
    case 'help':
      return respondToHelp();
    case 'about':
      return respondToAbout();
    case 'category':
      return respondToCategory(category);
    case 'decade':
      return respondToDecade(decade);
    case 'size':
      return respondToSize();
    case 'order':
      return respondToOrder();
    case 'return':
      return respondToReturn();
    case 'styling':
      return respondToStyling();
    case 'contact':
      return respondToContact();
    default:
      return respondToUnknown();
  }
}

// ----------------- Intent Detection ------------------

function detectIntent(query: string): string {
  if (hasAnyWord(query, ['hello', 'hi', 'hey', 'greetings'])) return 'greeting';
  if (hasAnyWord(query, ['who are you', 'what are you', 'your name', 'chatbot', 'bot'])) return 'identity';
  if (hasAnyWord(query, ['help', 'assist', 'support', 'guidance'])) return 'help';
  if (hasAnyWord(query, ['about', 'store', 'shop', 'location', 'history'])) return 'about';
  if (detectCategory(query)) return 'category';
  if (detectDecade(query)) return 'decade';
  if (hasAnyWord(query, ['size', 'sizing', 'fit', 'measurement', 'measurements'])) return 'size';
  if (hasAnyWord(query, ['order', 'purchase', 'shipping', 'delivery', 'tracking'])) return 'order';
  if (hasAnyWord(query, ['return', 'exchange', 'refund', 'policy'])) return 'return';
  if (hasAnyWord(query, ['style', 'styling', 'outfit', 'wear', 'match', 'combination'])) return 'styling';
  if (hasAnyWord(query, ['contact', 'email','mail', 'address','phone', 'call', 'human'])) return 'contact';
  return 'unknown';
}

function detectCategory(query: string): string | null {
  return VINTAGE_CATEGORIES.find(cat => query.includes(cat) || isFuzzyMatch(query, cat)) || null;
}

function detectDecade(query: string): string | null {
  return DECADES.find(dec => query.includes(dec) || isFuzzyMatch(query, dec)) || null;
}

// ----------------- Response Generators ------------------

function respondToGreeting(): ChatResponse {
  return {
    response: 'Hello! Welcome to Lost Girls Vintage. How can I help you find your perfect vintage piece today?',
    sentiment: 'positive',
    followUp: ['Browse collections', 'Find my size', 'Style consultation']
  };
}

function respondToIdentity(): ChatResponse {
  return {
    response: "I'm the virtual assistant for Lost Girls Vintage. I can help you discover unique vintage clothing, answer questions, or assist with sizing and availability.",
    sentiment: 'positive',
    followUp: ['How do you work?', 'Tell me about Lost Girls Vintage', 'What years do you cover?']
  };
}

function respondToHelp(): ChatResponse {
  return {
    response: 'I can help with finding vintage pieces, sizing, shipping policies, or connecting you to support. What would you like assistance with?',
    sentiment: 'positive',
    followUp: ['Find clothing', 'Size help', 'Shipping info', 'Talk to a person']
  };
}

function respondToAbout(): ChatResponse {
  return {
    response: 'Lost Girls Vintage is a curated vintage shop specializing in authentic pieces from the 1950s to the 1990s. We’re based in Chicago and serve customers worldwide!',
    sentiment: 'positive',
    followUp: ['Store hours', 'Visit location', 'Shopping policies']
  };
}

function respondToCategory(category: string | null): ChatResponse {
  if (!category) return respondToUnknown();
  return {
    response: `Our vintage ${category} collection features handpicked items from different decades. Would you like to see featured ${category} or browse by era?`,
    sentiment: 'positive',
    followUp: [`Featured ${category}`, 'Browse by decade', `See all ${category}`],
    category
  };
}

function respondToDecade(decade: string | null): ChatResponse {
  if (!decade) return respondToUnknown();
  return {
    response: `Our ${decade} collection includes authentic vintage pieces capturing the style of that era. Would you like to see what's currently available?`,
    sentiment: 'positive',
    followUp: [`Shop ${decade} pieces`, 'Learn about the era', 'See styling ideas'],
    category: decade
  };
}

function respondToSize(): ChatResponse {
  return {
    response: 'Vintage sizing can differ from modern fits. We recommend checking each item’s measurements. Would you like help measuring or info on returns?',
    sentiment: 'neutral',
    followUp: ['Measuring guide', 'Size conversion chart', 'Return policy']
  };
}

function respondToOrder(): ChatResponse {
  return {
    response: 'Orders ship within 1-3 business days with tracking. International delivery takes 7–14 days. Need help with an order?',
    sentiment: 'neutral',
    followUp: ['Shipping policies', 'Track my order', 'Return policy']
  };
}

function respondToReturn(): ChatResponse {
  return {
    response: 'Returns are accepted within 14 days for store credit. Items must be in original condition. We describe any flaws so you can shop confidently.',
    sentiment: 'neutral',
    followUp: ['Return process', 'Exchange options', 'Contact support']
  };
}

function respondToStyling(): ChatResponse {
  return {
    response: 'You can style vintage pieces in many ways! Mix eras or pair with modern outfits. Want suggestions?',
    sentiment: 'positive',
    followUp: ['Styling tips', 'See outfit ideas', 'Book a style consultation']
  };
}

function respondToContact(): ChatResponse {
  return {
    response: 'Reach us at hello@lostgirlsvintage.com or (555) 123-4567 (Mon-Fri, 10am-6pm CT). Need to speak with someone?',
    sentiment: 'neutral',
    followUp: ['Email the team', 'Call the store','address', 'Continue chatting']
  };
}

function respondToUnknown(): ChatResponse {
  return {
    response: "That's an interesting question about vintage fashion! Tell me more—what styles or eras are you drawn to?",
    sentiment: 'neutral',
    followUp: ['Browse collections', 'Style quiz', 'Popular items']
  };
}

// ----------------- Utility Functions ------------------

function hasAnyWord(query: string, words: string[]): boolean {
  return words.some(word => query.includes(word));
}

function isFuzzyMatch(query: string, target: string, threshold = 2): boolean {
  return levenshtein(query, target) <= threshold;
}

function levenshtein(a: string, b: string): number {
  const matrix: number[][] = [];

  const al = a.length, bl = b.length;
  if (al === 0) return bl;
  if (bl === 0) return al;

  for (let i = 0; i <= bl; i++) matrix[i] = [i];
  for (let j = 0; j <= al; j++) matrix[0][j] = j;

  for (let i = 1; i <= bl; i++) {
    for (let j = 1; j <= al; j++) {
      const cost = a[j - 1] === b[i - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  return matrix[bl][al];
}
