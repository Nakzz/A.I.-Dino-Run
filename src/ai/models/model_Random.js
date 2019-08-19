import Model from '../Model';
import config from "../../main";

export default class RandomModel extends Model {
        weights = [];
        biases = [];
    
        init() {
            this.randomize();
        }

        // random actions
        randomize() {

          for(let i=0; i< config.WEIGHT_NUM; i+=1){
            this.weights[i] = random();

          }
            this.biases[0] = random();
        }

        predict(inputXs) {
            const inputX = inputXs[0];
            
            let y = 0

            for(let i=0; i< config.WEIGHT_NUM; i+=1){
              this.weights[i] = random();
  y += this.weights[i] * inputX[i]
            }
            
              y += this.biases[0];


            return y < 0 ? 1 : 0;
          }

          setChromosome(chromosome) {
            for(let i=0; i< config.WEIGHT_NUM; i+=1){
              this.weights[i] = chromosome[i];
            }

            this.biases[0] = chromosome[config.WEIGHT_NUM];
         }

         getChromosome() {
            return this.weights.concat(this.biases);
        }
    }

    function random() {
        return (Math.random() - 0.5) * 2;
      }