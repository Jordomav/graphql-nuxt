import * as bcrypt from "bcrypt";
import { Service } from "typedi";

const saltRounds = 10;

@Service()
export class BcryptService {

    public genHash(toBeHashed): Promise<string> {
        return this.genSalt().then((salt: string): Promise<string> => {
            return bcrypt.hash(toBeHashed, salt);
        });
    }

    public compare(data: string, compareAgainst: string): Promise<boolean> {
        return bcrypt.compare(data, compareAgainst);
    }

    private genSalt(): Promise<string> {
        return bcrypt.genSalt(saltRounds);
    }
}
