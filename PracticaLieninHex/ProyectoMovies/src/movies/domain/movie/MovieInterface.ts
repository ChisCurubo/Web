import AbstractCharacter from "../character/AbstractCharacter"
import AbstractDirector from "../director/AbstractDirector"
import AbstractImage from "../image/AbstractImage"
import AbstractProducer from "../producer/AbstractProducer"

export default interface MovieInterface {
    title: string
    price: number
    year: number
    genres: string
    extract: string
    director: AbstractDirector
    producer: AbstractProducer[]
    age: number
    image: AbstractImage[]
    characters: AbstractCharacter[]
  }