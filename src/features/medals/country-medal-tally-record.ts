import type { MedalTally } from '../../models/domain/country-medal-tally';

export type MedalTallyRow =
  MedalTally & { 
    total?: number;
  }
