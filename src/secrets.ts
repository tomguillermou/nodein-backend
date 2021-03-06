import dotenv from 'dotenv';
import fs from 'fs';

import { ENV_FILE, SECRETS } from '@config/configuration';

const DEFAULT_ENV_FILE = '.env.example';

/**
 * Load secrets from the environment file.
 */
function loadSecrets(): void {
    // Detect file to load secrets from
    const path = fs.existsSync(ENV_FILE) ? ENV_FILE : DEFAULT_ENV_FILE;
    console.log(`[log] Loading secrets from file: ${path}`);

    // Load environment variables
    dotenv.config({ path });

    // Make sure no secret is missing, otherwise exit process
    let missingSecret = false;

    for (const secret of SECRETS) {
        if (typeof process.env[secret] === 'undefined' || !process.env[secret]) {
            console.error(`[error] ${secret} is missing from file: ${path}`);
            missingSecret = true;
        }
    }

    if (missingSecret) {
        process.exit(1);
    }
}

loadSecrets();
