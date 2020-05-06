import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

export class JSONObject {}

@Scalar('JSONObject', type => JSONObject)
export class JSONObjectScalar implements CustomScalar<object, object> {
  description = 'JSONObject custom scalar type';

  parseValue(value: object): object {
    return value; // this is the value a client sends to the server
  }

  serialize(value: object): object {
    return value; // this is the value the server sends to the client
  }

  parseLiteral(ast: any): object {
    if (ast.kind === Kind.OBJECT) {
      return new Object(ast.value);
    }
    return null;
  }
}
