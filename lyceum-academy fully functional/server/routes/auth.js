import express from 'express';
import db from '../database.js';
import { generateToken, hashPassword, comparePassword } from '../auth.js';
import { authenticateToken } from '../auth.js';

const router = express.Router();

// Register student
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existing = db.prepare('SELECT * FROM users WHERE email = ?').get(email.toLowerCase());
    if (existing) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const userResult = db.prepare(`
      INSERT INTO users (name, email, password, role, permissions)
      VALUES (?, ?, ?, 'Student', ?)
    `).run(name, email.toLowerCase(), hashedPassword, JSON.stringify({}));

    // Create contact
    const contactId = `LA${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(userResult.lastInsertRowid).padStart(3, '0')}`;
    
    db.prepare(`
      INSERT INTO contacts (userId, name, email, contactId, department, major, notes, checklist, activityLog, recordedSessions)
      VALUES (?, ?, ?, ?, 'Unassigned', 'Unassigned', ?, '[]', '[]', '[]')
    `).run(
      userResult.lastInsertRowid,
      name,
      email.toLowerCase(),
      contactId,
      `Student registered on ${new Date().toLocaleDateString()}.`
    );

    const user = db.prepare('SELECT id, name, email, role, permissions, mustResetPassword FROM users WHERE id = ?').get(userResult.lastInsertRowid);
    const token = generateToken(user);

    // ensure permissions is an object (not a JSON string)
let safePermissions = {};
try {
  if (typeof user.permissions === 'string') {
    safePermissions = JSON.parse(user.permissions || '{}');
  } else if (typeof user.permissions === 'object' && user.permissions != null) {
    safePermissions = user.permissions;
  }
} catch (err) {
  safePermissions = {};
}

// build a safe user copy to send
const safeUser = {
  ...user,
  permissions: safePermissions
};

res.json({ user: safeUser, token });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email.toLowerCase());
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const valid = await comparePassword(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const { password: _, ...userWithoutPassword } = user;
    const token = generateToken(userWithoutPassword);

    res.json({ user: userWithoutPassword, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get current user
router.get('/me', authenticateToken, (req, res) => {
  try {
    const user = db.prepare('SELECT id, name, email, role, permissions, mustResetPassword FROM users WHERE id = ?').get(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to get user' });
  }
});

// Change password
router.post('/change-password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const valid = await comparePassword(currentPassword, user.password);
    if (!valid) {
      return res.status(400).json({ error: 'Incorrect current password' });
    }

    const hashedPassword = await hashPassword(newPassword);
    db.prepare('UPDATE users SET password = ?, mustResetPassword = 0 WHERE id = ?').run(hashedPassword, req.user.id);

    res.json({ success: true, message: 'Password updated' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ error: 'Failed to change password' });
  }
});

export default router;


