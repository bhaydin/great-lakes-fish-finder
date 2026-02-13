/**
 * Species Agent
 * 
 * Specialized agent for salmon species identification and
 * species-specific fishing recommendations.
 */

export interface SalmonSpecies {
  name: string;
  scientificName: string;
  seasonalAvailability: string[];
  preferredDepth: [number, number];
  preferredTemp: [number, number];
  commonBaits: string[];
  characteristics: string;
}

export class SpeciesAgent {
  private readonly agentName = 'SpeciesAgent';
  private readonly agentVersion = '1.0.0';
  private readonly salmonDatabase: Map<string, SalmonSpecies>;

  constructor() {
    this.salmonDatabase = new Map();
    this.initializeSalmonDatabase();
  }

  /**
   * Initialize database of Great Lakes salmon species
   */
  private initializeSalmonDatabase(): void {
    this.salmonDatabase.set('chinook', {
      name: 'Chinook Salmon',
      scientificName: 'Oncorhynchus tshawytscha',
      seasonalAvailability: ['Spring', 'Summer', 'Fall'],
      preferredDepth: [40, 80],
      preferredTemp: [50, 60],
      commonBaits: ['Spoons', 'Plugs', 'Cut bait', 'Flies'],
      characteristics: 'Largest Pacific salmon, aggressive feeders',
    });

    this.salmonDatabase.set('coho', {
      name: 'Coho Salmon',
      scientificName: 'Oncorhynchus kisutch',
      seasonalAvailability: ['Spring', 'Summer', 'Fall'],
      preferredDepth: [20, 50],
      preferredTemp: [52, 58],
      commonBaits: ['Spoons', 'Spinners', 'Flies'],
      characteristics: 'Active fighters, often near surface',
    });

    this.salmonDatabase.set('atlantic', {
      name: 'Atlantic Salmon',
      scientificName: 'Salmo salar',
      seasonalAvailability: ['Spring', 'Summer', 'Fall'],
      preferredDepth: [30, 60],
      preferredTemp: [48, 56],
      commonBaits: ['Flies', 'Spoons', 'Live bait'],
      characteristics: 'Excellent table fare, acrobatic fighters',
    });

    this.salmonDatabase.set('pink', {
      name: 'Pink Salmon',
      scientificName: 'Oncorhynchus gorbuscha',
      seasonalAvailability: ['Summer', 'Fall'],
      preferredDepth: [15, 40],
      preferredTemp: [50, 57],
      commonBaits: ['Small spoons', 'Spinners', 'Flies'],
      characteristics: 'Smaller salmon, odd-year runs',
    });
  }

  /**
   * Get species information
   */
  getSpeciesInfo(speciesName: string): SalmonSpecies | undefined {
    const key = speciesName.toLowerCase().replace(' salmon', '');
    return this.salmonDatabase.get(key);
  }

  /**
   * Get all available species
   */
  getAllSpecies(): SalmonSpecies[] {
    return Array.from(this.salmonDatabase.values());
  }

  /**
   * Get species recommendations for current conditions
   */
  getRecommendations(
    waterTemp: number,
    depth: number,
    season: string
  ): SalmonSpecies[] {
    return this.getAllSpecies().filter(species => {
      const tempMatch =
        waterTemp >= species.preferredTemp[0] &&
        waterTemp <= species.preferredTemp[1];
      const depthMatch =
        depth >= species.preferredDepth[0] &&
        depth <= species.preferredDepth[1];
      const seasonMatch = species.seasonalAvailability.includes(season);

      return tempMatch && depthMatch && seasonMatch;
    });
  }

  /**
   * Get current season
   */
  getCurrentSeason(): string {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'Spring';
    if (month >= 5 && month <= 7) return 'Summer';
    if (month >= 8 && month <= 10) return 'Fall';
    return 'Winter';
  }

  /**
   * Get bait recommendations for target species
   */
  getBaitRecommendations(targetSpecies: string[]): string[] {
    const baits = new Set<string>();
    
    targetSpecies.forEach(species => {
      const info = this.getSpeciesInfo(species);
      if (info) {
        info.commonBaits.forEach(bait => baits.add(bait));
      }
    });

    return Array.from(baits);
  }
}

export default SpeciesAgent;
