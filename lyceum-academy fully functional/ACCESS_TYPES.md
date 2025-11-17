# 🔐 Access Types & Permissions

Your Lyceum Academy system now has **three distinct access types**:

## 1. 👑 **Admin**
**Full system access** - Complete control over all features

### Permissions:
- ✅ **Full Access** to ALL apps:
  - Dashboard
  - Contacts (Create, Read, Update, Delete)
  - CRM (Full access)
  - Calendar (Full access)
  - LMS (Full access)
  - Accounting (Full access)
  - Reception (Full access)
  - Settings (Full access)
  - Access Control (Full access - can manage users)
  - All other apps

### Capabilities:
- Create, edit, delete any data
- Manage all users (Admin, Staff, Students)
- Change user roles and permissions
- Access all reports and analytics
- System configuration

---

## 2. 👔 **Staff**
**Operational access** - Can manage day-to-day operations

### Permissions:
- ✅ **Full Access** to:
  - Contacts
  - CRM
  - Calendar
  - Discuss (Team communication)
  - To-do Lists
  - Reception
  - Sales
  - Marketing
  - LMS

- 👁️ **Read-Only** access to:
  - Dashboard
  - Accounting
  - Inventory
  - Manufacturing
  - Website
  - Point of Sale

- ❌ **No Access** to:
  - Settings (Admin only)
  - Access Control (Admin only)

### Capabilities:
- Manage contacts and leads
- Create and manage events
- Handle visitor check-ins
- Manage LMS courses and students
- Create tasks and communicate with team
- View reports (read-only)

---

## 3. 🎓 **Student**
**Limited access** - Student portal access only

### Permissions:
- ✅ **Read Access** to:
  - LMS (View enrolled courses, take lessons)
  - Student Dashboard
  - Profile (Own profile only)

- ❌ **No Access** to:
  - All other apps (Contacts, CRM, Calendar, etc.)
  - Admin features
  - Staff features

### Capabilities:
- View and access enrolled courses
- Complete lessons and track progress
- View own profile and update information
- View certificates
- Purchase new courses

---

## 📊 Permission Matrix

| Feature | Admin | Staff | Student |
|---------|-------|-------|---------|
| **Dashboard** | ✅ Full | 👁️ Read | ❌ No |
| **Contacts** | ✅ Full | ✅ Full | ❌ No |
| **CRM** | ✅ Full | ✅ Full | ❌ No |
| **Calendar** | ✅ Full | ✅ Full | ❌ No |
| **LMS** | ✅ Full | ✅ Full | 👁️ Read |
| **Accounting** | ✅ Full | 👁️ Read | ❌ No |
| **Reception** | ✅ Full | ✅ Full | ❌ No |
| **Settings** | ✅ Full | ❌ No | ❌ No |
| **Access Control** | ✅ Full | ❌ No | ❌ No |
| **Student Dashboard** | ❌ No | ❌ No | ✅ Full |

---

## 🔄 Role Management

### Creating Users:
- **Admin** can create Staff and Student users via "Access Control" → "New Staff"
- **Students** can self-register (they become Student role by default)
- Only **Admin** can change user roles

### Default Permissions:
- Each role gets default permissions automatically assigned
- **Admin** can customize permissions per user in "Access Control"

---

## 🚀 Quick Reference

### Admin Login:
- Full system access
- Can manage everything
- Can impersonate other users

### Staff Login:
- Operational access
- Can manage contacts, leads, events
- Cannot access settings or user management

### Student Login:
- Portal access only
- Can view courses and progress
- Limited to own data

---

## ✅ Verification

All three access types are now properly configured:
- ✅ Type definitions updated (`types.ts`)
- ✅ Database constraints updated (`server/database.js`)
- ✅ Permissions configured (`components/constants.tsx`)
- ✅ All references updated throughout codebase
- ✅ Authentication system supports all three roles

**Your system is ready with Admin, Staff, and Student access! 🎉**


