import CoheteFactory from './cohete/factory/CoheteFactory';
import Server from './express/Server';
import WordleFactory from './wordle/factory/WordleFactory';

const CoheteView = CoheteFactory.createCoheteView()
const wordleView = WordleFactory.createWordleFactory()

const server = new Server(CoheteView, wordleView)
server.start()
