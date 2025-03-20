import bcrypt from "bcrypt";
import { IBcryptService } from '../Domain/IBcryptService'; 

export class BcryptService implements IBcryptService {
    private readonly saltRounds: number;

    constructor(saltRounds: number = 10) {
        this.saltRounds = saltRounds; 
    }

    public async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, this.saltRounds);
    }

    public async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }
}