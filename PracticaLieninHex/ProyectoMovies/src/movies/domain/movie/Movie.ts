import AbstractMovie from './AbstractMovie'
import MovieInterface from './MovieInterface'


export default class Movie extends AbstractMovie {
  constructor(movieInterface: MovieInterface) {
    super(movieInterface)
  }

  public isNull = (): boolean => false
}
