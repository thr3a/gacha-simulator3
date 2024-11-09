import { combinations } from 'mathjs';

export type Rarity = 'd1' | 'd2' | 'd3' | 'd4' | 's1' | 's2' | 's3' | 'k1';

export class PokeGacha {
  // レアリティごとの確率テーブル
  private readonly probabilityTable = {
    d1: { first3: 100, fourth: 0, fifth: 0 },
    d2: { first3: 0, fourth: 90, fifth: 60 },
    d3: { first3: 0, fourth: 5, fifth: 20 },
    d4: { first3: 0, fourth: 1.666, fifth: 6.664 },
    s1: { first3: 0, fourth: 2.572, fifth: 10.288 },
    s2: { first3: 0, fourth: 0.5, fifth: 2 },
    s3: { first3: 0, fourth: 0.222, fifth: 0.888 },
    k1: { first3: 0, fourth: 0.04, fifth: 0.16 }
  };

  // 特定カードの確率テーブル
  private readonly specificProbabilityTable = {
    d1: { first3: 2, fourth: 0, fifth: 0 },
    d2: { first3: 0, fourth: 2.571, fifth: 1.714 },
    d3: { first3: 0, fourth: 0.357, fifth: 1.428 },
    d4: { first3: 0, fourth: 0.333, fifth: 1.332 },
    s1: { first3: 0, fourth: 0.321, fifth: 1.286 },
    s2: { first3: 0, fourth: 0.055, fifth: 0.222 },
    s3: { first3: 0, fourth: 0.222, fifth: 0.888 },
    k1: { first3: 0, fourth: 0.013, fifth: 0.053 }
  };

  private readonly rarity: Rarity;
  private readonly packs: number;

  constructor(rarity: Rarity, packs: number) {
    this.rarity = rarity;
    this.packs = packs;
  }

  // 二項分布の計算
  private binomialDistribution(n: number, k: number, p: number): number {
    return combinations(n, k) * (p / 100) ** k * (1 - p / 100) ** (n - k);
  }

  // 1パックあたりの確率を計算
  private getPackProbability(isSpecific: boolean): number {
    const table = isSpecific ? this.specificProbabilityTable : this.probabilityTable;
    const prob = table[this.rarity];

    // 1~3枚目、4枚目、5枚目それぞれの確率を計算
    const first3Prob = 1 - (1 - prob.first3 / 100) ** 3;
    const fourthProb = prob.fourth / 100;
    const fifthProb = prob.fifth / 100;

    // 1パック全体での確率を計算
    return 1 - (1 - first3Prob) * (1 - fourthProb) * (1 - fifthProb);
  }

  // 1回以上カードが出る確率
  getAtLeastOneProbability(isSpecific = false): number {
    const packProb = this.getPackProbability(isSpecific);
    return Math.round((1 - (1 - packProb) ** this.packs) * 1000) / 1000;
  }

  // カードが1枚も出ない確率
  getZeroProbability(isSpecific = false): number {
    const packProb = this.getPackProbability(isSpecific);
    return Math.round((1 - packProb) ** this.packs * 1000) / 1000;
  }

  // ちょうどX枚出る確率
  getExactlyXProbability(x: number, isSpecific = false): number {
    if (x > this.packs) {
      return 0;
    }
    const packProb = this.getPackProbability(isSpecific);
    return Math.round(this.binomialDistribution(this.packs, x, packProb * 100) * 1000) / 1000;
  }

  // X回以上出る確率
  getAtLeastXProbability(x: number, isSpecific = false): number {
    if (x > this.packs) {
      return 0;
    }
    let prob = 0;
    const packProb = this.getPackProbability(isSpecific);
    for (let i = x; i <= this.packs; i++) {
      prob += this.binomialDistribution(this.packs, i, packProb * 100);
    }
    return Math.round(prob * 1000) / 1000;
  }

  // X%の確率で出るのに必要なパック数
  getPacksNeededForProbability(x: number, isSpecific = false): number {
    const packProb = this.getPackProbability(isSpecific);
    return Math.ceil(Math.log(1 - x / 100) / Math.log(1 - packProb));
  }
}

// 使用例
const gacha = new PokeGacha('d4', 1);

console.log('使用例:');
console.log('1回以上d4が出る確率:', gacha.getAtLeastOneProbability());
console.log('1回以上特定のd4が出る確率:', gacha.getAtLeastOneProbability(true));
console.log('d4が1枚も出ない確率:', gacha.getZeroProbability());
console.log('特定のd4が1枚も出ない確率:', gacha.getZeroProbability(true));
console.log('d4がちょうど2枚出る確率:', gacha.getExactlyXProbability(1));
console.log('特定のd4がちょうど2枚出る確率:', gacha.getExactlyXProbability(2, true));
console.log('d4が3回以上出る確率:', gacha.getAtLeastXProbability(3));
console.log('特定のd4が3回以上出る確率:', gacha.getAtLeastXProbability(3, true));
console.log('80%の確率でd4が出るのに必要なパック数:', gacha.getPacksNeededForProbability(90));
console.log('80%の確率で特定のd4が出るのに必要なパック数:', gacha.getPacksNeededForProbability(90, true));
