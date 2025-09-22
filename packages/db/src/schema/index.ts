import { relations } from 'drizzle-orm'
import { pgTable, serial, text, timestamp, boolean } from 'drizzle-orm/pg-core'

// Example tables for markmywords
export const usersTable = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .$onUpdate(() => new Date())
    .notNull(),
})

export const usersRelations = relations(usersTable, ({ many }) => ({
  predictions: many(predictionsTable),
}))

export const predictionsTable = pgTable('predictions', {
  id: serial('id').primaryKey(),
  userId: text('userId')
    .references(() => usersTable.id)
    .notNull(),
  content: text('content').notNull(),
  remindAt: timestamp('remindAt', { withTimezone: true }),
  skipRemind: boolean().notNull().default(false),
  isPrivate: boolean().notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .$onUpdate(() => new Date())
    .notNull(),
})

export const predictionsRelations = relations(predictionsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [predictionsTable.userId],
    references: [usersTable.id],
  }),
}))
