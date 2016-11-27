export const throttle = (func, wait) => {
  let context, args, previousArgs, argsChanged, result;
  let previous = 0;

  return function() {
    let now, remaining;
    context = this;
    if (wait) {
      now = Date.now();
      remaining = wait - (now - previous);
    }

    args = arguments;
    argsChanged = JSON.stringify(args) != JSON.stringify(previousArgs);
    previousArgs = args; //update the value of prevArgs

    if (argsChanged || wait && (remaining <= 0 || remaining > wait)) {
      if (wait) {
        previous = now;
      }

      result = func.apply(context, args);
    }

    return result;
  }
};
