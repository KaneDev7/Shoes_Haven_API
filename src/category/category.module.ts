import { HttpException, HttpStatus, Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MulterModule } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './schemas/category.schema';

@Module({
  imports : [ 
    MulterModule.register({
      limits: {
        fileSize: 1000000,
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
          const uploadPath = '../client/public/uploads'
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
    MongooseModule.forFeature([{name : Category.name, schema: CategorySchema }])

  ],
  providers: [CategoryService],
  controllers: [CategoryController]
})
export class CategoryModule {}
