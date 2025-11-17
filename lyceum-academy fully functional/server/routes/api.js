import express from 'express';
import db from '../database.js';
import { authenticateToken, requireRole } from '../auth.js';

const router = express.Router();

// Helper to parse JSON fields
function parseJsonField(field) {
  try {
    return typeof field === 'string' ? JSON.parse(field) : field;
  } catch {
    return field;
  }
}

// Helper to stringify JSON fields
function stringifyJsonField(field) {
  return typeof field === 'object' ? JSON.stringify(field) : field;
}

// Apply auth to all routes
router.use(authenticateToken);

// Users routes
router.get('/users', (req, res) => {
  try {
    const users = db.prepare('SELECT id, name, email, role, permissions, mustResetPassword FROM users').all();
    res.json(users.map(u => ({ ...u, permissions: parseJsonField(u.permissions) })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/users', requireRole('Admin'), async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const bcrypt = await import('bcryptjs');
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = db.prepare(`
      INSERT INTO users (name, email, password, role, permissions)
      VALUES (?, ?, ?, ?, ?)
    `).run(name, email.toLowerCase(), hashedPassword, role, JSON.stringify({}));
    const user = db.prepare('SELECT id, name, email, role, permissions FROM users WHERE id = ?').get(result.lastInsertRowid);
    res.json({ ...user, permissions: parseJsonField(user.permissions) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/users/:id', (req, res) => {
  try {
    const { name, email, role, permissions } = req.body;
    db.prepare('UPDATE users SET name = ?, email = ? WHERE id = ?').run(name, email.toLowerCase(), req.params.id);
    if (role) {
      db.prepare('UPDATE users SET role = ?, permissions = ? WHERE id = ?').run(role, JSON.stringify(permissions || {}), req.params.id);
    }
    const user = db.prepare('SELECT id, name, email, role, permissions FROM users WHERE id = ?').get(req.params.id);
    res.json({ ...user, permissions: parseJsonField(user.permissions) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Contacts routes
router.get('/contacts', (req, res) => {
  try {
    const contacts = db.prepare('SELECT * FROM contacts').all();
    res.json(contacts.map(c => ({
      ...c,
      checklist: parseJsonField(c.checklist),
      activityLog: parseJsonField(c.activityLog),
      recordedSessions: parseJsonField(c.recordedSessions),
      documents: parseJsonField(c.documents),
      visaInformation: parseJsonField(c.visaInformation),
      lmsProgress: parseJsonField(c.lmsProgress),
      lmsNotes: parseJsonField(c.lmsNotes),
      courses: parseJsonField(c.courses)
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/contacts', (req, res) => {
  try {
    const contact = req.body;
    const result = db.prepare(`
      INSERT INTO contacts (
        userId, name, contactId, email, phone, department, major, notes, fileStatus,
        agentAssigned, checklist, activityLog, recordedSessions, documents, visaInformation,
        lmsProgress, lmsNotes, gpa, advisor, courses, street1, street2, city, state, zip,
        country, gstin, pan, tags, visaType, countryOfApplication, source, contactType,
        stream, intake, counselorAssigned, applicationEmail, applicationPassword
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      contact.userId || null,
      contact.name,
      contact.contactId || null,
      contact.email || null,
      contact.phone || null,
      contact.department || 'Unassigned',
      contact.major || 'Unassigned',
      contact.notes || null,
      contact.fileStatus || null,
      contact.agentAssigned || null,
      JSON.stringify(contact.checklist || []),
      JSON.stringify(contact.activityLog || []),
      JSON.stringify(contact.recordedSessions || []),
      JSON.stringify(contact.documents || []),
      JSON.stringify(contact.visaInformation || {}),
      JSON.stringify(contact.lmsProgress || {}),
      JSON.stringify(contact.lmsNotes || {}),
      contact.gpa || null,
      contact.advisor || null,
      JSON.stringify(contact.courses || []),
      contact.street1 || null,
      contact.street2 || null,
      contact.city || null,
      contact.state || null,
      contact.zip || null,
      contact.country || null,
      contact.gstin || null,
      contact.pan || null,
      contact.tags || null,
      contact.visaType || null,
      contact.countryOfApplication || null,
      contact.source || null,
      contact.contactType || null,
      contact.stream || null,
      contact.intake || null,
      contact.counselorAssigned || null,
      contact.applicationEmail || null,
      contact.applicationPassword || null
    );
    const saved = db.prepare('SELECT * FROM contacts WHERE id = ?').get(result.lastInsertRowid);
    res.json({
      ...saved,
      checklist: parseJsonField(saved.checklist),
      activityLog: parseJsonField(saved.activityLog),
      recordedSessions: parseJsonField(saved.recordedSessions),
      documents: parseJsonField(saved.documents),
      visaInformation: parseJsonField(saved.visaInformation),
      lmsProgress: parseJsonField(saved.lmsProgress),
      lmsNotes: parseJsonField(saved.lmsNotes),
      courses: parseJsonField(saved.courses)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/contacts/:id', (req, res) => {
  try {
    const contact = req.body;
    db.prepare(`
      UPDATE contacts SET
        name = ?, email = ?, phone = ?, department = ?, major = ?, notes = ?,
        fileStatus = ?, agentAssigned = ?, checklist = ?, activityLog = ?,
        recordedSessions = ?, documents = ?, visaInformation = ?, lmsProgress = ?,
        lmsNotes = ?, gpa = ?, advisor = ?, courses = ?, street1 = ?, street2 = ?,
        city = ?, state = ?, zip = ?, country = ?, gstin = ?, pan = ?, tags = ?,
        visaType = ?, countryOfApplication = ?, source = ?, contactType = ?,
        stream = ?, intake = ?, counselorAssigned = ?, applicationEmail = ?,
        applicationPassword = ?
      WHERE id = ?
    `).run(
      contact.name,
      contact.email,
      contact.phone,
      contact.department,
      contact.major,
      contact.notes,
      contact.fileStatus,
      contact.agentAssigned,
      JSON.stringify(contact.checklist || []),
      JSON.stringify(contact.activityLog || []),
      JSON.stringify(contact.recordedSessions || []),
      JSON.stringify(contact.documents || []),
      JSON.stringify(contact.visaInformation || {}),
      JSON.stringify(contact.lmsProgress || {}),
      JSON.stringify(contact.lmsNotes || {}),
      contact.gpa,
      contact.advisor,
      JSON.stringify(contact.courses || []),
      contact.street1,
      contact.street2,
      contact.city,
      contact.state,
      contact.zip,
      contact.country,
      contact.gstin,
      contact.pan,
      contact.tags,
      contact.visaType,
      contact.countryOfApplication,
      contact.source,
      contact.contactType,
      contact.stream,
      contact.intake,
      contact.counselorAssigned,
      contact.applicationEmail,
      contact.applicationPassword,
      req.params.id
    );
    const saved = db.prepare('SELECT * FROM contacts WHERE id = ?').get(req.params.id);
    res.json({
      ...saved,
      checklist: parseJsonField(saved.checklist),
      activityLog: parseJsonField(saved.activityLog),
      recordedSessions: parseJsonField(saved.recordedSessions),
      documents: parseJsonField(saved.documents),
      visaInformation: parseJsonField(saved.visaInformation),
      lmsProgress: parseJsonField(saved.lmsProgress),
      lmsNotes: parseJsonField(saved.lmsNotes),
      courses: parseJsonField(saved.courses)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Leads routes
router.get('/leads', (req, res) => {
  try {
    const leads = db.prepare('SELECT * FROM leads').all();
    res.json(leads.map(l => ({ ...l, quotations: parseJsonField(l.quotations) })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/leads', (req, res) => {
  try {
    const lead = req.body;
    const result = db.prepare(`
      INSERT INTO leads (title, company, value, contact, stage, email, phone, source, assignedTo, notes, quotations)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      lead.title,
      lead.company,
      lead.value || 0,
      lead.contact,
      lead.stage || 'New',
      lead.email || null,
      lead.phone || null,
      lead.source || null,
      lead.assignedTo || null,
      lead.notes || null,
      JSON.stringify(lead.quotations || [])
    );
    const saved = db.prepare('SELECT * FROM leads WHERE id = ?').get(result.lastInsertRowid);
    res.json({ ...saved, quotations: parseJsonField(saved.quotations) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/leads/:id', (req, res) => {
  try {
    const lead = req.body;
    db.prepare(`
      UPDATE leads SET
        title = ?, company = ?, value = ?, contact = ?, stage = ?,
        email = ?, phone = ?, source = ?, assignedTo = ?, notes = ?, quotations = ?
      WHERE id = ?
    `).run(
      lead.title,
      lead.company,
      lead.value,
      lead.contact,
      lead.stage,
      lead.email,
      lead.phone,
      lead.source,
      lead.assignedTo,
      lead.notes,
      JSON.stringify(lead.quotations || []),
      req.params.id
    );
    const saved = db.prepare('SELECT * FROM leads WHERE id = ?').get(req.params.id);
    res.json({ ...saved, quotations: parseJsonField(saved.quotations) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Transactions routes
router.get('/transactions', (req, res) => {
  try {
    const transactions = db.prepare('SELECT * FROM transactions').all();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/transactions', (req, res) => {
  try {
    const transaction = req.body;
    const id = transaction.id || `INV-${String(Date.now()).slice(-6)}`;
    db.prepare(`
      INSERT INTO transactions (id, customerName, date, description, type, status, amount)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      transaction.customerName,
      transaction.date,
      transaction.description || null,
      transaction.type,
      transaction.status || 'Pending',
      transaction.amount
    );
    const saved = db.prepare('SELECT * FROM transactions WHERE id = ?').get(id);
    res.json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/transactions/:id', (req, res) => {
  try {
    const transaction = req.body;
    db.prepare(`
      UPDATE transactions SET
        customerName = ?, date = ?, description = ?, type = ?, status = ?, amount = ?
      WHERE id = ?
    `).run(
      transaction.customerName,
      transaction.date,
      transaction.description,
      transaction.type,
      transaction.status,
      transaction.amount,
      req.params.id
    );
    const saved = db.prepare('SELECT * FROM transactions WHERE id = ?').get(req.params.id);
    res.json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Events routes
router.get('/events', (req, res) => {
  try {
    const events = db.prepare('SELECT * FROM events').all();
    res.json(events.map(e => ({ ...e, start: new Date(e.start), end: new Date(e.end) })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/events', (req, res) => {
  try {
    const event = req.body;
    const result = db.prepare(`
      INSERT INTO events (title, start, end, color, description)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      event.title,
      event.start instanceof Date ? event.start.toISOString() : event.start,
      event.end instanceof Date ? event.end.toISOString() : event.end,
      event.color,
      event.description || null
    );
    const saved = db.prepare('SELECT * FROM events WHERE id = ?').get(result.lastInsertRowid);
    res.json({ ...saved, start: new Date(saved.start), end: new Date(saved.end) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/events/:id', (req, res) => {
  try {
    const event = req.body;
    db.prepare(`
      UPDATE events SET title = ?, start = ?, end = ?, color = ?, description = ?
      WHERE id = ?
    `).run(
      event.title,
      event.start instanceof Date ? event.start.toISOString() : event.start,
      event.end instanceof Date ? event.end.toISOString() : event.end,
      event.color,
      event.description,
      req.params.id
    );
    const saved = db.prepare('SELECT * FROM events WHERE id = ?').get(req.params.id);
    res.json({ ...saved, start: new Date(saved.start), end: new Date(saved.end) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/events/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM events WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Tasks routes
router.get('/tasks', (req, res) => {
  try {
    const tasks = db.prepare('SELECT * FROM tasks WHERE userId = ? OR userId IS NULL').all(req.user.id);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/tasks', (req, res) => {
  try {
    const task = req.body;
    const result = db.prepare(`
      INSERT INTO tasks (title, description, dueDate, status, userId)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      task.title,
      task.description || null,
      task.dueDate,
      task.status || 'todo',
      req.user.id
    );
    const saved = db.prepare('SELECT * FROM tasks WHERE id = ?').get(result.lastInsertRowid);
    res.json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Channels routes
router.get('/channels', (req, res) => {
  try {
    const channels = db.prepare('SELECT * FROM channels').all();
    res.json(channels.map(c => ({
      ...c,
      members: parseJsonField(c.members),
      messages: parseJsonField(c.messages)
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/channels', (req, res) => {
  try {
    const channel = req.body;
    const id = channel.id || `channel-${Date.now()}`;
    db.prepare(`
      INSERT INTO channels (id, name, type, members, messages)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      id,
      channel.name,
      channel.type || 'public',
      JSON.stringify(channel.members || []),
      JSON.stringify(channel.messages || [])
    );
    const saved = db.prepare('SELECT * FROM channels WHERE id = ?').get(id);
    res.json({
      ...saved,
      members: parseJsonField(saved.members),
      messages: parseJsonField(saved.messages)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/channels/:id', (req, res) => {
  try {
    const channel = req.body;
    db.prepare(`
      UPDATE channels SET name = ?, type = ?, members = ?, messages = ?
      WHERE id = ?
    `).run(
      channel.name,
      channel.type,
      JSON.stringify(channel.members || []),
      JSON.stringify(channel.messages || []),
      req.params.id
    );
    const saved = db.prepare('SELECT * FROM channels WHERE id = ?').get(req.params.id);
    res.json({
      ...saved,
      members: parseJsonField(saved.members),
      messages: parseJsonField(saved.messages)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Coupons routes
router.get('/coupons', (req, res) => {
  try {
    const coupons = db.prepare('SELECT * FROM coupons').all();
    res.json(coupons.map(c => ({
      ...c,
      applicableCourseIds: parseJsonField(c.applicableCourseIds),
      isActive: c.isActive === 1
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/coupons', (req, res) => {
  try {
    const coupon = req.body;
    db.prepare(`
      INSERT OR REPLACE INTO coupons (code, discountPercentage, isActive, applicableCourseIds)
      VALUES (?, ?, ?, ?)
    `).run(
      coupon.code,
      coupon.discountPercentage,
      coupon.isActive ? 1 : 0,
      JSON.stringify(coupon.applicableCourseIds || [])
    );
    const saved = db.prepare('SELECT * FROM coupons WHERE code = ?').get(coupon.code);
    res.json({
      ...saved,
      applicableCourseIds: parseJsonField(saved.applicableCourseIds),
      isActive: saved.isActive === 1
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/coupons/:code', (req, res) => {
  try {
    db.prepare('DELETE FROM coupons WHERE code = ?').run(req.params.code);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// LMS Courses routes
router.get('/lms-courses', (req, res) => {
  try {
    const courses = db.prepare('SELECT * FROM lms_courses').all();
    res.json(courses.map(c => ({
      ...c,
      modules: parseJsonField(c.modules),
      discussions: parseJsonField(c.discussions)
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/lms-courses', (req, res) => {
  try {
    const course = req.body;
    const id = course.id || `course-${Date.now()}`;
    db.prepare(`
      INSERT OR REPLACE INTO lms_courses (id, title, description, instructor, price, modules, discussions)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      course.title,
      course.description || null,
      course.instructor || null,
      course.price || null,
      JSON.stringify(course.modules || []),
      JSON.stringify(course.discussions || [])
    );
    const saved = db.prepare('SELECT * FROM lms_courses WHERE id = ?').get(id);
    res.json({
      ...saved,
      modules: parseJsonField(saved.modules),
      discussions: parseJsonField(saved.discussions)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/lms-courses/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM lms_courses WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Visitors routes
router.get('/visitors', (req, res) => {
  try {
    const visitors = db.prepare('SELECT * FROM visitors').all();
    res.json(visitors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/visitors', (req, res) => {
  try {
    const visitor = req.body;
    const result = db.prepare(`
      INSERT INTO visitors (name, company, host, scheduledCheckIn, checkIn, checkOut, status, cardNumber)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      visitor.name,
      visitor.company,
      visitor.host,
      visitor.scheduledCheckIn || null,
      visitor.checkIn || null,
      visitor.checkOut || null,
      visitor.status || 'Scheduled',
      visitor.cardNumber || null
    );
    const saved = db.prepare('SELECT * FROM visitors WHERE id = ?').get(result.lastInsertRowid);
    res.json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/visitors/:id', (req, res) => {
  try {
    const visitor = req.body;
    db.prepare(`
      UPDATE visitors SET
        name = ?, company = ?, host = ?, scheduledCheckIn = ?, checkIn = ?,
        checkOut = ?, status = ?, cardNumber = ?
      WHERE id = ?
    `).run(
      visitor.name,
      visitor.company,
      visitor.host,
      visitor.scheduledCheckIn,
      visitor.checkIn,
      visitor.checkOut,
      visitor.status,
      visitor.cardNumber,
      req.params.id
    );
    const saved = db.prepare('SELECT * FROM visitors WHERE id = ?').get(req.params.id);
    res.json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Quotation Templates routes
router.get('/quotation-templates', (req, res) => {
  try {
    const templates = db.prepare('SELECT * FROM quotation_templates').all();
    res.json(templates.map(t => ({ ...t, lineItems: parseJsonField(t.lineItems) })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/quotation-templates', (req, res) => {
  try {
    const template = req.body;
    const result = db.prepare(`
      INSERT INTO quotation_templates (title, description, lineItems, total)
      VALUES (?, ?, ?, ?)
    `).run(
      template.title,
      template.description || null,
      JSON.stringify(template.lineItems || []),
      template.total || 0
    );
    const saved = db.prepare('SELECT * FROM quotation_templates WHERE id = ?').get(result.lastInsertRowid);
    res.json({ ...saved, lineItems: parseJsonField(saved.lineItems) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/quotation-templates/:id', (req, res) => {
  try {
    const template = req.body;
    db.prepare(`
      UPDATE quotation_templates SET title = ?, description = ?, lineItems = ?, total = ?
      WHERE id = ?
    `).run(
      template.title,
      template.description,
      JSON.stringify(template.lineItems || []),
      template.total,
      req.params.id
    );
    const saved = db.prepare('SELECT * FROM quotation_templates WHERE id = ?').get(req.params.id);
    res.json({ ...saved, lineItems: parseJsonField(saved.lineItems) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/quotation-templates/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM quotation_templates WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Activity Log routes
router.get('/activity-log', (req, res) => {
  try {
    const logs = db.prepare('SELECT * FROM activity_log ORDER BY timestamp DESC LIMIT 100').all();
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/activity-log', (req, res) => {
  try {
    const { adminName, action } = req.body;
    const result = db.prepare(`
      INSERT INTO activity_log (adminName, action)
      VALUES (?, ?)
    `).run(adminName, action);
    const saved = db.prepare('SELECT * FROM activity_log WHERE id = ?').get(result.lastInsertRowid);
    res.json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Payment Activity Log routes
router.get('/payment-activity-log', (req, res) => {
  try {
    const logs = db.prepare('SELECT * FROM payment_activity_log ORDER BY timestamp DESC LIMIT 50').all();
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/payment-activity-log', (req, res) => {
  try {
    const { text, amount, type } = req.body;
    const result = db.prepare(`
      INSERT INTO payment_activity_log (text, amount, type)
      VALUES (?, ?, ?)
    `).run(text, amount, type);
    const saved = db.prepare('SELECT * FROM payment_activity_log WHERE id = ?').get(result.lastInsertRowid);
    res.json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Notifications routes
router.get('/notifications', (req, res) => {
  try {
    const notifications = db.prepare('SELECT * FROM notifications ORDER BY timestamp DESC LIMIT 100').all();
    res.json(notifications.map(n => ({
      ...n,
      read: n.read === 1,
      linkTo: parseJsonField(n.linkTo),
      recipientUserIds: parseJsonField(n.recipientUserIds),
      recipientRoles: parseJsonField(n.recipientRoles)
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/notifications', (req, res) => {
  try {
    const notification = req.body;
    const result = db.prepare(`
      INSERT INTO notifications (title, description, read, linkTo, recipientUserIds, recipientRoles)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      notification.title,
      notification.description,
      notification.read ? 1 : 0,
      JSON.stringify(notification.linkTo || {}),
      JSON.stringify(notification.recipientUserIds || []),
      JSON.stringify(notification.recipientRoles || [])
    );
    const saved = db.prepare('SELECT * FROM notifications WHERE id = ?').get(result.lastInsertRowid);
    res.json({
      ...saved,
      read: saved.read === 1,
      linkTo: parseJsonField(saved.linkTo),
      recipientUserIds: parseJsonField(saved.recipientUserIds),
      recipientRoles: parseJsonField(saved.recipientRoles)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/notifications/mark-all-read', (req, res) => {
  try {
    db.prepare('UPDATE notifications SET read = 1 WHERE recipientUserIds LIKE ? OR recipientRoles LIKE ?')
      .run(`%${req.user.id}%`, `%${req.user.role}%`);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;


