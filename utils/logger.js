/**
 * Simple logging utility for debugging
 * Provides console.log wrappers for different log levels
 */

class Logger {
  constructor() {
    this.logLevel = process.env.LOG_LEVEL || 'info';
    this.levels = {
      error: 0,
      warn: 1,
      info: 2,
      debug: 3
    };
  }

  /**
   * Check if the given level should be logged
   * @param {string} level - The log level to check
   * @returns {boolean} - Whether the level should be logged
   */
  shouldLog(level) {
    return this.levels[level] <= this.levels[this.logLevel];
  }

  /**
   * Format the log message with timestamp and level
   * @param {string} level - The log level
   * @param {string} message - The message to log
   * @param {...any} args - Additional arguments
   * @returns {string} - Formatted log message
   */
  formatMessage(level, message, ...args) {
    const timestamp = new Date().toISOString();
    const levelUpper = level.toUpperCase().padEnd(5);
    return `[${timestamp}] ${levelUpper} ${message}`;
  }

  /**
   * Log an error message
   * @param {string} message - The error message
   * @param {...any} args - Additional arguments
   */
  error(message, ...args) {
    if (this.shouldLog('error')) {
      console.error(this.formatMessage('error', message), ...args);
    }
  }

  /**
   * Log a warning message
   * @param {string} message - The warning message
   * @param {...any} args - Additional arguments
   */
  warn(message, ...args) {
    if (this.shouldLog('warn')) {
      console.warn(this.formatMessage('warn', message), ...args);
    }
  }

  /**
   * Log an info message
   * @param {string} message - The info message
   * @param {...any} args - Additional arguments
   */
  info(message, ...args) {
    if (this.shouldLog('info')) {
      console.log(this.formatMessage('info', message), ...args);
    }
  }

  /**
   * Log a debug message
   * @param {string} message - The debug message
   * @param {...any} args - Additional arguments
   */
  debug(message, ...args) {
    if (this.shouldLog('debug')) {
      console.log(this.formatMessage('debug', message), ...args);
    }
  }

  /**
   * Set the log level
   * @param {string} level - The new log level (error, warn, info, debug)
   */
  setLevel(level) {
    if (this.levels.hasOwnProperty(level)) {
      this.logLevel = level;
    } else {
      this.warn(`Invalid log level: ${level}. Valid levels are: ${Object.keys(this.levels).join(', ')}`);
    }
  }

  /**
   * Get the current log level
   * @returns {string} - The current log level
   */
  getLevel() {
    return this.logLevel;
  }
}

// Create a singleton instance
const logger = new Logger();

// Export both the class and the instance
module.exports = {
  Logger,
  logger
};

// Also export the logger instance as default
module.exports.default = logger;