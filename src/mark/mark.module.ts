import { HttpException, HttpStatus, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { MongooseModule } from '@nestjs/mongoose';
import { MarkController } from './mark.controller';
import { MarkService } from './mark.service';
import { Mark, MarkSchema } from './schemas/mark.schema';

@Module({
  imports : [ 
    MulterModule.register({
      limits: {
        // fileSize: 1000000,
      },
      fileFilter: (req: any, file: any, cb: any) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          cb(null, true);
        } else {
          cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
        }
      },
      storage: diskStorage({
        destination: (req: any, file: any, cb: any) => {  
          const uploadPath = '../client/public/uploads/marks'
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath);
          }
          cb(null, uploadPath);
        },
        filename: (req: any, file: any, cb: any) => {
          cb(null, `${Date.now()}${extname(file.originalname)}`);
        },
      }),
    }),
    MongooseModule.forFeature([{name : Mark.name, schema: MarkSchema }])
  ],
  controllers: [MarkController],
  providers: [MarkService]
})
export class MarkModule {}
