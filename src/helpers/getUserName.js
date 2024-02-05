const getUserName = (argsArr) => {
  let user = 'Anonymous';
  argsArr
    .forEach((arg) => {
      if (arg.startsWith('--username=')) {
        user = arg.slice(arg.indexOf('=') + 1);
      }
    });
  return user;
}

export default getUserName;
