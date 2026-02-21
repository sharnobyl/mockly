// Color palette for card variations
export const COLORS = [
  { bg: '#000000', text: '#ffffff', handle: '#999999', name: 'Black' },
  { bg: '#ffffff', text: '#1a1a1a', handle: '#666666', name: 'White' },
  { bg: '#eae4d3', text: '#2d2d2d', handle: '#666666', name: 'Beige' },
  { bg: '#2d49b9', text: '#ffffff', handle: '#b8c9e8', name: 'Blue' },
  { bg: '#c94a4a', text: '#ffffff', handle: '#e8b8b8', name: 'Red' },
  { bg: '#4a4a4a', text: '#ffffff', handle: '#999999', name: 'Grey' },
  { bg: '#7d8c69', text: '#ffffff', handle: '#c5cdb8', name: 'Sage' },
  { bg: '#1a1a2e', text: '#ffffff', handle: '#8c8c9e', name: 'Dark Blue' },
  { bg: '#f5e6d3', text: '#3d3d3d', handle: '#7a7a7a', name: 'Cream' },
  { bg: '#2d8c6e', text: '#ffffff', handle: '#a8d4c5', name: 'Teal' },
];

// Font families for cycling
export const FONTS = [
  "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
  "Georgia, serif",
  "'Syne', sans-serif",
  "'Courier New', monospace",
];

// Sample headlines for scrolling cards
export const HEADLINES = [
  "Create beautiful social cards",
  "Share your story",
  "Make an impression",
  "Stand out online",
  "Design made simple",
  "Cards in seconds",
  "Your brand, your way",
  "Perfect for creators",
  "Social media ready",
  "Professional results",
  "Quick and easy",
  "Stunning visuals",
  "Boost engagement",
  "Share everywhere",
  "Make it yours",
  "Create with ease",
  "Beautiful designs",
  "Simple. Fast. Free.",
  "Your content, elevated",
  "Design without limits",
];

// Sample body text for scrolling cards
export const BODIES = [
  "Design stunning cards in seconds.",
  "Perfect for social media.",
  "No design skills needed.",
  "Export to any platform.",
  "Customize everything.",
  "Free and easy to use.",
  "Professional results.",
  "Share your content beautifully.",
  "Make your posts pop.",
  "The fastest way to create.",
];

// Cat image URLs (using cataas.com)
export const getCatImageUrl = (id: number): string =>
  `https://cataas.com/cat?width=400&height=225&random=${id}`;
