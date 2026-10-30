"use client";

/** A classic arrow pointer, drawn in pixels. */
export function Pointer({ pressed }: { pressed: boolean }) {
  const rows = [
    "X...........",
    "XX..........",
    "XOX.........",
    "XOOX........",
    "XOOOX.......",
    "XOOOOX......",
    "XOOOOOX.....",
    "XOOOOOOX....",
    "XOOOOOOOX...",
    "XOOOOOOOOX..",
    "XOOOOOXXXXX.",
    "XOOXOOX.....",
    "XOX.XOOX....",
    "XX..XOOX....",
    "X....XOOX...",
    ".....XOOX...",
    "......XX....",
  ];
  return (
    <svg
      width={12 * 4}
      height={17 * 4}
      viewBox="0 0 12 17"
      shapeRendering="crispEdges"
      style={{
        transform: `scale(${pressed ? 0.88 : 1})`,
        transformOrigin: "0 0",
      }}
    >
      {rows.flatMap((row, y) =>
        Array.from(row).map((cell, x) =>
          cell === "." ? null : (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width={1}
              height={1}
              fill={cell === "X" ? "#0c0303" : "#fafafa"}
            />
          ),
        ),
      )}
    </svg>
  );
}
