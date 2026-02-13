# Microsoft Agent Framework Architecture

## Overview

This document describes how the Great Lakes Fish Finder application integrates with the Microsoft Agent Framework to provide intelligent, multi-agent fishing recommendations.

## Architecture

### Agent Orchestration Layer

The `AgentService` class (`src/services/AgentService.ts`) serves as the main orchestration layer for all agents. It:

1. Manages conversation history and context
2. Coordinates multiple specialized agents
3. Synthesizes responses from different agents
4. Provides a unified interface for the application

### Specialized Agents

#### 1. Location Agent (`src/agents/LocationAgent.ts`)

**Responsibility**: Identifies optimal fishing locations based on query parameters

**Capabilities**:
- Searches Great Lakes fishing locations database
- Filters by species, distance, and time of day
- Ranks locations by likelihood of success
- Provides detailed location information including coordinates, depth, and conditions

**Key Methods**:
- `findLocations(query)`: Main search interface
- `sortByDistance()`: Orders locations by proximity
- `filterByDistance()`: Limits results to nearby locations

#### 2. Weather Agent (`src/agents/WeatherAgent.ts`)

**Responsibility**: Analyzes weather and water conditions for fishing

**Capabilities**:
- Evaluates current weather conditions
- Assesses water conditions (temperature, wave height)
- Determines favorability for fishing
- Provides weather-based recommendations

**Key Methods**:
- `analyzeConditions(location)`: Analyzes conditions at specific location
- `getRecommendations(conditions)`: Generates weather-based advice
- `isFavorableForFishing()`: Boolean assessment of conditions

#### 3. Species Agent (`src/agents/SpeciesAgent.ts`)

**Responsibility**: Provides salmon species-specific information and recommendations

**Capabilities**:
- Maintains database of salmon species information
- Filters species by water temperature, depth, and season
- Recommends appropriate bait and tackle
- Provides species identification information

**Key Methods**:
- `getSpeciesInfo(name)`: Retrieves detailed species information
- `getRecommendations(temp, depth, season)`: Species matching current conditions
- `getBaitRecommendations(species)`: Suggests appropriate bait

### Multi-Agent Coordination

The Microsoft Agent Framework enables seamless coordination between agents:

```
User Query
    │
    ▼
┌─────────────────────────────────┐
│     AgentService                │
│  (Orchestration Layer)          │
└─────────────┬───────────────────┘
              │
    ┌─────────┼─────────┐
    │         │         │
    ▼         ▼         ▼
┌────────┐ ┌────────┐ ┌────────┐
│Location│ │Weather │ │Species │
│ Agent  │ │ Agent  │ │ Agent  │
└───┬────┘ └───┬────┘ └───┬────┘
    │          │          │
    └──────────┼──────────┘
               │
               ▼
    Synthesized Response
               │
               ▼
          User Interface
```

## Integration Points

### 1. Query Processing

When a user submits a query:

1. **AgentService** receives the query and adds it to conversation history
2. Determines which agents to consult based on query content
3. Dispatches parallel requests to relevant agents
4. Awaits responses from all agents

### 2. Response Synthesis

The orchestration layer:

1. Collects responses from all agents
2. Identifies conflicts or complementary information
3. Synthesizes a coherent response that addresses the user's query
4. Prioritizes recommendations based on confidence levels

### 3. Context Management

- Maintains conversation history for context-aware responses
- Allows agents to reference previous interactions
- Enables follow-up questions and clarifications

## Production Configuration

In a production environment, the application would connect to the actual Microsoft Agent Framework API:

### Configuration

```typescript
const config: AgentConfig = {
  endpoint: 'https://api.agent-framework.microsoft.com',
  apiKey: process.env.AGENT_API_KEY,
  model: 'agent-orchestrator-v1',
};
```

### API Integration

Real Microsoft Agent Framework calls would:

1. Use authentication tokens for secure access
2. Send structured agent requests with context
3. Receive responses with confidence scores
4. Handle rate limiting and errors gracefully

### Example API Call Structure

```typescript
const response = await axios.post(
  `${config.endpoint}/v1/orchestrate`,
  {
    query: userQuery,
    context: conversationHistory,
    agents: ['location', 'weather', 'species'],
    preferences: {
      maxResponseTime: 5000,
      minConfidence: 0.7,
    }
  },
  {
    headers: {
      'Authorization': `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json',
    }
  }
);
```

## Extensibility

### Adding New Agents

To add a new agent (e.g., Tide Agent):

1. **Create Agent Class**:
```typescript
// src/agents/TideAgent.ts
export class TideAgent {
  async analyzeTides(location: Location): Promise<TideInfo> {
    // Implementation
  }
}
```

2. **Register in AgentService**:
```typescript
// In AgentService.ts
private async getTideAgentData(): Promise<TideInfo> {
  const tideAgent = new TideAgent();
  return await tideAgent.analyzeTides(location);
}
```

3. **Update Orchestration**:
```typescript
// Include in simulateAgentOrchestration
const tideInfo = await this.getTideAgentData();
```

### Agent Communication Patterns

Agents can:
- Work independently (parallel execution)
- Share information (sequential with data passing)
- Request clarification (interactive mode)
- Escalate to human operators (fallback)

## Best Practices

1. **Agent Specialization**: Keep agents focused on specific domains
2. **Error Handling**: Implement graceful degradation if an agent fails
3. **Performance**: Use parallel execution when agents are independent
4. **Testing**: Test each agent independently before integration
5. **Monitoring**: Log agent performance and accuracy metrics

## Future Enhancements

- Real-time agent learning from user feedback
- Dynamic agent selection based on query analysis
- Custom agent training for regional fishing patterns
- Integration with external data sources (NOAA, DNR)
- Multi-language support for agent responses
