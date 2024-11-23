import {Inter} from 'next/font/google'; // import "Inter" font utility from next.js's google font integration.
import { Lusitana } from 'next/font/google';

export const inter = Inter({subsets: ['latin']}) // export inter instance configuration to load the latin subset.
export const lusitana = Lusitana({weight: ['400', '700'], subsets: ['latin']})