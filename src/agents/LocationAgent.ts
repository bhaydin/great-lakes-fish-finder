/**
 * Location Agent
 * 
 * Specialized agent for identifying optimal salmon fishing locations
 * in the Great Lakes using the Microsoft Agent Framework.
 */

import {FishLocation} from '../services/AgentService';

export interface LocationQuery {
  currentLocation?: {
    latitude: number;
    longitude: number;
  };
  targetSpecies?: string;
  maxDistance?: number;
  timeOfDay?: string;
}

export class LocationAgent {
  private readonly agentName = 'LocationAgent';
  private readonly agentVersion = '1.0.0';

  /**
   * Find optimal fishing locations based on query parameters
   */
  async findLocations(query: LocationQuery): Promise<FishLocation[]> {
    // In production, this would use Microsoft Agent Framework capabilities
    // to analyze historical data, current conditions, and make predictions
    
    const locations = this.getGreatLakesLocations();
    
    // Filter and rank locations based on query parameters
    let filteredLocations = locations;

    if (query.targetSpecies) {
      filteredLocations = filteredLocations.filter(loc =>
        loc.salmonType.toLowerCase().includes(query.targetSpecies!.toLowerCase())
      );
    }

    if (query.currentLocation) {
      // Sort by distance to current location
      filteredLocations = this.sortByDistance(
        filteredLocations,
        query.currentLocation
      );
    }

    if (query.maxDistance) {
      filteredLocations = this.filterByDistance(
        filteredLocations,
        query.currentLocation!,
        query.maxDistance
      );
    }

    return filteredLocations.slice(0, 5);
  }

  /**
   * Get Great Lakes fishing locations database
   */
  private getGreatLakesLocations(): FishLocation[] {
    return [
      {
        latitude: 43.6532,
        longitude: -79.3832,
        name: 'Toronto Harbor',
        salmonType: 'Chinook Salmon',
        likelihood: 0.92,
        conditions: {
          waterTemp: 58,
          depth: 45,
          timeOfDay: 'Dawn',
        },
      },
      {
        latitude: 43.0896,
        longitude: -79.0849,
        name: 'Port Dalhousie',
        salmonType: 'Coho Salmon',
        likelihood: 0.87,
        conditions: {
          waterTemp: 60,
          depth: 35,
          timeOfDay: 'Dusk',
        },
      },
      {
        latitude: 42.8251,
        longitude: -78.8784,
        name: 'Buffalo Harbor',
        salmonType: 'Atlantic Salmon',
        likelihood: 0.78,
        conditions: {
          waterTemp: 56,
          depth: 50,
          timeOfDay: 'Morning',
        },
      },
      {
        latitude: 44.0581,
        longitude: -76.1612,
        name: 'Henderson Harbor',
        salmonType: 'Chinook Salmon',
        likelihood: 0.85,
        conditions: {
          waterTemp: 55,
          depth: 55,
          timeOfDay: 'Dawn',
        },
      },
      {
        latitude: 43.2642,
        longitude: -79.0377,
        name: 'Niagara Bar',
        salmonType: 'Chinook Salmon',
        likelihood: 0.89,
        conditions: {
          waterTemp: 57,
          depth: 40,
          timeOfDay: 'Dawn',
        },
      },
    ];
  }

  /**
   * Calculate distance between two coordinates
   */
  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371; // Radius of the Earth in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  /**
   * Sort locations by distance to current location
   */
  private sortByDistance(
    locations: FishLocation[],
    currentLocation: {latitude: number; longitude: number}
  ): FishLocation[] {
    return locations.sort((a, b) => {
      const distA = this.calculateDistance(
        currentLocation.latitude,
        currentLocation.longitude,
        a.latitude,
        a.longitude
      );
      const distB = this.calculateDistance(
        currentLocation.latitude,
        currentLocation.longitude,
        b.latitude,
        b.longitude
      );
      return distA - distB;
    });
  }

  /**
   * Filter locations within maximum distance
   */
  private filterByDistance(
    locations: FishLocation[],
    currentLocation: {latitude: number; longitude: number},
    maxDistance: number
  ): FishLocation[] {
    return locations.filter(loc => {
      const distance = this.calculateDistance(
        currentLocation.latitude,
        currentLocation.longitude,
        loc.latitude,
        loc.longitude
      );
      return distance <= maxDistance;
    });
  }
}

export default LocationAgent;
