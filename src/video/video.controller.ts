import { InjectQueue } from '@nestjs/bullmq';
import { Body, Controller, Post } from '@nestjs/common';
import { Queue } from 'bullmq';

@Controller('video')
export class VideoController {


    constructor(@InjectQueue('video') private readonly videoQueue:Queue){}
    @Post('process')
    async processVideo(){
        await this.videoQueue.add("process",{filename:"best",fileType:'mp4'},{removeOnComplete:1000,removeOnFail:3000})
        return {
            message:'Video is processing '
        }
    }
}
