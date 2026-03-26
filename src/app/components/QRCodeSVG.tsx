import { useMemo } from 'react';

function generateQRGrid(): number[][] {
  const grid: number[][] = Array(21).fill(null).map(() => Array(21).fill(0));

  const addFinder = (sr: number, sc: number) => {
    for (let r = 0; r <= 6; r++) {
      for (let c = 0; c <= 6; c++) {
        grid[sr + r][sc + c] =
          r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4)
            ? 1
            : 0;
      }
    }
  };

  addFinder(0, 0);
  addFinder(0, 14);
  addFinder(14, 0);

  // Timing patterns
  for (let i = 8; i <= 12; i++) {
    grid[6][i] = i % 2 === 0 ? 1 : 0;
    grid[i][6] = i % 2 === 0 ? 1 : 0;
  }

  // Pseudo-random data
  let seed = 0x5a3c9f12;
  const rand = () => {
    seed ^= seed << 13;
    seed ^= seed >> 17;
    seed ^= seed << 5;
    return Math.abs(seed) % 2;
  };

  for (let r = 0; r < 21; r++) {
    for (let c = 0; c < 21; c++) {
      const inTL = r <= 7 && c <= 7;
      const inTR = r <= 7 && c >= 13;
      const inBL = r >= 13 && c <= 7;
      const inTiming = r === 6 || c === 6;
      if (!inTL && !inTR && !inBL && !inTiming) {
        grid[r][c] = rand();
      }
    }
  }

  return grid;
}

interface QRCodeSVGProps {
  size?: number;
  darkColor?: string;
  lightColor?: string;
  padding?: number;
}

export function QRCodeSVG({
  size = 200,
  darkColor = '#0F172A',
  lightColor = '#FFFFFF',
  padding = 10,
}: QRCodeSVGProps) {
  const grid = useMemo(() => generateQRGrid(), []);
  const cellSize = (size - padding * 2) / 21;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <rect width={size} height={size} fill={lightColor} rx={6} />
      {grid.map((row, r) =>
        row.map((cell, c) =>
          cell === 1 ? (
            <rect
              key={`${r}-${c}`}
              x={padding + c * cellSize}
              y={padding + r * cellSize}
              width={cellSize - 0.5}
              height={cellSize - 0.5}
              fill={darkColor}
              rx={0.5}
            />
          ) : null
        )
      )}
    </svg>
  );
}
