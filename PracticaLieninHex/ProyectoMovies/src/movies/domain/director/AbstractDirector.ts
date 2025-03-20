import Person  from '../person/Person'
import DirectorInterface from './DirectorInterface'

export default abstract class AbstractDirector extends Person {
  protected yearsOfExperience: number

  constructor(directorInterface: DirectorInterface) {
    super(directorInterface)
    this.yearsOfExperience = directorInterface.yearsOfExperience
  }

  public getYearsOfExperience = (): number => this.yearsOfExperience

  public setYearsOfExperience = (yearsOfExperience: number): void => {
    this.yearsOfExperience = yearsOfExperience
  }
}

