"use client"

import { useState } from 'react';

const tables = [
  // Bar tables
  { id: 'B1', x: 220, y: 50, seats: 2, shape: 'round' },
  { id: 'B2', x: 290, y: 50, seats: 2, shape: 'round' },

  // Main dining area
  { id: 'T1', x: 50, y: 150, seats: 4, shape: 'square' },
  { id: 'T2', x: 150, y: 150, seats: 4, shape: 'square' },
  { id: 'T3', x: 250, y: 150, seats: 4, shape: 'square' },
  { id: 'T4', x: 350, y: 150, seats: 4, shape: 'square' },

  // Booths
  { id: 'C1', x: 50, y: 250, seats: 6, shape: 'rect' },
  { id: 'C2', x: 200, y: 250, seats: 6, shape: 'rect' },

  // Patio
  { id: 'P1', x: 450, y: 150, seats: 2, shape: 'round' },
  { id: 'P2', x: 520, y: 150, seats: 2, shape: 'round' },
];

const Table = ({ table, selectedTable, handleTableClick }) => (
  <g key={table.id} onClick={() => handleTableClick(table.id)} className="cursor-pointer group">
    <rect
      x={table.x}
      y={table.y}
      width={table.shape === 'rect' ? 100 : 50}
      height={50}
      rx={8}
      className={`${selectedTable === table.id ? 'fill-primary' : 'fill-gray-300'} group-hover:fill-primary/80 transition-colors`}
    />
    <text
      x={table.x + (table.shape === 'rect' ? 50 : 25)}
      y={table.y + 30}
      textAnchor="middle"
      className="fill-white font-bold text-sm"
    >
      {table.id}
    </text>
  </g>
);

const RoundTable = ({ table, selectedTable, handleTableClick }) => (
  <g key={table.id} onClick={() => handleTableClick(table.id)} className="cursor-pointer group">
    <circle
      cx={table.x + 25}
      cy={table.y + 25}
      r={25}
      className={`${selectedTable === table.id ? 'fill-primary' : 'fill-gray-300'} group-hover:fill-primary/80 transition-colors`}
    />
    <text
      x={table.x + 25}
      y={table.y + 30}
      textAnchor="middle"
      className="fill-white font-bold text-sm"
    >
      {table.id}
    </text>
  </g>
);

export default function RestaurantMap({ onTableSelect }: { onTableSelect: (tableId: string) => void }) {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  const handleTableClick = (tableId: string) => {
    setSelectedTable(tableId);
    onTableSelect(tableId);
  };

  return (
    <div className="relative w-full h-[400px] bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
      <svg className="w-full h-full">
        {/* Walls */}
        <rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" className="fill-none stroke-gray-200 stroke-1" />

        {/* Bar */}
        <rect x="20" y="20" width="180" height="80" rx="8" className="fill-gray-100" />
        <text x="110" y="65" textAnchor="middle" className="font-semibold text-sm text-gray-500">BAR</text>

        {/* Entrance */}
        <rect x="250" y="380" width="100" height="20" className="fill-gray-100" />
        <text x="300" y="395" textAnchor="middle" className="font-semibold text-xs text-gray-500">ENTRÉE</text>

        {/* Patio */}
        <rect x="430" y="20" width="150" height="200" rx="8" className="fill-green-50" />
        <text x="505" y="120" textAnchor="middle" className="font-semibold text-sm text-green-700">PATIO</text>

        {/* Labels */}
        <text x="30" y="350" textAnchor="middle" className="font-semibold text-sm text-gray-500">WC</text>
        <text x="380" y="350" textAnchor="middle" className="font-semibold text-sm text-gray-500">SORTIE</text>

        {
          tables.map(table => {
            if (table.shape === 'round') {
              return <RoundTable key={table.id} table={table} selectedTable={selectedTable} handleTableClick={handleTableClick} />
            }
            return <Table key={table.id} table={table} selectedTable={selectedTable} handleTableClick={handleTableClick} />
          })
        }
      </svg>
    </div>
  );
}
