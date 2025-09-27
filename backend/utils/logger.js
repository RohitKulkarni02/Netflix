/**
 * Simple logging utility for debugging
 * Provides console.log wrappers for different log levels
 */

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

/**
 * Get current timestamp for logging
 */
const getTimestamp = () => {
  return new Date().toISOString();
};

/**
 * Format log message with timestamp and level
 */
const formatMessage = (level, message, ...args) => {
  const timestamp = getTimestamp();
  return `[${timestamp}] [${level}] ${message}`;
};

/**
 * Log info messages
 */
const info = (message, ...args) => {
  const formattedMessage = formatMessage('INFO', message);
  console.log(`${colors.blue}${formattedMessage}${colors.reset}`, ...args);
};

/**
 * Log error messages
 */
const error = (message, ...args) => {
  const formattedMessage = formatMessage('ERROR', message);
  console.error(`${colors.red}${formattedMessage}${colors.reset}`, ...args);
};

/**
 * Log warning messages
 */
const warn = (message, ...args) => {
  const formattedMessage = formatMessage('WARN', message);
  console.warn(`${colors.yellow}${formattedMessage}${colors.reset}`, ...args);
};

/**
 * Log debug messages
 */
const debug = (message, ...args) => {
  const formattedMessage = formatMessage('DEBUG', message);
  console.log(`${colors.cyan}${formattedMessage}${colors.reset}`, ...args);
};

/**
 * Log success messages
 */
const success = (message, ...args) => {
  const formattedMessage = formatMessage('SUCCESS', message);
  console.log(`${colors.green}${formattedMessage}${colors.reset}`, ...args);
};

/**
 * Log messages without any formatting (plain console.log)
 */
const log = (message, ...args) => {
  console.log(message, ...args);
};

module.exports = {
  info,
  error,
  warn,
  debug,
  success,
  log
};