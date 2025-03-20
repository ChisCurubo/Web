
import CuatroRayaFactory from './cuatroRaya/factory/CuatroRayaFactory';
import Server from './express/Server';


const cuatroRayaView = CuatroRayaFactory.createCuatroRayaView()


const server = new Server(cuatroRayaView)
server.start()
