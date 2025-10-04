const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Swagger Javascript Express Node MongoDB',
      version: '1.0.0',
      description: 'A comprehensive API for user management with JWT authentication, CRUD operations, and MongoDB integration.',
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:5050',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT token'
        }
      },
      schemas: {
        User: {
          type: 'object',
          required: ['firstName', 'lastName', 'userName', 'email', 'phone', 'password', 'gender', 'dob'],
          properties: {
            _id: {
              type: 'string',
              description: 'User ID',
              example: '507f1f77bcf86cd799439011'
            },
            firstName: {
              type: 'string',
              description: 'User first name',
              example: 'John'
            },
            lastName: {
              type: 'string',
              description: 'User last name',
              example: 'Doe'
            },
            userName: {
              type: 'string',
              description: 'Unique username',
              example: 'johndoe'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
              example: 'john@example.com'
            },
            phone: {
              type: 'string',
              description: 'User phone number',
              example: '9876543210'
            },
            gender: {
              type: 'string',
              enum: ['Male', 'Female', 'Other'],
              description: 'User gender',
              example: 'Male'
            },
            dob: {
              type: 'string',
              description: 'Date of birth in MM-DD-YYYY format',
              example: '10-01-1995'
            },
            role: {
              type: 'string',
              enum: ['user', 'admin'],
              description: 'User role',
              example: 'user'
            },
            isActive: {
              type: 'boolean',
              description: 'User account status',
              example: true
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'User creation timestamp'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'User last update timestamp'
            }
          }
        },
        UserInput: {
          type: 'object',
          required: ['firstName', 'lastName', 'userName', 'email', 'phone', 'password', 'gender', 'dob'],
          properties: {
            firstName: {
              type: 'string',
              description: 'User first name',
              example: 'John'
            },
            lastName: {
              type: 'string',
              description: 'User last name',
              example: 'Doe'
            },
            userName: {
              type: 'string',
              description: 'Unique username',
              example: 'johndoe'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
              example: 'john@example.com'
            },
            phone: {
              type: 'string',
              description: 'User phone number (10 digits)',
              example: '9876543210'
            },
            password: {
              type: 'string',
              minLength: 6,
              description: 'User password (minimum 6 characters)',
              example: 'password123'
            },
            gender: {
              type: 'string',
              enum: ['Male', 'Female', 'Other'],
              description: 'User gender',
              example: 'Male'
            },
            dob: {
              type: 'string',
              description: 'Date of birth in MM-DD-YYYY format',
              example: '10-01-1995'
            }
          }
        },
        LoginInput: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
              example: 'john@example.com'
            },
            password: {
              type: 'string',
              description: 'User password',
              example: 'password123'
            }
          }
        },
        AuthResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            message: {
              type: 'string',
              example: 'Login successful'
            },
            data: {
              type: 'object',
              properties: {
                user: {
                  $ref: '#/components/schemas/User'
                },
                token: {
                  type: 'string',
                  description: 'JWT token',
                  example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                }
              }
            }
          }
        },
        UserResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            message: {
              type: 'string',
              example: 'User retrieved successfully'
            },
            data: {
              $ref: '#/components/schemas/User'
            }
          }
        },
        UsersResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            count: {
              type: 'integer',
              example: 5
            },
            data: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/User'
              }
            }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            message: {
              type: 'string',
              example: 'Error message'
            },
            error: {
              type: 'string',
              example: 'Detailed error information'
            }
          }
        },
        UpdateUserInput: {
          type: 'object',
          properties: {
            firstName: {
              type: 'string',
              description: 'User first name',
              example: 'John'
            },
            lastName: {
              type: 'string',
              description: 'User last name',
              example: 'Updated'
            },
            userName: {
              type: 'string',
              description: 'Unique username',
              example: 'johnupdated'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
              example: 'john.updated@example.com'
            },
            phone: {
              type: 'string',
              description: 'User phone number (10 digits)',
              example: '9876543210'
            },
            gender: {
              type: 'string',
              enum: ['Male', 'Female', 'Other'],
              description: 'User gender',
              example: 'Male'
            },
            dob: {
              type: 'string',
              description: 'Date of birth in MM-DD-YYYY format',
              example: '10-01-1995'
            },
            role: {
              type: 'string',
              enum: ['user', 'admin'],
              description: 'User role (admin only)',
              example: 'user'
            },
            isActive: {
              type: 'boolean',
              description: 'User account status (admin only)',
              example: true
            }
          }
        },
        UpdateProfileInput: {
          type: 'object',
          properties: {
            firstName: {
              type: 'string',
              description: 'User first name',
              example: 'John'
            },
            lastName: {
              type: 'string',
              description: 'User last name',
              example: 'Updated'
            },
            userName: {
              type: 'string',
              description: 'Unique username',
              example: 'johnupdated'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
              example: 'john.updated@example.com'
            },
            phone: {
              type: 'string',
              description: 'User phone number (10 digits)',
              example: '9876543210'
            },
            gender: {
              type: 'string',
              enum: ['Male', 'Female', 'Other'],
              description: 'User gender',
              example: 'Male'
            },
            dob: {
              type: 'string',
              description: 'Date of birth in MM-DD-YYYY format',
              example: '10-01-1995'
            }
          }
        },
        Session: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Session ID',
              example: '507f1f77bcf86cd799439011'
            },
            user: {
              type: 'string',
              description: 'User ID',
              example: '507f1f77bcf86cd799439012'
            },
            sessionId: {
              type: 'string',
              description: 'Unique session identifier',
              example: 'sess_1234567890_abc123def'
            },
            token: {
              type: 'string',
              description: 'JWT token',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
            },
            loginTime: {
              type: 'string',
              format: 'date-time',
              description: 'Login timestamp'
            },
            logoutTime: {
              type: 'string',
              format: 'date-time',
              description: 'Logout timestamp',
              nullable: true
            },
            isActive: {
              type: 'boolean',
              description: 'Session active status',
              example: true
            },
            ipAddress: {
              type: 'string',
              description: 'Client IP address',
              example: '192.168.1.100'
            },
            userAgent: {
              type: 'string',
              description: 'Client user agent',
              example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            deviceInfo: {
              type: 'object',
              properties: {
                type: {
                  type: 'string',
                  enum: ['desktop', 'mobile', 'tablet', 'unknown'],
                  example: 'desktop'
                },
                browser: {
                  type: 'string',
                  example: 'Chrome'
                },
                os: {
                  type: 'string',
                  example: 'Windows'
                }
              }
            },
            location: {
              type: 'object',
              properties: {
                country: {
                  type: 'string',
                  example: 'United States'
                },
                city: {
                  type: 'string',
                  example: 'New York'
                },
                region: {
                  type: 'string',
                  example: 'NY'
                }
              }
            },
            loginMethod: {
              type: 'string',
              enum: ['email', 'username', 'social'],
              example: 'email'
            },
            loginStatus: {
              type: 'string',
              enum: ['success', 'failed', 'blocked'],
              example: 'success'
            },
            failureReason: {
              type: 'string',
              nullable: true,
              example: null
            },
            sessionDuration: {
              type: 'number',
              description: 'Session duration in minutes',
              example: 120
            },
            lastActivity: {
              type: 'string',
              format: 'date-time',
              description: 'Last activity timestamp'
            },
            isExpired: {
              type: 'boolean',
              description: 'Session expiration status',
              example: false
            },
            expiresAt: {
              type: 'string',
              format: 'date-time',
              description: 'Session expiration timestamp'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Session creation timestamp'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Session last update timestamp'
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: [
    './routes/*.js',
    './controllers/*.js'
  ]
};

const specs = swaggerJsdoc(options);

module.exports = specs;
