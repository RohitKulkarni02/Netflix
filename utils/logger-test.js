/**
 * Test file to demonstrate the logger utility
 * This file can be deleted after testing
 */

const { logger } = require('./logger.js');

console.log('=== Logger Utility Test ===\n');

// Test different log levels
logger.info('Logger utility initialized successfully');
logger.debug('This is a debug message');
logger.warn('This is a warning message');
logger.error('This is an error message');

// Test with additional arguments
logger.info('User data:', { name: 'John Doe', age: 30, email: 'john@example.com' });
logger.error('Database connection failed:', { error: 'Connection timeout', code: 'DB_TIMEOUT' });

// Test log level filtering
console.log('\n=== Testing Log Level Filtering ===');
logger.setLevel('WARN');
logger.info('This info message should not appear');
logger.warn('This warning should appear');
logger.error('This error should appear');

// Reset to INFO level
logger.setLevel('INFO');
console.log('\n=== Logger Test Complete ===');