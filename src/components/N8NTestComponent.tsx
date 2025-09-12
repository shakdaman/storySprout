import React, { useState } from 'react';
import { Play, Database, BarChart3, RefreshCw } from 'lucide-react';
import { N8NDatabaseService } from '../services/n8nDatabase';
import { seedN8NDatabase, testN8NDatabase } from '../utils/n8nTestData';
import type { N8NStoryData, N8NCollectionStats } from '../types';

const N8NTestComponent: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [stats, setStats] = useState<N8NCollectionStats | null>(null);

  const addResult = (message: string) => {
    setResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const handleSeedDatabase = async () => {
    setLoading(true);
    setResults([]);
    addResult('🌱 Starting database seeding...');
    
    try {
      await seedN8NDatabase();
      addResult('✅ Database seeded successfully!');
      await loadStats();
    } catch (error) {
      addResult(`❌ Error seeding database: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleTestDatabase = async () => {
    setLoading(true);
    setResults([]);
    addResult('🧪 Starting database tests...');
    
    try {
      // Override console.log to capture test output
      const originalLog = console.log;
      console.log = (...args) => {
        addResult(args.join(' '));
        originalLog(...args);
      };
      
      await testN8NDatabase();
      
      // Restore original console.log
      console.log = originalLog;
      
      await loadStats();
    } catch (error) {
      addResult(`❌ Error testing database: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const result = await N8NDatabaseService.getCollectionStats();
      if (result.success && result.data) {
        setStats(result.data);
        addResult('📊 Collection stats loaded');
      }
    } catch (error) {
      addResult(`❌ Error loading stats: ${error}`);
    }
  };

  const handleLoadStats = async () => {
    setLoading(true);
    await loadStats();
    setLoading(false);
  };

  const clearResults = () => {
    setResults([]);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center mb-6">
        <Database className="h-8 w-8 text-blue-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900">N8N Database Test Panel</h2>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <button
          onClick={handleSeedDatabase}
          disabled={loading}
          className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Database className="h-5 w-5 mr-2" />
          Seed Database
        </button>

        <button
          onClick={handleTestDatabase}
          disabled={loading}
          className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Play className="h-5 w-5 mr-2" />
          Run Tests
        </button>

        <button
          onClick={handleLoadStats}
          disabled={loading}
          className="flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <BarChart3 className="h-5 w-5 mr-2" />
          Load Stats
        </button>
      </div>

      {/* Collection Statistics */}
      {stats && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Collection Statistics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.totalStories}</div>
              <div className="text-sm text-gray-600">Total Stories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.pendingStories}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.sentStories}</div>
              <div className="text-sm text-gray-600">Sent</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{stats.failedStories}</div>
              <div className="text-sm text-gray-600">Failed</div>
            </div>
          </div>
        </div>
      )}

      {/* Results Log */}
      <div className="bg-gray-900 text-green-400 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Test Results</h3>
          <button
            onClick={clearResults}
            className="flex items-center text-sm text-gray-400 hover:text-white transition-colors"
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            Clear
          </button>
        </div>
        <div className="h-64 overflow-y-auto font-mono text-sm">
          {results.length === 0 ? (
            <div className="text-gray-500 italic">No results yet. Click a button above to start testing.</div>
          ) : (
            results.map((result, index) => (
              <div key={index} className="mb-1">
                {result}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Processing...</span>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">How to use this test panel:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li><strong>Seed Database:</strong> Populates the database with sample n8n story data</li>
          <li><strong>Run Tests:</strong> Tests all database operations (create, read, update, delete)</li>
          <li><strong>Load Stats:</strong> Shows current collection statistics</li>
        </ul>
        <p className="text-sm text-blue-700 mt-2">
          This component demonstrates the complete n8n database integration with unique IDs, 
          batch operations, and comprehensive data management.
        </p>
      </div>
    </div>
  );
};

export default N8NTestComponent;
