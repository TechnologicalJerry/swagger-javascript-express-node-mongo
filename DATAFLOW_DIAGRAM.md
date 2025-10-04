# 🔄 Data Flow Diagram - User CRUD API

## 📊 Complete Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           🌐 CLIENT LAYER                                      │
├─────────────────────────────────────────────────────────────────────────────────┤
│  Web Browser / Postman / Mobile App / Frontend Application                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐           │
│  │   Browser   │  │  Postman    │  │   Mobile    │  │  Frontend   │           │
│  │             │  │ Collection  │  │     App     │  │     App     │           │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘           │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                        🌍 NETWORK LAYER                                        │
├─────────────────────────────────────────────────────────────────────────────────┤
│  HTTP/HTTPS Requests & Responses                                               │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │  GET/POST/PUT/DELETE → http://localhost:5050/api/*                     │   │
│  │  Headers: Authorization, Content-Type, User-Agent                      │   │
│  │  Body: JSON Data (for POST/PUT requests)                              │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                      🚀 EXPRESS SERVER LAYER                                   │
├─────────────────────────────────────────────────────────────────────────────────┤
│  server.js (Entry Point)                                                       │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │  1. Load Environment Variables (.env)                                  │   │
│  │  2. Initialize Logger (Winston)                                        │   │
│  │  3. Connect to MongoDB                                                  │   │
│  │  4. Create HTTP Server                                                  │   │
│  │  5. Start Listening on Port 5050                                        │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                        │                                       │
│                                        ▼                                       │
│  app.js (Express Application)                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │  Middleware Stack (in order):                                          │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │   │
│  │  │    CORS     │  │   Logger    │  │   Morgan    │  │   Parser    │   │   │
│  │  │ Middleware  │  │ Middleware  │  │ Middleware  │  │ Middleware  │   │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │   │
│  │                                                                         │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │   │
│  │  │   Cookie    │  │   Static    │  │   Swagger   │  │   Routes    │   │   │
│  │  │   Parser    │  │   Files     │  │     UI      │  │  Handler    │   │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                        🛣️  ROUTING LAYER                                       │
├─────────────────────────────────────────────────────────────────────────────────┤
│  routes/index.js (Main Router)                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │  ┌─────────────────┐              ┌─────────────────┐                  │   │
│  │  │   Home Route    │              │   API Routes    │                  │   │
│  │  │   GET /         │              │                 │                  │   │
│  │  └─────────────────┘              │  ┌─────────────┐│                  │   │
│  │                                   │  │ /api/auth   ││                  │   │
│  │                                   │  │ /api/users  ││                  │   │
│  │                                   │  └─────────────┘│                  │   │
│  │                                   └─────────────────┘                  │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                        │                                       │
│                                        ▼                                       │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │  Authentication Routes (routes/auth.js)                               │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │   │
│  │  │   POST      │  │   POST      │  │   POST      │  │   GET       │   │   │
│  │  │ /register   │  │  /login     │  │  /logout    │  │   /me       │   │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                        │                                       │
│                                        ▼                                       │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │  User Management Routes (routes/users.js)                             │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │   │
│  │  │   GET       │  │   GET       │  │   PUT       │  │   DELETE    │   │   │
│  │  │ /users      │  │ /users/:id  │  │ /users/:id  │  │ /users/:id  │   │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │   │
│  │                                                                         │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │   │
│  │  │   PUT       │  │   GET       │  │   POST      │  │   DELETE    │   │   │
│  │  │ /profile    │  │ /sessions   │  │ /sessions/  │  │ /sessions/  │   │   │
│  │  └─────────────┘  └─────────────┘  │ logout      │  │ :sessionId  │   │   │
│  │                                   └─────────────┘  └─────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                      🔐 MIDDLEWARE LAYER                                        │
├─────────────────────────────────────────────────────────────────────────────────┤
│  middleware/auth.js (JWT Authentication)                                       │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │  1. Extract JWT Token from Authorization Header                        │   │
│  │  2. Verify Token Signature                                            │   │
│  │  3. Decode Token Payload                                              │   │
│  │  4. Find User in Database                                             │   │
│  │  5. Attach User to Request Object                                     │   │
│  │  6. Continue to Next Middleware/Controller                            │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                        │                                       │
│                                        ▼                                       │
│  middleware/requestLogger.js (Request Logging)                                │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │  1. Log Incoming Request (Method, URL, IP, User-Agent)                 │   │
│  │  2. Start Timer for Response Time                                      │   │
│  │  3. Continue to Next Middleware                                        │   │
│  │  4. Log Response (Status, Time, Size)                                  │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                      🎯 CONTROLLER LAYER                                        │
├─────────────────────────────────────────────────────────────────────────────────┤
│  controllers/userController.js                                                  │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │  Authentication Controllers:                                           │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │   │
│  │  │  register   │  │    login    │  │   logout    │  │    getMe    │   │   │
│  │  │             │  │             │  │             │  │             │   │   │
│  │  │ 1. Validate │  │ 1. Validate │  │ 1. Extract  │  │ 1. Get User │   │   │
│  │  │    Input    │  │ Credentials │  │    Token    │  │    from     │   │   │
│  │  │ 2. Check    │  │ 2. Find     │  │ 2. Find     │  │    Token    │   │   │
│  │  │    Duplicate│  │    User     │  │  Session    │  │ 2. Return   │   │   │
│  │  │ 3. Hash     │  │ 3. Verify  │  │ 3. Logout   │  │    User     │   │   │
│  │  │    Password │  │    Password │  │    Session  │  │    Data    │   │   │
│  │  │ 4. Create   │  │ 4. Generate │  │ 4. Return   │   │             │   │   │
│  │  │    User     │  │    Token    │  │    Success  │   │             │   │   │
│  │  │ 5. Return   │  │ 5. Create   │  │             │   │             │   │   │
│  │  │    User     │  │  Session    │  │             │   │             │   │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │   │
│  │                                                                         │   │
│  │  User Management Controllers:                                          │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │   │
│  │  │  getUsers   │  │   getUser   │  │ updateUser  │  │ deleteUser  │   │   │
│  │  │             │  │             │  │             │  │             │   │   │
│  │  │ 1. Check    │  │ 1. Validate │  │ 1. Validate │  │ 1. Validate │   │   │
│  │  │    Admin    │  │    ID       │  │    Input    │  │    ID       │   │   │
│  │  │ 2. Query    │  │ 2. Find     │  │ 2. Find     │  │ 2. Find     │   │   │
│  │  │    Users    │  │    User     │  │    User     │  │    User     │   │   │
│  │  │ 3. Return   │  │ 3. Return   │  │ 3. Update   │  │ 3. Delete   │   │   │
│  │  │    List     │  │    User     │  │    User     │  │    User     │   │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │   │
│  │                                                                         │   │
│  │  Session Management Controllers:                                       │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │   │
│  │  │getUserSessions│ │getAllSessions│ │logoutSession │ │terminateSession│ │   │
│  │  │             │  │             │  │             │  │             │   │   │
│  │  │ 1. Get User │  │ 1. Check    │  │ 1. Validate │  │ 1. Check    │   │   │
│  │  │    Sessions │  │    Admin    │  │    Session  │  │    Admin    │   │   │
│  │  │ 2. Return   │  │ 2. Query    │  │ 2. Logout   │  │ 2. Find     │   │   │
│  │  │    List     │  │    All      │  │    Session  │  │    Session  │   │   │
│  │  │             │  │ 3. Return   │  │ 3. Return   │  │ 3. Terminate│   │   │
│  │  │             │  │    List     │  │    Success  │  │    Session  │   │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                      🛠️  UTILITY LAYER                                         │
├─────────────────────────────────────────────────────────────────────────────────┤
│  utils/sessionUtils.js                                                          │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │   │
│  │  │parseUserAgent│ │getClientIP  │  │generateSession│ │createSession│   │   │
│  │  │             │  │             │  │     ID      │  │    Data     │   │   │
│  │  │ 1. Parse    │  │ 1. Extract  │  │ 1. Generate │  │ 1. Build    │   │   │
│  │  │    User     │  │    IP from  │  │    Unique   │  │    Session  │   │   │
│  │  │    Agent    │  │    Request  │  │    Session  │  │    Object   │   │   │
│  │  │ 2. Detect   │  │ 2. Handle   │  │    ID       │  │ 2. Include  │   │   │
│  │  │    Device   │  │    Multiple │  │ 2. Return   │  │    Device   │   │   │
│  │  │    Type     │  │    Proxies  │  │    String   │  │    Info     │   │   │
│  │  │ 3. Detect   │  │ 3. Return   │  │             │  │ 3. Include  │   │   │
│  │  │    Browser  │  │    IP       │  │             │  │    Network  │   │   │
│  │  │ 4. Detect   │  │             │  │             │  │    Info     │   │   │
│  │  │    OS       │  │             │  │             │  │ 4. Return   │   │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                        │                                       │
│                                        ▼                                       │
│  utils/systemInfo.js                                                           │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │   │
│  │  │logSystemInfo│ │logMemoryUsage│ │getCPUInfo    │  │getOSInfo     │   │   │
│  │  │             │  │             │  │             │  │             │   │   │
│  │  │ 1. Get OS   │  │ 1. Get      │  │ 1. Get CPU  │  │ 1. Get OS   │   │   │
│  │  │    Info     │  │    Memory   │  │    Info     │  │    Info     │   │   │
│  │  │ 2. Get CPU  │  │    Usage    │  │ 2. Get CPU  │  │ 2. Get OS   │   │   │
│  │  │    Info     │  │ 2. Log      │  │    Cores    │  │    Version  │   │   │
│  │  │ 3. Get      │  │    Details  │  │ 3. Get CPU  │  │ 3. Get OS   │   │   │
│  │  │    Memory   │  │             │  │    Model    │  │    Platform │   │   │
│  │  │ 4. Log All  │  │             │  │ 4. Return   │  │ 4. Return   │   │   │
│  │  │    Info     │  │             │  │    Info     │  │    Info     │   │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                      🗄️  DATABASE LAYER                                        │
├─────────────────────────────────────────────────────────────────────────────────┤
│  MongoDB Database (via Mongoose ODM)                                            │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │  Collections:                                                          │   │
│  │  ┌─────────────────┐              ┌─────────────────┐                  │   │
│  │  │   users         │              │   sessions      │                  │   │
│  │  │                 │              │                 │                  │   │
│  │  │ ┌─────────────┐ │              │ ┌─────────────┐ │                  │   │
│  │  │ │ _id         │ │              │ │ _id         │ │                  │   │
│  │  │ │ firstName   │ │              │ │ user        │ │                  │   │
│  │  │ │ lastName    │ │              │ │ sessionId   │ │                  │   │
│  │  │ │ userName    │ │              │ │ token       │ │                  │   │
│  │  │ │ email       │ │              │ │ loginTime   │ │                  │   │
│  │  │ │ phone       │ │              │ │ logoutTime  │ │                  │   │
│  │  │ │ password    │ │              │ │ isActive    │ │                  │   │
│  │  │ │ gender      │ │              │ │ ipAddress   │ │                  │   │
│  │  │ │ dob         │ │              │ │ userAgent   │ │                  │   │
│  │  │ │ role        │ │              │ │ deviceInfo  │ │                  │   │
│  │  │ │ isActive    │ │              │ │ location    │ │                  │   │
│  │  │ │ createdAt   │ │              │ │ loginStatus │ │                  │   │
│  │  │ │ updatedAt   │ │              │ │ sessionDuration│                │   │
│  │  │ └─────────────┘ │              │ │ expiresAt   │ │                  │   │
│  │  └─────────────────┘              │ └─────────────┘ │                  │   │
│  │                                   └─────────────────┘                  │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                        │                                       │
│                                        ▼                                       │
│  Database Operations:                                                          │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │   │
│  │  │   CREATE    │  │    READ     │  │   UPDATE    │  │   DELETE    │   │   │
│  │  │             │  │             │  │             │  │             │   │   │
│  │  │ 1. Validate │  │ 1. Build    │  │ 1. Find     │  │ 1. Find     │   │   │
│  │  │    Data     │  │    Query    │  │    Record   │  │    Record   │   │   │
│  │  │ 2. Hash     │  │ 2. Execute  │  │ 2. Update   │  │ 2. Delete   │   │   │
│  │  │    Password │  │    Query    │  │    Fields   │  │    Record   │   │   │
│  │  │ 3. Create   │  │ 3. Return   │  │ 3. Save     │  │ 3. Return   │   │   │
│  │  │    Record   │  │    Results  │  │    Changes  │  │    Success  │   │   │
│  │  │ 4. Return   │  │             │  │ 4. Return   │  │             │   │   │
│  │  │    Record   │  │             │  │    Updated  │  │             │   │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                      📝 LOGGING LAYER                                           │
├─────────────────────────────────────────────────────────────────────────────────┤
│  Winston Logger (config/logger.js)                                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │  Log Levels:                                                           │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │   │
│  │  │   ERROR     │  │    WARN     │  │    INFO     │  │   DEBUG     │   │   │
│  │  │   (0)       │  │    (1)      │  │    (2)      │  │    (4)      │   │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │   │
│  │                                                                         │   │
│  │  Log Transports:                                                       │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │   │
│  │  │   Console   │  │ Error File  │  │Combined File│  │Daily Rotate │   │   │
│  │  │  Transport  │  │  Transport  │  │  Transport  │  │  Transport  │   │   │
│  │  │             │  │             │  │             │  │             │   │   │
│  │  │ 1. Colorize │  │ 1. Log Only │  │ 1. Log All  │  │ 1. Daily    │   │   │
│  │  │    Output   │  │    Errors   │  │    Levels   │  │    Rotation │   │   │
│  │  │ 2. Format   │  │ 2. JSON     │  │ 2. JSON     │  │ 2. Max Size │   │   │
│  │  │    Timestamp│  │    Format   │  │    Format   │  │    20MB     │   │   │
│  │  │ 3. Show in  │  │ 3. Save to  │  │ 3. Save to  │  │ 3. Keep 14  │   │   │
│  │  │    Console  │  │    File     │  │    File     │  │    Days     │   │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
│                                        │                                       │
│                                        ▼                                       │
│  Log Files Created:                                                             │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │  logs/                                                                  │   │
│  │  ├── error.log              # Error-level logs only                    │   │
│  │  ├── combined.log           # All logs combined                        │   │
│  │  └── application-YYYY-MM-DD.log  # Daily rotating logs                │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                      📚 DOCUMENTATION LAYER                                     │
├─────────────────────────────────────────────────────────────────────────────────┤
│  Swagger/OpenAPI Documentation                                                  │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │  API Documentation Endpoints:                                          │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │   │
│  │  │   Swagger   │  │   API       │  │   Schema    │  │   Examples  │   │   │
│  │  │     UI      │  │   Specs     │  │ Definitions │  │   & Tests   │   │   │
│  │  │             │  │             │  │             │  │             │   │   │
│  │  │ 1. Serve    │  │ 1. Generate │  │ 1. User     │  │ 1. Request  │   │   │
│  │  │    UI at    │  │    from     │  │    Schema   │  │    Examples │   │   │
│  │  │    /swagger │  │    JSDoc    │  │ 2. Session  │  │ 2. Response │   │   │
│  │  │    -ui      │  │    Comments │  │    Schema   │  │    Examples │   │   │
│  │  │ 2. Custom   │  │ 2. Include  │  │ 3. Error    │  │ 3. Test     │   │   │
│  │  │    Styling  │  │    All      │  │    Schema   │  │    Scenarios│   │   │
│  │  │ 3. Enable   │  │    Routes   │  │ 4. Auth     │  │ 4. Postman  │   │   │
│  │  │    Explorer │  │ 3. Include  │  │    Schema   │  │    Collection│   │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                      🔄 RESPONSE FLOW                                           │
├─────────────────────────────────────────────────────────────────────────────────┤
│  Response Processing:                                                            │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │  1. Controller Returns Data                                            │   │
│  │  2. Express Serializes to JSON                                         │   │
│  │  3. Response Headers Set                                               │   │
│  │  4. Response Sent to Client                                            │   │
│  │  5. Request Logger Logs Response                                       │   │
│  │  6. Winston Logger Logs Activity                                       │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                      🌐 CLIENT RECEIVES RESPONSE                               │
├─────────────────────────────────────────────────────────────────────────────────┤
│  JSON Response with Status Code and Data                                        │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │  Success Response Example:                                             │   │
│  │  {                                                                     │   │
│  │    "success": true,                                                    │   │
│  │    "message": "User created successfully",                             │   │
│  │    "data": {                                                           │   │
│  │      "user": { ... },                                                  │   │
│  │      "token": "eyJhbGciOiJIUzI1NiIs..."                               │   │
│  │    }                                                                   │   │
│  │  }                                                                     │   │
│  │                                                                         │   │
│  │  Error Response Example:                                               │   │
│  │  {                                                                     │   │
│  │    "success": false,                                                   │   │
│  │    "message": "Validation error",                                      │   │
│  │    "error": "Email is required"                                        │   │
│  │  }                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────┘

```

## 🔄 Key Data Flow Scenarios

### 1. **User Registration Flow**
```
Client → HTTP POST /api/auth/register → Express → Auth Route → Register Controller → 
Validate Input → Check Duplicates → Hash Password → Create User in DB → 
Generate JWT → Create Session → Log Activity → Return Response → Client
```

### 2. **User Login Flow**
```
Client → HTTP POST /api/auth/login → Express → Auth Route → Login Controller → 
Validate Credentials → Find User → Verify Password → Generate JWT → 
Create Session (with device info) → Log Login → Return Response → Client
```

### 3. **Protected Route Access Flow**
```
Client → HTTP GET /api/users (with JWT) → Express → Auth Middleware → 
Verify JWT → Find User → Attach to Request → Users Route → 
Get Users Controller → Query DB → Return Response → Client
```

### 4. **Session Management Flow**
```
Client → HTTP GET /api/users/sessions → Express → Auth Middleware → 
Verify JWT → Users Route → Get Sessions Controller → Query Sessions DB → 
Return Session List → Client
```

### 5. **Error Handling Flow**
```
Any Layer → Error Occurs → Express Error Handler → Winston Logger → 
Log Error Details → Return Error Response → Client
```

## 📊 Data Storage Structure

### **Users Collection**
```json
{
  "_id": "ObjectId",
  "firstName": "John",
  "lastName": "Doe", 
  "userName": "johndoe",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "hashed_password",
  "gender": "Male",
  "dob": "10-01-1995",
  "role": "user",
  "isActive": true,
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

### **Sessions Collection**
```json
{
  "_id": "ObjectId",
  "user": "ObjectId",
  "sessionId": "sess_1234567890_abc123def",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "loginTime": "2024-01-15T10:30:00Z",
  "logoutTime": null,
  "isActive": true,
  "ipAddress": "192.168.1.100",
  "userAgent": "Mozilla/5.0...",
  "deviceInfo": {
    "type": "desktop",
    "browser": "Chrome",
    "os": "Windows"
  },
  "location": {
    "country": "unknown",
    "city": "unknown", 
    "region": "unknown"
  },
  "loginMethod": "email",
  "loginStatus": "success",
  "failureReason": null,
  "sessionDuration": 0,
  "lastActivity": "2024-01-15T10:30:00Z",
  "isExpired": false,
  "expiresAt": "2024-01-22T10:30:00Z",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

This comprehensive dataflow diagram shows how data moves through every layer of the application, from client requests to database operations and back to responses! 🎉
