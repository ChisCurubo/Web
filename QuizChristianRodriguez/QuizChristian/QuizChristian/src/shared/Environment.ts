export default class Environment {
    private static instance: Environment;
    private static HOST: string;
    private static PORT: string;
    private static PROTOCOL: string;
    private static DB_HOST: string;
    private static DB_PORT: string;
    private static DB_USER: string;
    private static DB_PWD: string;
    private static DB_NAME: string;
  
    private static CERT_KEY:string;
    private static CERT_PEM:string;


  
    private constructor() {
      //Server
      Environment.HOST = process.env['HOST'] ?? 'localhost';
      Environment.PORT = process.env['PORT'] ?? '3000';
      Environment.PROTOCOL = process.env['PROTOCOL'] ?? 'http';
      //DB
      Environment.DB_HOST = process.env['DB_HOST'] ?? 'localhost';
      Environment.DB_PORT= process.env['DB_PORT'] ?? '3306';
      Environment.DB_PWD = process.env['DB_PWD'] ?? 'admin';
      Environment.DB_USER = process.env['DB_USER'] ?? 'root';
      Environment.DB_NAME = process.env['DB_NAME'] ?? 'buenavista';   
  
      // certificado
      Environment.CERT_KEY = process.env['CERT_KEY'] ?? 'D:\CursoJava\Programacion\Web\Web-Back\Web-Back\env\certificado\cert.pem';
      Environment.CERT_PEM = process.env['CERT_PEM'] ?? 'D:\CursoJava\Programacion\Web\Web-Back\Web-Back\env\certificado\key.pem';   

    }
  
    public static getInstance(): Environment {
      if (Environment.instance === null || Environment.instance === undefined) {
        Environment.instance = new Environment()
      }
      return Environment.instance
    }
    
  
    public static getHost(): string {
      Environment.getInstance()
      return Environment.HOST
    }
  
    public static getPort(): string {
      Environment.getInstance()
      return Environment.PORT
    }
  
    public static getProtocol(): string {
      Environment.getInstance()
      return Environment.PROTOCOL
    }
  
    public static getAPIDomain(): string {
      Environment.getInstance()
      return `${Environment.PROTOCOL}://${Environment.HOST}:${Environment.PORT}`
    }
  
    // Getters para variables de base de datos
    public static getDBHost(): string {
      Environment.getInstance();
      return Environment.DB_HOST;
    }
  
  
    public static getDBPort(): string {
        Environment.getInstance();
        return Environment.DB_PORT;
    }
  
    public static getDBPassword(): string {
        Environment.getInstance();
        return Environment.DB_PWD;
    }
  
    public static getDBUser(): string {
        Environment.getInstance();
        return Environment.DB_USER;
    }
  
    public static getDBName(): string {
        Environment.getInstance();
        return Environment.DB_NAME;
    }
  
    // Getter para obtener la URL de conexión completa
    public static getDBConnectionString(): string {
        Environment.getInstance();
        return `mysql://${Environment.DB_USER}:${Environment.DB_PWD}@${Environment.DB_HOST}:${Environment.DB_PORT}/${Environment.DB_NAME}`;
    }
  
  
    public static getCertKey(): string {
      Environment.getInstance();
      return Environment.CERT_KEY;
    }
  
    public static getCertPem(): string {
      Environment.getInstance();
      return Environment.CERT_PEM;
    }
  }
  