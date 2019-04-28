import { Service } from "typedi";

@Service()
export class JwtService {

    decode(headers) {
        if (headers["authorization"]) {
            const auth = headers["authorization"].split(' ');
            if (/^Bearer$/i.test(auth[0])) {
                const token = auth[1];
                return token;
            }
            return false;
        }
        return false;
    }
}
