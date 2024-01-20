var ffmpeg = require('fluent-ffmpeg');
var axios = require('axios');
const fs = require('fs');
const riddles = require('./riddles.js');
const { upload } = require('youtube-videos-uploader'); //vanilla javascript
const { exec } = require('child_process');

const inputVideo = 'out.mp4';
//const outputVideo = 'zw1.mp4';

// recoveryemail is optional, only required to bypass login with recovery email if prompted for confirmation
const credentials = { email: 'ambarnath898@gmail.com', pass: '99669966', recoveryemail: '' }

// minimum required options to upload video


const onVideoUploadSuccess = (videoUrl) => {
    console.log(videoUrl);
}
// var duratn;
// make sure you set the correct path to your video file
//  ffmpeg.ffprobe('./Akhand Sarcastic.mp4', function(err, metadata) {
//     //console.dir(metadata); // all metadata
//     //console.log(metadata.format.duration);
//     duratn = metadata.format.duration;
// });

//  let i =0;

// while (i<1) {
//   scheduling(i);
//   i++;
// }

// function scheduling(i){
//   setTimeout(function(){
//     console.log(i);
//     loop(i);
//   }, (2 * 60 * 1000)*i)
// }

(async  () => {
  for (let i = 0; i < riddles.length; i++) {
          
          await delay();
          console.log(i);
          loop(i);
  }
})();

function delay() {
  return new Promise((resolve, reject) => {
          setTimeout(resolve, 60000);
  });
}

// for (let i = 0; i < riddles.length; i++)
//   (function(i) {
//     setTimeout(function() {
//       scheduling(i);
//     }, i * 90000);
//   })(i);



// // do{
  
//  while(i<riddles.length){
    
//     cron.schedule("15 * * * * *", function () {
//       console.log(i);
//        setTimeout(() => {
       
//         loop(i);
        
//        }, 1000)
       
//       });
//       i++;
//     }
 //setTimeout(() => { scheduler.stop() }, 45000*i)

     
       
//       }

// Create a new cron job
//let i = 0;
// while(i<riddles.length){
// const job = new CronJob('1 * * * *', () => {
//   // This function will be executed every second
//   console.log('Cron job is running...');
//   loop(i);
//   i++;
// }); // The last argument (false) is important to initially prevent the job from starting

// // Start the cron job

// // Stop the cron job after 5 seconds
// setTimeout(() => {
//   console.log('Stopping cron job...');
//   job.stop();
// }, 75000*i); // Stop after 5 seconds

// }

function loop(i){

    //setTimeout(generateTextFile, 3000, i);
        
    //setTimeout(generateVideoFile, 9000);

    //setTimeout(applyEffectToVideo, 20000, i);
  
    setTimeout(uploadVideoFile, 30000, i);
  
}

       
       
       function generateTextFile(i) {
        var data = riddles[i];
        data = data.split(/((?:\S+\s*){5})/g).filter(Boolean).join('\n\n');
        
         fs.writeFile('riddle.txt', data, (err) => {
          if (err) {
            throw err;
          }
          console.log('The file has been saved!');
          
        });
      }

       function generateVideoFile(){
        var proc = ffmpeg('./Virendra.mp4').duration(20)
        .videoFilters({ 
      filter: 'drawtext',
      options: {
        fontfile:'sans-serif.ttf',
        textfile: 'riddle.txt',
        fontsize: 50,
        fontcolor: 'black',
        x:'(w-text_w)/2',
        y:'(h-text_h)/2',
        shadowcolor: 'white',
        shadowx: 0,
        enable:"between(t,0,10)",
        shadowy: 0,
      } 
    })
    .addInput('./joyful-snowman_60sec-176773.mp3')
    // .videoFilters({
    //     filter: 'drawtext',
    //     options: {
    //       fontfile:'font.ttf',
    //       text: 'can change your whole day' ,
    //       fontsize: 20,
    //       fontcolor: 'white',
    //       x: '(main_w/2-text_w/2)',
    //       y: 50,
    //       shadowcolor: 'black',
    //       shadowx: 2,
    //       enable:"between(t,6,10)",
    //       shadowy: 2
    //     }
    // })
      //  .input('Video2.mp4')
        .on('end', function () {
            console.log('file has been converted succesfully');
        })
        .on('error', function (err) {
            console.log('an error happened: ' + err.message);
        })
        // save to file
       .save('./out.mp4');

        // ffmpeg()
        // .addInput('./Akhand Sarcastic.mp4') //your video file input path
        // .addInput('./joyful-snowman_60sec-176773.mp3') //your audio file input path
        // .output('/.outp.mp4') //your output path
        // .outputOptions(['-map 0:v', '-map 1:a', '-c:v copy', '-shortest'])
        // .save('/.outp.mp4')
      }

      function applyEffectToVideo(i) {
        const filterExpression = `[0][1]scale2ref,overlay='if(gt(random(0), 0.2), 1, 4)':'if(gt(random(0), 0.1), 1, 2)', "boxblur=1" `;
        //const filterExpression = `[0][1]scale2ref,overlay=x='if(gt(random(0), 0.2), 1, 4)':'if(gt(random(0), 0.1), 1, 2)', "boxblur=1" `;
        const ffmpegCommand = `ffmpeg -f lavfi -i color=s=1080x1920 -i ${inputVideo} -filter_complex "${filterExpression}" -t 20 zw${i}.mp4`;
        exec(ffmpegCommand, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error: ${error.message}`);
            return;
          }
          if (stderr) {
            console.error(`FFmpeg stderr: ${stderr}`);
            return;
          }
          console.log('Shake effect applied successfully!');
        });
      }

      function uploadVideoFile(i){
      const video1 = { path: 'out.mp4', title: 'test video title', description: 'test video description' }
       upload (credentials, [video1], {headless:true}).then(console.log)
      }




