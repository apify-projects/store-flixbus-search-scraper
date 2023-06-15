import { createPlaywrightRouter } from 'crawlee';

import { FINAL_RESULT_PAGE, START } from './constants.js';
import startHandler from './handlers/startHandler.js';

export const router = createPlaywrightRouter();

router.addDefaultHandler(async ({ log }) => {
    log.info(`Running default handler`);
});
router.addHandler(START, startHandler)