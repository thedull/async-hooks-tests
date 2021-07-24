import async_hooks from 'async_hooks';
import syncLog from './syncLog.js';

const init = (asyncId, type, triggerAsyncId, resource) => {
    syncLog({ asyncId, type, triggerAsyncId, resource  })
};

const before = (asyncId) => {
    syncLog(`Before ${asyncId}`);
};

const after = (asyncId) => {
    syncLog(`After ${asyncId}`);
};

const destroy = (asyncId) => {
    syncLog(`Destroyed ${asyncId}`);
};

const asyncHook = async_hooks.createHook({ init, before, after, destroy });

asyncHook.enable();

setTimeout(() => {
    syncLog('Timeout');
  //  asyncHook.disable();
}, 1000);

// await Promise.resolve(1);

// asyncHook.disable();

