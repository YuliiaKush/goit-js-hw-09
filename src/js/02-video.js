import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const throttle = require('lodash.throttle');

const STORAGE_KEY = 'video-current-time';

const iframe = document.querySelector('iframe');

const player = new Player(iframe);

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

const currentTime = JSON.parse(localStorage.getItem(STORAGE_KEY));

if (currentTime) player.setCurrentTime(currentTime.seconds);
