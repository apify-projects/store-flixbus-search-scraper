import { createPlaywrightRouter } from 'crawlee';

import { FINAL_RESULT_PAGE, START } from './constants.js';
import startHandler from './handlers/startHandler.js';
import finalResultPageHandler from './handlers/finalResultPageHandler.js';

export const router = createPlaywrightRouter();

router.addDefaultHandler(async ({ log }) => {
    log.info(`Running default handler`);
});
router.addHandler(START, startHandler)
router.addHandler(FINAL_RESULT_PAGE, finalResultPageHandler);