import { FromSchema } from 'json-schema-to-ts';

export const eventSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        userId: { type: 'string' },
      },
      required: ['userId'],
    },
  },
  required: ['body'],
} as const;

export const responseSchema = {
  type: 'object',
  required: ['body', 'statusCode', 'headers'],
  properties: {
    body: {
      type: 'string',
    },
    statusCode: {
      type: 'number',
    },
    headers: {
      type: 'object',
    },
  },
} as const;

export type CreateNftInput = FromSchema<typeof eventSchema>;
