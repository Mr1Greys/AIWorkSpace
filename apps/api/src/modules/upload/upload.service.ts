import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@/common/logger/logger.service';

@Injectable()
export class UploadService {
  constructor(
    private configService: ConfigService,
    private logger: Logger
  ) {}

  async uploadFile(file: Express.Multer.File) {
    // TODO: Implement S3 upload
    this.logger.log(`File uploaded: ${file.originalname}`, 'Upload');
    return {
      url: `https://example.com/${file.filename}`,
      filename: file.filename,
      size: file.size,
    };
  }

  async deleteFile(filename: string) {
    // TODO: Implement S3 delete
    this.logger.log(`File deleted: ${filename}`, 'Upload');
  }
}
