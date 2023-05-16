'use strict';

import a from '../lib/index.mjs'
import { strict } from 'assert'

strict.strictEqual(a(), 'Hello from A');
console.info("a tests passed");
