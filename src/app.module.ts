import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bullmq';
import { VideoProcessor } from './video/video.worker';
import { VideoController } from './video/video.controller';
import { VideoQueueEventListener } from './video/video-queue.event';

/**
 * step 1 :install bullmq "npm install --save @nestjs/bullmq bullmq"
 * step 2: Register bull module and specify redis sever credentials
 * step 3: Register a bull queue
 * step 4: Send jobs to the queue 
 */


@Module({
  imports: [
    BullModule.forRoot({connection:{host:'localhost',port:6379},
      defaultJobOptions:{attempts:3},
    }),
    BullModule.registerQueue({name:'video'})
  ],
  controllers: [AppController, VideoController,VideoQueueEventListener],
  providers: [AppService,VideoProcessor],
})
export class AppModule {}
