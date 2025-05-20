-- Tables for OAuth support
CREATE TABLE IF NOT EXISTS oauth_users (
  id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier for the user',
  provider VARCHAR(50) NOT NULL COMMENT 'OAuth provider (e.g. google)',
  provider_id VARCHAR(255) NOT NULL COMMENT 'ID from the provider',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Record creation time'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='OAuth user information';

CREATE TABLE IF NOT EXISTS oauth_tokens (
  id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Token record identifier',
  user_id INT NOT NULL COMMENT 'Reference to oauth_users.id',
  access_token TEXT COMMENT 'OAuth access token',
  refresh_token TEXT COMMENT 'OAuth refresh token',
  expires_at DATETIME COMMENT 'Access token expiration time',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Record creation time',
  FOREIGN KEY (user_id) REFERENCES oauth_users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='OAuth tokens';
