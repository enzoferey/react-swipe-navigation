// min x delta swipe for horizontal swipe
const MIN_X = 30;  
// max y delta for horizontal swipe
const MAX_Y = 50;

let eventObj = {  
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0
};

let callback;

export function init(el, action) {  
  el.addEventListener('touchstart', handleStart, false);
  el.addEventListener('touchmove', handleMove, false);
  el.addEventListener('touchend', handleEnd, false);
  callback = action;
}

export function kill(el) {  
  el.removeEventListener('touchstart', handleStart);
  el.removeEventListener('touchmove', handleMove);
  el.removeEventListener('touchend', handleEnd);
  callback = undefined;
}

function handleStart(e) {  
  // assuming single touch, e.touches is an Array of all touches,
  // but with single touch there is only one element
  let touch = e.touches[0];
  eventObj.startX = touch.screenX;
  eventObj.startY = touch.screenY;
}

function handleMove(e) {  
  let touch = e.touches[0];
  eventObj.endX = touch.screenX;
  eventObj.endY = touch.screenY;
}

function handleEnd() {  
  let code;
  let xDelta = eventObj.startX - eventObj.endX;
  // check to see if the delta of X is great enough to trigger a swipe gesture
  // also see if the Y delta wasn’t too drastic to be considered horizontal
  if (Math.abs(xDelta) > MIN_X && Math.abs(eventObj.startY - eventObj.endY) < MAX_Y) {
    // acceptable swipe, now if it delta is negative, it’s a left swipe, otherwise right
    callback();
  }
}