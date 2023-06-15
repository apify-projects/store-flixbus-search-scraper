import { createPlaywrightRouter } from 'crawlee';

import { START } from './constants.js';
import startHandler from './handlers/startHandler.js';

export const router = createPlaywrightRouter();

router.addDefaultHandler(async ({ log }) => {
    log.info(`Running default handler`);
});
router.addHandler(START, startHandler)