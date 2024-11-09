import { combinations } from 'mathjs';

// 二項分布
const binomialDistribution = (n: number, k: number, p: number, q: number): number => {
  return combinations(n, k) * p ** k * q ** (n - k);
};

export class Gacha {
  prob: number;
  count: number;
  constructor(init: Partial<Gacha>) {
    this.prob = (init.prob ?? 0) / 100;
    this.count = init.count ?? 0;
  }

  // 1回以上成功する確率
  anySuccessProb(): number {
    return 1 - this.allFailProb();
  }

  // 全て失敗する確率
  allFailProb(): number {
    return this.inverseProb() ** this.count;
  }

  // X回成功する確率
  SuccessProbByHit(hit: number): number {
    return binomialDistribution(this.count, hit, this.prob, this.inverseProb());
  }

  // X回以上成功する確率
  SuccessProbByHits(requiredHit: number): number {
    let result = 1.0;
    for (let j = 0; j < requiredHit; j++) {
      result -= binomialDistribution(this.count, j, this.prob, this.inverseProb());
    }
    return result;
  }

  // X％成功するのに必要な回数
  anySuccessCount(threshold: number): number {
    return Math.ceil(Math.log(1.0 - (1.0 * threshold) / 100) / Math.log(1.0 - this.prob));
  }

  // 逆確率
  inverseProb(): number {
    return 1.0 - this.prob;
  }
}
