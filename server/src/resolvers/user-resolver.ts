import {Resolver, Query, Arg, Int} from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import {User} from "../entity/User";


@Resolver(of => User)
export class UserResolver {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) {}

    @Query(returns => [User])
    users(): Promise<User[]> {
        return this.userRepository.find();
    }

    @Query(returns => User)
    user(@Arg("userId", type => Int) userId: number): Promise<User> {
        return this.userRepository.findOne(userId);
    }
}
