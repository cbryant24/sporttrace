export default store => next => action => {
    console.log('Logger:', action);
    return next(action)
}
