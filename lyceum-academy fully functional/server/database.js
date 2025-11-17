import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = join(__dirname, 'database.sqlite');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Initialize database schema
export function initDatabase() {
  // Users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('Admin', 'Staff', 'Student')),
      permissions TEXT DEFAULT '{}',
      mustResetPassword INTEGER DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Contacts table
  db.exec(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      name TEXT NOT NULL,
      contactId TEXT,
      email TEXT,
      phone TEXT,
      department TEXT,
      major TEXT,
      notes TEXT,
      fileStatus TEXT,
      agentAssigned TEXT,
      checklist TEXT DEFAULT '[]',
      activityLog TEXT DEFAULT '[]',
      recordedSessions TEXT DEFAULT '[]',
      documents TEXT DEFAULT '[]',
      visaInformation TEXT DEFAULT '{}',
      lmsProgress TEXT DEFAULT '{}',
      lmsNotes TEXT DEFAULT '{}',
      gpa REAL,
      advisor TEXT,
      courses TEXT DEFAULT '[]',
      street1 TEXT,
      street2 TEXT,
      city TEXT,
      state TEXT,
      zip TEXT,
      country TEXT,
      gstin TEXT,
      pan TEXT,
      tags TEXT,
      visaType TEXT,
      countryOfApplication TEXT,
      source TEXT,
      contactType TEXT,
      stream TEXT,
      intake TEXT,
      counselorAssigned TEXT,
      applicationEmail TEXT,
      applicationPassword TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id)
    )
  `);

  // Leads table
  db.exec(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      company TEXT NOT NULL,
      value REAL NOT NULL,
      contact TEXT NOT NULL,
      stage TEXT NOT NULL CHECK(stage IN ('New', 'Qualified', 'Proposal', 'Won', 'Lost')),
      email TEXT,
      phone TEXT,
      source TEXT,
      assignedTo TEXT,
      notes TEXT,
      quotations TEXT DEFAULT '[]',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Transactions table
  db.exec(`
    CREATE TABLE IF NOT EXISTS transactions (
      id TEXT PRIMARY KEY,
      customerName TEXT NOT NULL,
      date TEXT NOT NULL,
      description TEXT,
      type TEXT NOT NULL CHECK(type IN ('Invoice', 'Bill', 'Payment')),
      status TEXT NOT NULL CHECK(status IN ('Paid', 'Pending', 'Overdue')),
      amount REAL NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Events table
  db.exec(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      start DATETIME NOT NULL,
      end DATETIME NOT NULL,
      color TEXT NOT NULL CHECK(color IN ('blue', 'green', 'purple', 'red')),
      description TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Tasks table
  db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      dueDate TEXT NOT NULL,
      status TEXT NOT NULL CHECK(status IN ('todo', 'inProgress', 'done')),
      userId INTEGER,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id)
    )
  `);

  // Channels table
  db.exec(`
    CREATE TABLE IF NOT EXISTS channels (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      type TEXT NOT NULL CHECK(type IN ('public', 'private', 'dm')),
      members TEXT DEFAULT '[]',
      messages TEXT DEFAULT '[]',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Coupons table
  db.exec(`
    CREATE TABLE IF NOT EXISTS coupons (
      code TEXT PRIMARY KEY,
      discountPercentage REAL NOT NULL,
      isActive INTEGER DEFAULT 1,
      applicableCourseIds TEXT DEFAULT '[]'
    )
  `);

  // LMS Courses table
  db.exec(`
    CREATE TABLE IF NOT EXISTS lms_courses (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      instructor TEXT,
      price REAL,
      modules TEXT DEFAULT '[]',
      discussions TEXT DEFAULT '[]',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Visitors table
  db.exec(`
    CREATE TABLE IF NOT EXISTS visitors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      company TEXT NOT NULL,
      host TEXT NOT NULL,
      scheduledCheckIn DATETIME,
      checkIn DATETIME,
      checkOut DATETIME,
      status TEXT NOT NULL CHECK(status IN ('Scheduled', 'Checked-in', 'Checked-out')),
      cardNumber TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Quotation Templates table
  db.exec(`
    CREATE TABLE IF NOT EXISTS quotation_templates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      lineItems TEXT DEFAULT '[]',
      total REAL DEFAULT 0,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Activity Log table
  db.exec(`
    CREATE TABLE IF NOT EXISTS activity_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      adminName TEXT NOT NULL,
      action TEXT NOT NULL
    )
  `);

  // Payment Activity Log table
  db.exec(`
    CREATE TABLE IF NOT EXISTS payment_activity_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      text TEXT NOT NULL,
      amount REAL NOT NULL,
      type TEXT NOT NULL CHECK(type IN ('invoice_created', 'payment_received'))
    )
  `);

  // Notifications table
  db.exec(`
    CREATE TABLE IF NOT EXISTS notifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      read INTEGER DEFAULT 0,
      linkTo TEXT DEFAULT '{}',
      recipientUserIds TEXT DEFAULT '[]',
      recipientRoles TEXT DEFAULT '[]'
    )
  `);

  console.log('Database initialized successfully');
}

export default db;

