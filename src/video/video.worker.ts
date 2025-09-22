import { OnWorkerEvent, Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";

@Processor('video',{limiter:{duration:10000,max:20}})
export class VideoProcessor extends WorkerHost{
    async process(job: Job, token?: string): Promise<any> {
        
        
        await new Promise((resolve)=>setTimeout(resolve,5000))

    }


    @OnWorkerEvent('active')
    onAdded(job:Job){
        console.log('got new job',job.id)
    }


    @OnWorkerEvent('completed')
    onCompleted(job:Job){
        console.log('got completed',job.id)
    }

    @OnWorkerEvent('failed')
    onFailed(job:Job){
        console.log('got Failed',job.id)
        console.log('Attempt Number',job.attemptsMade)
    }

}