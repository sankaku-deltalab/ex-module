import {ExProtocol} from '../../core/protocol';
import {ExStruct} from '../../core/struct';
import {OneOfExStruct, ImplSayForOneOfExS} from '../modules/one-of-ex-struct';
import {
  OneOfExStruct2,
  ImplSayForOneOfExS2,
} from '../modules/one-of-ex-struct2';

export interface SayProtocol<T extends ExStruct> {
  say(v: T): string;
}

export const Say = ExProtocol.accumulate({
  [OneOfExStruct.__exModule__]: new ImplSayForOneOfExS(),
  [OneOfExStruct2.__exModule__]: new ImplSayForOneOfExS2(),
});
