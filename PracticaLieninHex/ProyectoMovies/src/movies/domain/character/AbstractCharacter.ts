import Person from '../person/Person'
import CharacterInterface from './CharacterInterface'

export default abstract class AbstractCharacter extends Person {
  protected birthYear: Date

  constructor(characterInterface: CharacterInterface) {
    super(characterInterface)
    this.birthYear = characterInterface.birthYear
  }

  public getBirthYear = (): Date => this.birthYear

  public setBirthYear = (birthYear: Date): void => {
    this.birthYear = birthYear
  }
}

