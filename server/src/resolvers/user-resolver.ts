import {Resolver, Query, Arg, Ctx, Int} from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import {User} from "../entity/User";


@Resolver(of => User)
export class UserResolver {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) {}

    @Query(returns => [User])
    users(@Ctx() context): Promise<User[]> {
        console.log(context.user);
        return this.userRepository.find();
    }

    @Query(returns => User)
    user(@Arg("userId", type => Int) userId: number): Promise<User> {
        return this.userRepository.findOne(userId);
    }
}
