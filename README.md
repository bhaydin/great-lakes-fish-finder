# Great Lakes Fish Finder

An AI-powered mobile application to help Great Lakes fishermen find salmon during the fishing season. Built with React Native for iOS and Android, leveraging the Microsoft Agent Framework for intelligent multi-agent capabilities.

## Features

### 🤖 Multi-Agent Intelligence
Powered by Microsoft Agent Framework, coordinating multiple specialized agents:

- **Location Agent**: Identifies optimal fishing locations based on current conditions
- **Weather Agent**: Analyzes weather and water conditions for fishing recommendations
- **Species Agent**: Provides species-specific advice for different salmon types
- **Equipment Agent**: Recommends appropriate fishing gear and techniques

### 🎣 Salmon Finder Capabilities

- Real-time location recommendations for salmon fishing
- Multi-species support (Chinook, Coho, Atlantic, Pink salmon)
- Weather and water condition analysis
- Optimal fishing times and depths
- Interactive AI assistant for personalized recommendations

### 📱 Cross-Platform

- Native iOS support
- Native Android support
- Consistent user experience across platforms

## Technology Stack

- **React Native**: Cross-platform mobile development
- **TypeScript**: Type-safe development
- **Microsoft Agent Framework**: Multi-agent orchestration
- **Azure MSAL**: Authentication (optional)
- **React Native Maps**: Location visualization

## Getting Started

### Prerequisites

- Node.js >= 16
- npm or yarn
- For iOS: macOS with Xcode
- For Android: Android Studio and Android SDK

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd great-lakes-fish-finder
```

2. Install dependencies:
```bash
npm install
```

3. For iOS (macOS only):
```bash
cd ios
pod install
cd ..
```

### Running the Application

#### iOS
```bash
npm run ios
```

#### Android
```bash
npm run android
```

#### Development Server
```bash
npm start
```

## Project Structure

```
great-lakes-fish-finder/
├── src/
│   ├── agents/           # Specialized AI agents
│   │   ├── LocationAgent.ts
│   │   ├── WeatherAgent.ts
│   │   └── SpeciesAgent.ts
│   ├── services/         # Core services
│   │   └── AgentService.ts
│   ├── screens/          # UI screens
│   │   └── FishFinderScreen.tsx
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
├── ios/                  # iOS specific files
├── android/              # Android specific files
├── App.tsx               # Main application component
└── index.js              # Application entry point
```

## Microsoft Agent Framework Integration

The application uses the Microsoft Agent Framework to orchestrate multiple specialized agents that work together to provide intelligent fishing recommendations. The framework enables:

1. **Agent Coordination**: Multiple agents collaborate to analyze different aspects of fishing conditions
2. **Context Awareness**: Agents maintain conversation history and context
3. **Scalability**: Easy to add new agents for additional capabilities
4. **Reliability**: Robust error handling and fallback mechanisms

### Agent Architecture

```
┌─────────────────────────────────────┐
│     Microsoft Agent Framework       │
│        Orchestration Layer          │
└───────────────┬─────────────────────┘
                │
    ┌───────────┴───────────┐
    │                       │
┌───▼────┐  ┌──────┐  ┌────▼────┐
│Location│  │Weather│ │Species  │
│ Agent  │  │ Agent │ │ Agent   │
└────────┘  └───────┘ └─────────┘
```

### Extending the Agent System

To add a new agent:

1. Create a new agent class in `src/agents/`
2. Implement the agent logic following the existing patterns
3. Register the agent in `AgentService.ts`
4. Update the orchestration logic to incorporate the new agent's capabilities

Example:
```typescript
// src/agents/TideAgent.ts
export class TideAgent {
  async analyzeTides(location: Location): Promise<TideInfo> {
    // Implementation
  }
}
```

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
AGENT_API_KEY=your_microsoft_agent_framework_api_key
AGENT_ENDPOINT=https://api.agent-framework.microsoft.com
WEATHER_API_KEY=your_weather_api_key
```

## Development

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

### Testing
```bash
npm test
```

## Great Lakes Fishing Locations

The application covers major salmon fishing areas across all five Great Lakes:

- **Lake Ontario**: Toronto Harbor, Port Dalhousie, Niagara Bar, Henderson Harbor
- **Lake Erie**: Buffalo Harbor, Dunkirk, Port Dover
- **Lake Huron**: Bay City, Port Austin, Harbor Beach
- **Lake Michigan**: Milwaukee, Racine, Ludington, Frankfort
- **Lake Superior**: Duluth, Marquette, Grand Marais

## Salmon Species

Supported salmon species in the Great Lakes:

1. **Chinook (King) Salmon**: Largest, most sought-after species
2. **Coho (Silver) Salmon**: Active fighters, excellent table fare
3. **Atlantic Salmon**: Native species, acrobatic fighters
4. **Pink Salmon**: Smaller, odd-year runs

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Microsoft Agent Framework for multi-agent capabilities
- React Native community for excellent mobile development tools
- Great Lakes fishing community for domain expertise

## Support

For issues, questions, or contributions, please open an issue on GitHub.

## Roadmap

Future enhancements:
- [ ] Real-time weather API integration
- [ ] GPS navigation to fishing spots
- [ ] Catch logging and statistics
- [ ] Social features for sharing catches
- [ ] Integration with fishing license verification
- [ ] Offline mode support
- [ ] Push notifications for optimal fishing conditions
- [ ] Advanced mapping with depth contours

---

**Happy Fishing! 🎣**
