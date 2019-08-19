import Model from "../Model";
import config from "../../main";

export default class GeneticModel extends Model {
  train(chromosomes) {
    const parents = this.select(chromosomes);
    const offspring = this.crossOver(parents, chromosomes);

    const mutationProb = Math.random();

    console.log(
      "mutationProb",
      mutationProb,
      config.MUTATION_THRES,
      config.MUTATION_THRES <= mutationProb
    );

    if (config.MUTATION_THRES <= mutationProb) {
      // console.log("     FINALLY MUTATING!")

      this.mutate(offspring);
    }

    // this.mutate(offspring);
  }

  fit(chromosomes) {
    this.train(chromosomes);
  }

  getChromosome() {
    return this.weights.concat(this.biases);
  }

  select(chromosomes) {
    const parents = [chromosomes[0], chromosomes[1]];
    return parents;
  }

  // add uniform crosspver
  crossOver(parents, chromosomes) {
    // Clone from parents
    console.info(parents);
    const offspring1 = parents[0];
    const offspring2 = parents[1];
    console.info("off1:", offspring1);
    console.info("off2:", offspring2);

    // random crossover point
    const crossOverPoint = Math.floor(Math.random() * offspring1.length);
    console.info("cross here: ", crossOverPoint);

    // Swap
    for (let i = 0; i < crossOverPoint; i += 1) {
      const temp = offspring1[i];
      offspring1[i] = offspring2[i];
      offspring2[i] = temp;
    }
    const offspring = [offspring1, offspring2];
    // Replace the last 2 with the new offspring
    for (let i = 0; i < 2; i += 1) {
      chromosomes[chromosomes.length - i - 1] = offspring[i];
    }
    console.info("new child: ", offspring);
    return offspring;
  }

  mutate(chromosomes) {
    console.log("     FINALLY MUTATING!");

    chromosomes.forEach(chromosome => {
      const mutationPoint = Math.floor(Math.random() * chromosomes.length);
      chromosome[mutationPoint] = Math.random();
    });
  }
}
