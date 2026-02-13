import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import AgentService, {
  AgentResponse,
  FishLocation,
} from '../services/AgentService';

const FishFinderScreen = (): JSX.Element => {
  const [agentService] = useState(() => new AgentService());
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<AgentResponse | null>(null);
  const [userQuery, setUserQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Initial query on mount
  useEffect(() => {
    handleInitialQuery();
  }, []);

  const handleInitialQuery = async () => {
    await handleQuery('Where can I find salmon in the Great Lakes today?');
  };

  const handleQuery = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await agentService.queryAgents(query);
      setResponse(result);
    } catch (err) {
      setError('Failed to get recommendations. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitQuery = () => {
    if (userQuery.trim()) {
      handleQuery(userQuery);
      setUserQuery('');
    }
  };

  const renderLocationCard = (location: FishLocation, index: number) => (
    <View key={index} style={styles.locationCard}>
      <View style={styles.locationHeader}>
        <Text style={styles.locationName}>{location.name}</Text>
        <View
          style={[
            styles.likelihoodBadge,
            {
              backgroundColor:
                location.likelihood > 0.8 ? '#4CAF50' : '#FF9800',
            },
          ]}>
          <Text style={styles.likelihoodText}>
            {(location.likelihood * 100).toFixed(0)}%
          </Text>
        </View>
      </View>
      <Text style={styles.salmonType}>{location.salmonType}</Text>
      <View style={styles.conditionsContainer}>
        <View style={styles.conditionItem}>
          <Text style={styles.conditionLabel}>Temp:</Text>
          <Text style={styles.conditionValue}>
            {location.conditions.waterTemp}°F
          </Text>
        </View>
        <View style={styles.conditionItem}>
          <Text style={styles.conditionLabel}>Depth:</Text>
          <Text style={styles.conditionValue}>
            {location.conditions.depth} ft
          </Text>
        </View>
        <View style={styles.conditionItem}>
          <Text style={styles.conditionLabel}>Time:</Text>
          <Text style={styles.conditionValue}>
            {location.conditions.timeOfDay}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderRecommendation = (rec: string, index: number) => (
    <View key={index} style={styles.recommendationItem}>
      <Text style={styles.bullet}>•</Text>
      <Text style={styles.recommendationText}>{rec}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Agent Response Section */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#2C5F8D" />
            <Text style={styles.loadingText}>
              AI Agents analyzing conditions...
            </Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={handleInitialQuery}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : response ? (
          <>
            {/* Agent Message */}
            <View style={styles.messageCard}>
              <Text style={styles.messageTitle}>🤖 Multi-Agent Analysis</Text>
              <Text style={styles.messageText}>{response.message}</Text>
              <View style={styles.confidenceBadge}>
                <Text style={styles.confidenceText}>
                  Confidence: {(response.confidence * 100).toFixed(0)}%
                </Text>
              </View>
            </View>

            {/* Locations */}
            {response.locations && response.locations.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>📍 Top Locations</Text>
                {response.locations.map((location, index) =>
                  renderLocationCard(location, index)
                )}
              </View>
            )}

            {/* Recommendations */}
            {response.recommendations && response.recommendations.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>💡 Recommendations</Text>
                <View style={styles.recommendationsContainer}>
                  {response.recommendations.map((rec, index) =>
                    renderRecommendation(rec, index)
                  )}
                </View>
              </View>
            )}
          </>
        ) : null}

        {/* Query Input */}
        <View style={styles.querySection}>
          <Text style={styles.queryLabel}>Ask the Agent</Text>
          <TextInput
            style={styles.queryInput}
            placeholder="e.g., What's the best time to fish today?"
            value={userQuery}
            onChangeText={setUserQuery}
            multiline
          />
          <TouchableOpacity
            style={styles.queryButton}
            onPress={handleSubmitQuery}
            disabled={loading || !userQuery.trim()}>
            <Text style={styles.queryButtonText}>Get Recommendation</Text>
          </TouchableOpacity>
        </View>

        {/* Framework Info */}
        <View style={styles.frameworkInfo}>
          <Text style={styles.frameworkTitle}>
            Powered by Microsoft Agent Framework
          </Text>
          <Text style={styles.frameworkDescription}>
            Multi-agent system coordinating:
          </Text>
          <Text style={styles.frameworkDescription}>
            • Location Agent - Optimal fishing spots
          </Text>
          <Text style={styles.frameworkDescription}>
            • Weather Agent - Condition analysis
          </Text>
          <Text style={styles.frameworkDescription}>
            • Species Agent - Salmon behavior
          </Text>
          <Text style={styles.frameworkDescription}>
            • Equipment Agent - Gear recommendations
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    padding: 16,
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    padding: 20,
    backgroundColor: '#FFEBEE',
    borderRadius: 8,
    alignItems: 'center',
  },
  errorText: {
    color: '#C62828',
    fontSize: 16,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 12,
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: '#2C5F8D',
    borderRadius: 4,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  messageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  messageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C5F8D',
    marginBottom: 12,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#333',
  },
  confidenceBadge: {
    marginTop: 12,
    alignSelf: 'flex-start',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  confidenceText: {
    color: '#1976D2',
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  locationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  likelihoodBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  likelihoodText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  salmonType: {
    fontSize: 14,
    color: '#2C5F8D',
    marginBottom: 12,
  },
  conditionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  conditionItem: {
    flex: 1,
  },
  conditionLabel: {
    fontSize: 12,
    color: '#666',
  },
  conditionValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  recommendationsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
  },
  recommendationItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bullet: {
    fontSize: 16,
    color: '#2C5F8D',
    marginRight: 8,
  },
  recommendationText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  querySection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  queryLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  queryInput: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  queryButton: {
    backgroundColor: '#2C5F8D',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },
  queryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  frameworkInfo: {
    backgroundColor: '#E8F4F8',
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
  },
  frameworkTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C5F8D',
    marginBottom: 8,
  },
  frameworkDescription: {
    fontSize: 12,
    color: '#555',
    lineHeight: 18,
  },
});

export default FishFinderScreen;
