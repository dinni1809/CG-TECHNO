import { CommChannel } from '@prisma/client';

export interface CommChannelSender {
  channel: CommChannel;
  send(payload: any): Promise<any>;
}
