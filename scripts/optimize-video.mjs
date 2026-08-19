import { execFileSync } from 'node:child_process';
import ffmpeg from 'ffmpeg-static';

const SRC = 'src/assets/video.mp4';

execFileSync(ffmpeg, ['-y', '-i', SRC, '-t', '10', '-vf', 'scale=854:-2', '-an',
  '-c:v', 'libvpx-vp9', '-b:v', '350k', '-minrate', '350k', '-maxrate', '350k',
  '-cpu-used', '4', '-row-mt', '1', 'src/assets/video-loop.webm']);

execFileSync(ffmpeg, ['-y', '-i', SRC, '-t', '10', '-vf', 'scale=854:-2', '-an',
  '-c:v', 'libx264', '-b:v', '500k', '-maxrate', '600k', '-bufsize', '1200k',
  '-preset', 'veryslow', '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
  'src/assets/video-loop.mp4']);