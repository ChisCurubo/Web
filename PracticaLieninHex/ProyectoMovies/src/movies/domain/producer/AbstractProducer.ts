import Person from "../person/Person"
import ProducerInterface from "./ProducerInterface"

export default abstract class AbstractProducer extends Person {
  protected Budget: number

  constructor(producerInterface: ProducerInterface) {
    super(producerInterface)
    this.Budget = producerInterface.budget
  }

  

  public getBudget = (): number => this.Budget

  public setBudget = (budget: number): void => {
    this.Budget = budget
  }
}

