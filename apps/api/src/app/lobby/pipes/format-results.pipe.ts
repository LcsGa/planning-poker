import { Injectable, PipeTransform } from "@nestjs/common";
import { PointsLabel, User, VoteResult } from "@planning-poker/shared";

@Injectable()
export class FormatResultsPipe implements PipeTransform {
  public transform(users: User[]) {
    const results = new Map<VoteResult[0], VoteResult[1]>(
      [...PointsLabel.keys()].reduce((acc, label) => [...acc, [label, []]], [])
    );

    users.forEach((user) => {
      const vote = user.vote;
      if (vote) results.set(vote, [...results.get(vote), user.name]);
    });

    return [...results.entries()];
  }
}
