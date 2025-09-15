import { pgTable, serial, text, timestamp, boolean } from 'drizzle-orm/pg-core'

// Example tables for markmywords
export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .$onUpdate(() => new Date())
    .notNull(),
})

export const predictions = pgTable('predictions', {
  id: serial('id').primaryKey(),
  userEmail: text('user_email').notNull(), // or a FK if you prefer ids
  text: text('text').notNull(),
  dueAt: timestamp('due_at', { withTimezone: true }).notNull(),
  resolved: boolean('resolved').default(false).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .$onUpdate(() => new Date())
    .notNull(),
})
