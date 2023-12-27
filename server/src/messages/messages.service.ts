import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}
  message: Message[] = [{ senderName: 'Soul', message: 'heyyyy' }];
  clientToUser = {};
  // create(createMessageDto: CreateMessageDto, clientId: string) {
  //   const message = {
  //     name: this.clientToUser[clientId],
  //     text: createMessageDto.text,
  //   };
  //   this.message.push(createMessageDto);
  //   return message;
  // }

  async create(createMessageDto: CreateMessageDto, clientId: string) {
    const message = await this.prisma.message.create({
      data: {
        message: createMessageDto.message,
        senderName: "1",
        recieverName: "2",
      },
    });
    // this.message.push(createMessageDto);
    return message;
  }

  async findAll() {
    return await this.prisma.message.findMany({});
  }

  identify(name: string, clientId: string) {
    this.clientToUser[clientId] = name;
    return Object.values(this.clientToUser);
  }

  getClientByName(clientId: string) {
    return this.clientToUser[clientId];
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} message`;
  // }

  // update(id: number, updateMessageDto: UpdateMessageDto) {
  //   return `This action updates a #${id} message`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} message`;
  // }
}
