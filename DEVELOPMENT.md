# Development Guide

## Setup

### Initial Setup

1. Clone the repository
2. Install Node.js dependencies: `npm install`
3. Set up platform-specific dependencies (iOS/Android)

### iOS Setup (macOS only)

```bash
cd ios
pod install
cd ..
```

### Android Setup

Ensure you have:
- Android Studio installed
- Android SDK (API level 33)
- Gradle configured

## Development Workflow

### Running the Application

```bash
# Start Metro bundler
npm start

# Run on iOS (separate terminal)
npm run ios

# Run on Android (separate terminal)
npm run android
```

### Code Quality

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Format code
npx prettier --write "src/**/*.{ts,tsx}"
```

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## Project Structure

```
src/
├── agents/           # Specialized AI agents
│   ├── LocationAgent.ts
│   ├── WeatherAgent.ts
│   └── SpeciesAgent.ts
├── services/         # Core services
│   └── AgentService.ts
├── screens/          # UI screens
│   └── FishFinderScreen.tsx
├── types/            # TypeScript definitions
└── utils/            # Utility functions
```

## Code Style

- Use TypeScript for all new code
- Follow ESLint configuration
- Use Prettier for formatting
- Write meaningful comments for complex logic
- Export types and interfaces

## Adding Features

### New Screen

1. Create screen component in `src/screens/`
2. Add navigation if using React Navigation
3. Update main App component

### New Agent

1. Create agent class in `src/agents/`
2. Implement required methods
3. Register in `AgentService`
4. Add tests

### New Service

1. Create service class in `src/services/`
2. Define interfaces
3. Implement methods
4. Add error handling

## Debugging

### React Native Debugger

1. Install React Native Debugger
2. Start the app
3. Open debugger (Cmd+D on iOS, Cmd+M on Android)
4. Select "Debug JS Remotely"

### Console Logs

Use `console.log()`, `console.warn()`, `console.error()` for debugging.
View logs in Metro bundler terminal.

### Common Issues

**Metro bundler not starting**:
```bash
npx react-native start --reset-cache
```

**iOS build fails**:
```bash
cd ios
pod deintegrate
pod install
cd ..
```

**Android build fails**:
```bash
cd android
./gradlew clean
cd ..
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Add/update tests
4. Update documentation
5. Submit pull request

## Release Process

### iOS

1. Update version in `ios/Info.plist`
2. Archive in Xcode
3. Submit to App Store Connect

### Android

1. Update version in `android/build.gradle`
2. Generate signed APK/AAB
3. Upload to Google Play Console
