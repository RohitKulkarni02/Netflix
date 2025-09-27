/**
 * Simple logging utility for debugging
 * Provides console.log wrappers for different log levels
 */

class Logger {
  constructor() {
    this.levels = {
      ERROR: 0,
      WARN: 1,
      INFO: 2,
      DEBUG: 3
    };
    
    this.currentLevel = this.levels.INFO; // Default to INFO level
  }

  /**
   * Set the current logging level
   * @param {string} level - The logging level (ERROR, WARN, INFO, DEBUG)
   */
  setLevel(level) {
    if (this.levels.hasOwnProperty(level)) {
      this.currentLevel = this.levels[level];
    }
  }

  /**
   * Format log message with timestamp and level
   * @param {string} level - The log level
   * @param {string} message - The message to log
   * @param {...any} args - Additional arguments
   * @returns {string} Formatted log message
   */
  formatMessage(level, message, ...args) {
    const timestamp = new Date().toISOString();
    const formattedArgs = args.length > 0 ? ' ' + args.map(arg => 
      typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
    ).join(' ') : '';
    
    return `[${timestamp}] [${level}] ${message}${formattedArgs}`;
  }

  /**
   * Log error messages
   * @param {string} message - The error message
   * @param {...any} args - Additional arguments
   */
  error(message, ...args) {
    if (this.currentLevel >= this.levels.ERROR) {
      console.error(this.formatMessage('ERROR', message, ...args));
    }
  }

  /**
   * Log warning messages
   * @param {string} message - The warning message
   * @param {...any} args - Additional arguments
   */
  warn(message, ...args) {
    if (this.currentLevel >= this.levels.WARN) {
      console.warn(this.formatMessage('WARN', message, ...args));
    }
  }

  /**
   * Log info messages
   * @param {string} message - The info message
   * @param {...any} args - Additional arguments
   */
  info(message, ...args) {
    if (this.currentLevel >= this.levels.INFO) {
      console.log(this.formatMessage('INFO', message, ...args));
    }
  }

  /**
   * Log debug messages
   * @param {string} message - The debug message
   * @param {...any} args - Additional arguments
   */
  debug(message, ...args) {
    if (this.currentLevel >= this.levels.DEBUG) {
      console.log(this.formatMessage('DEBUG', message, ...args));
    }
  }

  /**
   * Log any message (always logs regardless of level)
   * @param {string} message - The message to log
   * @param {...any} args - Additional arguments
   */
  log(message, ...args) {
    console.log(this.formatMessage('LOG', message, ...args));
  }
}

// Create and export a default logger instance
const logger = new Logger();

// Export both the class and the instance
module.exports = {
  Logger,
  logger
};

// Also export the logger instance as default
module.exports.default = logger;