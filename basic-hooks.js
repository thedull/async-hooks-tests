import async_hooks from 'async_hooks';
import syncLog from './syncLog.js';

const init = (asyncId, type, triggerAsyncId, resource) => {
    syncLog({ asyncId, type, triggerAsyncId, resource, executionAsyncId: async_hooks.executionAsyncId() })
};

const before = (asyncId) => {
    syncLog(`Before ${asyncId}. Exec.Id: ${async_hooks.executionAsyncId()}`);
};

const after = (asyncId) => {
    syncLog(`After ${asyncId}. Exec.Id: ${async_hooks.executionAsyncId()}`);
};

const destroy = (asyncId) => {
    syncLog(`Destroyed ${asyncId}. Exec.Id: ${async_hooks.executionAsyncId()}`);
};

const asyncHook = async_hooks.createHook({ init, before, after, destroy });

asyncHook.enable();

setTimeout(() => {
    syncLog('Timeout');
  //  asyncHook.disable();
}, 1000);

// await Promise.resolve(1);

// asyncHook.disable();

