// initializations
import "babel-polyfill";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "./game/constants";
import { Runner } from "./game";
// import { DataDisp } from './dataDisp';
import GeneticModel from "./ai/models/model_Genetic";
import RandomModel from "./ai/models/model_Random";

const config = {
  MUTATION_THRES: 0.2,
  DINO_COUNT: 20,
  WEIGHT_NUM:3,
  ITER_NUM:100

};
export default config;

let runner = null;

const rankList = [];
const geneticModel = new GeneticModel();

let firstTime = true;

function setup() {
  // Initialize the game Runner.
  runner = new Runner(".game", {
    DINO_COUNT: config.DINO_COUNT,
    onReset: handleReset,
    onCrash: handleCrash,
    onRunning: handleRunning
  });
  
//   window.runner = runner;
  // console.info(runner)

  runner.init();
}

function handleReset(Dinos) {
  if (firstTime) {
    firstTime = false;

    Dinos.forEach(dino => {
      // Random actions
      dino.model = new RandomModel();
      dino.model.init();
    });
  } else {
    // Train the model before restarting.
    // console.info('Training');
    // console.info('Ranklist');
    // console.info(rankList);

    const chromosomes = rankList.map(dino => dino.model.getChromosome());
    // console.info(chromosomes)

    // Clear rankList
    rankList.splice(0);
    geneticModel.fit(chromosomes);
    Dinos.forEach((dino, i) => {
      dino.model.setChromosome(chromosomes[i]);
    });
  }
}

function handleRunning(dino, state) {
  let action = 0;
  if (!dino.jumping) {
    action = dino.model.predictSingle(convertStateToVector(state));
  }
  return action;
}

function handleCrash(dino) {
  //   // console.info("i was called")
  //   // last dino
  //   if(rankList.length === 1){
  //     console.log("Last dino?")
  //   console.log(rankList)

  // }

  if (!rankList.includes(dino)) {
    rankList.unshift(dino);
  }
}

function convertStateToVector(state) {
  if (state) {
    return [
      state.obstacleX / CANVAS_WIDTH,
      state.obstacleWidth / CANVAS_WIDTH,
      state.speed / 100
    ];
  }
  return [0, 0, 0];
}

document.addEventListener("DOMContentLoaded", setup);
