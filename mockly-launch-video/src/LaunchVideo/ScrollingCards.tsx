import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { SocialCard } from "../components/SocialCard";
import { COLORS, HEADLINES, BODIES, getCatImageUrl } from "../constants";

// Generate 20 unique cards
const generateCards = () => {
  const cards = [];
  for (let i = 0; i < 20; i++) {
    cards.push({
      id: i,
      color: COLORS[i % COLORS.length],
      headline: HEADLINES[i % HEADLINES.length],
      body: BODIES[i % BODIES.length],
      imageUrl: getCatImageUrl(i + 1),
    });
  }
  return cards;
};

const CARDS = generateCards();

interface ScrollingRowProps {
  cards: typeof CARDS;
  direction: "left" | "right";
  rowWidth: number;
  y: number;
  speed: number;
}

const ScrollingRow: React.FC<ScrollingRowProps> = ({
  cards,
  direction,
  rowWidth,
  y,
  speed
}) => {
  const frame = useCurrentFrame();

  // Calculate scroll offset based on direction
  const scrollAmount = frame * speed;
  const offset = direction === "right"
    ? scrollAmount % rowWidth
    : -scrollAmount % rowWidth;

  return (
    <div
      style={{
        position: "absolute",
        top: y,
        left: -rowWidth,
        width: rowWidth * 3,
        display: "flex",
        gap: 16,
        transform: `translateX(${offset}px)`,
      }}
    >
      {/* Repeat cards 3 times for seamless loop */}
      {[...cards, ...cards, ...cards].map((card, index) => (
        <SocialCard
          key={`${card.id}-${index}`}
          name="Mockly"
          handle="@mockly.app"
          headline={card.headline}
          body={card.body}
          bgColor={card.color.bg}
          nameColor={card.color.text}
          handleColor={card.color.handle}
          headlineColor={card.color.text}
          bodyColor={card.color.text}
          showImage={true}
          imageUrl={card.imageUrl}
          width={180}
          animated={false}
          scale={0.6}
        />
      ))}
    </div>
  );
};

export const ScrollingCards: React.FC = () => {
  const frame = useCurrentFrame();

  // Split cards into 4 rows
  const row1 = CARDS.slice(0, 5);
  const row2 = CARDS.slice(5, 10);
  const row3 = CARDS.slice(10, 15);
  const row4 = CARDS.slice(15, 20);

  // Calculate row width (5 cards * card width + gaps)
  const cardWidth = 180 * 0.6; // scaled width
  const gap = 16;
  const rowWidth = (cardWidth + gap) * 5;

  // Speed for scrolling (pixels per frame)
  const speed = 2;

  // Vertical positions for 4 rows
  const rowHeight = 200;
  const startY = 100;

  // Blur for CTA overlay
  const showBlur = frame >= 120; // Local frame 120 = global frame 480

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#1e1e1e",
        overflow: "hidden",
        filter: showBlur ? "blur(8px)" : "none",
      }}
    >
      {/* Row 1 - scrolling right */}
      <ScrollingRow
        cards={row1}
        direction="right"
        rowWidth={rowWidth}
        y={startY}
        speed={speed}
      />

      {/* Row 2 - scrolling left */}
      <ScrollingRow
        cards={row2}
        direction="left"
        rowWidth={rowWidth}
        y={startY + rowHeight}
        speed={speed}
      />

      {/* Row 3 - scrolling right */}
      <ScrollingRow
        cards={row3}
        direction="right"
        rowWidth={rowWidth}
        y={startY + rowHeight * 2}
        speed={speed}
      />

      {/* Row 4 - scrolling left */}
      <ScrollingRow
        cards={row4}
        direction="left"
        rowWidth={rowWidth}
        y={startY + rowHeight * 3}
        speed={speed}
      />
    </AbsoluteFill>
  );
};
