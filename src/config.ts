import { config as configEnv } from 'dotenv'
import { expand } from 'dotenv-expand'
import * as path from 'path'
import { z } from 'zod'

type RunMode = 'production' | 'test' | 'development'

const MODE_ENV_FILES: Record<RunMode, string[]> = {
	production: ['.env.production.local', '.env.local', '.env'],
	test: ['.env.test.local', '.env.local', '.env'],
	development: ['.env.development.local', '.env.local', '.env'],
}

function resolveMode(raw: string | undefined): RunMode {
	if (raw === 'production' || raw === 'prod') return 'production'
	if (raw === 'test') return 'test'
	return 'development'
}

const mode = resolveMode(process.env.NODE_ENV)

// Load files in priority order — first file wins for already-set keys
for (const file of MODE_ENV_FILES[mode]) {
	expand(
		configEnv({
			path: path.resolve(process.cwd(), file),
			override: false, // don't overwrite keys already loaded
		}),
	)
}

const envSchema = z.object({
	BOT_TOKEN: z.string().min(1),
	BOT_ADMINS: z
		.string()
		.transform((val) => JSON.parse(val))
		.pipe(z.array(z.number().int().positive())),
	DEBUG: z.enum(['True', 'False']).transform((val) => val === 'True'),
})

const env = envSchema.parse(process.env)

export const config = {
	BOT_TOKEN: env.BOT_TOKEN,
	BOT_ADMINS: env.BOT_ADMINS,
	DEBUG: env.DEBUG,
	MODE: mode,
} as const

export type Config = typeof config
