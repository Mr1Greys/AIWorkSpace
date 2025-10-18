import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@/common/logger/logger.service';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private userSockets = new Map<string, string>();

  constructor(
    private chatService: ChatService,
    private logger: Logger
  ) {}

  handleConnection(client: Socket) {
    const userId = client.handshake.auth.userId;
    if (userId) {
      this.userSockets.set(userId, client.id);
      this.logger.log(`User ${userId} connected: ${client.id}`, 'ChatGateway');
    }
  }

  handleDisconnect(client: Socket) {
    const userId = Array.from(this.userSockets.entries()).find(
      ([, socketId]) => socketId === client.id
    )?.[0];
    if (userId) {
      this.userSockets.delete(userId);
      this.logger.log(`User ${userId} disconnected`, 'ChatGateway');
    }
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(client: Socket, payload: any) {
    try {
      const message = await this.chatService.createMessage(payload);

      // Send to recipient if online
      const recipientSocketId = this.userSockets.get(payload.recipientId);
      if (recipientSocketId) {
        this.server.to(recipientSocketId).emit('newMessage', message);
      }

      // Confirm to sender
      client.emit('messageSent', message);
    } catch (error) {
      this.logger.error('Error sending message', error.stack, 'ChatGateway');
      client.emit('error', { message: 'Failed to send message' });
    }
  }

  @SubscribeMessage('typing')
  handleTyping(client: Socket, payload: { projectId: string; recipientId: string }) {
    const recipientSocketId = this.userSockets.get(payload.recipientId);
    if (recipientSocketId) {
      this.server.to(recipientSocketId).emit('userTyping', {
        projectId: payload.projectId,
        userId: client.handshake.auth.userId,
      });
    }
  }

  @SubscribeMessage('stopTyping')
  handleStopTyping(client: Socket, payload: { projectId: string; recipientId: string }) {
    const recipientSocketId = this.userSockets.get(payload.recipientId);
    if (recipientSocketId) {
      this.server.to(recipientSocketId).emit('userStoppedTyping', {
        projectId: payload.projectId,
        userId: client.handshake.auth.userId,
      });
    }
  }
}
