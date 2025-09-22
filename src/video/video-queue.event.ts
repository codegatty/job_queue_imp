import{
QueueEventsListener,
OnQueueEvent,
QueueEventsHost
} from '@nestjs/bullmq';

import { Logger } from '@nestjs/common';

@QueueEventsListener('video')
export class VideoQueueEventListener extends QueueEventsHost{
    logger = new Logger('Queue');

    @OnQueueEvent('added')
    onAdded(job:{jobId:string; name:string}){
        this.logger.log('job has been added ',job.jobId);
    }
}