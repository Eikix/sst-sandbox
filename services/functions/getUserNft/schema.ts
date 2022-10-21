import { FromSchema } from 'json-schema-to-ts';

export const eventSchema = {
  type: 'object',
  properties: {
    pathParameters: {
      type: 'object',
      properties: {
        userId: { type: 'string' },
      },
      additionalProperties: false,
      required: ['userId'],
    },
  },
  required: ['pathParameters'],
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

export type GetUserNftInput = FromSchema<typeof eventSchema>;
